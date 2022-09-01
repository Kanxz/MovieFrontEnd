<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>首页轮播图管理</span>
      </div>
    </template>
    <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules" class="form">
      <el-form-item label="1号轮播图" prop="pic1" class="input">
        <el-input v-model="ruleForm.pic1" clearable />
      </el-form-item>
      <el-form-item label="豆瓣ID" prop="doubanId1" class="input2">
        <el-input v-model="ruleForm.doubanId1" clearable />
      </el-form-item>
      <el-popover effect="light" trigger="hover" placement="left" width="auto">
        <template #default>
          <el-image :src="ruleForm.pic1" referrerPolicy="no-referrer" />
        </template>
        <template #reference>
          <el-button class="popover">预览</el-button>
        </template>
      </el-popover>

      <el-form-item label="2号轮播图" prop="pic2" class="input">
        <el-input v-model="ruleForm.pic2" clearable />
      </el-form-item>
      <el-form-item label="豆瓣ID" prop="doubanId2" class="input2">
        <el-input v-model="ruleForm.doubanId2" clearable />
      </el-form-item>
      <el-popover effect="light" trigger="hover" placement="left" width="auto">
        <template #default>
          <el-image :src="ruleForm.pic2" referrerPolicy="no-referrer" />
        </template>
        <template #reference>
          <el-button class="popover">预览</el-button>
        </template>
      </el-popover>

      <el-form-item label="3号轮播图" prop="pic3" class="input">
        <el-input v-model="ruleForm.pic3" clearable />
      </el-form-item>
      <el-form-item label="豆瓣ID" prop="doubanId3" class="input2">
        <el-input v-model="ruleForm.doubanId3" clearable />
      </el-form-item>
      <el-popover effect="light" trigger="hover" placement="left" width="auto">
        <template #default>
          <el-image :src="ruleForm.pic3" referrerPolicy="no-referrer" />
        </template>
        <template #reference>
          <el-button class="popover">预览</el-button>
        </template>
      </el-popover>

      <el-form-item label="4号轮播图" prop="pic4" class="input">
        <el-input v-model="ruleForm.pic4" clearable />
      </el-form-item>
      <el-form-item label="豆瓣ID" prop="doubanId4" class="input2">
        <el-input v-model="ruleForm.doubanId4" clearable />
      </el-form-item>
      <el-popover effect="light" trigger="hover" placement="left" width="auto">
        <template #default>
          <el-image :src="ruleForm.pic4" referrerPolicy="no-referrer" />
        </template>
        <template #reference>
          <el-button class="popover">预览</el-button>
        </template>
      </el-popover>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="submit-button">
          修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { reactive, ref } from "vue";
import { getHomeCarousel } from "@/api/home.js";
import { updateCarousel } from "@/api/backend/movie";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  name: "SystemManage",
  setup() {
    const carouselList = ref([]);
    const ruleFormRef = ref();
    const ruleForm = reactive({
      pic1: "",
      pic2: "",
      pic3: "",
      pic4: "",
      doubanId1: "",
      doubanId2: "",
      doubanId3: "",
      doubanId4: "",
    });
    const rules = reactive({
      pic1: [{ required: true, message: "请输入图片URL", trigger: "blur" }],
      pic2: [{ required: true, message: "请输入图片URL", trigger: "blur" }],
      pic3: [{ required: true, message: "请输入图片URL", trigger: "blur" }],
      pic4: [{ required: true, message: "请输入图片URL", trigger: "blur" }],
      doubanId1: [{ required: true, message: "请输入豆瓣ID", trigger: "blur" }],
      doubanId2: [{ required: true, message: "请输入豆瓣ID", trigger: "blur" }],
      doubanId3: [{ required: true, message: "请输入豆瓣ID", trigger: "blur" }],
      doubanId4: [{ required: true, message: "请输入豆瓣ID", trigger: "blur" }],
    });

    getHomeCarousel().then((data) => {
      // console.log(data);
      carouselList.value = data.data;
      // console.log(carouselList.value[0]);
      ruleForm.pic1 = carouselList.value[0].picUrl;
      ruleForm.pic2 = carouselList.value[1].picUrl;
      ruleForm.pic3 = carouselList.value[2].picUrl;
      ruleForm.pic4 = carouselList.value[3].picUrl;
      ruleForm.doubanId1 = carouselList.value[0].doubanId;
      ruleForm.doubanId2 = carouselList.value[1].doubanId;
      ruleForm.doubanId3 = carouselList.value[2].doubanId;
      ruleForm.doubanId4 = carouselList.value[3].doubanId;
    });

    const onSubmit = () => {
      ruleFormRef.value.validate((valid) => {
        if (!valid) return;
        else {
          ElMessageBox.confirm("确定要修改该人员吗？", "Warning", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            // console.log(ruleForm.pic1);
            edit();
          });
        }
      });
    };

    const edit = () => {
      console.log(ruleForm);
      updateCarousel(ruleForm).then((data) => {
        if (data.code === 200) {
          ElMessage({
            showClose: true,
            message: "修改成功",
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

    return {
      ruleForm,
      onSubmit,
      rules,
      ruleFormRef,
    };
  },
};
</script>

<style scoped lang="less">
.box-card {
  .card-header {
    font-size: 18px;
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    .input {
      width: 600px;
      margin-left: 70px;
    }
    .input2 {
      width: 180px;
      margin-left: 30px;
    }
    .popover {
      margin-left: 20px;
    }
    .submit-button {
      margin-left: 158px;
    }
  }
}
</style>