<template>
  <el-card class="card">
    <span>人员添加</span>
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
      <el-form-item label="状态" prop="status" class="input">
        <el-switch v-model="ruleForm.status" />
      </el-form-item>
      <el-form-item label="身份" prop="roleKey" class="input">
        <el-select v-model="ruleForm.roleKey" placeholder="身份">
          <el-option label="超级管理员" value="super_admin" />
          <el-option label="管理员" value="admin" />
          <el-option label="用户" value="user" />
        </el-select>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="primary" class="create" @click="addOpen"
          >添加</el-button
        >
        <el-button type="primary" class="cancel" @click="cancelOpen"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { addEmployee } from "@/api/backend/employee";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
export default {
  name: "UserAdd",
  components: {},
  setup() {
    const router = useRouter();
    const ruleFormRef = ref();

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

    const ruleForm = reactive({
      username: "",
      password: "",
      comfirmPd: "",
      gender: "",
      age: "",
      status: true,
      email: "",
      roleKey: "",
    });

    const addOpen = () => {
      ruleFormRef.value.validate((valid) => {
        if (!valid) return;
        else {
          ElMessageBox.confirm("确定要添加该人员吗？", "Warning", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            add();
          });
        }
      });
    };

    const add = () => {
      addEmployee(ruleForm).then((data) => {
        if (data.code === 200) {
          router.push("/admin/user");
          ElMessage({
            showClose: true,
            message: "人员添加成功",
            type: "success",
          });
        } else if (data.code === 500) {
          ElMessage({
            showClose: true,
            message: data.message,
            type: "error",
          });
        } else {
          ElMessage({
            showClose: true,
            message: "添加失败",
            type: "error",
          });
        }
      });
    };

    const cancelOpen = () => {
      ElMessageBox.confirm("确定要退出添加吗？", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        router.push("/admin/user");
        ElMessage({
          type: "info",
          message: "取消添加",
        });
      });
    };

    return { ruleForm, addOpen, cancelOpen, ruleFormRef, rules, validatePass };
  },
};
</script>

<style lang="less" scoped>
.card {
  margin: 30px auto;
  width: 1000px;
  span {
    margin-left: 10px;
    font-size: 25px;
    color: #409eff;
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    .input {
      width: 340px;
      margin-left: 50px;
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