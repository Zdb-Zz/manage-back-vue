import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/usertable',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/userTable.vue'),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/travelTable',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/travelTable.vue'),
                    meta: { title: '游记列表' }
                },
                {
                    path: '/routeTable',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/routeTable.vue'),
                    meta: { title: '路线列表' }
                },
                {
                    path: '/topicTable',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/topicTable.vue'),
                    meta: { title: '话题列表' }
                },
                {
                    path: '/cityTable',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/cityTable.vue'),
                    meta: { title: '城市列表' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
