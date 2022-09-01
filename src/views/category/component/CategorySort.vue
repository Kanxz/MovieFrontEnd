<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'releaseTime' }"
        @click="changeSort('releaseTime')"
        href="javascript:;"
        >最新影视</a
      >
      <a @click="changeSort('score')" href="javascript:;">
        评分排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'score' &&
              sortParams.sortMethod === 'ASC',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'score' &&
              sortParams.sortMethod === 'DESC',
          }"
        />
      </a>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import store from "@/store";
export default {
  name: "CategorySort",
  setup() {
    const category = useStore();

    const sortParams = reactive({
      sortField: store.state.category.sortField, // sortField ====> releaseTime, score
      sortMethod: store.state.category.sortMethod, // sortMethod ====> ASC为正序 DESC为倒序
    });
    const changeSort = (sortField) => {
      if (sortField === "score") {
        sortParams.sortField = sortField;
        category.commit("category/changeSortField", sortField);
        if (sortParams.sortMethod === null) {
          // 第一次点击，默认是降序
          sortParams.sortMethod = "DESC";
          category.commit("category/changeSortMethod", "DESC");
        } else {
          // 其他情况根据当前排序取反
          sortParams.sortMethod =
            sortParams.sortMethod === "DESC" ? "ASC" : "DESC";
          category.commit("category/changeSortMethod", sortParams.sortMethod);
        }
      } else {
        // 如果排序未改变停止逻辑
        if (sortParams.sortField === sortField) return;
        sortParams.sortField = sortField;
        category.commit("category/changeSortField", sortField);
        sortParams.sortMethod = null;
        category.commit("category/changeSortMethod", null);
      }
      window.scrollTo({
        top: document.documentElement.scrollTop + 1,
      });
    };
    return {
      sortParams,
      changeSort,
    };
  },
};
</script>
<style scoped lang='less'>
.sub-sort {
  width: 1100px;
  margin: 0px auto;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>