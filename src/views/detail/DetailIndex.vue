<template>
  <div class="details">
    <movie-detail />
    <movie-comment />
  </div>
</template>

<script>
import MovieDetail from "./component/MovieDetail.vue";
import MovieComment from "./component/MovieComment.vue";
export default {
  components: { MovieDetail, MovieComment },
  name: "DetailIndex",
};
</script>

<style scoped>
.details {
  width: 1100px;
  margin: 20px auto;
}
</style>