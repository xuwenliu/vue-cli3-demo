import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(Router)
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
export default new Router({
	routes: [
		{ path: '/', redirect: {name: 'login'}},
		{ path:'/login',name:'login',component: Login },
		{ path:'/register',name:'register',component: Register },
		{ path:'/index',name:'index',component:() => import ( /* webpackChunkName: "index" */ './views/Index.vue') },
		{ path: '/about',name: 'about',component: () => import ( /* webpackChunkName: "about" */ './views/About.vue') },
	]
})