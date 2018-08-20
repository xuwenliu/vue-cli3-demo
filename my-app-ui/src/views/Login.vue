<template>
	<div class="login">
		<div>用户登录</div>
		<el-form label-position="right" label-width="80px" :model="userInfo" size="small" ref="loginForm" :rules="validateRules" status-icon >
			<el-form-item label="账号" prop="account">
				<el-input class="input" v-model="userInfo.account" required></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" class="input" v-model="userInfo.password" required></el-input>
			</el-form-item>
			<el-form-item class="login-btn">
				<el-button type="primary" @click="login('loginForm')" :loading="loading.status">{{loading.desc}}</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'
	export default {
		name: 'login',
		data() {
			var validateAccount = (rule, value, cb) => {
				if(value === ''){
					cb(new Error("请输入账号"));
				}else if(!this.RegExp.account.test(value)){
					cb(new Error("请输入5-16位字母开头数字下划线"));
				}else {
					cb();
				}
			}
			var validatePassword = (rule, value, cb) => {
				if(value === ''){
					cb(new Error("请输入密码"));
				}else if(!this.RegExp.password.test(value)){
					cb(new Error("请输入6-20位字母数字下划线"));
				}else {
					cb();
				}
			}

			return {
				loading: {
					status: false,
					desc: '登录'
				},
				userInfo: {
					account: '',
					password: '',
				},
				validateRules:{
					account: [
						{ validator: validateAccount, trigger: 'change' }
					],
					password: [
						{ validator: validatePassword, trigger: 'change' }
					],
					
				}
			};
		},
		methods: {
			login(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submit();
					} else {
						console.log('error submit!!');
						return false;
					}
				});




			},
			submit() {
				this.loading.status = true;
				this.loading.desc = '登录中...';
				this.$http.post(this.APP_CONFIG.LOGIN, this.userInfo).then((res) => {
					console.log(res);
					this.loading.status = false;
					this.loading.desc = '登录';
					if (res.status === 200) {
						this.$notify.success({
							title: '成功',
							message: '登录成功'
						});
						localStorage.setItem("token", res.data.data.sessionId);
						this.$router.replace({'name':'index'});
					}
				}, (error) => {
					console.log(error);
					this.loading.status = false;
					this.loading.desc = '登录';
				})
			},
			getList() {
				this.$http.get(this.APP_CONFIG.AD_LIST).then((res) => {
					console.log(res);
				})
			}
		}

	}
</script>
<style scoped lang="less">
	.input {
		width: 80%;
		display: block;
	}

	 .login-btn /deep/.el-form-item__content {
		margin-left: 0 !important;
	}
</style>