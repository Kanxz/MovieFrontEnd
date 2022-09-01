<template>
  <el-row :gutter="20" v-infinite-scroll="load" infinite-scroll-disabled="busy">
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

          <div class="title">评分：{{ movie.score }}</div>
        </el-card>
      </router-link>
    </el-col>
  </el-row>
  <el-empty
    class="empty"
    image="https://s1.ax1x.com/2022/04/30/OSjJQe.gif"
    description="加载中"
    v-if="movieLoading === true"
  />
  <el-empty
    v-if="movieFinished === true"
    class="empty"
    description="到底了 /(ㄒoㄒ)/~~"
  />
</template>

<script>
import { ref, watch } from "vue";
import { getCategoryMovies } from "@/api/category.js";
import { useStore } from "vuex";
import store from "@/store";

export default {
  name: "MovieList",
  setup() {
    const movieLoading = ref(false);
    const movieFinished = ref(false);
    const busy = ref(false);
    const pages = ref(100);
    const movies = ref([]);
    // store.state.category.sortField = null;
    // store.state.category.sortMethod = null;
    store.state.category.selectedTag = "全部";
    store.state.category.selectedLan = "全部";
    const reqParams = {
      page: 1,
      pageSize: 18,
      sortField: store.state.category.sortField, // sortField ====> releaseTime, score
      sortMethod: store.state.category.sortMethod, // sortMethod ====> ASC为正序 DESC为倒序
      selectedTag: "全部",
      selectedLan: "全部",
    };
    let keyMap = ref({});
    const category = useStore();
    watch(
      [
        () => store.state.category.sortField,
        () => store.state.category.sortMethod,
        () => store.state.category.selectedTag,
        () => store.state.category.selectedLan,
      ],
      (newVal) => {
        movies.value = [];
        pages.value = 100;
        movieLoading.value = true;
        movieFinished.value = false;
        busy.value = false;
        keyMap = ref({});
        reqParams.page = 1;
        reqParams.sortField = newVal[0];
        reqParams.sortMethod = newVal[1];
        reqParams.selectedTag = newVal[2];
        reqParams.selectedLan = newVal[3];
      }
    );

    const load = () => {
      // console.log("keyMap--" + reqParams.page + "--" + keyMap[reqParams.page]);
      if (keyMap[reqParams.page]) return;
      // console.log("load---" + reqParams.page);
      if (reqParams.page === 1) {
        movies.value = [];
        pages.value = 100;
      }
      if (reqParams.page <= pages.value) {
        keyMap[reqParams.page] = true;
        busy.value = true;
        movieFinished.value = false;
        movieLoading.value = true;
        getCategoryMovies(reqParams).then((data) => {
          reqParams.page++;
          pages.value = data.data.pages;
          movies.value.push(...data.data.movieList);
          busy.value = false;
          movieLoading.value = false;
          movieFinished.value = true;
        });
      }
      // console.log(reqParams.page + "---" + pages.value);
      if (reqParams.page > pages.value) {
        movieFinished.value = true;
        busy.value = true;
        movieLoading.value = false;
        // console.log("load---" + reqParams.page + "--finished");
      }
    };
    return {
      movieLoading,
      movieFinished,
      load,
      movies,
      reqParams,
      category,
      busy,
    };
  },
};
</script>

<style scoped>
.title {
  margin: 0px 10px 5px 10px;
  text-align: center;
  white-space: nowrap; /*强制span不换行*/
  display: inline-block; /*将span当做块级元素对待*/
  width: 136px; /*限制宽度*/
  overflow: hidden; /*超出宽度部分隐藏*/
  text-overflow: ellipsis; /*超出部分以点号代替*/
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
.empty {
  margin: 0 auto;
}
</style>