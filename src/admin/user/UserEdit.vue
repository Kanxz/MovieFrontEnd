<template>
  <el-card class="card">
    <span>人员编辑</span>
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
        <el-switch v-model="ruleForm.status" clearable />
      </el-form-item>
      <el-form-item label="身份" prop="roleKey" class="input">
        <el-select v-model="ruleForm.roleKey" placeholder="身份">
          <el-option label="超级管理员" value="super_admin" />
          <el-option label="管理员" value="admin" />
          <el-option label="用户" value="user" />
        </el-select>
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
import { editEmployee } from "@/api/backend/employee";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import { reactive, ref } from "vue";
export default {
  name: "UserAdit",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const ruleFormRef = ref();

    const rules = reactive({
      username: [
        { required: true, message: "请输入账号名", trigger: "blur" },
        { min: 3, max: 16, message: "账号名长度为3-16", trigger: "blur" },
      ],
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
      id: store.state.employee.profile.id,
      username: "" + store.state.employee.profile.username,
      gender: "" + store.state.employee.profile.gender,
      age: "" + store.state.employee.profile.age,
      status: store.state.employee.profile.status,
      email: "" + store.state.employee.profile.email,
      roleKey: "" + store.state.employee.profile.roleKey,
    });

    const editOpen = () => {
      ruleFormRef.value.validate((valid) => {
        if (!valid) return;
        else {
          ElMessageBox.confirm("确定要修改该人员吗？", "Warning", {
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
      editEmployee(ruleForm).then((data) => {
        if (data.code === 200) {
          router.push("/admin/user");
          ElMessage({
            showClose: true,
            message: "人员修改成功",
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
      ElMessageBox.confirm("确定要退出编辑吗？", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        router.push("/admin/user");
        ElMessage({
          type: "info",
          message: "取消修改",
        });
      });
    };

    return { ruleForm, editOpen, cancelOpen, rules, ruleFormRef };
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