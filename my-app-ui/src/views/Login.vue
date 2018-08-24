<template>
    <div class="login">
        <div class="title">登录</div>
        <el-form class="login-form" label-position="right" :model="userInfo" size="small" ref="loginForm" :rules="validateRules" status-icon>
            <el-form-item prop="account">
                <el-input class="input" v-model="userInfo.account" placeholder="请输入账号" required></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" class="input" v-model="userInfo.password" placeholder="请输入密码" required></el-input>
            </el-form-item>
            <el-form-item class="login-btn-box">
                <el-button class="fl" size="mini" type="primary" @click="login('loginForm')" :loading="loading.status">{{loading.desc}}</el-button>
                <el-button class="register-btn fr" type="text" @click="goRegister">暂无账号去注册</el-button>
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
                    callback();
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
                validateRules: {
                    account: [{
                        validator: validateAccount,
                        trigger: 'change'
                    }],
                    password: [{
                        validator: validatePassword,
                        trigger: 'change'
                    }],
    
                }
            };
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', function() {
                    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                        window.setTimeout(function() {
                            document.activeElement.scrollIntoViewIfNeeded();
                        }, 0);
                    }
                })
            })
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
                        this.$router.replace({
                            'name': 'index'
                        });
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
            },
            goRegister() {
                this.$router.push({
                    'name': 'register'
                });
            }
        }
    
    }
</script>

<style scoped lang="less">
    .login {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: 1.6rem/* 120/75 */
        ;
        background: url('../assets/img/login_register_bg.gif') center center no-repeat;
        background-size: cover;
        background-attachment: fixed;
        .title {
            color: #fff;
            width: 6.93333rem/* 520/75 */
            ;
            margin: 0 auto 18px;
            font-size: .53333rem/* 40/75 */
            ;
            text-align: center;
        }
        .login-form {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            /deep/ .el-form-item__label {
                padding: 0 .32rem/* 24/75 */
                0 0;
            }
        }
    }
    
    .input {
        width: 6.93333rem/* 520/75 */
        ;
        display: block;
    }
    
    .login-btn-box {
        width: 6.93333rem/* 520/75 */
        ;
        /deep/ .el-form-item__content {
            .register-btn {
                margin-top: .34667rem/* 26/75 */
                ;
            }
        }
        /deep/ .el-button--text {
            padding: 0;
        }
    }
</style>