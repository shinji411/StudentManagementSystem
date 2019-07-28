<template>
  <div>
    <el-button icon="el-icon-circle-plus-outline" @click="addStudentBtn" type="primary">添加学生</el-button>
    <el-button icon="el-icon-refresh-left" @click="refreshList">刷新列表</el-button>
    <el-input v-model="search.name" class="search" prefix-icon="el-icon-search" placeholder="搜索姓名" v-if="!search.show"></el-input>
    <el-button :icon="search.show ? 'el-icon-close' : 'el-icon-search'" @click="searchBtn">
      <template v-if="!search.show">高级搜索</template>
      <template v-else>关闭高级搜索</template>
    </el-button>
    <div class="search-panel clearfix" :class="{ active: search.show }">
      <el-form class="search-panel-form" label-width="60px" :model="search">
        <el-form-item class="search-panel-item" label="学号">
          <el-input v-model="search.studentID"></el-input>
        </el-form-item>
        <el-form-item class="search-panel-item" label="姓名">
          <el-input v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item class="search-panel-item" label="学院">
          <el-input v-model="search.faculty"></el-input>
        </el-form-item>
        <el-form-item class="search-panel-item" label="专业">
          <el-input v-model="search.major"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="search-panel-btn" icon="el-icon-search" @click="searchStart" type="success" v-if="search.show">搜索</el-button>
    </div>
    <el-table border :data="studentData" stripe style="width: 100%;margin-top:10px;">
      <el-table-column prop="studentID" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="faculty" label="学院"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="editBtn(scope.row)" size="mini">编辑</el-button>
          <el-button @click="deleteUser(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" background layout="prev, pager, next,jumper" :total="page.total" :current-page="page.now" :page-size="30" @current-change="changePage"></el-pagination>
    <el-dialog top="10vh" class="student-dialog" :title="tabPageName[tabPage]" :visible.sync="editDialogVisible">
      <el-tabs v-model="tabPage" @tab-click="tabClick">
        <el-tab-pane label="编辑信息" name="edit">
          <el-form ref="editForm" :rules="rules" :hide-required-asterisk="true" :model="editForm" label-width="80px">
            <el-form-item class="student-edit-input" label="学号" prop="studentID">
              <el-input placeholder="学号" v-model="editForm.studentID"></el-input>
            </el-form-item>
            <el-form-item class="student-edit-input" label="姓名" prop="name">
              <el-input placeholder="姓名" v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item class="student-edit-input" label="学院" prop="faculty">
              <el-input placeholder="学院" v-model="editForm.faculty"></el-input>
            </el-form-item>
            <el-form-item class="student-edit-input" label="专业" prop="major">
              <el-input placeholder="专业" v-model="editForm.major"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="成绩设置" name="grade">
          <el-table max-height="300" border :data="gradeData" stripe style="width: 100%;margin-top:10px;">
            <el-table-column prop="code" label="课程代码"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="teacher" label="教师姓名"></el-table-column>
            <el-table-column prop="grade" label="分数"></el-table-column>
            <el-table-column prop="gp" label="绩点"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-popover placement="top" width="200" trigger="click">
                  <el-input @keydown.enter.native="setGrade(scope.row)" v-model="grade" placeholder="设置分数"></el-input>
                  <el-button slot="reference" size="mini">设置分数</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="奖惩记录" name="reward">
          <el-form :inline="true" :rules="rules" :model="reward">
            <el-form-item>
              <el-date-picker :editable="false" :clearable="false" v-model="reward.date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input v-model="reward.detail" placeholder="详细记录"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-circle-plus-outline" @click="addNewReward" type="primary">添加新记录</el-button>
            </el-form-item>
          </el-form>
          <el-table max-height="300" border :data="rewardData" stripe style="width: 100%;">
            <el-table-column width="180px" prop="date" label="日期"></el-table-column>
            <el-table-column prop="detail" label="详细信息"></el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-button @click="deleteReward(scope.row)" type="danger" slot="reference" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="重置密码" name="reset">
          <el-form ref="reset" :rules="rules" :hide-required-asterisk="true" :model="reset" label-width="80px">
            <el-form-item label="密码" prop="password">
              <el-input placeholder="密码" v-model="reset.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input placeholder="再次输入密码" v-model="reset.password2" show-password></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">关闭</el-button>
        <el-button v-if="tabPage == 'edit'" type="primary" @click="editSubmit">确定</el-button>
        <el-button v-if="tabPage == 'reset'" type="primary" @click="resetSubmit">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog top="7vh" width="400px" title="添加新学生" :visible.sync="addDialogVisible">
      <el-form ref="addForm" :rules="rules" :hide-required-asterisk="true" :model="addForm" label-width="45px">
        <el-form-item class="student-edit-input" label="学号" prop="studentID">
          <el-input placeholder="学号" v-model="addForm.studentID"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="姓名" prop="name">
          <el-input placeholder="姓名" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="学院" prop="faculty">
          <el-input placeholder="学院" v-model="addForm.faculty"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="专业" prop="major">
          <el-input placeholder="专业" v-model="addForm.major"></el-input>
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
  </div>
</template>
<script>
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
      studentData: [
        {
          id: 0,
          name: "马云",
          studentID: 200000000,
          faculty: "资本主义学院",
          major: "川剧变脸学"
        }
      ],
      page: {
        now: 1,
        total: 1000
      },
      editDialogVisible: false,
      addDialogVisible: false,
      search: {
        show: false,
        name: "",
        studentID: "",
        faculty: "",
        major: ""
      },
      editForm: {
        id: 0,
        name: "",
        studentID: "",
        faculty: "",
        major: ""
      },
      addForm: {
        id: 0,
        name: "",
        studentID: "",
        faculty: "",
        major: "",
        password: "",
        password2: ""
      },
      tabPage: "",
      tabPageName: {
        edit: "编辑信息",
        reward: "奖惩记录",
        reset: "重置密码",
        grade: "成绩设置"
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        studentID: [{ required: true, message: "请输入学号", trigger: "blur" }],
        faculty: [{ required: true, message: "请输入学院", trigger: "blur" }],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        password2: [{ validator: validatePass2, trigger: "blur" }],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        detail: [{ required: true, message: "请输入详细信息", trigger: "blur" }]
      },
      gradeData: [
        {
          code: "LX000005",
          name: "灵堂卖片",
          teacher: "章金莱",
          grade: 85,
          gp: 4.0
        }
      ],
      grade: "",
      rewardData: [
        {
          date: "2014年1月1日",
          detail: "我以后绝对不碰游戏"
        },
        {
          date: "2016年1月1日",
          detail: "阿里游戏正式成立"
        },
        {
          date: "2017年7月1日",
          detail: "我对钱没有兴趣"
        },
        {
          date: "2017年8月1日",
          detail: "我人生中最大的错误就是创办了阿里巴巴"
        },
        {
          date: "2017年8月1日",
          detail: "如果有来生，我一定选择家庭"
        },
        {
          date: "2019年4月1日",
          detail: "能够996是修来的福报"
        }
      ],
      reward: {
        date: "",
        detail: ""
      },
      reset: {
        password: "",
        password2: ""
      }
    };
  },
  methods: {
    //打开添加学生dialog
    addStudentBtn() {
      this.addDialogVisible = true;
    },
    //刷新列表
    refreshList() {},
    //打开高级搜索
    searchBtn() {
      this.search.show = !this.search.show;
    },
    //点击修改按钮
    editBtn(item) {
      this.editForm.id = item.id;
      this.editForm.name = item.name;
      this.editForm.studentID = item.studentID;
      this.editForm.faculty = item.faculty;
      this.editForm.major = item.major;
      this.tabPage = "edit";
      this.editDialogVisible = true;
    },
    //提交修改
    editSubmit() {},
    //提交重置密码
    resetSubmit() {},
    //提交新用户添加
    addSubmit() {},
    //提交设置分数
    setGrade() {},
    //提交删除用户（学生）
    deleteUser() {},
    //换页
    changePage() {},
    //提交搜索
    searchStart() {},
    //切换tab
    tabClick() {},
    //提交删除奖惩记录
    deleteReward() {},
    //提交新增记录
    addNewReward() {}
  },
  mounted() {
    this.global.constant.title = "学生管理";
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
