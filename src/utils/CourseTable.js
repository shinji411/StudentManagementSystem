function getCourseTable(detail, lessonLength, week) {
  let list = [[], [], [], [], [], [], []];
  let len = [0, 0, 0, 0, 0, 0, 0];
  let key = 0;
  for (const item of detail) {
    if (
      week &&
      JSON.stringify(item.weeks)
        .replace("]", ",]")
        .indexOf(`${week},`) == -1
    ) {
      continue;
    }
    for (const time of item.time) {
      let index = 0;
      for (; index < list[time.week - 1].length; index++) {
        const element = list[time.week - 1][index];
        if (element.start > time.lessons[time.lessons.length - 1]) {
          break;
        }
      }
      let l = time.lessons[time.lessons.length - 1] - time.lessons[0] + 1;
      len[time.week - 1] += l;
      list[time.week - 1].splice(index, 0, {
        id: key++,
        name: item.name,
        span: l,
        start: time.lessons[0],
        end: time.lessons[time.lessons.length - 1],
        local: item.local,
        teacher: item.teacher.name,
        weeks: item.weeks,
        code: item.code
      });
    }
  }
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    let before = 1;
    let p = 0;
    for (let i = 0; i + p < element.length; i++) {
      const s = element[i + p];
      for (let c = before; c < s.start; c++) {
        list[index].splice(i + p, 0, {
          id: key++,
          name: "",
          start: c,
          end: c,
          span: 1
        });
        len[index]++;
        p++;
      }
      before = s.end + 1;
    }
    for (let i = len[index]; i < lessonLength; i++) {
      list[index].push({
        id: key++,
        name: "",
        start: i + 1,
        end: i + 1,
        span: 1
      });
      len[index]++;
    }
  }
  return c2r(list, lessonLength);
}
function c2r(list, length) {
  let temp = [];
  for (let i = 0; i < length; i++) {
    temp.push([]);
  }
  for (let i = 0; i < list.length; i++) {
    for (let c = 0; c < list[i].length; c++) {
      temp[list[i][c].start - 1].push(list[i][c]);
    }
  }
  return temp;
}
export default getCourseTable;
