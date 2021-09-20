import App from "./App.vue";
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import VueMeta from "vue-meta";
import Vue2TouchEvents from "vue2-touch-events";
import store from "./store/store";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueMeta);
Vue.use(Vue2TouchEvents, {
  touchClass: "",
  tapTolerance: 50,
  swipeTolerance: 100,
  namespace: "touch",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
