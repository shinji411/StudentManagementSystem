import { ajax, ajaxPost } from "@/utils/ajax";
function getList() {
  return ajax(`/admin/get`);
}
function addStudent(name, studentId, college, major, classInfo, password) {
  return ajaxPost(`/admin/addStudent`, {
    name: name,
    studentId: studentId,
    college: college,
    major: major,
    classInfo: classInfo,
    password: password
  });
}
function resetPassword(studentId, password) {
  return ajaxPost(`/admin/changePassword`, {
    studentId: studentId,
    password: password
  });
}
function deleteSudent(studentId) {
  return ajax(`/admin/deleteStudent?studentId=${studentId}`);
}
function editStudentProfile(id, name, studentId, college, major, classInfo) {
  return ajaxPost(`/admin/addStudent`, {
    name: name,
    studentId: studentId,
    college: college,
    major: major,
    classInfo: classInfo,
    id: id
  });
}
export default { getList, addStudent, deleteSudent, editStudentProfile, resetPassword };
