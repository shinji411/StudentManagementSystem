import Vue from "vue";
import Router from "vue-router";
import { NAME as Name } from "@/models/service.js";
import Index from "@/views/Index";
import Login from "@/views/Login";
import Profile from "@/components/Profile";
import Admin from "@/views/Admin";
import Menu from "@/components/Menu";
import Grade from "@/components/Grade";
import Course from "@/components/Course";
import SplashAdmin from "@/components/admin/Splash";
import CourseAdmin from "@/components/admin/Course";
import StudentAdmin from "@/components/admin/Student";
import ReviewAdmin from "@/components/admin/Review";

Vue.use(Router);
let title = " - " + Name;
export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/admin",
      redirect: "/admin/splash"
    },
    {
      path: "/",
      name: "Index",
      component: Index,
      props: true,
      children: [
        {
          path: "index",
          name: "Menu",
          component: Menu,
          props: true,
          meta: {
            title: "首页" + title
          }
        },
        {
          path: "profile",
          name: "Profile",
          component: Profile,
          props: true,
          meta: {
            title: "个人资料" + title
          }
        },
        {
          path: "grade",
          name: "Grade",
          component: Grade,
          props: true,
          meta: {
            title: "成绩查询" + title
          }
        },
        {
          path: "course",
          name: "Course",
          component: Course,
          props: true,
          meta: {
            title: "课程查询" + title
          }
        }
      ]
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      props: true,
      children: [
        {
          path: "splash",
          name: "SplashAdmin",
          component: SplashAdmin,
          props: true,
          meta: {
            title: "主页 - 后台" + title
          }
        },
        {
          path: "course",
          name: "CourseAdmin",
          component: CourseAdmin,
          props: true,
          meta: {
            title: "课程管理 - 后台" + title
          }
        },
        {
          path: "student",
          name: "StudentAdmin",
          component: StudentAdmin,
          props: true,
          meta: {
            title: "学生管理 - 后台" + title
          }
        },
        {
          path: "review",
          name: "ReviewAdmin",
          component: ReviewAdmin,
          props: true,
          meta: {
            title: "信息审核 - 后台" + title
          }
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      props: true,
      meta: {
        title: "身份验证" + title
      }
    }
  ]
});
