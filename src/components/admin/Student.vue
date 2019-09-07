<template>
  <div>
    <el-button icon="el-icon-circle-plus-outline" @click="addStudentBtn" type="primary">添加学生</el-button>
    <el-button icon="el-icon-refresh-left" @click="refreshList">刷新列表</el-button>
    <!-- <el-input v-model="search.name" class="search" prefix-icon="el-icon-search" placeholder="搜索姓名" v-if="!search.show"></el-input> -->
    <el-table border :data="studentData" stripe style="width: 100%;margin-top:10px;" v-loading="loading">
      <el-table-column prop="studentId" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="college" label="学院"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column prop="classInfo" label="班级"></el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="editBtn(scope.row)" size="mini">编辑</el-button>
          <el-button @click="deleteUser(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--dialog start-->
    <el-dialog top="10vh" class="student-dialog" :title="tabPageName[tabPage]" :visible.sync="editDialogVisible" v-loading="loading">
      <!--tab start-->
      <el-tabs v-model="tabPage" @tab-click="tabClick">
        <!--编辑信息 editForm-->
        <el-tab-pane label="编辑信息" name="edit">
          <el-form ref="editForm" :rules="rules" :hide-required-asterisk="true" :model="editForm" label-width="80px">
            <el-form-item class="student-edit-input" label="学号" prop="studentId">
              <el-input placeholder="学号" v-model="editForm.studentId"></el-input>
            </el-form-item>
            <el-form-item class="student-edit-input" label="姓名" prop="name">
              <el-input placeholder="姓名" v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item class="student-edit-input" label="学院" prop="college">
              <el-input placeholder="学院" v-model="editForm.college"></el-input>
            </el-form-item>
            <el-form-item class="student-edit-input" label="专业" prop="major">
              <el-input placeholder="专业" v-model="editForm.major"></el-input>
            </el-form-item>
            <el-form-item class="student-edit-input" label="班级" prop="classInfo">
              <el-input placeholder="班级" v-model="editForm.classInfo"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!--成绩设置 table-->
        <el-tab-pane label="成绩设置" name="grade">
          <el-table max-height="300" border :data="gradeData" stripe style="width: 100%;margin-top:10px;" v-loading="tableLoading">
            <el-table-column prop="code" label="课程代码"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="teacherName" label="教师姓名"></el-table-column>
            <el-table-column prop="grade" label="总评分数">
              <template slot-scope="scope">
                <el-input v-if="editGrade" v-model="gradeForm.grade" :placeholder="scope.row.grade"></el-input>
                <template v-else>
                  {{ scope.row.grade }}
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="point" label="绩点">
              <template slot-scope="scope">
                {{ getPoint(scope.row.grade) }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button v-if="!editGrade" @click="editGrade = scope.row" size="mini">编辑</el-button>
                <el-button v-else-if="editGrade == scope.row" @click="setGrade(scope.row)" size="mini" type="primary">完成</el-button>
                <el-button v-else disabled size="mini">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!--奖惩记录 rewardForm table-->
        <el-tab-pane label="奖惩记录" name="reward" v-loading="tableLoading">
          <el-form :inline="true" ref="rewardForm" :rules="rules" :model="reward">
            <el-form-item>
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :editable="false"
                :clearable="false"
                v-model="reward.date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input v-model="reward.detail" placeholder="详细记录"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-circle-plus-outline" @click="addNewReward" type="primary">添加新记录</el-button>
            </el-form-item>
          </el-form>
          <el-table max-height="300" border :data="rewardData" stripe style="width: 100%;">
            <el-table-column width="180px" prop="recodeDate" label="日期"></el-table-column>
            <el-table-column prop="content" label="详细信息"></el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-button @click="deleteReward(scope.row)" type="danger" slot="reference" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!--重置密码 resetForm-->
        <el-tab-pane label="重置密码" name="reset">
          <el-form ref="resetForm" :rules="rules" :hide-required-asterisk="true" :model="reset" label-width="80px">
            <el-form-item label="密码" prop="password">
              <el-input placeholder="密码" v-model="reset.password" show-password></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!--tab end-->

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">关闭</el-button>
        <el-button v-if="tabPage == 'edit'" type="primary" @click="editSubmit">确定</el-button>
        <el-button v-if="tabPage == 'reset'" type="primary" @click="resetSubmit">确定</el-button>
      </span>
    </el-dialog>
    <!--dialog end-->

    <!--add dialog start-->
    <el-dialog top="7vh" width="400px" title="添加新学生" :visible.sync="addDialogVisible" v-loading="tableLoading">
      <el-form ref="addForm" :rules="rules" :hide-required-asterisk="true" :model="addForm" label-width="45px">
        <el-form-item class="student-edit-input" label="学号" prop="studentId">
          <el-input placeholder="学号" v-model="addForm.studentId"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="姓名" prop="name">
          <el-input placeholder="姓名" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="学院" prop="college">
          <el-input placeholder="学院" v-model="addForm.college"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="专业" prop="major">
          <el-input placeholder="专业" v-model="addForm.major"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="班级" prop="classInfo">
          <el-input placeholder="班级" v-model="addForm.classInfo"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="密码" prop="password">
          <el-input placeholder="密码" v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="确认" prop="password2">
          <el-input placeholder="确认密码" v-model="addForm.password2" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="addSubmit">确定</el-button>
      </span>
    </el-dialog>
    <!--add dialog end-->
  </div>
</template>
<script>
import Student from "@/models/student";
import Profile from "@/models/profile";
import Grade from "@/models/grade";
export default {
  name: "student-admin",
  data() {
    let validatePass2 = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.$refs[Object.keys(this.$refs)[0]].password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      studentData: [],
      editDialogVisible: false,
      addDialogVisible: false,
      editForm: { id: 0, name: "", studentId: "", faculty: "", major: "", classInfo: "" },
      addForm: { id: 0, name: "", studentId: "", faculty: "", major: "", classInfo: "", password: "", password2: "" },
      tabPage: "",
      tabPageName: { edit: "编辑信息", reward: "奖惩记录", reset: "重置密码", grade: "成绩设置" },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        college: [{ required: true, message: "请输入学院", trigger: "blur" }],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        classInfo: [{ required: true, message: "请输入班级代码", trigger: "blur" }],
        password: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
        date: [{ type: "date", required: true, message: "请选择日期", trigger: "change" }],
        detail: [{ required: true, message: "请输入详细信息", trigger: "blur" }]
      },
      gradeData: [],
      editGrade: false,
      gradeForm: {
        grade: ""
      },
      rewardData: [],
      reward: {
        date: "",
        detail: ""
      },
      reset: {
        password: ""
      },
      tableLoading: false,
      loading: false
    };
  },
  methods: {
    //打开添加学生dialog
    addStudentBtn() {
      this.addDialogVisible = true;
    },
    //刷新列表
    refreshList() {
      this.loading = true;
      Student.getList()
        .then(data => {
          this.studentData = data;
        })
        .catch(data => {
          this.$message({ type: "error", message: "获取列表失败，" + data.status });
        })
        .then(() => {
          this.loading = false;
        });
    },
    //点击修改按钮
    editBtn(item) {
      this.editForm.id = item.id;
      this.editForm.name = item.name;
      this.editForm.studentId = item.studentId;
      this.editForm.college = item.college;
      this.editForm.classInfo = item.classInfo;
      this.editForm.major = item.major;
      this.tabPage = "edit";
      this.editDialogVisible = true;
    },
    //提交修改
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        let t = this.editForm;
        Student.editStudentProfile(t.id, t.name, t.studentId, t.college, t.major, t.classInfo)
          .then(data => {
            this.$message({ type: "success", message: "修改成功" });
          })
          .catch(data => {
            this.$message({ type: "error", message: "修改失败，" + data.status });
          })
          .then(() => {
            this.loading = false;
          });
      });
    },
    //提交重置密码
    resetSubmit() {
      this.$refs.resetForm.validate(valid => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        Student.resetPassword(this.editForm.id, this.reset.password)
          .then(data => {
            this.$message({ type: "success", message: "修改成功" });
          })
          .catch(data => {
            this.$message({ type: "error", message: "修改失败，" + data.status });
          })
          .then(() => {
            this.loading = false;
          });
      });
    },
    //提交新用户添加
    addSubmit() {
      this.$refs.addForm.validate(valid => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        let t = this.addForm;
        Student.addStudent(t.name, t.studentId, t.college, t.major, t.classInfo, t.password)
          .then(data => {
            this.addDialogVisible = false;
            this.$message({ type: "success", message: "添加成功" });
            this.refreshList();
          })
          .catch(data => {
            this.$message({ type: "error", message: "添加失败，" + data.status });
            this.loading = false;
          });
      });
    },
    //提交设置分数
    setGrade(item) {
      if (this.gradeForm.grade == "") {
        this.$message({ type: "error", message: "请先输入分数" });
        return false;
      }
      this.tableLoading = true;
      Grade.setGrade(this.gradeForm.grade, this.editForm.studentId, item.id)
        .then(data => {
          this.$message({ type: "success", message: "设置成功" });
          this.getGrade();
        })
        .catch(data => {
          this.$message({ type: "error", message: "设置失败，" + data.status });
          this.tableLoading = false;
        })
    },
    //提交删除用户（学生）
    deleteUser() {
      this.loading = true;
      Student.deleteSudent(t.studentId)
        .then(data => {
          this.$message({ type: "success", message: "删除成功" });
          this.refreshList();
        })
        .catch(data => {
          this.$message({ type: "error", message: "删除失败，" + data.status });
        })
        .then(() => {
          this.loading = false;
        });
    },
    //换页
    // changePage() {},
    //提交搜索
    // searchStart() {},
    //切换tab
    tabClick() {
      if (this.tabPage == "grade") {
        console.log(this);
        this.gradeData.length == 0 && this.getGrade();
      } else if (this.tabPage == "reward") {
        this.rewardData.length == 0 && this.getReward();
      }
    },
    //提交删除奖惩记录
    deleteReward() {
      this.tableLoading = true;
      Profile.deleteRecord()
        .then(data => {
          this.$message({ type: "success", message: `删除成功` });
        })
        .catch(data => {
          this.$message({ type: "error", message: `删除失败，${data.status}` });
        })
        .then(() => {
          this.tableLoading = false;
        });
    },
    //提交新增奖惩
    addNewReward() {
      this.$refs.rewardForm.validate(valid => {
        if (!valid) {
          return false;
        }
        this.tableLoading = true;
        Profile.addReward(this.editForm.id, this.reward.date, this.reward.detail)
          .then(data => {
            this.$message({ type: "success", message: "添加成功" });
          })
          .catch(data => {
            this.$message({ type: "error", message: "添加失败，" + data.status });
          })
          .then(() => {
            this.tableLoading = false;
          });
      });
    },
    getReward() {
      this.tableLoading = true;
      Profile.getReward(this.editForm.studentId)
        .then(data => {
          this.rewardData = data;
        })
        .catch(data => {
          this.$message({ type: "error", message: `获取奖惩记录失败，${data.status}` });
        })
        .then(() => {
          this.tableLoading = false;
        });
    },
    getGrade() {
      this.tableLoading = true;
      Grade.getGrade(this.editForm.studentId)
        .then(data => {
          this.gradeData = data;
        })
        .catch(data => {
          this.$message({ type: "error", message: `获取成绩失败，${data.status}` });
        })
        .then(() => {
          this.tableLoading = false;
        });
    },
    getPoint(s){
      return Grade.getPoint(s);
    }
  },
  mounted() {
    this.global.constant.title = "学生管理";
    this.refreshList();
  }
};
</script>
<style scoped>
.pagination {
  text-align: right;
  margin-top: 5px;
}
.search {
  width: 200px;
  margin: 0 10px;
}
.search-panel {
  border: 1px #eee solid;
  margin: 10px 0;
  padding: 20px 40px 0 0;
  display: none;
  transition: all 0.25s;
}
.search-panel.active {
  display: block;
}
.search-panel-form {
  display: inline-block;
}
.search-panel-item {
  width: 200px;
  display: inline-block;
}
.search-panel-btn {
  float: right;
  margin-bottom: 10px;
}
.search-panel-input {
  width: 400px;
}
.student-edit-input {
  max-width: 500px;
}
</style>
<style>
.student-dialog {
  content: "";
}
.student-dialog .el-dialog__body {
  padding: 5px 20px 30px !important;
}
</style>
