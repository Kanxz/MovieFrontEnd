<template>
  <div class="login-app">
    <div class="head-text">
      <RouterLink to="/">
        <img src="../../assets/images/logo.png" height="80" width="220" />
      </RouterLink>
      <div class="text">欢迎管理员登录</div>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
    <el-card class="box-card">
      <div class="title">管理员登录</div>
      <el-divider />
      <el-input
        class="input-text"
        size="large"
        v-model="admin.username"
        placeholder="用户名"
        :prefix-icon="Avatar"
      />
      <el-input
        class="input-text"
        size="large"
        type="password"
        show-password
        v-model="admin.password"
        placeholder="密码"
        :prefix-icon="Lock"
        @keyup.enter="submit"
      />
      <el-button class="input-text button-text" type="primary" @click="submit"
        >登录</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { Avatar, Lock } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { adminLogin } from "@/api/backend/admin";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default {
  name: "AdminLogin",
  setup() {
    const admin = reactive({
      username: "",
      password: "",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const login = () => {
      if (admin.username === "" || admin.password === "") {
        ElMessage({
          showClose: true,
          message: "用户名密码不能为空！",
          type: "error",
        });
        return;
      }
      adminLogin(admin).then((data) => {
        // console.log(data);
        if (data.code === 200) {
          // 存储用户信息
          const { userID, username, token } = data.data;
          store.commit("admin/setAdmin", { userID, username, token });
          // 跳转
          router.push(route.query.redirectUrl || "/admin");
          // 消息提示
          ElMessage({
            showClose: true,
            message: "登录成功！",
            type: "success",
          });
        } else {
          ElMessage({
            showClose: true,
            message: data.message,
            type: "error",
          });
        }
      });
    };

    const submit = () => {
      login();
    };

    return {
      Avatar,
      Lock,
      login,
      admin,
      submit,
    };
  },
};
</script>

<style scoped lang="less">
.login-app {
  height: 100%;
  padding: 30px;
  background-image: url("https://s1.ax1x.com/2022/05/05/OeVMUe.jpg");
  background-size: 100%;
  .head-text {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    .text {
      font-size: 18px;
      font-weight: normal;
      margin-top: 40px;
      margin-left: 10px;
      color: #666;
    }
    .entry {
      width: 120px;
      margin-top: 40px;
      margin-left: 500px;
      font-size: 16px;
      i {
        font-size: 14px;
        color: @xtxColor;
        letter-spacing: -5px;
      }
    }
  }
  .box-card {
    height: 450px;
    width: 430px;
    padding: 20px;
    border-radius: 10px;
    margin: 30px auto 65px auto;
    .title {
      font-size: 23px;
      color: @xtxColor;
    }
    .input-text {
      width: 280px;
      height: 50px;
      margin: 18px 30px;
    }
    .rem-text {
      margin-left: 35px;
    }
    .logon-text {
      margin-left: 75px;
      margin-top: 6px;
    }
    .button-text {
      font-size: 18px;
    }
  }
}
</style>