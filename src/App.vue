<template>
    <a-config-provider :locale="locale">
        <router-view #default="{ Component }">
            <!-- <transition> -->
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
            <!-- </transition> -->
        </router-view>
    </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
export default {
    name: "App",
    data() {
        return {
            locale: zhCN
        };
    }
};
</script>
<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
}
</style>
