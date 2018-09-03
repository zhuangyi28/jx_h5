import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login/login'
import workDesk from '@/pages/work_desk'
import homepage from '@/pages/wages/homepage/homepage'
import register from '@/pages/login/register/register'
import agreement from '@/pages/login/user_agreement/user_agreement'
import forgetPsw from '@/pages/login/forget_password/forget_password'
import mine from '@/pages/mine/mine'
import payroll from '@/pages/wages/payroll/payroll'
import company from '@/pages/company/company/company'
import CoAuthentication from '@/pages/company/authentication/authentication'
import locked from '@/pages/company/locked/locked'
import personalCenter from '@/pages/mine/personal_center/personal_center'
import telChange from '@/pages/mine/tel_change/tel_change'
import changeCertification from '@/pages/mine/change_certification/change_certification'
import chaneNewTel from '@/pages/mine/change_new_tel/change_new_tel'
import certification from '@/pages/mine/certification/certification'
import bankCard from '@/pages/mine/bank_card/bank_card'
import balance from '@/pages/balance/index/index'
import addCard from '@/pages/mine/add_card/add_card'
import bankList from '@/pages/mine/bank_list/bank_list'

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

      path: '/payroll',
      name: 'payroll',
      meta: {
        title: '工资条明细'
      },
      component: payroll,


    },

    {
      path: '/company',

      name: 'company',
      meta: {
        title: '我的发薪企业'
      },
      component: company,

    },

    {
      path: '/locked',

      name: 'locked',
      meta: {
        title: '身份验证'
      },
      component: locked,

    },

    {
      path: '/authentication',
      name: 'authentication',
      meta: {
        title: '身份验证'
      },
      component: CoAuthentication,

    },

    {
      path: '/personalCenter',
      name: 'personalCenter',
      meta: {
        title: '个人中心'
      },
      component: personalCenter
    },
    {
      path: '/telChange',
      name: 'telChange',
      meta: {
        title: '登录账号'
      },
      component: telChange
    },
    {
      path: '/changeCertification',
      name: 'changeCertification',
      meta: {
        title: '安全验证'
      },
      component: changeCertification
    },
    {
      path: '/changeNewTel',
      name: 'changeNewTel',
      meta: {
        title: '更换手机号'
      },
      component: chaneNewTel
    },
    {
      path: '/certification',
      name: 'certification',
      meta: {
        title: '实名认证'
      },
      component: certification
    },
    {
      path: '/bankCard',
      name: 'bankCard',
      meta: {
        title: '银行卡'
      },
      component: bankCard
    },
    {
      path: '/balance',
      name: 'balance',
      meta: {
        title: '工资余额'
      },
      component: balance
    },
    {
      path: '/bankCard',
      name: 'bankCard',
      meta: {
        title: '银行卡'
      },
      component: bankCard
    },
    {
      path: '/addCard',
      name: 'addCard',
      meta: {
        title: '添加银行卡'
      },
      component: addCard
    },
    {
      path: '/bankList',
      name: 'bankList',
      meta: {
        title: '支持添加的银行'
      },
      component: bankList
    },
    {
      path: '/workDesk',
      name: 'workDesk',
      component: workDesk,
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          meta: {
            title: '工资条'
          },
          component: homepage,

        },


       {
          path: 'mine',
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
