<template>
  <div class="recommend">
    <template v-for="item in recommend">
      <div class="recommend-item" :key="item.id">
        <img class="image" :src="item.image" />
        <div class="title">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    recommend: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  &-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    line-height: 2;
    color: @theme-dark-gray;
    .image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
}
</style>
