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
export default {
  getLessonTimeArray
};
