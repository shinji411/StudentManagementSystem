function getLessonTimeArray(arr) {
  let d = [];
  for (const item of arr) {
    let w = item.week - 1;
    for (let i = item.lessons[0]; i <= item.lessons[1]; i++) {
      d.push([w, w + "_" + i]);
    }
  }
  return d;
}
function getTimeData() {
  let chinese = ["一", "二", "三", "四", "五", "六", "日"];
  let d = [];
  for (let index = 0; index < chinese.length; index++) {
    d.push({
      value: index,
      label: "周" + chinese[index],
      children: getLessonData(index)
    });
  }
  return d;
}
function getLessonData(i) {
  let d = [];
  for (let index = 1; index <= 12; index++) {
    d.push({
      value: i + "_" + index,
      label: "第" + index + "节"
    });
  }
  return d;
}
export default { getTimeData, getLessonTimeArray };
