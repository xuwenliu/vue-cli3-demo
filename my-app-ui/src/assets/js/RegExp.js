/**
 * create by xuwenliu 2018/8/20
 */
export default {
    account:/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,//帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
    password:/[A-Za-z0-9_]{6,20}/,//6-20位字母数字下划线密码
}