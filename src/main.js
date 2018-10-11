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
import axios from './api/axios'
//封装的插件
import api from './api/index'
//joson转表单对象
import json2Form from './api/json2Form'
//Md5
import MD5 from '../static/js/MD5.min'
//导入 mint-ui
import MintUI from 'mint-ui'



//import BasicJs from './js/basic'
import VueWechatTitle from 'vue-wechat-title';
/*import VueResource from 'vue-resource'*/
import Filters from './api/filters'

//Vue.use(VueResource);
Vue.use(api);
Vue.use(json2Form);
Vue.use(MD5);
Vue.use(VueWechatTitle);
Vue.use(MintUI);
Vue.use(axios)
//Vue.use(BasicJs)
Vue.config.productionTip = false;

//判断用户是否处于登录状态，访问权限验证
let token ;

router.beforeEach((to,from,next)=>{


  // var Authorization = window.localStorage.getItem('Authorization');//Authorization数据
  //
  // if(!token){
  //
  //   token=Authorization;
  // }
  //
  // if(to.path!=='/login'){
  //
  //   console.log('不去登录')
  //
  //
  //   if((from.path === '/workDesk/homepage' && to.path === '/login')||(from.path === '/workDesk/homepage' && to.path === '/Register')){
  //
  //
  //     next({path: '/workDesk/homepage'})
  //
  //   }
  //
  //   else {
  //
  //     next()
  //
  //   }
  //
  //
  // }
  // else {
  //
  //
  //   if(Authorization!=token){
  //
  //     //window.location.reload();
  //   }
  //   if (to.path&&to.name) {
  //
  //     next()
  //
  //   }else {
  //
  //
  //
  //       next({ path: '/workDesk/homepage'})
  //
  //
  //   }
  //
  //
  // }

  var Authorization = window.localStorage.getItem('Authorization');//Authorization数据

  if(Authorization){

    next();

  } else {

    //console.log(to.path)

    if(to.path=='/login'||to.path=='/Register'||to.path=='/loadingPage'||to.path=='/forgetPsw'||to.path=='/Agreement'){

      next();

    }
    else  if((from.path === '/workDesk/homepage' && to.path === '/login')||(from.path === '/workDesk/homepage' && to.path === '/Register')){


         next({path: '/workDesk/homepage'})

     }
    else {

      next('/login');
    }

  }
})



  //如果跳转页面不是登录页面的话
/*  if(Authorization){

    //console.log(to.path)

    //console.log(to.path=='/'||to.path=='/login')

    if(from.path === '/workDesk/homepage' && to.path === '/login'){


      next({path: '/workDesk/homepage'})

    }
    else {

      next()

    }


  }else {

    console.log('没有token跳转登录页');

    //如果是loading页面或登录页面或者忘记密码或者注册

    if(to.path==='/loadingPage'||to.path ==='/'||to.path ==='/login'||to.path === '/Register' || to.path === '/forgetPsw'){

      next();

    }
    else {


        //不然就跳转到登录
        next({path: '/login'})
      }


  }*/



/*});*/

$(function () {

  window.addEventListener('popstate',function () {

    let thisBackRouter=localStorage.getItem('thisBackRouter');

    let thisPath=router.history.current.path;//此時路由

    if(thisPath!=thisBackRouter||thisPath.indexOf('transferDetail')>-1||thisPath.indexOf('cashDetail')>-1){

      localStorage.setItem('backNum',0);

    }

    let backNum=localStorage.getItem('backNum');


    if(backNum-1>0){

      localStorage.setItem('backing',1);//backing为1时，正在退回，0是没有退回



      localStorage.setItem('backNum',backNum);


      setTimeout(function () {

        window.history.go(1-backNum)

        console.log('backNum='+backNum)

        backNum=0;

      },1)


      //console.log('backing='+localStorage.getItem('backing'))

    }

    else {

      localStorage.setItem('backing',0);//backing为1时，正在退回，0是没有退回

      //alert(localStorage.getItem('backing'))

      //console.log('backing='+localStorage.getItem('backing'))

    }


  },false)

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
  router,
}).$mount('#app')// app 上装载 router
