<template>
  <div class="menu-list">
    <div v-for="item in menu" :key="item.link" class="menu-item">
      <router-link :class="{'menu-item-link':true,'active':$route.path==item.link}" :to="item.link">
        <svg class="icon menu-item-icon" aria-hidden="true">
          <use :xlink:href="'#icon-'+item.icon" />
        </svg>
        <div class="menu-item-title">{{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "aside",
  data() {
    return {
      menu: [
        {
          name: "我的信息",
          icon: "profile",
          link: "/profile"
        },
        {
          name: "我的课程",
          icon: "course",
          link: "/course"
        },
        {
          name: "我的成绩",
          icon: "grade",
          link: "/grade"
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu-list{
    margin: 10px 0 0 0;
}
.menu-item {
  border-bottom: 1px #eee solid;
  margin: 0 0 15px 0;
  padding: 0 0 15px 0;
}
.menu-item-link::before {
  content: " ";
  float: left;
  margin: 0 5px 0 0;
  width: 15px;
}
.active::before {
  content: ">";
}
.menu-item:last-child {
  border-bottom: none;
  margin: 0;
  padding: 0;
}
.menu-item-link {
  display: flex;
  font-size: 18px;
  text-decoration: none;
  color: #000;
}
.menu-item-link:hover {
  color: #409eff;
}
.menu-item-icon {
  font-size: 25px;
  margin-right: 15px;
}
</style>
