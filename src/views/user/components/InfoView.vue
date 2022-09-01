<template>
  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span>个人信息</span>
      </div>
    </template>
    <div v-if="userInfo" class="user-info">
      <el-row :gutter="20">
        <el-col :span="12" class="detail-col">
          <div class="detail-item">
            <div class="detail-title">账号名：</div>
            <div class="detail-context">{{ userInfo.username }}</div>
          </div>
        </el-col>
        <el-col :span="12" class="detail-col">
          <div class="detail-item">
            <div class="detail-title">邮箱：</div>
            <div class="detail-context">{{ userInfo.email }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" class="detail-col">
          <div class="detail-item">
            <div class="detail-title">年龄：</div>
            <div class="detail-context">{{ userInfo.age }}</div>
          </div>
        </el-col>
        <el-col :span="12" class="detail-col">
          <div class="detail-item">
            <div class="detail-title">性别：</div>
            <div class="detail-context">{{ userInfo.gender }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { getUsetById } from "@/api/user.js";
export default {
  name: "InfoView",
  setup() {
    const store = useStore();
    const userId = store.state.user.profile.userID;
    const userInfo = ref(null);

    getUsetById(userId).then((data) => {
      // console.log(data.data);
      userInfo.value = data.data;
    });

    // console.log(userInfo);
    return {
      userInfo,
    };
  },
};
</script>

<style scoped lang="less">
.box-card {
  height: 250px;
  .card-header {
    font-size: 23px;
    color: #047eff;
  }
  .user-info {
    padding-left: 40px;
    .detail-col {
      margin-top: 10px;
      margin-bottom: 10px;
      height: 30px;
    }
    .detail-item {
      margin: 20px 0;
      display: flex;
      font-size: 18px;
      height: 25px;
    }
    .detail-title {
      color: darkgrey;
    }
    .detail-context {
      margin-left: 10px;
    }
  }
}
</style>