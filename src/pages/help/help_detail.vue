<template>

  <helpPages :ask="ask" :answer="answer"></helpPages>

</template>

<script>

  //帮助
  import helpPages from '../../components/help/help'

  export default{

    name: 'paymentDate',

    components: {

      helpPages: helpPages,


    },

    data(){

      return {

        ask:'',

        answer:''

      }

    },

    mounted () {

        var _helpPage = this.getStorage('helpPage') || 'orange';


        var anotherCompany = this.getCookie('anotherCompany');

       if(_helpPage=='1'){

            this.ask = '提现到账时间？';

            this.answer = '提现申请提交成功后，工作日(9:00-17:30)一般2小时内到账，具体以银行为准。';


       }

       else if(_helpPage=='2'){

         this.ask = '提现申请提交后，可以撤回吗？';

         this.answer = '为保证您的资金安全，提现一旦提交后，即不可撤回和取消';

       }
       else if(_helpPage=='3'){

         this.ask = '提现失败，如何处理？';

         this.answer = '若提现失败，平台会为您退款，1-5个工作日内，相关金额将原路退回至您的支付账户，正常退款时间内，建议咨询相关银行';

       }
       else if(_helpPage=='4'){

         this.ask = '提现限额？';

         this.answer = '单卡单笔49,000.00元，当日100,000.00元，当月100,000.00元，若同一身份证绑定多个账户，则账户间共享提现额度。';

       }
       else if(_helpPage=='5'){

         this.ask = '如何设置支付密码？';

         anotherCompany == 'blue' && (this.answer = '如您需要设置支付密码，请先完成实名认证后，进行以下操作：<br/>手机登录账户，进入【我的】—【设置】—【设置支付密码】，验证手机号后，设置支付密码即可。');

         anotherCompany == 'orange' && (this.answer = '如您需要设置支付密码，请先完成实名认证后，进行以下操作：<br/>手机登录嘉薪账户，进入【我的】—【设置】—【设置支付密码】，验证手机号和身份证后，设置支付密码即可。');

       }
       else if(_helpPage=='6'){

         this.ask = '忘记修改支付密码怎么办？';

         anotherCompany == 'blue' && (this.answer = '如您想修改或找回支付密码，请您这样操作：<br/>手机登录账户，进入【我的】—【设置】—【重置支付密码】,若您想修改支付密码，可通过【修改支付密码】，输入原密码并设置新密码即可修改您的支付密码,若您忘记支付密码，可通过【忘记支付密码】，验证手机号后，设置新密码即可修改您的支付密码。');

         anotherCompany == 'orange' && (this.answer = '如您想修改或找回支付密码，请您这样操作：<br/>手机登录嘉薪账户，进入【我的】—【设置】—【重置支付密码】,若您想修改支付密码，可通过【修改支付密码】，输入原密码并设置新密码即可修改您的支付密码,若您忘记支付密码，可通过【忘记支付密码】，验证手机号和身份证后，设置新密码即可修改您的支付密码。')

       }
       else if(_helpPage=='7'){

         this.ask = '如何关闭支付验证？';

         anotherCompany == 'blue' && (this.answer = '关闭支付验证可能会产生资金安全隐患，平台暂不支持关闭支付验证。');

         anotherCompany == 'orange' && (this.answer = '关闭支付验证可能会产生资金安全隐患，请谨慎操作，对此产生的资金安全问题由您本人承担，若您需要关闭支付验证，可通过【我的】—【设置】—【支付验证】，关闭支付验证，关闭时需验证手机或原支付密码，验证后即可关闭。');

       }
       else if(_helpPage=='8'){

         this.ask = '如何同意企业邀请？';

         this.answer = '当企业首次发放工资或工资条时，会邀请您加入企业，您验证加入后才可查看该企业发放的工资和工资条，同一企业只需加入一次；<br/>若您收到企业邀请查看工资条的申请，可点击【查看】，验证身份证号后六位即可加入该企业；<br/>您也可以通过【我的】—【发薪企业】，查看待加入企业，验证身份证号后六位即可加入该企业。';

       }

       else if(_helpPage=='9'){

         this.ask = '不加入企业会有何影响？';

         this.answer = '若您在收到查看工资条邀请时，未选择查看并验证身份，即为未加入企业状态，此时不可查看和接收该企业发送的工资和工资条。首次接收该企业工资和工资条时，必须通过身份验证，才可查看。';

       }
       else if(_helpPage=='10'){

         this.ask = '加入企业时，身份验证不通过怎么办？';

         this.answer = '若您在加入企业时，身份验证不通过，请您联系给您发薪的企业HR确定以下问题：<br/>1、HR发放工资时，您的姓名是否填写正确，若填写错误，可通过HR修改您的姓名后，重新验证。<br/>2、HR发放工资时，您的身份证号是否填写正确，若填写错误，您可选择以下方式：<br/>1）可联系HR修改您的身份证号后，在【发薪企业】中重新验证；<br/>2）您也可以在【我的】—【个人中心】进行实名认证，认证成功后，即可使用新的身份信息在【发薪企业】中重新验证。';

       }

    },

  }
</script>
