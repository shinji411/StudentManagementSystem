<template>
  <div class="header">
    <h1>
      学生管理系统
      <small>{{ constant.title }}</small>
    </h1>
    <div class="header-spacer"></div>
    <div>
      <el-dropdown @command="logout" v-if="account.group != 0" class="header-dropdown">
        <span class="el-dropdown-link">
          {{ account.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Account from "@/models/account";
export default {
  name: "header",
  data() {
    return {
      constant: this.global.constant,
      account: this.global.account
    };
  },
  methods: {
    logout() {
      document.cookie = "";
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
</style>
