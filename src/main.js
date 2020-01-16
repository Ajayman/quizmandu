import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import CircularCountDownTimer from "vue-circular-count-down-timer";
import App from './App.vue'

Vue.use(ElementUI);
Vue.use(CircularCountDownTimer)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
