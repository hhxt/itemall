<template>
  <div class="tab">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tab {
  height: 60px;
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 16px;
  color: @theme-dark-gray;
  background: #ffffff;
}
</style>
