<template>
  <categoty-filter />
  <div class="movie-list">
    <category-sort />
    <movie-list />
  </div>
  <el-backtop :right="60" :bottom="120" />
</template>

<script>
import CategotyFilter from "@/views/category/component/CategoryFilter.vue";
import CategorySort from "./component/CategorySort.vue";
import MovieList from "@/views/category/component/MovieList.vue";
export default {
  components: { CategotyFilter, CategorySort, MovieList },
  name: "CategoryIndex",
};
</script>
<style scoped  lang="less">
.movie-list {
  width: 1100px;
  background: #fff;
  padding: 0 25px;
  margin: 0 auto;
}
</style>