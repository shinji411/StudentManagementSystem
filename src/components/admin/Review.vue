<template>
  <div>
    <el-button icon="el-icon-refresh-left" @click="refreshList">刷新列表</el-button>
    <!-- <el-input v-model="search.studentId" class="search" prefix-icon="el-icon-search" placeholder="搜索学号"></el-input> -->
    <el-table border :data="studentData" stripe style="width: 100%;margin-top:10px;" v-loading="loading">
      <el-table-column prop="studentId" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名" class="profile-column"></el-table-column>
      <el-table-column prop="college" label="学院"> </el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column prop="classInfo" label="行政班级"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="confirmSubmit(scope.row)" size="mini">确认</el-button>
          <el-button @click="voteSubmit(scope.row)" type="danger" size="mini">否决</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Profile from "@/models/profile";
export default {
  name: "review",
  data() {
    return {
      search: {
        studentId: ""
      },
      studentData: [],
      loading: false
    };
  },
  methods: {
    refreshList() {
      this.loading = true;
      Profile.getAudit()
        .then(data => {
          this.studentData = data;
        })
        .catch(data => {
          this.$message({ type: "error", message: `获取列表失败，${data.status}` });
        })
        .then(() => {
          this.loading = false;
        });
    },
    confirmSubmit(item) {
      this.loading = true;
      Profile.confirmUpdate(item.id)
        .then(data => {
          this.studentData = data;
          this.refreshList();
        })
        .catch(data => {
          this.$message({ type: "error", message: `设置失败，${data.status}` });
          this.loading = false;
        });
    },
    voteSubmit(item) {
      this.loading = true;
      Profile.undoUpdate(item.id)
        .then(data => {
          this.studentData = data;
          this.refreshList();
        })
        .catch(data => {
          this.$message({ type: "error", message: `设置失败，${data.status}` });
          this.loading = false;
        });
    }
  },
  mounted() {
    this.global.constant.title = "信息审核";
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
