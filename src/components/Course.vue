<template>
  <div>
    <el-button icon="el-icon-refresh-left" @click="getCourse">刷新列表</el-button>
    <el-select @change="changeWeek" v-model="week" placeholder="选择教学周">
      <el-option v-for="item in weeks" :key="item" :label="item == 0 ? '总课表' : `第${item}周`" :value="item + ''"></el-option>
    </el-select>
    <h3 class="section-title">我的课表</h3>
    <div class="course-table-container">
      <table class="course-table" v-loading="loading">
        <thead>
          <tr>
            <th style="width:9%;">节次/周次</th>
            <th v-for="w in course.week" :key="w">星期{{ course.weekChinese[w - 1] }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in course.lesson" :key="l">
            <th style="width:9%;">{{ l }}</th>
            <td v-for="d in course.showList[l - 1]" :class="{ 'course-active': d.span != 1 }" :rowspan="d.span" :key="d.id">
              <template v-if="d.span != 1">
                <el-popover placement="top-start" width="200" trigger="hover">
                  <div class="course-popover">
                    <div class="course-popover-code">{{ d.code }}</div>
                    <div class="course-popover-teacher">{{ d.teacher }}</div>
                    <div class="course-popover-name">{{ d.name }}</div>
                    <div class="course-popover-local">{{ d.local }}</div>
                    <div class="course-popover-weeks">
                      <template v-for="week in d.weeks">
                        <span class="course-popover-week" :key="week">{{ week }}</span>
                      </template>
                    </div>
                  </div>
                  <div slot="reference">
                    <div class="course-teacher">{{ d.teacher }}</div>
                    <div class="course-name">{{ d.name }}</div>
                    <div class="course-local">{{ d.local }}</div>
                  </div>
                </el-popover>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="section-title">详细信息</h3>
    <el-table :data="course.detail" border style="width: 100%" v-loading="loading">
      <el-table-column prop="code" label="代码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="credit" label="学分" width="50"></el-table-column>
      <el-table-column prop="classify" label="类别"></el-table-column>
      <el-table-column prop="local" label="上课地点"></el-table-column>
      <el-table-column prop="teacher.name" label="教师名称"></el-table-column>
      <el-table-column prop="teacher.title" label="教师职称"></el-table-column>
    </el-table>
  </div>
</template>
  </div>
</template>
<script>
import getCourseTable from "@/utils/courseTable";
import Course from "@/models/course";
export default {
  name: "course",
  data() {
    return {
      week: "0",
      loading: false,
      weeks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      course: {
        week: [1, 2, 3, 4, 5, 6, 7],
        lesson: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        weekChinese: ["一", "二", "三", "四", "五", "六", "日"],
        detail: [],
        showList: []
      }
    };
  },
  methods: {
    putCourseInfo(week) {
      let list = getCourseTable(this.course.detail, this.course.lesson.length, week);
      this.course.showList = list;
    },
    changeWeek(week) {
      if (week == 0) {
        this.putCourseInfo();
      } else {
        this.putCourseInfo(parseInt(week));
      }
    },
    getCourse() {
      this.loading = true;
      Course.getCourse()
        .then(data => {
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
          this.course.detail = d;
          this.putCourseInfo(this.week);
        })
        .catch(data => {
          this.$message({ type: "error", message: "获取课程列表失败，" + data.status });
        })
        .then(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.global.constant.title = "课程查询";
    this.getCourse();
  }
};
</script>
<style scoped>
.course-table-container {
  overflow: auto;
}
.course-table {
  width: 100%;
  border: 1px #eee solid;
  border-collapse: collapse;
  font-size: 14px;
  background-color: #fff;
  min-width: 800px;
}
.course-table td {
  color: #606266;
}
.course-table th {
  color: #909399;
  background-color: #fafafa;
  width: 13%;
}
.course-table td,
.course-table th {
  border-left: 1px #eee solid;
}
.course-table tr {
  border-top: 1px #eee solid;
  height: 30px;
}
.course-table tr th:first-child,
.course-table tr td:first-child {
  border: none;
}
.course-active {
  background-color: #2ecc71;
  color: #fff !important;
  text-align: center;
}
.course-teacher {
  color: #ebeaea;
  font-size: 13px;
}
.course-name {
  font-weight: 600;
}
.course-local {
  font-size: 12px;
}
.course-popover > *::before {
  color: #34495e;
  font-weight: 600;
}
.course-popover-code::before {
  content: "代码：";
}
.course-popover-teacher::before {
  content: "教师：";
}
.course-popover-name::before {
  content: "名称：";
}
.course-popover-local::before {
  content: "地点：";
}
.course-popover-weeks::before {
  content: "上课周：";
}
.course-popover-week::after {
  content: "、";
}
.course-popover-week:last-child::after {
  content: "";
}
</style>
