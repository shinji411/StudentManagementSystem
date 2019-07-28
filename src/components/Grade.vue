<template>
  <div>
    <h3 class="section-title">成绩总表</h3>
    <el-table :data="totalData" border style="width: 100%">
      <el-table-column prop="credit" label="已获学分"></el-table-column>
      <el-table-column prop="grade" label="平均分"></el-table-column>
      <el-table-column prop="gpa" label="平均绩点"></el-table-column>
    </el-table>
    <h3 class="section-title">详细成绩</h3>
    <el-table :data="gradeData" border style="width: 100%">
      <el-table-column prop="code" label="课程代码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="credit" label="学分" width="50"></el-table-column>
      <el-table-column prop="classify" label="类别"></el-table-column>
      <el-table-column prop="teacher" label="教师名称"></el-table-column>
      <el-table-column prop="grade.usual" label="平时成绩"></el-table-column>
      <el-table-column prop="grade.final" label="总评成绩"></el-table-column>
      <el-table-column prop="grade.gp" label="绩点"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "course",
  data() {
    return {
      totalData: [
        {
          credit: 0,
          grade: 0,
            gpa:0
        }
      ],
      gradeData: [
        {
          id: 0,
          name: "什么叫国际巨星",
          classify: "核心通识课程",
          credit: 2,
          code: "LX000001",
          teacher: "章金莱",
          grade: {
            usual: 66,
            final: 65,
            gp:1.8
          }
        },
        {
          id: 1,
          name: "手速与圈钱艺术",
          classify: "数学与自然科学基础课",
          credit: 5,
          code: "LX000002",
          teacher: "六小龄童",
          grade: {
            usual: 77,
            final: 33,
            gp:0
          }
        },
        {
          id: 2,
          name: "乱编与胡说指南",
          classify: "数学与自然科学基础课",
          credit: 4,
          code: "LX000003",
          teacher: "章承恩",
          grade: {
            usual: 45,
            final: 66,
            gp:1.9
          }
        },
        {
          id: 3,
          name: "不一样的西游文化",
          classify: "学院要求课",
          credit: 6,
          code: "LX000004",
          teacher: "六耳猕猴",
          grade: {
            usual: 85,
            final: 85,
            gp:4
          }
        },
        {
          id: 4,
          name: "灵堂卖片",
          classify: "集中实践教学",
          credit: 2,
          code: "LX000005",
          teacher: "章金莱",
          grade: {
            usual: 75,
            final: 65,
            gp:1.8
          }
        }
      ]
    };
  },
  methods: {
    calcTotal() {
      this.totalData[0].credit = 0;
      let tempGrade = 0,
        length = 0,
        tempGP = 0;
      for (const item of this.gradeData) {
        this.totalData[0].credit += item.credit;
        tempGrade += item.grade.final;
        tempGP += item.grade.gp;
        length++;
      }
      this.totalData[0].grade = (tempGrade / length).toFixed(1);
      this.totalData[0].gpa = (tempGP / length).toFixed(1);
    }
  },
  mounted() {
    this.global.constant.title = "成绩查询";
    this.calcTotal();
  }
};
</script>
<style scoped>
</style>
