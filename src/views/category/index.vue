<template>
  <div class="category">
    <van-sticky>
      <nav-bar ref="navBarRef">
        <template #left>
          <van-icon name="scan" />
        </template>
        <template #center>
          <div class="search">
            <van-icon name="search" size="16" />
            <span>搜索</span>
          </div>
        </template>
        <template #right>
          <van-icon name="chat-o" />
        </template>
      </nav-bar>
    </van-sticky>
    <div class="container">
      <van-sidebar v-model="activeKey">
        <template v-for="item in category">
          <van-sidebar-item
            :key="item.id"
            :title="item.title"
            @click="querySubCategory(item.maitKey)"
          />
        </template>
      </van-sidebar>
      <van-grid class="sub-category">
        <template v-for="item in subCategory">
          <van-grid-item :key="item.id" :text="item.title">
            <template #icon>
              <van-image :src="item.image" />
            </template>
            <!-- <div class="title">{{ item.title }}</div> -->
          </van-grid-item>
        </template>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { queryCategory, querySubCategory } from '@/api';
import NavBar from '@/components/nav-bar';
export default {
  components: { NavBar },
  data: () => ({
    // key
    activeKey: 0,
    // 分类
    category: [],
    // 子分类
    subCategory: [],
  }),
  mounted() {
    this.queryCategory();
    this.querySubCategory();
  },
  methods: {
    /** 查询分类列表 */
    async queryCategory() {
      this.category = await queryCategory();
    },
    /** 查询子分类列表 */
    async querySubCategory(maitKey = '3627') {
      this.subCategory = await querySubCategory(maitKey);
    },
  },
};
</script>

<style lang="less" scoped>
.category {
  background: @theme-light-gray;
  min-height: 100vh;
}
.search {
  height: 50px;
  background: @theme-light-gray;
  border-radius: 50px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 24px;
  color: @theme-dark-gray;
  span {
    margin-left: 4px;
  }
}
.container {
  display: flex;
  align-items: flex-start;
  .sub-category {
    flex: 1;
  }
  .title {
    font-size: 12px;
  }
}
</style>
