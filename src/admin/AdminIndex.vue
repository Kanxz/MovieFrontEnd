<template>
  <el-container class="app-content">
    <el-aside width="250px" class="sidebar">
      <MenuView />
    </el-aside>
    <el-container class="app-container">
      <el-header class="app-header">
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuView from "./components/MenuView.vue";
import Header from "./components/HeaderView.vue";
export default {
  name: "AdminIndex",
  components: {
    MenuView,
    Header,
  },
};
</script>

<style scoped lang='less'>
.app-content {
  height: 100vh;
  width: 100%;
  .sidebar {
    background-color: #545c64;
  }
  .app-container {
    width: calc(100% - 200px);
    .app-header {
      padding: 0;
    }
  }
}
</style>