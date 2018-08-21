import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'

import axios from 'axios'
import APP_CONFIG from "./assets/js/url" //导入请求地址
import RegExps from "./assets/js/RegExp" //导入正则验证规则
import './assets/js/flexible.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'

Vue.use(ElementUI, {
	size: 'small',
	zIndex: 3000
})

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.APP_CONFIG = APP_CONFIG; //将导入的请求地址挂载到vue原型上，在组件内可以通过this.APP_CONFIG访问。
Vue.prototype.RegExp = RegExps;

window.addEventListener('load', () => {
	FastClick.attach(document.body)
});





new Vue({
	router,
	render: h => h(App)
}).$mount('#app')