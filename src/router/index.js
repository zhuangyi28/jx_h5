import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login/login'
import workDesk from '@/pages/work_desk'
import homepage from '@/pages/wages/homepage/homepage'
import register from '@/pages/login/register/register'
import agreement from '@/pages/login/user_agreement/user_agreement'
import forgetPsw from '@/pages/login/forget_password/forget_password'
import mine from '@/pages/mine/mine'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: login
    },
    {

      path: '/register',
      name: 'Register',
      meta: {
        title: '注册'
      },
      component: register
    },

    {
      path: '/agreement',
      name: 'Agreement',
      meta: {
        title: '用户注册协议'
      },
      component: agreement


    },
    {
      path: '/forgetPsw',
      name: 'forgetPsw',
      meta: {
        title: '忘记密码'
      },
      component: forgetPsw


    },
    {
      path: '/workDesk',
      name: 'workDesk',
      component: workDesk,
      redirect: '/workDesk/homepage',
      children: [
        {
          path: '/workDesk/homepage',
          name: 'homepage',
          meta: {
            title: '工资条'
          },
          component: homepage
        },
       {
          path: '/workDesk/mine',
          name: 'mine',
          meta: {
            title: '我的'
          },
          component: mine
        }
      ]
    }


  ]
})
