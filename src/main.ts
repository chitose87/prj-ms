import Vue from 'vue'
// @ts-ignore
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import App from './App.vue'

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  iconfont: 'md',
});

new Vue({
  render: h => h(App),
}).$mount('#app');
