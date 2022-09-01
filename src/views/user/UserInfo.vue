<template>
  <div class="container">
    <el-container>
      <el-container>
        <el-aside class="aside"><user-menu /></el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import UserMenu from "./components/UserMenu.vue";
export default {
  components: { UserMenu },
  name: "UserInfo",
  setup() {
    return {};
  },
};
</script>

<style scoped lang="less">
.container {
  margin: 0 150px 0 150px;
  .aside {
    width: 200px;
    margin-top: 20px;
  }
  .main {
    padding-right: 150px;
    padding-bottom: 0;
  }
}
</style>
