import Utils from "@/utils/Ajax";
function checkIsLogin() {
  return Utils.ajax("/account/check");
}
function login(un, pw) {
  return Utils.ajaxPost("/account/login", `username=${un}&password=${pw}`);
}
function logout(){
  return Utils.ajax("/account/logout");
}
export default {
  checkIsLogin,
  login,
  logout
};
