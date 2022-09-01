<template>
  <el-row :gutter="20" class="movie-detail">
    <el-col :span="8">
      <el-image
        class="img-detail"
        :src="movie.picUrl"
        referrerPolicy="no-referrer"
      />
      <div class="movie-rate-parent">
        <div class="movie-rate-text">评价：</div>
        <el-rate
          class="movie-rate"
          v-model="rate"
          :texts="['很差', '较差', '还行', '推荐', '力荐']"
          show-text
          :disabled="rateDisabled"
          @click="changeRate"
        />
      </div>
    </el-col>
    <el-col :span="16" v-if="detail">
      <h1>{{ detail.name }}</h1>
      <el-row :gutter="20">
        <el-col :span="10" class="detail-col">
          <div class="detail-item">
            <div class="detail-title">导演：</div>
            <div class="detail-context">{{ detail.director }}</div>
          </div>
        </el-col>
        <el-col :span="14" class="detail-col">
          <div class="detail-item">
            <div class="detail-title">类型：</div>
            <div class="detail-context" v-for="tag in tags" :key="tag">
              {{ tag }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" class="detail-col"
          ><div class="detail-item">
            <div class="detail-title">语言：</div>
            <div class="detail-context">{{ detail.language }}</div>
          </div></el-col
        >
        <el-col :span="14" class="detail-col"
          ><div class="detail-item">
            <div class="detail-title">上映时间：</div>
            <div class="detail-context">{{ detail.releaseTime }}</div>
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" class="detail-col" v-if="isMovie">
          <div class="detail-item">
            <div class="detail-title">片长：</div>
            <div class="detail-context" v-if="detail.length">
              {{ detail.length }} 分钟
            </div>
            <div class="detail-context" v-else>未知</div>
          </div></el-col
        >
        <el-col :span="10" class="detail-col" v-else>
          <div class="detail-item">
            <div class="detail-title">集数：</div>
            <div class="detail-context" v-if="detail.length">
              {{ detail.length }} 集
            </div>
            <div class="detail-context" v-else>未知</div>
          </div></el-col
        >
        <el-col :span="14" class="detail-col"
          ><div class="detail-item">
            <div class="detail-title">DoubanID：</div>
            <div class="detail-context">{{ detail.doubanId }}</div>
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" class="detail-col"
          ><div class="detail-item">
            <div class="detail-title">豆瓣评分：</div>
            <div class="detail-context">
              {{ movie.score }}
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="detail-title intro">简介：</div>
      <div class="intro-text" v-if="detail.intro">
        {{ detail.intro }}
      </div>
      <div class="intro-text" v-else>无</div>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  changeClickTimes,
  getMovieDetail,
  getScore,
  setScore,
} from "@/api/movie-detail.js";
import store from "@/store";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router";
export default {
  name: "MovieDetail",
  setup() {
    const route = useRoute();
    const doubanId = route.params.id;
    const detail = ref(null);
    const movie = ref([]);
    const tags = ref([]);
    const rate = ref(0);
    const isMovie = ref(true);
    const rateDisabled = ref(false);
    const user = store.state.user.profile;
    let param = {
      userId: user.userID,
      tags: [],
      score: null,
      movieId: null,
    };

    getMovieDetail(doubanId).then((data) => {
      movie.value = data.data.movie;
      detail.value = data.data.movieDetail;
      tags.value = data.data.tags;

      param.tags = data.data.tags;
      param.movieId = movie.value.id;
      if (param.tags.includes("电视剧")) {
        // console.log("电视剧");
        isMovie.value = false;
      }

      if (user.token) {
        getScore(param).then((data) => {
          // console.log(data);
          if (data.code === 200) {
            rate.value = data.data.score;
            rateDisabled.value = true;
          }
        });

        // console.log(param);
        changeClickTimes(param);
      }
    });

    const changeRate = () => {
      // console.log(rateDisabled);
      if (user.token === "" || user.token === undefined) {
        ElMessage({
          showClose: true,
          message: "请先登录",
          type: "warning",
        });
        router.push("/login?redirectUrl=" + route.fullPath);
      }
      if (user.token && rateDisabled.value === false) {
        ElMessageBox.confirm(
          "确定要评价该影视吗？注意：评价后不可修改",
          "警告",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          param.score = rate.value;
          setScore(param).then((data) => {
            if (data.code === 200) {
              rateDisabled.value = true;
              ElMessage({
                showClose: true,
                message: "评价成功",
                type: "success",
              });
            } else {
              ElMessage({
                showClose: true,
                message: data.message,
                type: "error",
              });
            }
          });
        });
      }
    };

    return {
      detail,
      tags,
      movie,
      rate,
      changeRate,
      isMovie,
      rateDisabled,
    };
  },
};
</script>

<style scoped>
.movie-detail {
  background: #fff;
  padding: 30px 50px;
}
.img-detail {
  width: 250px;
  height: 370px;
}
.movie-rate-parent {
  display: flex;
}
.movie-rate-text {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 0;
  height: 32px;
  line-height: 32px;
  width: 42px;
}
.movie-rate {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 32px;
}
.detail-col {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 30px;
}
.detail-item {
  margin: 30px 0;
  display: flex;
  font-size: 18px;
  height: 25px;
}
.detail-title {
  color: darkgrey;
}
.detail-context {
  margin-left: 10px;
}
.intro {
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 18px;
}
.intro-text {
  /* text-indent: 2em; */
  line-height: 200%;
}
</style>