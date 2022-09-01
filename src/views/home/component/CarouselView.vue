<template>
  <div class="block">
    <el-carousel height="500px" v-if="carouselList.length">
      <el-carousel-item v-for="item in carouselList" :key="item.id">
        <router-link :to="'/movie-detail/' + item.doubanId">
          <div class="small">
            <el-image
              style="width: 1200px; height: 500px"
              :src="item.picUrl"
              referrerPolicy="no-referrer"
            />
          </div>
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { ref } from "vue";
import { getHomeCarousel } from "@/api/home.js";
export default {
  name: "CarouselView",
  setup() {
    const carouselList = ref([]);
    const initial = ref(1);
    getHomeCarousel().then((data) => {
      carouselList.value = data.data;
      // console.log(carouselList.value);
    });

    return {
      carouselList,
      initial,
      getHomeCarousel,
    };
  },
};
</script>

<style scoped>
.block {
  margin: 20px auto;
  width: 1080px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>