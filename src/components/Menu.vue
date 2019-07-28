<template>
    <div class="menu-list">
      <div v-for="item in menu" :key="item.link" class="menu-item">
        <router-link class="menu-item-link" :to="item.link">
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
  name: "menu",
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
  },
  methods: {},
  mounted() {
    this.global.constant.title = "首页";
  }
};
</script>
<style scoped>
.menu-list {
}
.menu-item {
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 1px #eee solid;
  margin: 0 5px 5px;
  background-color: #fff;
  text-align: center;
  padding: 15px 0;
  transition: all 0.3s;
}
.menu-item:hover {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
}
.menu-item-link {
  text-decoration: none;
  transition: all 0.3s;
  color: #000;
}
.menu-item:hover .menu-item-link {
  color: #409eff;
}
.menu-item-icon {
  font-size: 80px;
}
.menu-item-title {
  margin: 15px 0 0 0;
}
</style>
