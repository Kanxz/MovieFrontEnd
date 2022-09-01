<template>
  <!-- 筛选区 -->
  <div class="filter" v-if="tags && !loading.value">
    <div class="item">
      <div class="head">类型：</div>
      <div class="body">
        <a
          @click="tagClick(tag)"
          :class="{ active: isTagActive(tag) }"
          href="javascript:;"
          v-for="tag in tags"
          :key="tag"
        >
          {{ tag }}
        </a>
      </div>
    </div>
    <div class="item">
      <div class="head">语言：</div>
      <div class="body">
        <a
          @click="LanClick(language)"
          :class="{ active: isLanActive(language) }"
          href="javascript:;"
          v-for="language in languages"
          :key="language"
        >
          {{ language }}
        </a>
      </div>
    </div>
  </div>
  <div class="filter" v-else>
    <el-skeleton :rows="4" />
  </div>
</template>
<script>
import { getCategoryFilter } from "@/api/category.js";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  name: "CategotyFilter",
  setup() {
    const languages = ref(null);
    const tags = ref(null);
    const loading = ref(false);

    const store = useStore();

    getCategoryFilter().then((data) => {
      loading.value = true;
      tags.value = data.data.tag;
      languages.value = data.data.language;
      loading.value = false;
    });

    const isTagActive = (tag) => {
      return store.state.category.selectedTag === tag;
    };
    const tagClick = (tag) => {
      store.commit("category/changeSelectedTag", tag);
      window.scrollTo({
        top: document.documentElement.scrollTop + 1,
      });
    };
    const isLanActive = (language) => {
      return store.state.category.selectedLan === language;
    };
    const LanClick = (language) => {
      store.commit("category/changeSelectedLan", language);
      window.scrollTo({
        top: document.documentElement.scrollTop + 1,
      });
    };

    return {
      languages,
      tags,
      loading,
      isTagActive,
      isLanActive,
      tagClick,
      LanClick,
    };
  },
};
</script>

<style scoped lang='less'>
// 筛选区
.filter {
  width: 1100px;
  background: #fff;
  padding: 25px;
  margin: 20px auto;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>