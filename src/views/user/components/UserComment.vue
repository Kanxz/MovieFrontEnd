<template>
  <el-card shadow="never">
    <el-table :data="tableData" stripe style="width: 100%" max-height="360">
      <el-table-column prop="username" label="账号名" width="100" />
      <el-table-column prop="movieName" label="影视名" />
      <el-table-column prop="createTime" sortable label="创建日期" />
      <el-table-column prop="comments" label="评论" width="400" />

      <el-table-column prop="action" label="操作" width="100">
        <template #default="{ row }">
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
import { Search, Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { deleteComment, getUserComments } from "@/api/user";
import store from "@/store";
export default {
  name: "UserComment",
  components: {
    Delete,
  },
  setup() {
    const total = ref(0);
    const username = store.state.user.profile.username;
    let query = {
      username: username,
      pageNum: 1,
    };
    let queryForm = ref(query);
    const tableData = ref();

    const getComments = () => {
      getUserComments(query).then((data) => {
        tableData.value = data.data.commentList;
        total.value = data.data.total;
      });
    };
    getComments();

    const deleteOne = (id) => {
      ElMessageBox.confirm("确定删除该条数据吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // console.log(id + "删除成功！");
        deleteComment(id).then((data) => {
          if (data.code === 200) {
            getComments();
            ElMessage({
              showClose: true,
              message: "评论删除成功",
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
    };

    const handleCurrentChange = (pageNum) => {
      query.pageNum = pageNum;
      getComments();
    };

    return {
      Search,
      total,
      queryForm,
      tableData,
      deleteOne,
      handleCurrentChange,
    };
  },
};
</script>

<style>
</style>