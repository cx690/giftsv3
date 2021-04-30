<template>
    <div class="about">{{msg}}</div>
</template>
<script lang="ts">
import { ref } from "vue";
export default {
    setup() {
        const msg = ref("没想到吧你？哈哈");
        return {
            msg,
        };
    },
};
</script>
