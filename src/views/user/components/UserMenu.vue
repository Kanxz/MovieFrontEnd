<template>
  <div class="title">个人中心</div>
  <el-menu :default-active="this.$route.path" class="menu" router>
    <el-menu-item index="/user-info" class="item">
      <div class="box"></div>
      <el-icon><Document /></el-icon>
      <span>个人信息</span>
    </el-menu-item>
    <el-menu-item index="/user-info/edit" class="item">
      <div class="box"></div>
      <el-icon><Edit /></el-icon>
      <span>修改信息</span>
    </el-menu-item>
    <el-menu-item index="/user-info/comment" class="item">
      <div class="box"></div>
      <el-icon><ChatLineRound /></el-icon>
      <span>管理评论</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { Document, Edit, ChatLineRound } from "@element-plus/icons-vue";
export default {
  name: "UserMenu",
  components: {
    Document,
    Edit,
    ChatLineRound,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped lang="less">
.title {
  font-size: 22px;
  color: #87878d;
  padding-top: 30px;
  padding-left: 51px;
  height: 90px;
  background-color: #fff;
}
.menu {
  border-right-color: #fff;
  height: 57vh;
  .box {
    width: 28px;
  }
  .item {
    padding-left: 30px;
  }
}
</style>