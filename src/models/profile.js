import { ajax, ajaxPost } from "@/utils/ajax";
function getProfile() {
  return ajax(`/student/get`);
}
function getReward(studentId) {
  return !studentId ? ajax(`/student/getRecord`) : ajax(`/admin/getRecord?studentId=${studentId}`);
}
function editProfile(name, studentId, college, major, classInfo) {
  return ajaxPost(`/student/changeProfile`, {
    name: name,
    studentId: studentId,
    college: college,
    major: major,
    classInfo: classInfo
  });
}
function addReward(id, recordDate, content) {
  return ajaxPost("/admin/addRecord", {
    studentId:id,
    recodeDate: recordDate,
    content: content
  });
}
function deleteRecord(id) {
  return ajax(`/admin/deleteRecord?recordId=${id}`);
}
function getAudit() {
  return ajax(`/admin/getAudit`);
}
function confirmUpdate(studentId) {
  return ajax(`/admin/confirmUpdate?studentId=${studentId}`);
}
function undoUpdate(studentId) {
  return ajax(`/admin/undoUpdate?studentId=${studentId}`);
}
export default { getProfile, getReward, editProfile, addReward, deleteRecord, getAudit, confirmUpdate, undoUpdate };
