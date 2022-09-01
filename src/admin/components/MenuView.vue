<template>
  <div class="menu-title">后台管理</div>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="menu"
    default-active="/admin/movie"
    text-color="#fff"
    router
  >
    <el-menu-item index="/admin/movie">
      <div class="box"></div>
      <el-icon><Camera /></el-icon>
      <span>影视管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/user" :disabled="hasAuthority">
      <div class="box"></div>
      <el-icon><User /></el-icon>
      <span>人员管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/comment">
      <div class="box"></div>
      <el-icon><ChatDotSquare /></el-icon>
      <span>评论管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/system">
      <div class="box"></div>
      <el-icon><Cpu /></el-icon>
      <span>系统管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { User, Camera, ChatDotSquare, Cpu } from "@element-plus/icons-vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { getAuthority } from "@/api/backend/admin";
export default {
  name: "MenuView",
  components: { User, Camera, ChatDotSquare, Cpu },
  setup() {
    const hasAuthority = ref(true);
    const store = useStore();
    const { profile } = store.state.admin;

    getAuthority(profile.userID).then((data) => {
      // console.log(data);
      let list = [];
      if (data.data != null) {
        list = data.data;
        // console.log(list.value);
        hasAuthority.value = !list.includes("super_admin");
        // console.log(hasAuthority.value);
      }
    });

    return {
      hasAuthority,
    };
  },
};
</script>

<style lang="less" scoped>
.menu-title {
  color: #fff;
  font-size: 22px;
  padding-left: 65px;
  padding-top: 40px;
  padding-bottom: 40px;
}
.menu {
  border-right-color: #545c64;
  .box {
    width: 10px;
  }
}
</style>