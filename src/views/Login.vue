<template>
  <el-container class="login-container">
    <el-header class="login-header">
      <h1>
        学生管理系统
        <small>身份验证</small>
      </h1>
    </el-header>
    <el-main class="login-main">
      <el-card class="box-card login-card" v-loading="loading">
        <h1>登录</h1>
        <el-form
          ref="form"
          :rules="rules"
          :hide-required-asterisk="true"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="用户名" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              placeholder="密码"
              v-model="form.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import Account from "@/models/Account.js";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    login() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        Account.login(this.form.username, this.form.password)
          .then(data => {
            this.global.account.group = data.group;
            this.global.account.username = data.username;
            this.$message({
              type: "success",
              message: "登录成功，2秒后跳转到首页"
            });
            setTimeout(() => {
              data.group == 2
                ? this.$router.push("/admin")
                : this.$router.push("/");
            }, 2000);
          })
          .catch(data => {
            this.$alert(`${data.error_msg}(${data.error_code})`, "登录失败", {
              confirmButtonText: "确定",
              type: "warning"
            });
          })
          .then(() => {
            this.loading = false;
          });
      });
    }
  }
};
</script>
<style scoped>
.login-container {
  background-image: url("../assets/img/bg.png");
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-size: cover;
}
.login-card {
  width: 400px;
  padding: 0 40px 0 0;
  position: absolute;
  margin: auto;
  top: 7vh;
  right: 8vw;
  height: 300px;
}
.login-card h1 {
  padding: 0 28px;
}
.login-main {
  position: relative;
}
.login-header {
  background-color: rgba(255, 255, 255, 0.6);
}
.login-header > h1 {
  margin: 12px 0 0;
  font-weight: 600;
}
.login-header > h1 > small {
  font-weight: 500;
  margin: 0 0 0 10px;
}
</style>