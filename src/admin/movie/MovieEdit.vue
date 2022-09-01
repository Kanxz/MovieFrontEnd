<template>
  <el-card class="card">
    <span>影视编辑</span>
    <el-form
      :model="ruleForm"
      ref="ruleFormRef"
      :rules="rules"
      label-width="140px"
      class="form"
    >
      <el-form-item label="影视名" prop="name" class="input2">
        <el-input v-model="ruleForm.name" clearable />
      </el-form-item>
      <el-form-item label="导演" prop="director" class="input">
        <el-input v-model="ruleForm.director" clearable />
      </el-form-item>
      <el-form-item label="评分" prop="score" class="input">
        <el-input v-model="ruleForm.score" clearable />
      </el-form-item>
      <el-form-item label="语言" prop="language" class="input">
        <el-input v-model="ruleForm.language" clearable />
      </el-form-item>
      <el-form-item label="上映时间" prop="releaseTime" class="input">
        <el-input v-model="ruleForm.releaseTime" clearable />
      </el-form-item>
      <el-form-item label="片长" prop="length" class="input">
        <el-input v-model="ruleForm.length" clearable />
      </el-form-item>
      <el-form-item label="豆瓣ID" prop="doubanId" class="input">
        <el-input v-model="ruleForm.doubanId" clearable />
      </el-form-item>
      <el-form-item label="标签" prop="tags" class="input2">
        <el-tag
          v-for="tag in ruleForm.tags"
          :key="tag"
          class="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          v-model.trim="tagValue"
          size="small"
          class="input-new-tag"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput"
        >
          + 添加新标签
        </el-button>
      </el-form-item>
      <el-form-item label="图片URL" prop="picUrl" class="input2">
        <el-input v-model="ruleForm.picUrl" clearable />
      </el-form-item>
      <el-form-item label="简介" prop="intro" class="input2">
        <el-input v-model="ruleForm.intro" autosize type="textarea" />
      </el-form-item>

      <el-form-item class="button">
        <el-button type="primary" class="create" @click="editOpen"
          >修改</el-button
        >
        <el-button type="primary" class="cancel" @click="cancelOpen"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { editMovie, getData } from "@/api/backend/movie";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import { reactive, ref } from "vue";
export default {
  name: "MovieEdit",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const inputVisible = ref(false);
    const tagValue = ref("");
    const ruleFormRef = ref();

    const rules = reactive({
      name: [
        { required: true, message: "请输入影视名", trigger: "blur" },
        { min: 1, max: 30, message: "影视名长度为1-30", trigger: "blur" },
      ],
      director: [
        { required: true, message: "请输入导演名", trigger: "blur" },
        { min: 1, max: 30, message: "导演名长度为1-30", trigger: "blur" },
      ],
      score: [
        { required: true, message: "请输入评分", trigger: "blur" },
        {
          required: true,
          pattern: /^\d{1,2}(\.\d)?$/,
          message: "请输入正确的评分",
          trigger: "blur",
        },
      ],
      language: [
        { required: true, message: "请输入语言", trigger: "blur" },
        {
          required: true,
          pattern: /^\S{1,5}语$/,
          message: "请输入正确的语言",
          trigger: "blur",
        },
      ],
      releaseTime: [
        {
          required: true,
          message: "请输入上映时间（yyyy-mm[-dd]）",
          trigger: "blur",
        },
        {
          required: true,
          pattern: /^\d{4}-\d{2}(-\d{2})?$/,
          message: "请输入正确的上映时间（yyyy-mm[-dd]）",
          trigger: "blur",
        },
      ],
      length: [
        {
          required: true,
          message: "请输入片长",
          trigger: "blur",
        },
        {
          required: true,
          pattern: /^\d+$/,
          message: "请输入正确的片长",
          trigger: "blur",
        },
      ],
      doubanId: [
        {
          required: true,
          message: "请输入豆瓣ID",
          trigger: "blur",
        },
        {
          required: true,
          pattern: /^\d+$/,
          message: "请输入正确的豆瓣ID",
          trigger: "blur",
        },
      ],
      picUrl: [
        {
          required: true,
          message: "请输入图片URL",
          trigger: "blur",
        },
      ],
    });

    const ruleForm = reactive({
      id: null,
      name: "",
      score: "",
      doubanId: "",
      director: "",
      language: "",
      releaseTime: "",
      length: "",
      picUrl: "",
      intro: "",
      tags: [],
      deletedTags: [],
      newTags: [],
    });

    ruleForm.id = store.state.movie.movieId;
    // console.log(ruleForm.id);
    getData(ruleForm.id).then((data) => {
      // console.log(data);
      ruleForm.name = data.data.movie.name;
      ruleForm.score = "" + data.data.movie.score;
      ruleForm.doubanId = "" + data.data.movie.doubanId;
      ruleForm.picUrl = data.data.movie.picUrl;
      ruleForm.releaseTime = data.data.movieDetail.releaseTime;
      ruleForm.director = data.data.movieDetail.director;
      ruleForm.length = "" + data.data.movieDetail.length;
      ruleForm.language = data.data.movieDetail.language;
      ruleForm.intro = data.data.movieDetail.intro;
      ruleForm.tags = data.data.tags;
      console.log(ruleForm);
    });

    const handleClose = (tag) => {
      ruleForm.tags.splice(ruleForm.tags.indexOf(tag), 1);
      ruleForm.deletedTags.push(tag);
      // console.log(ruleForm);
    };

    const showInput = () => {
      inputVisible.value = true;
    };

    const handleInputConfirm = () => {
      if (tagValue.value) {
        ruleForm.tags.push(tagValue.value);
        ruleForm.newTags.push(tagValue.value);
      }
      inputVisible.value = false;
      tagValue.value = "";
    };

    const editOpen = () => {
      ruleFormRef.value.validate((valid) => {
        if (!valid) return;
        else {
          ElMessageBox.confirm("确定要修改该影视吗？", "警告", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            edit();
          });
        }
      });
    };

    const edit = () => {
      editMovie(ruleForm).then((data) => {
        if (data.code === 200) {
          router.push("/admin/movie");
          ElMessage({
            showClose: true,
            message: "影视修改成功",
            type: "success",
          });
        } else {
          ElMessage({
            showClose: true,
            message: "修改失败",
            type: "error",
          });
        }
      });
    };

    const cancelOpen = () => {
      ElMessageBox.confirm("确定要退出编辑吗？", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        router.push("/admin/movie");
        ElMessage({
          type: "info",
          message: "取消修改",
        });
      });
    };

    return {
      ruleForm,
      editOpen,
      cancelOpen,
      inputVisible,
      tagValue,
      handleClose,
      showInput,
      handleInputConfirm,
      rules,
      ruleFormRef,
    };
  },
};
</script>

<style lang="less" scoped>
.card {
  margin: 20px auto;
  width: 1000px;
  span {
    margin-left: 10px;
    font-size: 25px;
    color: #409eff;
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    .tag {
      font-size: 14px;
    }
    .input-new-tag {
      width: 200px;
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
    }
    .input {
      width: 400px;
      margin-left: 30px;
      margin-top: 30px;
    }
    .input2 {
      width: 830px;
      margin-left: 30px;
      margin-top: 30px;
    }
    .button {
      margin-left: 650px;
      margin-top: 30px;
      .cancel {
        margin-left: 30px;
      }
    }
  }
}
</style>