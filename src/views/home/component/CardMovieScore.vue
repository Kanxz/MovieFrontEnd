<template>
  <el-card class="box-card" shadow="always">
    <template #header>
      <div class="card-header">
        <span class="head">高分影视</span>
        <router-link to="/movie">
          <el-button class="button" type="text" @click="movieScore">
            查看更多
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </router-link>
      </div>
    </template>
    <el-row :gutter="20" v-loading="loading">
      <el-col :span="6" v-for="movie in movies" :key="movie.id">
        <router-link :to="'/movie-detail/' + movie.doubanId">
          <el-card
            shadow="always"
            :style="{ cursor: 'pointer' }"
            :body-style="{ padding: '0px' }"
          >
            <el-image
              class="home-img"
              :src="movie.picUrl"
              referrerPolicy="no-referrer"
            />
            <el-link :underline="false">
              <div class="title">{{ movie.name }}</div>
            </el-link>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { ArrowRight } from "@element-plus/icons-vue";
import { getHomeMovieScore } from "@/api/home.js";
import { ref } from "vue";
import store from "@/store";
export default {
  name: "CardMovieScore",
  components: {
    ArrowRight,
  },
  setup() {
    const loading = ref(true);
    const movies = ref(null);

    getHomeMovieScore().then((data) => {
      movies.value = data.data.movieList;
      loading.value = false;
    });

    const movieScore = () => {
      store.commit("category/changeSortField", "score");
      store.commit("category/changeSortMethod", "DESC");
    };
    return {
      movies,
      loading,
      movieScore,
    };
  },
};
</script>

<style scoped>
.title {
  margin: 20px;
  text-align: center;
  white-space: nowrap; /*强制span不换行*/
  display: inline-block; /*将span当做块级元素对待*/
  width: 203px; /*限制宽度*/
  overflow: hidden; /*超出宽度部分隐藏*/
  text-overflow: ellipsis; /*超出部分以点号代替*/
}
.head {
  font-size: 28px;
  font-weight: 400;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 1085px;
  margin: 20px auto;
}
.el-row {
  margin-bottom: 0;
}
.el-col {
  margin-bottom: 20px;
}
.home-img {
  width: 243px;
  height: 360px;
}
</style>