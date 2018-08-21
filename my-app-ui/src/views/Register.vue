<template>
	<div class="register">
		<div class="title">注册</div>
		<el-form class="register-form" label-position="right" :model="userInfo" size="small" ref="registerForm" :rules="validateRules"
		    status-icon>
			<el-form-item prop="account">
				<el-input class="input" v-model="userInfo.account" placeholder="账号：字母开头5-16位字母数字下划线" required></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" class="input" v-model="userInfo.password" auto-complete="off" placeholder="密码：6-20位字母数字下划线" required></el-input>
			</el-form-item>
			<el-form-item prop="confirmPassword">
				<el-input type="password" class="input" v-model="userInfo.confirmPassword" auto-complete="off" placeholder="确认密码：输入上面一样的密码" required></el-input>
			</el-form-item>
			<el-form-item class="register-btn-box">
				<el-button class="fl" size="mini" type="primary" @click="register('registerForm')">注册</el-button>
				<el-button class="login-btn fr" type="text" @click="goregister">已有账号去登录</el-button>
			</el-form-item>
		</el-form>

	</div>

</template>
<script>
	export default {
		data() {
			var validateAccount = (rule, value, callback) => {
				if (value === '') {
					callback(new Error("请输入账号"));
				} else if (!this.RegExp.account.test(value)) {
					callback(new Error("请输入5-16位字母开头数字下划线"));
				} else {
					callback();
				}
			}
			var validatePassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error("请输入密码"));
				} else if (!this.RegExp.password.test(value)) {
					callback(new Error("请输入6-20位字母数字下划线"));
				} else {
					if (this.userInfo.confirmPassword !== '') {
						this.$refs.registerForm.validateField('confirmPassword');
					}
					callback();
				}
			}
			var validateConfirmPassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.userInfo.password) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			return {
				userInfo: {
					account: '',
					password: '',
					confirmPassword: "",
				},
				validateRules: {
					account: [{
						validator: validateAccount,
						trigger: 'change'
					}],
					password: [{
						validator: validatePassword,
						trigger: 'change'
					}],
					confirmPassword: [{
						validator: validateConfirmPassword,
						trigger: 'change'
					}],

				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				window.addEventListener('resize', function () {
					if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
						window.setTimeout(function () {
							document.activeElement.scrollIntoViewIfNeeded();
						}, 0);
					}
				})
			})
		},
		methods: {
			register(formName) {
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
				console.log(this.userInfo);
			},
			goregister() {
				this.$router.push({
					'name': 'login'
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
<style scoped lang="less">
	.register {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		padding-top: 1.6rem/* 120/75 */;
		background: url('../assets/img/login_register_bg.gif') center center no-repeat;
		background-size: cover;
		background-attachment: fixed;
		.title {
			color: #fff;
			width: 6.93333rem /* 520/75 */;
			margin: 0 auto 18px;
			font-size: .53333rem/* 40/75 */;
			text-align: center;
		}
		.register-form {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			/deep/ .el-form-item__label {
				padding: 0 .32rem/* 24/75 */0 0;
			}
		}
	}

	.input {
		width: 6.93333rem/* 520/75 */;
		display: block;
	}

	.register-btn-box {
		width: 6.93333rem/* 520/75 */;
		/deep/ .el-form-item__content {
			.login-btn {
				margin-top: .34667rem/* 26/75 */;
			}
		}
		/deep/ .el-button--text {
			padding: 0;
		}
	}
</style>