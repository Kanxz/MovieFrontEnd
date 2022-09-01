<template>
  <carousel-view />
  <card-movie-new />
  <card-movie-score />
  <el-backtop :right="60" :bottom="120" />
</template>

<script>
import CarouselView from "@/views/home/component/CarouselView.vue";
import CardMovieNew from "@/views/home/component/CardMovieNew.vue";
import CardMovieScore from "@/views/home/component/CardMovieScore.vue";
export default {
  components: { CarouselView, CardMovieNew, CardMovieScore },
  name: "HomeIndex",
};
</script>