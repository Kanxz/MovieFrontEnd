<template>
  <div class="navbar">
    <div class="name">
      <el-tag>超级管理员</el-tag>
      {{ profile.username }}
    </div>
    <el-link :underline="false" class="logout" @click="logout"
      >退出登录</el-link
    >
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "HeaderView",
  setup() {
    const store = useStore();
    const router = useRouter();
    const { profile } = store.state.admin;
    // console.log(profile);

    const logout = () => {
      // console.log("logout");
      store.commit("admin/setAdmin", {});
      router.push("/login-admin");
    };

    return {
      profile,
      logout,
    };
  },
};
</script>

<style lang="less" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .name {
    margin-left: 770px;
    font-size: 16px;
  }
  .logout {
    margin-left: 80px;
    font-size: 16px;
  }
}
</style>