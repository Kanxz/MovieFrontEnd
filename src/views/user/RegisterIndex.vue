<template>
  <div class="register-app">
    <div class="head-text">
      <RouterLink to="/">
        <img src="../../assets/images/logo.png" height="80" width="220" />
      </RouterLink>
      <div class="text">欢迎注册</div>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
    <el-card class="box-card">
      <div style="display: flex">
        <div class="title">用户注册</div>
        <div class="title-right">
          <router-link to="/login">
            <el-link :underline="false">已有账号</el-link>
          </router-link>
        </div>
      </div>

      <el-divider />
      <el-form
        :model="ruleForm"
        ref="ruleFormRef"
        :rules="rules"
        label-width="140px"
        class="form"
      >
        <el-form-item label="账号名" prop="username" class="input">
          <el-input v-model="ruleForm.username" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="input">
          <el-input v-model="ruleForm.email" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password" class="input">
          <el-input
            v-model="ruleForm.password"
            clearable
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="comfirmPd" class="input">
          <el-input
            v-model="ruleForm.comfirmPd"
            clearable
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="性别" prop="gender" class="input">
          <el-select v-model="ruleForm.gender" placeholder="性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age" class="input">
          <el-input v-model="ruleForm.age" clearable />
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" class="create" @click="registOpen"
            >注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { userRegister } from "@/api/user";
import { useRouter } from "vue-router";
export default {
  name: "RegisterIndex",
  setup() {
    const ruleFormRef = ref();
    const router = useRouter();
    const ruleForm = reactive({
      username: "",
      password: "",
      comfirmPd: "",
      email: "",
      gender: "",
      age: "",
    });

    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      username: [
        { required: true, message: "请输入账号名", trigger: "blur" },
        { min: 3, max: 16, message: "账号名长度为3-16", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, max: 16, message: "密码长度为3-16", trigger: "blur" },
      ],
      comfirmPd: [{ required: true, validator: validatePass, trigger: "blur" }],
      email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        {
          required: true,
          pattern: /^([a-z0-9_\\.-]{1,16})@([\da-z\\.-]+)\.([a-z\\.]{2,6})$/,
          message: "请输入正确的邮箱",
          trigger: "blur",
        },
      ],
      gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      age: [
        {
          required: true,
          message: "请输入年龄",
          trigger: "change",
        },
        {
          required: true,
          pattern: /^\d{1, 2}$/,
          message: "请输入正确的年龄",
          trigger: "change",
        },
      ],
    });

    const registOpen = () => {
      // console.log(ruleForm);
      ruleFormRef.value.validate((valid) => {
        if (!valid) return;
        else {
          regist();
        }
      });
    };

    const regist = () => {
      userRegister(ruleForm).then((data) => {
        if (data.code === 200) {
          router.push("/login");
          ElMessage({
            showClose: true,
            message: "注册成功",
            type: "success",
          });
        } else if (data.code === 500) {
          ElMessage({
            showClose: true,
            message: data.message,
            type: "error",
          });
        }
      });
    };

    return {
      registOpen,
      ruleForm,
      rules,
      ruleFormRef,
    };
  },
};
</script>

<style scoped lang="less">
.register-app {
  height: 100vh;
  padding: 30px;
  background-image: url("https://s1.ax1x.com/2022/05/05/OeVMUe.jpg");
  background-size: 100%;
  .head-text {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    .text {
      font-size: 18px;
      font-weight: normal;
      margin-top: 40px;
      margin-left: 10px;
      color: #666;
    }
    .entry {
      width: 120px;
      margin-top: 40px;
      margin-left: 500px;
      font-size: 16px;
      i {
        font-size: 14px;
        color: @xtxColor;
        letter-spacing: -5px;
      }
    }
  }
  .box-card {
    // height: 450px;
    width: 800px;
    padding: 20px;
    border-radius: 10px;
    margin: 30px auto 45px auto;
    .title {
      font-size: 23px;
      color: @xtxColor;
    }
    .title-right {
      font-size: 15px;
      margin-top: 10px;
      margin-left: 530px;
    }
    .form {
      display: flex;
      flex-wrap: wrap;
      .input {
        width: 340px;
        margin-left: -20px;
        margin-top: 25px;
      }
      .button {
        margin-left: 360px;
        margin-top: 20px;
        .create {
          width: 100px;
        }
      }
    }
  }
}
</style>