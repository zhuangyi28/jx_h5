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
import discovery from '@/pages/discovery/discovery'
import setHomepage from '@/pages/set/set_homepage/set_homepage'
import code from '@/pages/set/code/code'
import setPayPassword from '@/pages/set/set_payment_psw/payment_psw'
import payCertification from '@/pages/set/pay_certification/pay_certification'
import resetPayment from '@/pages/set/reset_payment/reset_payment'
import modifyPayPassWord from '@/pages/set/modify_paypassword/modify_paypassword'
import bill from '@/pages/balance/bill/bill'
import cashDetail from '@/pages/balance/cash_details/cash_details'
import transferDetail from '@/pages/balance/transfer_details/transfer_details'
import detailBill from '@/pages/balance/details/details'
import withdraw from '@/pages/balance/withdraw/withdraw'
import helpCenter from '@/pages/help/index/index'
import helpDetail from '@/pages/help/help_detail'
import paySuccess from '@/pages/balance/pay_success/pay_success'
import pswCertification from '@/pages/balance/psw_certification/psw_certification'
import smsCertification from '@/pages/balance/sms_certification/sms_certification'
import transfer from '@/pages/balance/transfer/transfer'
import transferAccounts from '@/pages/balance/transfer_accounts/transfer_accounts'
import transferHistoryUser from '@/pages/balance/transfer_history_user/transfer_history_user'
import accountCash from '@/pages/balance/account_cash/account_cash'
import transferSuccess from '@/pages/balance/transfer_success/transfer_success'
import feedbackList from '@/pages/feedback/list/list'
import feedback from '@/pages/feedback/feedback/feedback'
import changeLoginPsw from '@/pages/set/change_login_psw/change_login_psw'
import loadingPage from '@/pages/login/loading/loading'
import certificationPic from '@/pages/mine/certification_pic/certification_pic'
import certificationSuccess from '@/pages/mine/certification_success/certification_success'
import certificationFail from '@/pages/mine/certification_fail/certification_fail'
import share from '@/pages/balance/share/share'
import openPage from '@/pages/login/open/open'
import taskDetail from '@/pages/task/task_detail/task_details'
import lookTask from '@/pages/task/look_task/look_task'
import protocol from '@/pages/task/protocol/protocol'
import taskSquare from '@/pages/task/task_square/task_square'
import find from '@/pages/task/find/find'
import personInformation from '@/pages/task/person_information/person_information'
import taskFeedback from '@/pages/task/task_feedback/task_feedback'
import myTask from '@/pages/task/my_task/my_task'
import submitSuccess from '@/pages/task/submit_success/submit_success'
import taskFeedbackContent from '@/pages/task/task_feedback_content/task_feedback'
import salary from '@/pages/salary/salary'
import contractList from '@/pages/contract/contract_list/contract_list'
import contractDetail from '@/pages/contract/contract_detail/contract_detail'
import sign from '@/pages/contract/sign/sign'
import certificationChoose from '@/pages/mine/certification_choose/certification_choose'
import IDCardCertification from '@/pages/mine/IDcard_certification/IDcard_certification'
import anotherCertification from '@/pages/mine/another_certification/another_certification'
import IDCardInformation from '@/pages/mine/IDCard_information/IDCard_information'
import certificationState from '@/pages/mine/certification_state/certification_state'
import countryList from '@/pages/mine/country_list/country_list'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [

    {
      path: '/openPage',
      name: 'openPage',
      meta: {
        title: ''
      },
      component: openPage,
    },
    {
      path: '/loadingPage',
      name: 'loadingPage',
      meta: {
        title: ''
      },
      component: loadingPage,
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录',
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
        title: ''
      },
      component: payroll,


    },
    {
      path: '/company',

      name: 'company',
      meta: {
        title: '发薪企业'
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
        title: '收入余额'
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
      path: '/setHomepage',
      name: 'setHomepage',
      meta: {
        title: '设置'
      },
      component: setHomepage
    },
    {
      path: '/code',
      name: 'code',
      meta: {
        title: ''
      },
      component: code,

    },
    {
      path: '/setPayPassword',
      name: 'setPayPassword',
      meta: {
        title: '设置支付密码'
      },
      component: setPayPassword
    },
    {
      path: '/payCertification',
      name: 'payCertification',
      meta: {
        title: '支付验证设置'
      },
      component: payCertification
    },
    {
      path: '/resetPayment',
      name: 'resetPayment',
      meta: {
        title: '重置支付密码'
      },
      component: resetPayment
    },
    {
      path: '/changeLoginPsw',
      name: 'changeLoginPsw',
      meta: {
        title: '修改登录密码'
      },
      component: changeLoginPsw
    },
    {
      path: '/modifyPayPassWord',
      name: 'modifyPayPassWord',
      meta: {
        title: '修改支付密码'
      },
      component: modifyPayPassWord


    },
    {
      path: '/bill',
      name: 'bill',
      meta: {
        title: ''
      },
      component: bill
    },
    {
      path: '/cashDetail',
      name: 'cashDetail',
      meta: {
        title: '提现详情'
      },
      component: cashDetail
    },
    {
      path: '/transferDetail',
      name: 'transferDetail',
      meta: {
        title: '转账详情'
      },
      component: transferDetail
    },
    {
      path: '/details',
      name: 'details',
      meta: {
        title: '余额明细'
      },
      component: detailBill
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      meta: {
        title: '提现'
      },
      component: withdraw
      },
    {
      path: '/helpCenter',
      name: 'helpCenter',
      meta: {
        title: '帮助与客服'
      },
      component: helpCenter
    },
    {
      path: '/helpDetail',
      name: 'helpDetail',
      meta: {
        title: '问题详情'
      },
      component: helpDetail

    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      meta: {
        title: '提现申请已提交'
      },
      component: paySuccess
    },
    {
      path: '/pswCertification',
      name: 'pswCertification',
      meta: {
        title: '输入支付密码'
      },
      component: pswCertification
    },
    {
      path: '/smsCertification',
      name: 'smsCertification',
      meta: {
        title: '短信支付验证',
        //keepAlive: true // 需要被缓存
      },
      component: smsCertification,

    },
    {
      path: '/transfer',
      name: 'transfer',
      meta: {
        title: '转账'
      },
      component: transfer
    },
    {
      path: '/transferAccounts',
      name: 'transferAccounts',
      meta: {
        title: '转账'
      },
      component: transferAccounts
    },
    {
      path: '/transferHistoryUser',
      name: 'transferHistoryUser',
      meta: {
        title: '转账'
      },
      component: transferHistoryUser
    },
    {
      path: '/accountCash',
      name: 'accountCash',
      meta: {
        title: '转账'
      },
      component: accountCash
    },
    {
      path: '/transferSuccess',
      name: 'transferSuccess',
      meta: {
        title: '转账成功'
      },
      component: transferSuccess
    },
    {
      path: '/feedbackList',
      name: 'feedbackList',
      meta: {
        title: '消息'
      },
      component: feedbackList
    },
    {
      path: '/feedback',
      name: 'feedback',
      meta: {
        title: '工资条反馈'
      },
      component: feedback
    },
    {
      path: '/certificationPic',
      name: 'certificationPic',
      meta: {
        title: '实名认证'
      },
      component: certificationPic
    },
    {
      path: '/certificationSuccess',
      name: 'certificationSuccess',
      meta: {
        title: '实名认证'
      },
      component: certificationSuccess
    },
    {
      path: '/certificationFail',
      name: 'certificationFail',
      meta: {
        title: '实名认证'
      },
      component: certificationFail
    },
    {
      path: '/certificationFail',
      name: 'certificationFail',
      meta: {
        title: '实名认证'
      },
      component: certificationFail
    },
    {
      path: '/taskDetail',
      name: 'taskDetail',
      meta:{
        title: '任务详情'
      },
      component: taskDetail
    },
    {
      path: '/protocol',
      name: 'protocol',
      meta: {
        title: '任务广场'
      },
      component: protocol
    },
    {
      path: '/find',
      name: 'find',
      meta:{
        title: '搜索'
      },
      component: find
    },
    {
      path: '/personInformation',
      name: 'personInformation',
      meta: {
        title: '个人履历'
      },
      component: personInformation
    },
    {
      path: '/taskFeedback',
      name: 'taskFeedback',
      meta: {
        title: '任务反馈'
      },
      component: taskFeedback
    },

    {
      path: '/taskFeedbackContent',
      name: 'taskFeedbackContent',
      meta: {
        title: '任务反馈'
      },
      component: taskFeedbackContent
    },
    {
      path: '/myTask',
      name: 'myTask',
      meta: {
        title: '众包任务'
      },
      component: myTask
    },
    {
      path: '/submitSuccess',
      name: '/submitSuccess',
      meta: {
        title: '提交成功'
      },
      component: submitSuccess
    },
    {
      path: '/sign',
      name: '/sign',
      meta: {
        title: ''
      },
      component: sign
    },
    {
      path: '/salary',
      name: 'salary',
      meta:{
        title: '工资条'
      },
      component: salary
    },

    {
      path: '/workDesk',
      name: 'workDesk',
      component: workDesk,
      children: [
        {
          path: 'taskSquare',
          name: 'taskSquare',
          meta: {
            title: '任务广场',
            auth: true,
            keepAlive:true,
          },
          component: taskSquare,
          alias: 'homepage'


        },
        {
          path: 'discovery',
          name: 'discovery',
          meta: {
            title: '发现'

          },
          component: discovery,

        },

       {
          path: 'mine',
          name: 'mine',
          meta: {
            title: '我的'
          },
          component: mine
        },
        {
          path: '/lookTask',
          name: 'lookTask',
          meta:{
            title: '查看任务'
          },
          component: lookTask
        }
      ]
    },
    {
      path: '/share',
      name: 'share',
      meta: {
        title: '分享'
      },
      component: share
    },
    {
      path: '/contractList',
      name: 'contractList',
      meta: {
        title: '我的签约'
      },
      component: contractList
    },
    {
      path: '/contractDetail',
      name: 'contractDetail',
      meta: {
        title: '详情'
      },
      component: contractDetail
    },
    {
      path: '/certificationChoose',
      name: 'certificationChoose',
      meta: {
        title: ''
      },
      component: certificationChoose
    },
    {
      path: '/IDCardCertification',
      name: 'IDCardCertification',
      meta: {
        title: '实名认证'
      },
      component: IDCardCertification
    },
    {
      path: '/anotherCertification',
      name: 'anotherCertification',
      meta: {
        title: '实名认证'
      },
      component: anotherCertification
    },
    {
      path: '/IDCardInformation',
      name: 'IDCardInformation',
      meta: {
        title: '实名认证'
      },
      component: IDCardInformation
    },
    {
      path: '/certificationState',
      name: 'certificationState',
      meta: {
        title: '实名认证'
      },
      component: certificationState
    },
    {
      path: '/countryList',
      name: 'countryList',
      meta: {
        title: '国籍选择'
      },
      component: countryList
    }


  ]
})



