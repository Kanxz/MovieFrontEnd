<template>
  <header class="app-header">
    <el-row>
      <el-col :span="8">
        <el-row
          ><el-col :span="6">
            <RouterLink to="/">
              <img
                src="../assets/images/logo.png"
                height="50"
                width="120"
              /> </RouterLink
          ></el-col>
          <el-col :span="6"> <a href="#" class="first text">首页</a> </el-col>
          <el-col :span="5">
            <router-link to="/movie" class="text" @click="filterStart">
              分类
            </router-link>
          </el-col>
          <el-col :span="7">
            <router-link to="/recommend" class="text"> 猜你喜欢 </router-link>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-input
          v-model="input"
          size="large"
          placeholder="请输入要搜索的影视名"
          @keyup.enter="searchByTitle"
          clearable
        >
          <template #append>
            <el-button :icon="Search" size="large" @click="searchByTitle" />
          </template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="7"></el-col>
          <el-col :span="7"></el-col>
          <template v-if="profile.token">
            <el-col :span="5">
              <router-link to="/user-info">
                <a class="text">
                  {{ profile.username }}
                </a>
              </router-link>
            </el-col>
            <el-col :span="5">
              <a href="javascript:;" class="text" @click="logout">退出登录</a>
            </el-col>
          </template>
          <template v-else>
            <el-col :span="5">
              <router-link to="/login" class="text">登录</router-link>
            </el-col>
            <el-col :span="5">
              <router-link to="/register" class="text">注册</router-link>
            </el-col>
          </template>
        </el-row>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { searchByName } from "@/api/search";
import { ElMessage } from "element-plus";

export default {
  name: "AppHeader",
  setup() {
    const input = ref("");
    const store = useStore();
    const router = useRouter();
    const profile = computed(() => {
      return store.state.user.profile;
    });

    const searchByTitle = () => {
      let str = input.value;
      input.value = str.trim();
      if (input.value === "") {
        ElMessage({
          message: "搜索内容不能为空",
          showClose: true,
          type: "warning",
        });
        return null;
      }
      router.push("/movie/search");
      // console.log(input.value);
      searchByName(input.value).then((data) => {
        store.commit("query/setQuery", {
          query: input.value,
          total: data.data.length,
          movies: data.data,
        });
        // console.log("commit");
      });
    };

    const filterStart = () => {
      store.commit("category/changeSortField", null);
      store.commit("category/changeSortMethod", null);
    };

    const logout = () => {
      store.commit("user/setUser", {});
      router.push("/login");
    };

    return {
      input,
      Search,
      profile,
      filterStart,
      logout,
      searchByTitle,
    };
  },
};
</script>

<style scoped lang='less'>
.app-header {
  background: #fff;
  height: 64px;
  padding: 12px 24px;
  .el-col {
    .first {
      margin-left: 20px;
    }
    .text {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
      margin-top: 3px;
      &:hover {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
  }
}
.icon-avatar {
  margin-top: 5px;
}
</style>