<template>
  <div class="index">
    <div class="title">
      搜索“
      <div class="query">
        {{ query }}
      </div>
      ”共找到“
      <div class="query">
        {{ total }}
      </div>
      ”个资源
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="movie in movies" :key="movie.id">
        <router-link :to="'/movie-detail/' + movie.doubanId">
          <el-card
            shadow="hover"
            :style="{ cursor: 'pointer' }"
            :body-style="{ padding: '0px' }"
            class="card"
          >
            <el-image
              class="img-list"
              :src="movie.picUrl"
              referrerPolicy="no-referrer"
            />
            <el-link :underline="false">
              <div class="movie-text">{{ movie.name }}</div>
            </el-link>

            <div class="movie-text">评分：{{ movie.score }}</div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "SearchIndex",
  setup() {
    const store = useStore();
    const query = ref();
    const total = ref();
    const movies = ref([]);
    total.value = store.state.query.profile.total;
    movies.value = store.state.query.profile.movies;
    query.value = store.state.query.profile.query;
    watch(
      () => store.state.query.profile.query,
      () => {
        total.value = store.state.query.profile.total;
        movies.value = store.state.query.profile.movies;
        query.value = store.state.query.profile.query;
      }
    );

    return {
      query,
      total,
      movies,
      // searchFn,
    };
  },
};
</script>

<style scoped lang="less">
.index {
  width: 1100px;
  background: #fff;
  padding: 0 25px 30px 25px;
  margin: 20px auto;
  .title {
    display: flex;
    padding: 30px;
    font-size: 18px;
    .query {
      color: #4c8fe8;
    }
  }
  .img-list {
    height: 350px;
    width: 245px;
  }
  .card {
    margin-bottom: 20px;
  }
  .movie-text {
    font-size: 15px;
    margin: 0px 30px 5px 30px;
    text-align: center;
    white-space: nowrap; /*强制span不换行*/
    display: inline-block; /*将span当做块级元素对待*/
    width: 185px; /*限制宽度*/
    overflow: hidden; /*超出宽度部分隐藏*/
    text-overflow: ellipsis; /*超出部分以点号代替*/
  }
}
</style>