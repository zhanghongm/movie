import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// axios导入
import axios from "@/api/http";
// 需要将对应的内容挂载到vue的原型上（后续每次在使用的时候不必每次import）
Vue.prototype.$http = axios;

// 事件中心的定义
// Vue.prototype.$eventBus = new Vue();

// 从缓存中取出jwt赋给vuex
let jwt = localStorage.getItem("_token");
if (jwt) {
    store.commit("global/setJwt", jwt);
}

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
