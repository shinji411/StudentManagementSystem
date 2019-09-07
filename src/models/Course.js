import { ajax, ajaxPost } from "@/utils/ajax";
function getCourse(isAdmin) {
  return !isAdmin ? ajax("/student/getCourse") : ajax("/student/getCourse");
}
function addCourse(name, code, classify, credit, local, teacherName, teacherTitle, weeks, days) {
  return ajaxPost("/admin/addCourse", {
    name: name,
    code: code,
    classify: classify,
    credit: credit,
    teacherName: teacherName,
    teacherTitle: teacherTitle,
    local: local,
    weeks: parserWeeks(weeks),
    days: parserDays(days)
  });
}
function deleteCourse(id) {
  return ajax(`/admin/deleteCourse?id=${id}`);
}
function editCourse(id, name, code, classify, credit, local, teacherName, teacherTitle, weeks, days) {
  return ajaxPost("/admin/changeCourse", {
    id: id,
    name: name,
    code: code,
    classify: classify,
    credit: credit,
    teacherName: teacherName,
    teacherTitle: teacherTitle,
    local: local,
    weeks: parserWeeks(weeks),
    days: parserDays(days)
  });
}
function getTimeData() {
  let chinese = ["一", "二", "三", "四", "五", "六", "日"];
  let d = [];
  for (let index = 0; index < chinese.length; index++) {
    d.push({
      value: index + 1,
      label: "周" + chinese[index],
      children: getLessonData(index)
    });
  }
  return d;
}
function getLessonData(i) {
  let d = [];
  for (let index = 1; index <= 8; index++) {
    d.push({
      value: i + "_" + index,
      label: "第" + index + "节"
    });
  }
  return d;
}
function parserWeeks(arr) {
  let str = "";
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    index + 1 == arr.length ? (str += element) : (str += element + ",");
  }
  return str;
}

function parserDays(arr) {
  let str = "";
  let tempW = 0;
  let tempD = 0;
  let keep = 0;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    let t = element[0];
    let a = element[1].split("_");
    if (tempD == 0) {
      keep = 0;
      tempW = t;
      tempD = parseInt(a[1]);
    } else if (tempW != t) {
      str += `${tempW}${tempD}${tempD + keep},`;
      keep = 0;
      tempW = t;
      tempD = parseInt(a[1]);
    } else if (parseInt(a[1]) - keep - 1 == tempD) {
      keep++;
    } else {
      str += `${tempW}${tempD}${tempD + keep},`;
      keep = 0;
      tempW = t;
      tempD = parseInt(a[1]);
    }
  }
  if (tempD != 0) {
    str += `${tempW}${tempD}${tempD + keep}`;
  }
  return str;
}
export default { getCourse, addCourse, editCourse, deleteCourse, getTimeData };
