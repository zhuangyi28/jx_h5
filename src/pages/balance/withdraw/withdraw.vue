<template>
  <div class="withdraw" v-on:click="inputShow=false">
    <div class="withdraw_info">
      <div class="withdraw_type">
        <div class="bankcard" v-bind:class="{'used color_text':(withdrawType == 'bankCard')}" v-on:click="withdrawBank">提现到银行卡</div>
        <div class="alipay" v-bind:class="{'used color_text': (withdrawType == 'alipay')}" v-on:click="withdrawAlipay">提现到支付宝</div>
      </div>
      <div class="withdraw_bank color_background_gradient">
        <!--银行卡提现-->
        <div v-if="withdrawType == 'bankCard'">
          <div class="withdraw_bank_info" v-if="JSON.stringify(this.userBankCard) == '{}'" v-on:click="$router.push('/addCard')">
            <div class="add_bank">
              <div class="add person_bg_color">+</div>
              <div>添加银行卡</div>
            </div>
          </div>
          <div class="withdraw_bank_info" v-else v-on:click="$router.push('bankCard')">
            <img v-bind:src="userBankCard.img">
            <div class="bank_info">
              <span class="bank_name">{{userBankCard.bankName}}</span>
              <span class="bank_type">{{userBankCard.cardType}}</span>
              <span class="bank_No">**** **** **** {{(userBankCard.bankNo + '').substr(-4)}}</span>
            </div>
          </div>
        </div>
        <!--支付宝提现-->
        <div v-else-if="withdrawType == 'alipay'">
          <div class="withdraw_alipay_info" v-if="JSON.stringify(this.alipay) == '{}'" v-on:click="$router.push('/addAlipay')">
            <div class="add_bank">
              <div class="add person_bg_color">+</div>
              <div>添加支付宝账号</div>
            </div>
          </div>
          <div class="withdraw_alipay_info" v-else v-on:click="$router.push('alipayList')">
            <img src="../../../../static/images/alipay.png">
            <div class="alipay_info">
              <span class="alipay_name">{{alipay.userName}}</span>
              <span class="alipay_No">{{alipay.alipayNo}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="withdraw_money">
        <div class="withdraw_money_ps">单笔￥<span>{{amountMin|thousandBitSeparator}}</span>-￥<span>{{amountMax|thousandBitSeparator}}</span>（手续费<span>{{rate}}</span>%）</div>
        <div class="withdraw_money_input">
          <span>￥</span>
          <div v-on:click="inputNum('show')" v-on:click.stop>
            <span class="money_show">{{withdrawMoney}}</span>
            <span class="input_cursor" v-if="inputShow==true"></span>
            <span v-if="withdrawMoney.length == 0">请输入提现金额</span>
          </div>
        </div>
        <div class="withdraw_money_show">
          <span>可提额度{{balance|thousandBitSeparator}}元<span class="pop_up" v-on:click="popUp">?</span></span>
          <span class="color_text" v-on:click="inputNum('all')">全部提现</span>
        </div>
      </div>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="withdrawFn"></orangeBtn>
    <div class="withdraw_ps" v-if="withdrawType == 'bankCard'">
      <div class="title">温馨提示</div>
      <div class="content">
        <span>1、订单提交后工作日一般2小时内处理，如出款失败，则5个工作日内退款至原支付账户，具体以银行时间为准</span>
      </div>
      <div class="content">
        <span>2、限额说明：单卡单笔<span>{{amountMax|thousandBitSeparator}}</span>元，当日{{dayMaxAmount|thousandBitSeparator}}元，当月{{monthMaxAmount|thousandBitSeparator}}元</span>
      </div>
      <div class="content">
        <span>3、若提现时系统频繁退款，建议您更换银行卡后重新提现或联系客服处理</span>
      </div>
    </div>
    <div class="withdraw_ps" v-else-if="withdrawType == 'alipay'">
      <div class="title">温馨提示</div>
      <div class="content">
        <span>1、提现支付宝账号须支付宝实名认证才能到账，到账时间为提交后1-2小时。</span>
      </div>
      <div class="content">
        <span>2、请提交订单前确认邮箱和手机绑定了单一支付宝账户，否则会提现失败。</span>
      </div>
      <div class="content">
        <span>3、限额说明：单笔<span>{{amountMax|thousandBitSeparator}}</span>元，当日{{dayMaxAmount|thousandBitSeparator}}元，当月{{monthMaxAmount|thousandBitSeparator}}元</span>
      </div>
    </div>

    <!-- 联系客服-->

    <div class="withdraw_service">

      <div class="footer">
        <span v-on:click="customerFn"><i class="iconfont icon-withdraw_custom color_text"></i>联系客服</span><span v-on:click="moreShow=true"><i class="iconfont icon-withdraw_more color_text"></i>更多</span>
      </div>

    </div>
<!--    <serviceArea :type1="serviceLeft" :type2="serviceRight" :iconName1="iconName1" :iconName2="iconName2" v-on:clickEventLeft="customerFn" v-on:clickEventRight="moreShow=true" :spanShow="true"></serviceArea>-->
    <!--确认提现按钮-->
    <mt-popup v-model="withdrawClick" position="bottom">
      <div class="withdraw_money_info">
        <div class="withdraw_title">确认提现<span class="close_btn" v-on:click="withdrawClick=false"></span></div>
        <div class="withdraw_detail">
          <div class="pay_money">
            <span>支付金额</span>
            <span>￥{{((+withdrawMoney)+(+rate/100*(+withdrawMoney))).toFixed(2)|thousandBitSeparator}}</span>
          </div>
          <div class="withdraw_money">
            <span>提现金额</span>
            <span>￥{{(+withdrawMoney).toFixed(2)|thousandBitSeparator}}</span>
          </div>
          <div class="rate_money">
            <span>手续费</span>
            <span>￥{{(+rate/100*(+withdrawMoney)).toFixed(2)|thousandBitSeparator}}</span>
          </div>
        </div>
      </div>
      <orangeBtn v-bind:name="withdrawBtnName" v-on:clickEvent="jumpTo"></orangeBtn>
    </mt-popup>
    <!--更多按键弹出框-->
    <mt-popup position="bottom" v-model="moreShow">
      <div class="more">
        <div class="choose">
          <div v-on:click="cashBillfn">提现记录</div>
          <div v-on:click="$router.push('/helpCenter')">常见问题</div>
        </div>
        <div class="close" v-on:click="moreShow = false">取消</div>
      </div>
    </mt-popup>
    <!--键盘-->
    <transition name="toggle">
      <calculation v-on:num="numInput" v-if="inputShow" v-bind:newNum="withdrawMoney" v-on:inputClose="inputClose" key="money"></calculation>
    </transition>
    <!--输入密码/验证码-->
    <keep-alive>
      <passwordInput v-if="passwordInputShow" v-on:boxClose="passwordInputShow=false" v-on:clickEvent="submit" v-on:getCode="getAgain" v-on:getSoundCode="getSoundCode"></passwordInput>
    </keep-alive>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn';
  import serviceArea from '../../../components/service/service'
  import {bankCardJson} from "../../../../static/js/bankCardJson";
  import { customerInit, customerClick } from "../../../../static/js/basic"
  import calculation from '../../../components/keyboard/calculation'
  import passwordInput from '../../../components/password_box/password_box'
  export default {
    name: 'withdraw',
    components: {
      orangeBtn: orangeBtn,
      serviceArea: serviceArea,
      calculation: calculation,
      passwordInput: passwordInput
    },
    data () {
      return {
        btnName: '确认提现',//按钮名称
        withdrawMoney: '',//提现金额
        amountMax: '',//最大提现金额
        amountMin: '',//最小提现金额
        balance: '',//账户余额
        dayMaxAmount: '',//每日最大提现金额
        monthMaxAmount: '',//每月最大提现金额
        rate: '',//费率,
        isSecurity: '',//支付验证方式
        userBankCard: {},//银行卡信息
        bankCardJson: bankCardJson,//银行卡信息数组
        changeValue: '',//选择银行卡弹窗的数值
        withdrawClick: false,//控制提现弹窗是否显示
        withdrawBtnName: '确认',//提现弹窗按钮名称
        moreShow: false,//控制联系客服按钮是否显示
        inputShow: true,//控制输入框是否显示
        passwordinput: false,//输入密码/验证码弹出框是否显示
        password: '',//密码/验证码
        used: true,//获取验证码按钮判断
        seconds: '',//倒计时
        mobile: '',//用户手机号

        passwordInputShow: false,

        soundCodeTime: 60,

        withdrawType: 'bankCard',

        alipay: {}
/*
        serviceLeft: '联系客服',
        serviceRight: '更多',
        iconName1:'icon-withdraw_custom',
        iconName2:'icon-withdraw_more',
*/

      }
    },
    mounted () {

      this.getData();

    },
    destroyed (){
      this.$messagebox.close();
    },
    watch: {
      //监听提现金额格式
      withdrawMoney: function () {
        var reg = /^\d+\.?(\d{1,2})?$/;
        if(this.withdrawMoney == ''){
          return;
        }
        else if(this.withdrawMoney == '00'){
          this.withdrawMoney = 0;
        }
        else if(isNaN(+this.withdrawMoney) || !reg.test(this.withdrawMoney)){
          this.withdrawMoney = this.withdrawMoney.slice(0,-1);
        }
      }
    },
    methods: {

      /*页面初始化*/
      getData: function () {
        localStorage.setItem('withdraw','true');

        (!!this.$store.type) && (this.withdrawType = 'alipay') && (delete this.$store.type);

        //美恰初始化
        customerInit({
          name:this.getStorage('userName'),// 名字
          tel:this.getStorage('mobile'),// 电话
        });

        if(localStorage.getItem('mobile')){

          this.mobile = localStorage.getItem('mobile');
        }


        this.withdrawType == 'bankCard' && (this.withdrawBank());

        this.withdrawType == 'alipay' && (this.withdrawAlipay());

      },



      withdrawBank: function () {

        /**
         * 接口：检测用户发起提现操作
         * 请求方式：GET
         * 接口：user/work/checkwithdraw
         * 入参：null
         **/
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'user/work/checkwithdraw'
        }).then(res=>{

          console.log(res);
          if(res.data.code == '0000'){
            this.amountMax = res.data.data.amountMax;
            this.amountMin = res.data.data.amountMin;
            this.balance = res.data.data.balance;
            this.dayMaxAmount = res.data.data.dayMaxAmount;
            this.monthMaxAmount = res.data.data.monthMaxAmount;
            this.rate = res.data.data.rate;

            this.changeBankDetail(res.data.data.userBankCardDTOList);

            this.withdrawType = 'bankCard';

            this.inputShow = true;
          }
        });

      },


      withdrawAlipay: function () {

        /**
         * 接口：获取支付宝限额信息
         * 请求方式：GET
         * 接口：user/withdraw/getalipaylimit
         * 入参：null
         * */
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'user/withdraw/getalipaylimit'
        }).then(res=>{

          if(res.data.code == '0000'){

            this.amountMax = res.data.data.amountMax;
            this.amountMin = res.data.data.amountMin;
            this.balance = res.data.data.balance;
            this.dayMaxAmount = res.data.data.dayMaxAmount;
            this.monthMaxAmount = res.data.data.monthMaxAmount;
            this.rate = res.data.data.rate;

            this.getAlipay();

            this.withdrawType = 'alipay';

            this.inputShow = true;

          }

        });

      },

      //修改银行卡信息
      changeBankDetail: function (data) {

        if(!!data){

          if(!!this.$store.bank){

            for(var bankCard of data){

              if(this.$store.bank.bankNo == bankCard.bankNo){

                this.userBankCard = bankCard;

              }

            }

          }else{

            this.userBankCard = data[0];

          }

          this.userBankCard.cardType == 1 ? (this.userBankCard.cardType = '储蓄卡') : (this.userBankCard.cardType = '信用卡');

          for(var bankImgList of this.bankCardJson){
            if(bankImgList.name == this.userBankCard.bankName){
              this.userBankCard.img = bankImgList.img;
            }
          }

        }

      },

      //弹出限额提醒
      popUp: function () {
        var message;
        this.withdrawType == 'alipay' && (message = '单笔');
        this.withdrawType == 'bankCard' && (message = '单卡单笔');

        this.$messagebox({
          title: '提现限额说明',
          message: message+this.amountMax+'元，当日'+this.dayMaxAmount+'元，当月'+this.monthMaxAmount+'元',
          confirmButtonText: '确认',
          confirmButtonClass:'confirm_btn_orange',
        });
      },

      checkWithdraw: function () {

        var reg = /^\d+\.?(\d{1,2})?$/;
        var dot = /([1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?)/;
        if(JSON.stringify(this.userBankCard) == '{}' && this.withdrawType == 'bankCard'){

          this.$toast({
            message: '请先绑定银行卡',
            position: 'bottom',
            duration: 1500
          });
          return false;

        }
        if(JSON.stringify(this.alipay) == '{}' && this.withdrawType == 'alipay'){

          this.$toast({
            message: '请先绑定支付宝账号',
            position: 'bottom',
            duration: 1500
          });
          return false;

        }
        if(this.withdrawMoney == ''){
          this.$toast({
            message: '请输入金额',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }
        if(parseFloat(this.withdrawMoney) < parseFloat(this.amountMin)){
          this.$toast({
            message: '单笔提现金额需大于'+this.amountMin+'元',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }
        if(parseFloat(this.withdrawMoney) > parseFloat(this.amountMax)){
          this.$toast({
            message: '单笔提现金额需小于'+this.amountMax+'元',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }
        if(parseFloat(this.withdrawMoney) > parseFloat(this.dayMaxAmount)){
          this.$toast({
            message: '提现金额超出当日最大额度',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }
        if(parseFloat(this.withdrawMoney) > parseFloat(this.monthMaxAmount)){
          this.$toast({
            message: '提现金额超出当月最大限额',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }
        if(parseFloat(this.withdrawMoney) > parseFloat(this.balance)){
          this.$toast({
            message: '金额已超过可提余额',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }
        if(!dot.test(this.withdrawMoney)){
          this.$toast({
            message: '输入金额格式有误',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }
        if(!reg.test(this.withdrawMoney)){
          this.$toast({
            message: '输入金额限小数点后两位',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }

        return true;

      },


      //提现按钮，弹出提现弹窗
      withdrawFn: function () {
        if(this.checkWithdraw()){

          this.setStorage('withdraw','1');//设定值来区分是转账还是提现
          this.setStorage('change','0');

          this.setStorage('withdrawMoney',(+this.withdrawMoney).toFixed(2));
          this.setStorage('rate',this.rate/100);

          this.withdrawClick = true;

        }

      },
      //弹出密码/验证码框
      jumpTo: function () {

        if(+this.balance < +this.withdrawMoney * (1 + (+this.rate))){

          this.$toast({

            message: '支付金额已超可提余额',
            position: 'middle',
            duration: 1500

          });

        }else{

          this.withdrawClick = false;

          this.passwordInputShow = true;

          this.password = '';

        }

      },
      customerFn:function () {
        customerClick()
      },


      //跳转到提现订单明细
      cashBillfn:function () {

        this.setStorage('whichBill', '1');

        this.$router.push('/bill');

      },

      /*键盘输入事件*/
      numInput: function (num) {
        this.withdrawMoney = num;
      },

      /*键盘确认事件*/
      inputClose: function (value) {
        this.inputShow = value;
      },

      /*密码/验证码键盘确认事件*/
      submit: function (password, type) {

        var url;

        var params = {

          balance: this.withdrawMoney,

        };

        params[type] = password;

        if(this.withdrawType == 'bankCard'){

          params.bankCardId=this.userBankCard.bankCardId;

          url = '/user/withdraw/dowithdraw';

        }else if(this.withdrawType == 'alipay'){

          params.alipayId = this.alipay.alipayId;

          url = '/user/withdraw/dowithdrawtoalipay';

        }

        /*
         * 接口： 用户发起提现操作
         * 请求方式： GET
         * 接口： /user/withdraw/dowithdraw
         * 入参： bankCardId,balance,payPassword,code
         * */

        /*
         * 接口： 用户发起支付宝提现操作
         * 请求方式： GET
         * 接口： /user/withdraw/dowithdrawtoalipay
         * 入参： alipayId,balance,payPassword,code
         * */

        this.$http({

          method: 'get',
          url: process.env.API_ROOT + url,
          params: params

        }).then(res=>{

          console.log(res);

          this.$indicator.close();

          this.$toast({
            message: res.data.msg,
            position: 'bottom',
            duration: 1500
          });

          if(res.data.code == '0000'){

            this.setStorage('orderId',res.data.data);

            this.withdrawType == 'alipay' && (localStorage.setItem('withdraw','09'));

            this.withdrawType == 'bankCard' && (localStorage.setItem('withdraw', '01'));

            setTimeout(() => {
              this.$router.replace( '/paySuccess');
            },1500);

          }

        }).catch(res=>console.log(res));
      },
      //获取验证码
      getAgain: function () {

        var url;

        (this.withdrawType == 'bankCard') && (url = 'jx/action/withdrawmsg');

        (this.withdrawType == 'alipay') && (url = 'jx/action/withdrawmsgalipay');

        /**
         * 接口：支付发送短信认证
         * 请求方式：GET
         * 接口：/jx/action/withdrawmsg
         * 入参：null
         * */

        /**
         * 接口：提现到支付宝支付发送短信认证
         * 请求方式：GET
         * 接口：/jx/action/withdrawmsgalipay
         * 入参：null
         * */
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + url
        }).then((res)=>{

          this.$toast({

            message: res.data.msg,
            position: 'bottom',
            duration: 1500

          });

        }).catch((res)=>{
          console.log(res);
        })


      },



      getSoundCode: function () {

        if(this.soundCodeTime < 60){

          this.$toast({

            message: '操作过于频繁，请稍后再试',
            position: 'middle',
            duration: 1500

          });

          return;

        }

        var url;

        (this.withdrawType == 'bankCard') && (url = 'jx/action/withdrawmsgaudio');

        (this.withdrawType == 'alipay') && (url = 'jx/action/withdrawmsgaudioalipay');

        /**
         * 接口：支付发送语音短信认证
         * 请求方式：GET
         * 接口：/jx/action/withdrawmsgaudio
         * 入参：null
         * */

        /**
         * 接口：提现到支付宝支付发送语音短信认证
         * 请求方式：GET
         * 接口：/jx/action/withdrawmsgaudioalipay
         * 入参：null
         * */
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + url
        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code == '0000') {

            this.soundCodeTime = 0;

            var addTime = setInterval(() => {

              this.soundCodeTime++;

              if (this.soundCodeTime > 60) {

                clearInterval(addTime);

              }

            }, 1000);

          }

        })

      },



      inputNum: function (type) {

        if(JSON.stringify(this.userBankCard) == '{}' && this.withdrawType == 'bankCard'){

          this.$toast({

            message: '请先绑定银行卡',
            position: 'bottom',
            duration: 1500

          });

        }else if(JSON.stringify(this.alipay) == '{}' && this.withdrawType == 'alipay'){

          this.$toast({
            message: '请先绑定支付宝',
            position: 'bottom',
            duration: 1500
          });
          return false;

        }else{

          type == 'all' && (this.withdrawMoney = this.balance);

          type == 'show' && (this.inputShow = true);

        }

      },



      getAlipay: function () {

        /**
         * 接口：获取用户支付宝信息
         * 请求方式：GET
         * 接口：user/alipay/getuseralipayinfo
         * 入参：null
         * */
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'user/alipay/getuseralipayinfo'
        }).then(res=>{

          if(res.data.code == '0000'){

            this.changeAlipay(res.data.data.list);

          }

        });

      },


      changeAlipay: function (data) {

        if(!!this.$store.alipay){

          this.alipay = this.$store.alipay;

          delete this.$store.alipay;

        }else{

          (!!data) && (this.alipay = data[0]);

        }

      }


    },


  }
</script>
<style lang="less" scoped>
  @import "withdraw.less";
</style>
<style>
  .toggle-enter-active, .toggle-leave-active{
    transition: all 0.5s;
  }
  .toggle-enter, .toggle-leave-to{
    transform: translateY(300px);
  }
  .toggle-enter-to, .toggle-leave{
    transform: translateY(0);
  }
  .picker-slot{
    width:100%;
  }
  .password_input div[data-num='.']{
    background-color: #ccc;
    color: #ccc;
  }
  .mint-toast{
    z-index: 2200;
  }
  .mint-indicator-wrapper{
    z-index: 2200;
  }
</style>
