<template>
  <el-card>
    <!-- 头部 -->
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <!-- 搜索输入 -->
        <el-input
          v-model="queryForm.query"
          clearable
          placeholder="请输入影视名"
          @keyup.enter="searchByName"
        >
          <template #append>
            <el-button :icon="Search" @click="searchByName" />
          </template>
        </el-input>
      </el-col>
      <el-col :span="1">
        <!-- 添加 -->
        <el-button type="primary" @click="addMovie">添加影视</el-button>
      </el-col>
    </el-row>
    <el-divider border-style="dashed" />
    <!-- 数据展示区 -->
    <el-table :data="tableData" stripe style="width: 100%" max-height="380">
      <el-table-column prop="name" label="影视名" width="160" />
      <el-table-column prop="score" sortable label="评分" />
      <el-table-column prop="doubanId" label="豆瓣ID" width="100" />
      <el-table-column prop="director" label="导演" width="160" />
      <el-table-column prop="language" label="语言" />
      <el-table-column
        prop="releaseTime"
        sortable
        label="上映时间"
        width="120"
      />
      <el-table-column prop="length" label="时长" />

      <el-table-column prop="picUrl" label="图片URL" width="550">
        <template #default="scope">
          <el-popover
            effect="light"
            trigger="hover"
            placement="left"
            width="auto"
          >
            <template #default>
              <el-image :src="scope.row.picUrl" referrerPolicy="no-referrer" />
            </template>
            <template #reference>
              <el-tag>{{ scope.row.picUrl }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="action" label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="warning" round @click="editOne(row.id)">
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
import { getAllMovie, deleteMovie } from "@/api/backend/movie";
import store from "@/store";
import router from "@/router";
export default {
  name: "MovieManage",
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

    const getMovies = () => {
      getAllMovie(query).then((data) => {
        // console.log(data);
        if (data.data != null) {
          tableData.value = data.data.movieList;
          total.value = data.data.total;
          // console.log(tableData.value);
        }
      });
    };
    getMovies();

    const searchByName = () => {
      query.query = queryForm.value.query;
      getMovies();
      // console.log("searchByName");
    };

    const addMovie = () => {
      router.push("/admin/movie/add");
    };

    const editOne = (id) => {
      store.commit("movie/setMovieID", id);
      console.log(store.state.movie);
      router.push("/admin/movie/edit");
    };

    const deleteOne = (id) => {
      ElMessageBox.confirm("确定删除该条数据吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // console.log(id + "删除成功！");
        deleteMovie(id).then((data) => {
          if (data.code === 200) {
            ElMessage({
              showClose: true,
              type: "success",
              message: "删除成功！",
            });
            getMovies();
          }
        });
      });
    };

    const handleCurrentChange = (pageNum) => {
      query.pageNum = pageNum;
      getMovies();
    };

    return {
      queryForm,
      tableData,
      total,
      searchByName,
      editOne,
      deleteOne,
      handleCurrentChange,
      addMovie,
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