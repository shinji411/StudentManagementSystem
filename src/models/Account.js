import { ajax, ajaxPost } from "@/utils/ajax";
function checkIsLogin() {
  return ajax("/student/isLogin");
}
function login(un, pw) {
  return ajaxPost("/student/login", `name=${un}&password=${pw}`);
}
function logout() {}
function editPassword(password) {
  return ajaxPost("/student/changePassword", { password: password });
}
export default {
  checkIsLogin,
  login,
  logout,
  editPassword
};
