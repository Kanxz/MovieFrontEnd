<template>
  <div class="comment">
    <div class="title">评论</div>
    <div class="write">
      <el-input
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="请输入你的评论"
      />
    </div>
    <el-button type="primary" class="button" @click="submit">发表</el-button>
    <el-card
      shadow="hover"
      class="comment-card"
      v-for="comm in comments"
      :key="comm.id"
    >
      <el-tag>{{ comm.username }}</el-tag>
      <div class="comment-cont">{{ comm.comments }}</div>
    </el-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { setComment, getComments } from "@/api/movie-detail.js";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "MovieComment",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const textarea = ref("");

    const user = store.state.user.profile;
    const doubanId = route.params.id;

    const param = {
      comment: "",
      userId: user.userID,
      doubanId: doubanId,
      username: user.username,
    };

    const comments = ref([]);

    getComments(doubanId).then((data) => {
      // console.log(data);
      comments.value = data.data;
    });

    const submit = () => {
      // console.log(user.token);
      if (user.token === undefined || user.token === "") {
        ElMessage({
          message: "请先登录",
          type: "warning",
        });
        router.push("/login?redirectUrl=" + route.fullPath);
      } else if (textarea.value === "") {
        ElMessage({
          message: "评论不能为空",
          type: "warning",
        });
      } else {
        param.comment = textarea.value;
        setComment(param).then((data) => {
          if (data.code === 200) {
            getComments(doubanId).then((data) => {
              // console.log(data);
              comments.value = data.data;
            });
            textarea.value = "";
            ElMessage({
              message: "评论发表成功",
              type: "success",
            });
          }
        });
        // console.log(param);
      }
    };

    return {
      textarea,
      submit,
      comments,
    };
  },
};
</script>

<style scoped lang="less">
.comment {
  background: #fff;
  padding: 30px 50px;
  width: 1120px;
  margin: 20px -10px;
  .title {
    font-size: 25px;
    // color: #047eff;
    margin-bottom: 20px;
  }
  .button {
    margin-left: 950px;
    margin-top: 20px;
  }
  .comment-card {
    margin-top: 20px;
    padding: 0 20px;
  }
  .comment-cont {
    margin-top: 10px;
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>