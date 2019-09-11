<template>
  <div>
    <el-button icon="el-icon-circle-plus-outline" @click="addCourseBtn" type="primary">添加课程</el-button>
    <el-button icon="el-icon-refresh-left" @click="refreshList">刷新列表</el-button>
    <!-- <el-input v-model="search" class="search" prefix-icon="el-icon-search" placeholder="搜索课程名称"></el-input> -->
    <el-table border :data="courseData" stripe style="width: 100%;margin-top:10px;" v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="course-table-expand">
            <el-form-item label="学分">
              <span>{{ props.row.credit }}</span>
            </el-form-item>
            <el-form-item label="上课地点">
              <span>{{ props.row.local }}</span>
            </el-form-item>
            <el-form-item label="教师职称">
              <span>{{ props.row.teacher.title }}</span>
            </el-form-item>
            <el-form-item label="上课周次">
              <span
                ><template v-for="item in props.row.weeks">
                  <div class="course-week" :key="item">{{ item }}</div>
                </template></span
              >
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="课程代码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="classify" label="分类"></el-table-column>
      <el-table-column prop="teacher.name" label="教师"></el-table-column>
      <el-table-column prop="time" label="上课时间">
        <template slot-scope="scope">
          <template v-for="item in scope.row.time">
            <div :key="item.week + '_' + item.lessons[0]">
              周{{ weekChinese[item.week - 1] }} {{ item.lessons[0] }}
              <template v-if="item.lessons[1] != item.lessons[0]">
                -{{ item.lessons[1] }}
              </template>
              节
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <!-- <el-button @click="editBtn(scope.row)" size="mini">编辑</el-button> -->
          <el-button @click="deleteSubmit(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog top="3vh" width="400px" :title="dialog.title" :visible.sync="dialog.visible" v-loading="dialogLoading">
      <el-form ref="form" :rules="rules" :hide-required-asterisk="true" :model="form" label-width="80px">
        <el-form-item class="student-edit-input" label="课程代码" prop="code">
          <el-input placeholder="课程代码" v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="课程名称" prop="name">
          <el-input placeholder="课程名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="学分" prop="credit">
          <el-input-number v-model="form.credit" :min="1" :max="10" label="学分"></el-input-number>
        </el-form-item>
        <el-form-item class="student-edit-input" label="分类" prop="classify">
          <el-select v-model="form.classify" placeholder="课程分类">
            <el-option v-for="item in classify" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="student-edit-input" label="上课地点" prop="local">
          <el-input placeholder="上课地点" v-model="form.local"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="教师" prop="teacher">
          <el-input placeholder="教师名称" v-model="form.teacher"></el-input>
        </el-form-item>
        <el-form-item class="student-edit-input" label="教师职称" prop="title">
          <el-select v-model="form.title" placeholder="教师职称">
            <el-option v-for="item in title" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="student-edit-input" label="上课周次" prop="week">
          <el-select v-model="form.week" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in weeks" :key="item" :label="`第${item}周`" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="student-edit-input" label="上课时间" prop="week">
          <el-cascader v-model="form.time" :options="time" :props="{ multiple: true }" collapse-tags></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">关闭</el-button>
        <el-button v-if="dialog.mode == 'add'" type="primary" @click="addSubmit">确定</el-button>
        <el-button v-else type="primary" @click="editSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Course from "@/models/course";
import CourseUtils from "@/utils/course";
export default {
  name: "course-admin",
  data() {
    return {
      loading: false,
      dialogLoading: false,
      weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      classify: [
        "思想政治理论课",
        "军事理论、体育",
        "外语",
        "核心通识课程",
        "新生研讨课程",
        "数学与自然科学基础课",
        "学院要求课",
        "专业核心课程",
        "专业限选课",
        "集中实践教学",
        "本专业选修课",
        "素质教育选修课",
        "跨专业选修课",
        "创新与拓展项目"
      ],
      title: ["教授", "教授（特聘）", "副教授", "副教授（特聘）", "讲师", "讲师（特聘）"],
      search: "",
      time: Course.getTimeData(),
      dialog: { visible: false, title: "添加课程", mode: "add" },
      form: { code: "", name: "", classify: "", credit: 1, local: "", teacher: "", title: "", week: [], time: [] },
      weekChinese: ["一", "二", "三", "四", "五", "六", "日"],
      courseData: [],
      rules: {
        code: [{ required: true, message: "请输入课程代码", trigger: "blur" }],
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        classify: [{ required: true, message: "请选择课程类别", trigger: "change" }],
        local: [{ required: true, message: "请输入上课地点", trigger: "blur" }],
        teacher: [{ required: true, message: "请输入教师名称", trigger: "blur" }],
        title: [{ required: true, message: "请选择教师职称", trigger: "change" }],
        week: [
          {
            required: true,
            message: "请至少选择一个周次",
            trigger: "blur",
            type: "array"
          }
        ],
        time: [
          {
            required: true,
            message: "请至少选择一个时间段",
            trigger: "blur",
            type: "array"
          }
        ]
      }
    };
  },
  methods: {
    refreshList() {
      this.loading = true;
      Course.getCourse(true)
        .then(data => {
          this.courseData = data;
        })
        .catch(data => {
          this.$message({ type: "error", message: "获取课程列表失败，" + data.status });
        })
        .then(() => {
          this.loading = false;
        });
    },
    addCourseBtn() {
      this.form.code = "";
      this.form.name = "";
      this.form.classify = "";
      this.form.credit = 1;
      this.form.local = "";
      this.form.teacher = "";
      this.form.title = "";
      this.form.week = [];
      this.form.time = [];
      this.dialog.title = "添加课程";
      this.dialog.visible = true;
      this.dialog.mode = "add";
    },
    editBtn(item) {
      this.form.code = item.code;
      this.form.name = item.name;
      this.form.classify = item.classify;
      this.form.credit = item.credit;
      this.form.local = item.local;
      this.form.teacher = item.teacher.name;
      this.form.title = item.teacher.title;
      this.form.week = item.weeks;
      let d = CourseUtils.getLessonTimeArray(item.time);
      console.log(d);
      this.form.time = d;
      this.dialog.title = "编辑课程";
      this.dialog.visible = true;
      this.dialog.mode = "edit";
    },
    deleteSubmit(item) {
      this.loading = true;
      Course.deleteCourse(item.id)
        .then(data => {
          this.courseData = data;
          this.refreshList();
        })
        .catch(data => {
          this.$message({ type: "error", message: "操作失败，" + data.status });
          this.loading = false;
        });
    },
    addSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        let t = this.form;
        Course.addCourse(t.name, t.code, t.classify, t.credit, t.local, t.teacher, t.title, t.week, t.time)
          .then(data => {
            this.courseData = data;
            this.refreshList();
          })
          .catch(data => {
            this.$message({ type: "error", message: "操作失败，" + data.status });
            this.loading = false;
          });
      });
    },
    editSubmit() {
      console.log(this.form.time);
    }
  },
  mounted() {
    this.global.constant.title = "课程管理";
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
</style>

<style>
.course-table-expand {
  font-size: 0;
  display: flex;
  flex-wrap: wrap;
}
.course-table-expand label {
  flex-basis: 90px;
  color: #99a9bf;
  flex-shrink: 0;
}
.course-table-expand span {
  flex-grow: 1;
}
.course-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  display: flex;
}
.course-week {
  display: inline-block;
  margin-right: 5px;
}
.course-week::after {
  content: "、";
}
.course-week:last-child {
  margin-right: 0;
}
.course-week:last-child:after {
  content: "";
}
</style>
