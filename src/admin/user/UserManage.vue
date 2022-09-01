<template>
  <el-card>
    <!-- 头部 -->
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <!-- 搜索输入 -->
        <el-input
          v-model="queryForm.query"
          clearable
          placeholder="请输入账号名"
          @keyup.enter="searchByName"
        >
          <template #append>
            <el-button :icon="Search" @click="searchByName" />
          </template>
        </el-input>
      </el-col>

      <el-col :span="1">
        <!-- 添加用户 -->
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>
    <el-divider border-style="dashed" />

    <!-- 数据展示区 -->
    <el-table :data="tableData" stripe style="width: 100%" max-height="380">
      <el-table-column prop="username" label="账号名" />
      <el-table-column prop="gender" sortable label="性别" />
      <el-table-column prop="age" sortable label="年龄" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="status" label="是否启用">
        <template v-slot="{ row }">
          <el-switch v-model="row.status" @change="setStatus(row)" />
        </template>
      </el-table-column>
      <el-table-column prop="roleKey" sortable label="员工类别">
        <template v-slot="{ row }">
          <span v-if="row.roleKey === 'super_admin'">超级管理员</span>
          <span v-else-if="row.roleKey === 'admin'">管理员</span>
          <span v-else>用户</span>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="200px">
        <template #default="{ row }">
          <el-button size="small" type="warning" round @click="editOne(row)">
            <el-icon><Edit /></el-icon>
            <span>编辑</span>
          </el-button>

          <el-button
            size="small"
            type="danger"
            round
            @click="deleteOne(row.id)"
          >
            <el-icon><Delete /></el-icon>
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-model:currentPage="queryForm.pageNum"
      background="background"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
      class="page"
    />
  </el-card>
</template>

<script>
import { Search, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import { getAllUser, setUserStatus, deleteUser } from "@/api/backend/employee";
import store from "@/store";
import router from "@/router";
export default {
  name: "UserManage",
  components: {
    Edit,
    Delete,
  },
  setup() {
    const total = ref(0);
    let query = {
      query: "",
      pageNum: 1,
    };
    let queryForm = ref(query);
    const tableData = ref();

    const getUsers = () => {
      getAllUser(query).then((data) => {
        let list = data.data.userList;
        total.value = data.data.total;
        list.forEach(function (item, index, list) {
          if (list[index].status === "1") {
            list[index].status = true;
          } else {
            list[index].status = false;
          }
        });
        tableData.value = list;
        // console.log(tableData.value);
      });
    };
    getUsers();

    const searchByName = () => {
      query.query = queryForm.value.query;
      getUsers();
      // console.log("searchByName");
    };

    const addUser = () => {
      router.push("/admin/user/add");
    };

    const setStatus = (row) => {
      console.log(row.status);
      setUserStatus(row.id, row.status).then((data) => {
        if (data.code === 200) {
          ElMessage({
            showClose: true,
            type: "success",
            message: "状态修改成功！",
          });
        }
      });
    };

    const editOne = (row) => {
      store.commit("employee/setEmployee", row);
      // console.log(store.state.employee);
      router.push("/admin/user/edit");
    };

    const deleteOne = (id) => {
      ElMessageBox.confirm("确定删除该条数据吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // console.log(id + "删除成功！");
        deleteUser(id).then((data) => {
          if (data.code === 200) {
            ElMessage({
              showClose: true,
              type: "success",
              message: "删除成功！",
            });
            getUsers();
          }
        });
      });
    };

    const handleCurrentChange = (pageNum) => {
      query.pageNum = pageNum;
      getUsers();
    };

    return {
      queryForm,
      tableData,
      total,
      searchByName,
      editOne,
      deleteOne,
      handleCurrentChange,
      addUser,
      setStatus,
      Search,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 10px;
}
.page {
  margin-top: 40px;
  // margin-left: 200px;
}
</style>