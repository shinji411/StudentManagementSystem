import { ajax, ajaxPost } from "@/utils/ajax";
function getGrade(studentId) {
  return !studentId ? ajax(`/student/getGrade`) : ajax(`/admin/getGrade?studentId=${studentId}`);
}
function setGrade(grade, studentId, courseId) {
  return ajaxPost(`/admin/setGrade`, {
    grade: grade,
    point: getPoint(grade),
    studentId: studentId,
    courseId: courseId
  });
}

function getPoint(grade) {
  if (grade >= 85) {
    return 4;
  } else if (grade < 60) {
    return 0;
  }
  return (grade - 59.5 * 0.16).toFixed(1);
}
export default { getGrade, setGrade, getPoint };
