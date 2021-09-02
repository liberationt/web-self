import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus';
import botButton from "@/components/botButton"
import dialog from "@/components/dialog"
import steps from "@/components/steps"
import timerInter from "@/components/timer"
import 'element-plus/lib/theme-chalk/index.css';
import { message } from "@/utils/messageBox"
const app = createApp(App)
app.component('bot-button', botButton)
app.component('dialogs', dialog)
app.component('steps', steps)
app.component('timerInter', timerInter)
// console.log(createApp,656)
app.use(store).use(ElementPlus).use(router).mount("#app");
app.config.globalProperties.$message= message