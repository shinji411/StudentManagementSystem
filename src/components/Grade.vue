<template>
  <div>
    <h3 class="section-title">成绩总表</h3>
    <el-table :data="totalData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="credit" label="已获学分"></el-table-column>
      <el-table-column prop="grade" label="平均分"></el-table-column>
      <el-table-column prop="gpa" label="平均绩点"></el-table-column>
    </el-table>
    <h3 class="section-title">详细成绩</h3>
    <el-table :data="gradeData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="code" label="课程代码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="credit" label="学分" width="50"></el-table-column>
      <el-table-column prop="classify" label="类别"></el-table-column>
      <el-table-column prop="teacherName" label="教师名称"></el-table-column>
      <el-table-column prop="grade" label="总评成绩"></el-table-column>
      <el-table-column prop="point" label="绩点"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import Grade from "@/models/grade";
export default {
  name: "course",
  data() {
    return {
      loading: false,
      totalData: [
        {
          credit: 0,
          grade: 0,
          gpa: 0
        }
      ],
      gradeData: []
    };
  },
  watch: {
    gradeData() {
      this.calcTotal();
    }
  },
  methods: {
    calcTotal() {
      if (this.gradeData.length == 0) {
        return;
      }
      this.totalData[0].credit = 0;
      let tempGrade = 0,
        length = 0,
        tempGP = 0;
      for (const item of this.gradeData) {
        this.totalData[0].credit += item.credit;
        tempGrade += item.grade;
        tempGP += item.point;
        length++;
      }
      this.totalData[0].grade = (tempGrade / length).toFixed(1);
      this.totalData[0].gpa = (tempGP / length).toFixed(1);
    },
    getGrade() {
      this.loading = true;
      Grade.getGrade()
        .then(data => {
          this.gradeData = data;
          this.calcTotal();
        })
        .catch(data => {
          this.$message({ type: "error", message: "获取成绩信息失败，" + data.status });
        })
        .then(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.global.constant.title = "成绩查询";
    this.getGrade();
  }
};
</script>