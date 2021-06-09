import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RouteList = [{
    path: '/',
    component: resolve => require(['../components/Layout/App.vue'], resolve),
    meta: {
        title: '首页',
        keepAlive: false,
    },
    children: [{
            path: '/Position',
            name: 'Position',
            meta: {
                title: '服务图斑定位',
                keepAlive: true,
            },
            component: resolve => require(['../views/Position/index.vue'], resolve),
        },
        {
            path: '/Windowsize',
            name: 'Windowsize',
            meta: {
                title: '弹窗大小设置',
                keepAlive: true,
            },
            component: resolve => require(['../views/Windowsize/index.vue'], resolve),
        },
        {
            path: '/LayerControl',
            name: 'LayerControl',
            meta: {
                title: '图层控制接口',
                keepAlive: false,
            },
            component: resolve => require(['../views/LayerControl/index.vue'], resolve),
        },
        {
            path: '/AddElements',
            name: 'AddElements',
            meta: {
                title: '添加临时元素',
                keepAlive: false,
            },
            component: resolve => require(['../views/AddElements/index.vue'], resolve),
        },
        {
            path: '/RemoveElements',
            name: 'RemoveElements',
            meta: {
                title: '删除临时元素',
                keepAlive: false,
            },
            component: resolve => require(['../views/RemoveElements/index.vue'], resolve),
        },
        {
            path: '/ElementFiltering',
            name: 'ElementFiltering',
            meta: {
                title: '图层要素筛选',
                keepAlive: false,
            },
            component: resolve => require(['../views/ElementFiltering/index.vue'], resolve),
        },
        {
            path: '/AdministrativePositioning',
            name: 'AdministrativePositioning',
            meta: {
                title: '行政区定位',
                keepAlive: false,
            },
            component: resolve => require(['../views/AdministrativePositioning/index.vue'], resolve),
        },
        {
            path: '/GraphicsRendering',
            name: 'GraphicsRendering',
            meta: {
                title: '简单图形绘制',
                keepAlive: false,
            },
            component: resolve => require(['../views/GraphicsRendering/index.vue'], resolve),
        },
        {
            path: '/QueryInterface',
            name: 'QueryInterface',
            meta: {
                title: '图层查询接口',
                keepAlive: false,
            },
            component: resolve => require(['../views/QueryInterface/index.vue'], resolve),
        },
    ]
}]

export default new Router({routes: RouteList})