<template>
  <div class="back-top">
    <van-icon name="back-top" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  bottom: 130px;
  right: 20px;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 50%;
  color: @theme-primary;
  z-index: 99999;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
