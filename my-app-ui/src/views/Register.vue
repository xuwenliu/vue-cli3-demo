<template>
	<div class="register">
		<div class="title">注册</div>
		<el-form class="register-form" label-position="top" label-width="80px" :model="userInfo" size="small" ref="registerForm" :rules="validateRules" status-icon>
			<el-form-item label="账号" prop="account">
				<el-input class="input" v-model="userInfo.account" placeholder="字母开头，5-16位的字母数字下划线" required></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" class="input" v-model="userInfo.password" placeholder="6-20位字母数字下划线" required></el-input>
			</el-form-item>
			 <el-form-item label="确认密码" prop="confirmPassword">
				<el-input type="password" class="input" v-model="userInfo.confirmPassword" placeholder="输入上面一样的密码" required></el-input>
			</el-form-item>
			<el-form-item class="register-btn-box">
				<el-button size="mini" type="primary" @click="register('registerForm')">注册</el-button>
				<el-button class="login-btn" type="text" @click="goregister">登录</el-button>
			</el-form-item>
		</el-form>

	</div>
	
</template>
<script>
    export default {
        data () {
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
                userInfo: {
					account: '',
					password: '',
					confirmPassword:"",
				},
                validateRules:{
					account: [
						{ validator: validateAccount, trigger: 'change' }
					],
					password: [
						{ validator: validatePassword, trigger: 'change' }
					],
					
				}
            }
        },
       	mounted() {
			this.$nextTick(()=> {
				 window.addEventListener('resize', function () {
			        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
			            window.setTimeout(function () {
			                document.activeElement.scrollIntoViewIfNeeded();
			            }, 0);
			        }
			    })
			})
		},
        methods:{
			goregister() {
				this.$router.push({'name':'login'});
			}
        }
    }
</script>
<style scoped lang="less">
	.register{
		/*height: 100%;*/
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		padding-top: calc(2.5rem - 50px);
		background: url('../assets/img/login_register_bg.png') center center no-repeat;
		background-size: cover;
		background-attachment: fixed;
		.title {
			color: #606266;
			font-size: 20px;
			margin-bottom: 20px;
			text-align: center;
		}
		.register-form{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			/deep/ .el-form-item__label {
				padding: 0;
				line-break: 1.5;
			}
		}
	}
	.input {
		width: 240px;
		display: block;
	}
	.register-btn-box {
		width: 240px;
		/deep/ .el-form-item__content {
			margin-left: 0 !important;
			display:flex;
			align-items: flex-end;
			.login-btn {
				flex: 1;
				text-align: right;
				vertical-align: bottom;
			}
		}
		/deep/ .el-button--text {
			padding: 0;
			vertical-align: bottom;
		}
	}

</style>