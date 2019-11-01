import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/goodsList',
            name: 'goodsList',
            // vue-router 懒加载 ->只有在使用到了才加载
            component: () => import(/* webpackChunkName:"GoodsList" */'./views/GoodsList.vue')
        }
    ]
});
