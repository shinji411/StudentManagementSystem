<template>
  <el-container>
    <el-header class="header-wrap">
      <Header></Header>
    </el-header>
    <el-container class="container">
      <el-aside style="padding-bottom: 5px;" width="200px">
        <Aside></Aside>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script >
import Header from "@/components/Header.vue";
import Aside from "@/components/admin/Aside.vue";
export default {
  name: "App",
  components: {
    Header,
    Aside
  },
  mounted: function() {
    
  }
};
</script>
<style scoped>
header {
  border-bottom: 1px #eee solid;
}
</style> 
