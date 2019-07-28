<template>
  <div>
    <el-button icon="el-icon-refresh-left" @click="refreshList">刷新列表</el-button>
    <el-input v-model="search.studentID" class="search" prefix-icon="el-icon-search" placeholder="搜索学号"></el-input>
    <el-table border :data="studentData" stripe style="width: 100%;margin-top:10px;">
      <el-table-column prop="studentID" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名" class="profile-column">
        <template slot-scope="scope">
          <div class="profile-column">
            <template v-for="item in distance(scope.row.edit.name,scope.row.name)">
              <span :key="item.id+''" v-if="item.type=='add' || item.type=='different'" class="profile-add">{{item.word}}</span>
              <span :key="item.id+''" v-if="item.type=='delete'" class="profile-delete">{{item.word}}</span>
              <span :key="item.id+''" v-if="item.type=='equal'" class="profile-equal">{{item.word}}</span>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="faculty" label="学院">
        <template slot-scope="scope">
          <div class="profile-column">
            <template v-for="item in distance(scope.row.edit.faculty,scope.row.faculty)">
              <span :key="item.id+''" v-if="item.type=='add' || item.type=='different'" class="profile-add">{{item.word}}</span>
              <span :key="item.id+''" v-if="item.type=='delete'" class="profile-delete">{{item.word}}</span>
              <span :key="item.id+''" v-if="item.type=='equal'" class="profile-equal">{{item.word}}</span>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="major" label="专业">
        <template slot-scope="scope">
          <div class="profile-column">
            <template v-for="item in distance(scope.row.edit.major,scope.row.major)">
              <span :key="item.id+''" v-if="item.type=='add' || item.type=='different'" class="profile-add">{{item.word}}</span>
              <span :key="item.id+''" v-if="item.type=='delete'" class="profile-delete">{{item.word}}</span>
              <span :key="item.id+''" v-if="item.type=='equal'" class="profile-equal">{{item.word}}</span>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="class" label="行政班级">
        <template slot-scope="scope">
          <div class="profile-column">
            <template v-for="item in distance(scope.row.edit.class,scope.row.class)">
              <span :key="item.id+''" v-if="item.type=='add' || item.type=='different'" class="profile-add">{{item.word}}</span>
              <span :key="item.id+''" v-if="item.type=='delete'" class="profile-delete">{{item.word}}</span>
              <span :key="item.id+''" v-if="item.type=='equal'" class="profile-equal">{{item.word}}</span>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="confirmSubmit(scope.row)" size="mini">确认</el-button>
          <el-button @click="voteSubmit(scope.row)" type="danger" size="mini">否决</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" background layout="prev, pager, next,jumper" :total="page.total" :current-page="page.now" :page-size="30" @current-change="changePage"></el-pagination>
  </div>
</template>
<script>
import editDistance from "@/utils/EditDistance";
export default {
  name: "review",
  data() {
    return {
      search: {
        studentID: ""
      },
      studentData: [
        {
          id: 0,
          name: "马云",
          studentID: 200000000,
          faculty: "资本主义学院",
          major: "川剧变脸学",
          class: "20189999",
          edit: {
            name: "马爸爸",
            faculty: "资本主义",
            major: "剥削学",
            class: "2018799979"
          }
        }
      ],
      page: {
        now: 1,
        total: 1000
      }
    };
  },
  methods: {
    refreshList() {
        editDistance("资本主义", "学院")
    },
    confirmSubmit(item) {},
    voteSubmit(item) {},
    changePage() {},
    distance(str1, str2) {
      return editDistance(str1, str2);
     //return [];
    }
  },
  mounted() {
    this.global.constant.title = "信息审核";
  }
};
</script>
<style scoped>
.pagination {
  text-align: right;
  margin-top: 5px;
}
.search {
  width: 200px;
  margin: 0 10px;
}
</style>
