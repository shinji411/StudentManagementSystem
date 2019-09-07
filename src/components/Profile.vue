<template>
  <div>
    <h3 class="section-title">个人信息</h3>
    <el-button
      v-loading="editLoading"
      type="primary"
      :icon="canedit ? 'el-icon-edit' : 'el-icon-remove-outline'"
      @click="startEdit"
      v-if="!editmode"
      :disabled="!canedit"
    >
      <template v-if="canedit">
        编辑资料
      </template>
      <template v-else>
        待审核
      </template>
    </el-button>
    <template v-else>
      <el-button v-loading="editLoading" type="success" icon="el-icon-check" @click="finishEdit">完成编辑</el-button>
      <el-button v-loading="editLoading" type="danger" icon="el-icon-close" @click="cancelEdit" plain>取消编辑</el-button>
    </template>
    <el-button type="primary" icon="el-icon-edit-outline" @click="editLogin">修改登录信息</el-button>
    <table class="profile" cellspacing="0" v-loading="profile.loading">
      <tbody>
        <template v-for="(value, key) of profile">
          <tr v-if="key != 'loading'" :key="key">
            <th>{{name[key]}}</th>
            <td @click="edit(key)">
              <el-input @keydown.enter.native="editDone" v-if="clickEdit == key" v-model="editProfile[key]" :placeholder="name[value]"></el-input>
              <template v-else>
                <template v-if="key != 'studentId' && editProfile.edit && editProfile[key] != value">
                  <div class="profile-column">
                    <template v-for="item in distance(editProfile[key], value)">
                      <span :key="item.id + ''" v-if="item.type == 'add' || item.type == 'different'" class="profile-add">{{ item.word }}</span>
                      <span :key="item.id + ''" v-if="item.type == 'delete'" class="profile-delete">{{ item.word }}</span>
                      <span :key="item.id + ''" v-if="item.type == 'equal'" class="profile-equal">{{ item.word }}</span>
                    </template>
                  </div>
                </template>
                <template v-else>{{ value }}</template>
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <h3 class="section-title">奖惩记录</h3>
    <el-table stripe :data="reawrdData" border style="width: 100%" class="reward" v-loading="rewardLoading">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="detail" label="详细信息"></el-table-column>
    </el-table>
    <el-dialog title="修改登录信息" :visible.sync="dialogVisible" width="30%" v-loading="dialogLoading">
      <el-form ref="form" :rules="rules" :hide-required-asterisk="true" :model="form" label-width="80px">
        <el-form-item label="密码" prop="password">
          <el-input placeholder="密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input placeholder="再次输入密码" v-model="form.password2" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editLoginSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EditDistance from "@/utils/editDistance";
import Profile from "@/models/profile";
import Account from "@/models/account";
export default {
  name: "profile",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      profile: {
        name: "",
        studentId: "",
        college: "",
        major: "",
        classInfo: "",
        loading: false
      },
      //profile对应key的name
      name: {
        name: "姓名",
        studentId: "学号",
        college: "学院",
        major: "专业",
        classInfo: "行政班级"
      },
      editProfile: {
        edit: false,
        name: "",
        college: "",
        major: "",
        classInfo: ""
      },
      clickEdit: "",
      editmode: false,
      editLoading: false,
      canedit: true,
      dialogVisible: false,
      dialogLoading: false,
      form: {
        password: "",
        password2: ""
      },
      rules: {
        password: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      },
      reawrdData: [],
      rewardLoading: false
    };
  },
  methods: {
    edit(key) {
      if (!this.editmode || this.clickEdit != "") {
        return;
      }
      if (key == "studentId") {
        this.$message({ type: "error", message: "无法修改学号，请联系教务处工作人员修改" });
        return;
      }
      this.clickEdit = key;
    },
    editDone() {
      this.clickEdit = "";
    },
    startEdit() {
      this.$message({ type: "info", message: "点击想要编辑的文字即可开始" });
      this.editmode = true;
      this.editProfile.edit = true;
    },
    finishEdit() {
      if (this.clickEdit != "") {
        this.$message({ type: "warning", message: "请先完成当前编辑" });
        return;
      }
      let t = this.editProfile;
      this.editLoading = true;
      Profile.editProfile(t.name, this.profile.studentId, t.college, t.major, t.classInfo)
        .then(() => {
          this.$message({ type: "success", message: "提交成功，正在等待审核" });
          this.editmode = false;
          this.canedit = false;
        })
        .catch(data => {
          this.$message({ type: "error", message: "提交失败，" + data.status });
        })
        .then(() => {
          this.editLoading = false;
        });
    },
    editLogin() {
      this.dialogVisible = true;
    },
    editLoginSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        }
        this.dialogLoading = true;
        Account.editPassword(this.form.password)
          .then(() => {
            this.$message({ type: "success", message: "修改成功" });
            this.dialogVisible = false;
          })
          .catch(data => {
            this.$message({ type: "success", message: "修改失败：" + data.status });
          })
          .then(() => {
            this.dialogLoading = false;
          });
      });
    },
    cancelEdit() {
      this.editmode = false;
      this.editProfile.edit = false;
    },
    distance(str1, str2) {
      console.log(str1,str2);
      return EditDistance(str1, str2);
    },
    getProfile() {
      this.profile.loading = true;
      Profile.getProfile()
        .then(data => {
          for (const key in data) {
            if (this.profile.hasOwnProperty(key)) {
              const element = data[key];
              this.profile[key] = element;
            }
            if (key == "edit") {
              if (data[key] == null) {
                continue;
              }
              const element = data[key];
              for (const k in element) {
                if (this.editProfile.hasOwnProperty(k)) {
                  this.editProfile[k] = element[k];
                }
              }
              this.editProfile.edit = true;
              this.canedit = false;
            } else if (this.editProfile.hasOwnProperty(key)) {
              const element = data[key];
              this.editProfile[key] = element;
            }
          }
        })
        .catch(data => {
          this.$message({ type: "error", message: `获取个人资料失败，${data.status}` });
        })
        .then(() => {
          this.profile.loading = false;
        });
    },
    getReward() {
      this.rewardLoading = true;
      Profile.getReward()
        .then(data => {
          this.reawrdData = data;
        })
        .catch(data => {
          this.$message({ type: "error", message: `获取奖惩记录失败，${data.status}` });
        })
        .then(() => {
          this.rewardLoading = false;
        });
    }
  },
  mounted() {
    this.global.constant.title = "个人资料";
    this.getProfile();
    this.getReward();
  }
};
</script>
<style scoped>
.profile {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px #eee solid;
  margin: 10px 0 0 0;
}
.profile tr {
  border-top: 1px #eee solid;
  transition: all 0.25s;
  height: 45px;
}
.profile tr:nth-child(2n) {
  background-color: #fafafa;
}
.profile tr:hover {
  background-color: #f5f7fa;
}
.profile tr:hover .avatar {
  background-color: #fff;
}
.profile tr:first-child {
  border-top: none;
}
.profile th {
  width: 100px;
  text-align: right;
  color: #909399;
}
.profile th::after {
  content: ":";
}
.profile td {
  padding: 0 0 0 5px;
  color: #606266;
}
.avatar {
  width: 200px;
  border-left: 1px #eee solid;
  background-color: #fff;
}

.reward {
  margin: 10px 0 0 0;
}
</style>


