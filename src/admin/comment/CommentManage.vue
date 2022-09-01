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
    </el-row>
    <el-divider border-style="dashed" />

    <!-- 数据展示区 -->
    <el-table :data="tableData" stripe style="width: 100%" max-height="380">
      <el-table-column prop="username" label="账号名" width="100" />
      <el-table-column prop="movieName" label="影视名" />
      <el-table-column prop="createTime" sortable label="创建日期" />
      <el-table-column prop="comments" label="评论" width="500" />

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
import { deleteByIdAdmin, getAllComments } from "@/api/backend/comment";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  name: "CommentManage",
  components: {
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

    const getComments = () => {
      getAllComments(query).then((data) => {
        tableData.value = data.data.commentList;
        total.value = data.data.total;
      });
    };
    getComments();

    const searchByName = () => {
      query.query = queryForm.value.query;
      getComments();
      // console.log("searchByName");
    };

    const deleteOne = (id) => {
      ElMessageBox.confirm("确定删除该条评论吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // console.log(id + "删除成功！");
        deleteByIdAdmin(id).then((data) => {
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
      searchByName,
      deleteOne,
      handleCurrentChange,
    };
  },
};
</script>

<style>
.header {
  margin-bottom: 10px;
}
.page {
  margin-top: 40px;
}
</style>