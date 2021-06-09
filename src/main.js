import Vue from 'vue'

import { Drawer } from 'ant-design-vue';
import {Row,Menu,Table,TableColumn,Submenu,MenuItem,Col,TabPane,Tabs} from 'element-ui';

import VueRouter from 'vue-router';
import App from './App.vue'
import router from './router/index'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'


// Vue.component(Tabs.name,Tabs)
Vue.component(Drawer.name,Drawer)
Vue.use(Row)
Vue.use(Menu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueCodemirror)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
