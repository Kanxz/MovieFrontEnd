<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="header-title">猜你喜欢</span>
        <el-button class="button" :icon="Refresh" @click="changePage">
          换一换
        </el-button>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="4" v-for="movie in movies" :key="movie.id">
        <router-link :to="'/movie-detail/' + movie.doubanId">
          <el-card
            shadow="hover"
            :style="{ cursor: 'pointer' }"
            :body-style="{ padding: '0px' }"
          >
            <el-image
              class="img-list"
              :src="movie.picUrl"
              referrerPolicy="no-referrer"
            />
            <el-link :underline="false">
              <div class="title">{{ movie.name }}</div>
            </el-link>

            <div class="title" v-if="movie.tags">
              {{ movie.tags }}
            </div>
            <div class="title" v-else>评分：{{ movie.score }}</div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { Refresh } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getRecommentMovies } from "@/api/recommend.js";
import { useStore } from "vuex";
export default {
  name: "RecommendIndex",
  setup() {
    const movies = ref();
    const store = useStore();
    const userID = store.state.user.profile.userID;
    let param = {
      userId: userID,
      pageNum: 1,
    };

    const getMovies = () => {
      getRecommentMovies(param).then((data) => {
        // console.log(data);
        movies.value = data.data.movieList;
      });
    };
    getMovies();

    const changePage = () => {
      if (param.pageNum === 1) param.pageNum = 2;
      else param.pageNum = 1;
      getMovies();
    };

    return {
      Refresh,
      movies,
      changePage,
    };
  },
};
</script>

<style scoped lang="less">
.box-card {
  width: 1100px;
  margin: 30px auto;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-right: 30px;
    // padding-left: 20px;
    .header-title {
      font-size: 22px;
    }
  }
  .title {
    margin: 0px 10px 5px 10px;
    text-align: center;
    white-space: nowrap; /*强制span不换行*/
    display: inline-block; /*将span当做块级元素对待*/
    width: 136px; /*限制宽度*/
    overflow: hidden; /*超出宽度部分隐藏*/
    text-overflow: ellipsis; /*超出部分以点号代替*/
  }
  .tags {
    margin: 0 auto;
  }
  .el-row {
    margin-bottom: 0;
  }
  .el-col {
    margin-bottom: 20px;
  }
  .img-list {
    width: 156px;
    height: 230px;
  }
}
</style>