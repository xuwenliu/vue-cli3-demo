module.exports = {
    baseUrl:"./",
    devServer: {
        port: 8090,
        proxy:{
            '/api': {
                // target: "http://192.168.0.50:6060",
                target: "http://aaa.dev.agency.me",
                
                ws:true,
                changeOrigin: true,//是否跨域
            },
        }
        
    }
}