import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "G-LF9YDFLHL5" },
}, router);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
