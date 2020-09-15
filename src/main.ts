import { createApp } from "vue";
import App from "./App.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/index.less';
import "normalize.css";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import moment from 'moment';
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const app = createApp(App);
app.config.globalProperties.$moment = moment;
app.use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
