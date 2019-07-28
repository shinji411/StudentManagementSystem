<template>
  <div>
    <el-menu ref="menu" :router="true" :default-active="activedIndex" class="admin-aside">
      <el-menu-item :route="{ path: '/admin/splash' }" index="/admin/splash">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>主页</span>
        </template>
      </el-menu-item>
      <el-menu-item :route="{ path: '/admin/student' }" index="/admin/student">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>学生管理</span>
        </template>
      </el-menu-item>
      <el-menu-item :route="{ path: '/admin/course' }" index="/admin/course">
        <template slot="title">
          <i class="el-icon-data-board"></i>
          <span>课程管理</span>
        </template>
      </el-menu-item>
      <el-menu-item :route="{ path: '/admin/review' }" index="/admin/review">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span>信息审核</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Aside",
  data: function() {
    return {
      activedIndex: "/admin/splash",
      route: this.$route
    };
  },
  watch: {
    route() {
      this.activedIndex = this.$route.path;
    }
  },
  methods: {},
  mounted: function() {
    this.activedIndex = this.$route.path;
  }
};
</script>
<style scoped>
.admin-aside {
  background-color: inherit;
  margin: 10px 0 0 0;
}
</style>
