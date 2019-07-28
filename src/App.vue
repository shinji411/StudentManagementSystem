<template>
  <transition>
    <router-view v-loading="loading" />
  </transition>
</template>
<script>
import Account from "@/models/Account.js";
export default {
  name: "app",
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    Account.checkIsLogin()
      .then(data => {
        this.global.account.group = data.group;
        this.global.account.username = data.username;
        data.group == 2 &&
          this.$route.fullPath.indexOf("/admin") == -1 &&
          this.$router.push("/admin");
        data.group != 2 &&
          this.$route.fullPath.indexOf("/admin") != -1 &&
          this.$router.push("/");
      })
      .catch(data => {
        console.log(data);
        this.$route.fullPath != "/login" && this.$router.push("/login");
      })
      .then(() => {
        this.loading = false;
      });
  }
};
</script>
<style scoped>
</style>
