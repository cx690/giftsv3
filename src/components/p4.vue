<template>
  <div class="b4">
    <div class="sign"></div>
    <div class="sign"></div>
    <div class="sign"></div>
    <div class="sign"></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: "b4"
};
</script>
<style lang="less" scoped>
@border: 1px solid #1e9efc;
@width: 1px;
.b4 {
  width: 100%;
  height: 100%;
  border: 1px solid #1e9efc45;
  position: relative;
  .sign {
    position: absolute;
    width: @width;
    height: @width;
    &:nth-child(1) {
      border-top: @border;
      border-left: @border;
      top: -1px;
      left: -1px;
    }
    &:nth-child(2) {
      border-top: @border;
      border-right: @border;
      top: -1px;
      right: -1px;
    }
    &:nth-child(3) {
      border-bottom: @border;
      border-left: @border;
      bottom: -1px;
      left: -1px;
    }
    &:nth-child(4) {
      border-bottom: @border;
      border-right: @border;
      bottom: -1px;
      right: -1px;
    }
  }
}
</style>
