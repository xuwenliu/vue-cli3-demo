"use strict";

import Vue from 'vue';
import axios from "axios";

let vm = new Vue();

// Full config:  https://github.com/axios/axios#request-config

// axios.defaults.baseURL = '/api';
// axios.defaults.headers.common['Authorization'] = "Bearer " + AUTH_TOKEN;
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/json; charset=UTF-8';

let config = {
	// baseURL: process.env.baseURL || process.env.apiUrl || '',
	// timeout: 60 * 1000, // Timeout
	// withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
let TOKEN = localStorage.getItem("token");

axios.interceptors.request.use(config => {
	config.baseURL = '/api'; //设置基本请求地址，配合proxy代理使用
	config.timeout = 60 * 1000; //设置请求超时时间
	if (TOKEN) {
		config.headers.common['Authorization'] = "Bearer " + TOKEN; //设置请求token
	}
	return config;


}, error => {
	return Promise.reject(error);
});


axios.interceptors.response.use(response => {
	return response;
}, error => {
	//状态码判断
	let stateCode = error.response.status;
	switch (stateCode){
		case 400:break;
		case 401:break;//未登录
		case 403:break;//未授权
	}

	vm.$notify.error({
		title: '失败',
		message: error.response.data.msg
	});
	return Promise.reject(error.response.data); //返回错误信息
});






Plugin.install = function (Vue, options) {
	Vue.axios = _axios;
	window.axios = _axios;
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios;
			}
		},
		$axios: {
			get() {
				return _axios;
			}
		},
	});
};

Vue.use(Plugin)

export default Plugin;