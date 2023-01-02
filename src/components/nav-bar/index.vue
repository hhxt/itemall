<template>
  <div class="nav-bar" :style="{ background: bgColor }">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#ffffff',
    },
  },
};
</script>

<style lang="less" scoped>
.nav-bar {
  height: 80px;
  display: flex;
  align-items: center;
  text-align: center;
  .left,
  .right {
    width: 60px;
  }
  .center {
    flex: 1;
  }
}
</style>
