// vue.config.js
const path = require('path');

module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
            return {
                resolve: {
                    alias: {
                        '@js': path.resolve(__dirname, './src/assets/js'),
                        '@css': path.resolve(__dirname, './src/assets/css'),
                        '@img': path.resolve(__dirname, './src/assets/images'),
                        '@c': path.resolve(__dirname, './src/components')
                    }
                }
            };
        }
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck: true
        // proxy: {// 反向代理的方式解决跨域
        //     '/api': {
        //         target: 'http://192.168.0.118:4000'
        //     },
        //     '/uploads': {
        //         target: 'http://192.168.0.118:4000'
        //     }
        // }
    }
};
