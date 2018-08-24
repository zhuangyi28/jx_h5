// 通过 `import` 命令加载 Vue 构建版本（runtime-only 或 standalone），
// 该构建版本已在webpack.base.conf中设置了别名。
//引入公共样式
// 导入 vue 实例
import Vue from 'vue'
// 导入 App 组件
import App from './App'
// 导入 路由
import router from './router'
//http.js文件，即全局配置axios请求，与main.js在同级目录
import axios from 'axios'
//封装的插件
import api from './utils/index'
//joson转表单对象
import json2Form from './utils/json2Form'
//Md5
import MD5 from '../static/js/MD5.min'
//导入 mint-ui
import MintUI from 'mint-ui'

import VueWechatTitle from 'vue-wechat-title';
import VueResource from 'vue-resource'
 import Filters from './utils/filters'
//跨域
Vue.prototype.API_HOST = '/api';

Vue.prototype.$http = axios;

axios.defaults.withCredentials=true;

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(api);
Vue.use(json2Form);
Vue.use(MD5);
Vue.use(VueWechatTitle);
Vue.use(MintUI);


Vue.http.interceptors.push(function(request, next) {//拦截器
// 跨域携带cookie
  request.credentials = true;
  next()
})


//实例化 vue 实例
new Vue({
// 定义根组件的选择器
  el: '#app',
  // 根组件的 template
  template: '<app></app>',
  // 声明根组件可以访问的组件
  components: { App },
  // 传入 router 到 vue 实例
  router
}).$mount('#app')// app 上装载 router
