<template>
  <div class="about">{{msg}}</div>
</template>
<script lang="ts">
import { onMounted, ref, Ref, reactive, toRefs } from "vue";
export default {
  setup() {
    const msg = ref("没想到吧你？哈哈");
    return {
      msg
    };
  }
};
</script>
