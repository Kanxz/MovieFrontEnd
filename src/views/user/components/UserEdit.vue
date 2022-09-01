<template>
  <el-card shadow="never">
    <span class="card-title">个人信息修改</span>
    <el-divider />
    <el-form
      :model="ruleForm"
      ref="ruleFormRef1"
      :rules="rules"
      label-width="140px"
      class="form"
    >
      <el-form-item label="账号名" prop="username" class="input">
        <!-- <el-input v-model="ruleForm.username" clearable /> -->
        <div>{{ ruleForm.username }}</div>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" class="input">
        <el-input v-model="ruleForm.email" clearable />
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
        <el-button type="primary" class="create" @click="editOpen1"
          >修改</el-button
        >
      </el-form-item>
    </el-form>

    <el-divider border-style="dashed" />

    <el-form
      :model="ruleForm"
      ref="ruleFormRef2"
      :rules="rules"
      label-width="140px"
      class="form"
    >
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

      <el-form-item class="button">
        <el-button type="primary" class="create" @click="editOpen2"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>


<script>
import { reactive, ref } from "@vue/reactivity";
import { ElMessage, ElMessageBox } from "element-plus";
import { changePd, getUsetById, updateUserInfo } from "@/api/user";
import { useStore } from "vuex";
import router from "@/router";
export default {
  name: "UserEidt",
  setup() {
    const ruleFormRef1 = ref();
    const ruleFormRef2 = ref();
    const ruleForm = reactive({
      username: "",
      email: "",
      age: "",
      gender: "",
      password: "",
      comfirmPd: "",
    });

    const store = useStore();
    const userId = store.state.user.profile.userID;

    getUsetById(userId).then((data) => {
      // console.log(data.data);
      ruleForm.username = data.data.username;
      ruleForm.email = data.data.email;
      ruleForm.gender = data.data.gender;
      ruleForm.age = data.data.age;
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
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
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
      roleKey: [{ required: true, message: "请选择身份", trigger: "change" }],
      age: [
        {
          required: true,
          message: "请输入年龄",
          trigger: "change",
        },
        {
          required: true,
          pattern: /^\d+$/,
          message: "请输入正确的年龄",
          trigger: "change",
        },
      ],
    });

    const editOpen1 = () => {
      ruleFormRef1.value.validate((valid) => {
        if (!valid) return;
        else {
          ElMessageBox.confirm("确定要修改个人信息吗？", "警告", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            // console.log("修改个人信息");
            edit1();
          });
        }
      });
    };

    const edit1 = () => {
      const user = {
        id: userId,
        email: ruleForm.email,
        age: ruleForm.age,
        gender: ruleForm.gender,
      };
      updateUserInfo(user).then((data) => {
        // console.log(data);
        if (data.code === 200) {
          ElMessage({
            showClose: true,
            message: "个人信息修改成功",
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
    };

    const editOpen2 = () => {
      ruleFormRef2.value.validate((valid) => {
        if (!valid) return;
        else {
          ElMessageBox.confirm("确定要修改密码吗？", "警告", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            // console.log("修改密码");
            edit2();
          });
        }
      });
    };

    const edit2 = () => {
      const user = {
        id: userId,
        password: ruleForm.password,
      };
      changePd(user).then((data) => {
        // console.log(data);
        if (data.code === 200) {
          store.commit("user/setUser", {});
          router.push("/login");
          ElMessage({
            showClose: true,
            message: "密码修改成功",
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
    };

    return {
      ruleForm,
      rules,
      ruleFormRef1,
      ruleFormRef2,
      editOpen1,
      editOpen2,
    };
  },
};
</script>

<style scoped lang="less">
.card-title {
  font-size: 23px;
  color: #047eff;
}
.form {
  display: flex;
  flex-wrap: wrap;
  .input {
    width: 350px;
  }
}
</style>