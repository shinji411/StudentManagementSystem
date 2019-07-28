function getCourseData() {
  let d = [
    {
      id: 0,
      // prettier-ignore
      weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
      time: [
        {
          week: 1,
          lessons: [1, 2]
        }
      ],
      name: "什么叫国际巨星",
      classify: "核心通识课程",
      local: "五指山 A101",
      credit: 2,
      code: "LX000001",
      teacher: {
        id: 0,
        name: "章金莱",
        title: "教授（特聘）"
      }
    },
    {
      id: 1,
      // prettier-ignore
      weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
      time: [
        {
          week: 1,
          lessons: [5, 7]
        }
      ],
      name: "手速与圈钱艺术",
      classify: "数学与自然科学基础课",
      local: "五指山 A120",
      credit: 5,
      code: "LX000002",
      teacher: {
        id: 1,
        name: "六小龄童",
        title: "教授（特聘）"
      }
    },
    {
      id: 2,
      // prettier-ignore
      weeks: [1,2,3,4],
      week: 3,
      time: [
        {
          week: 3,
          lessons: [1, 4]
        }
      ],
      name: "乱编与胡说指南",
      classify: "数学与自然科学基础课",
      local: "五指山 A120",
      credit: 4,
      code: "LX000003",
      teacher: {
        id: 2,
        name: "章承恩",
        title: "副教授"
      }
    },
    {
      id: 3,
      // prettier-ignore
      weeks: [1,2,3,4],
      time: [
        {
          week: 3,
          lessons: [5, 6]
        }
      ],
      name: "不一样的西游文化",
      classify: "学院要求课",
      local: "花果山 B110",
      credit: 6,
      code: "LX000004",
      teacher: {
        id: 3,
        name: "六耳猕猴",
        title: "讲师"
      }
    },
    {
      id: 4,
      // prettier-ignore
      weeks: [3,5,6],
      week: 4,
      time: [
        {
          week: 4,
          lessons: [1, 2]
        },
        {
          week: 5,
          lessons: [3, 4]
        }
      ],
      name: "灵堂卖片",
      classify: "集中实践教学",
      local: "天庭B2-443",
      credit: 2,
      code: "LX000005",
      teacher: {
        id: 0,
        name: "章金莱",
        title: "教授（特聘）"
      }
    }
  ];
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
export default {
  getCourseData,
  getTimeData
};
