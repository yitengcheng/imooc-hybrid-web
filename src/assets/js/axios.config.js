// axios 配置
import Vue from 'vue';
import axios from 'axios';

// 设置axios 请求 baseUrl
// axios.defaults.baseURL = 'http://www.fanzehua.cn/';
// 64ad1ce0 - f182 - 11e9 - acd3 - 7b90f1eac841

axios.interceptors.request.use((config) => {
    // if (config.params) {
    //     config.params.token = '64ad1ce0-f182-11e9-acd3-7b90f1eac841';
    // } else {
    //     config.params = {
    //         token: '64ad1ce0-f182-11e9-acd3-7b90f1eac841'
    //     };
    // }
    return config;
});
/**
 * 设置拦截器interceptors 相应处理
 * 所有使用axios的请求响应，都会优先回调到拦截器中
 * 在正确的返回情况下，数据会优先进入第一个回调
 * 在请求错误的情况下，错误会进入第二个回调
 */
axios.interceptors.response.use((response) => {
    // 统一处理数据，使组件中的请求只获取到需要的业务数据，
    // 而不需要去关注返回的状态码等与业务无关的数据
    return response.data;
}, (error) => {
    // 处理错误响应
    return Promise.reject(error);
});

// 绑定到 vue原型中，组件中：this.$http -> axios
Vue.prototype.$http = axios;
