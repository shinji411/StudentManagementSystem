<template>
  <el-container>
    <el-header class="header-wrap">
      <Header></Header>
    </el-header>
    <el-container class="container">
      <el-main>
        <router-view />
      </el-main>
      <el-aside :style="$route.path!='/index'?'width:180px;':'width:240px;'" class="aside">
        <Aside v-if="$route.path!='/index'"></Aside>
        <Notice v-else></Notice>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Notice from "@/components/Notice";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    Header,
    Aside,
    Notice
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
</style>
