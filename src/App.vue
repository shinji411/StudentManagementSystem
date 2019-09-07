<template>
  <transition>
    <router-view v-loading="loading" />
  </transition>
</template>
<script>
import Account from "@/models/account";
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
        this.global.account.group = data.level == 0 ? 1 : 2;
        this.global.account.username = data.name;
        this.global.account.group == 2 && this.$route.fullPath.indexOf("/admin") == -1 && this.$router.push("/admin");
        this.global.account.group != 2 && this.$route.fullPath.indexOf("/admin") != -1 && this.$router.push("/");
      })
      .catch(data => {
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
