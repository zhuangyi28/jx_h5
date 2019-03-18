<template>
  <div class="withdraw" v-on:click="inputShow=false">
    <div class="withdraw_info">
      <div class="withdraw_bank color_background_gradient">
        <div v-on:click="pickerShow=true">
          <div class="withdraw_bank_info" v-if="bankList.length==0">
            <img src="">
            <div class="bank_info" v-if="bankList.length==0">
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="withdraw_bank_info" v-else>
            <img v-bind:src="bankList[index].img">
            <div class="bank_info">
              <span class="bank_name">{{bankList[index].bankName}}</span>
              <span class="bank_type">{{bankList[index].bankType}}</span>
              <span class="bank_No">**** **** **** {{bankList[index].bankNo.substr(-4)}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="withdraw_money">
        <div class="add_bank" v-on:click="$router.push('/addCard')">
          <span>添加新卡</span>
        </div>
        <div class="withdraw_money_ps">单笔￥<span>{{amountMin|thousandBitSeparator}}</span>-￥<span>{{amountMax|thousandBitSeparator}}</span>（手续费<span>{{rate/100}}</span>%）</div>
        <div class="withdraw_money_input">
          <span>￥</span>
          <div v-on:click="inputShow=true" v-on:click.stop>
            <span class="money_show">{{withdrawMoney}}</span>
            <span class="input_cursor" v-if="inputShow==true"></span>
            <span v-if="withdrawMoney.length == 0">请输入提现金额</span>
          </div>
        </div>
        <div class="withdraw_money_show">
          <span>可提额度{{balance|thousandBitSeparator}}元<span class="pop_up" v-on:click="popUp">?</span></span>
          <span class="color_text" v-on:click="withdrawMoney = balance">全部提现</span>
        </div>
      </div>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="withdrawFn"></orangeBtn>
    <div class="withdraw_ps">
      <div class="title">温馨提示</div>
      <div class="content">
        <span>1.订单提交后工作日一般2小时内处理，如出款失败，则5个工作日内退款至原支付账户，具体以银行事件为准，正常退款时间内，建议咨询相关银行</span>
      </div>
      <div class="content">
        <span>2.限额说明：单卡单笔<span>{{amountMax|thousandBitSeparator}}</span>元，当日99,000.00元，当月198,000.00元</span>
      </div>
    </div>

    <!-- 联系客服-->

    <div class="withdraw_service">

      <div class="footer">
        <span v-on:click="customerFn"><i class="iconfont icon-withdraw_custom color_text"></i>联系客服</span><span v-on:click="moreShow=true"><i class="iconfont icon-withdraw_more color_text"></i>更多</span>
      </div>

    </div>
<!--    <serviceArea :type1="serviceLeft" :type2="serviceRight" :iconName1="iconName1" :iconName2="iconName2" v-on:clickEventLeft="customerFn" v-on:clickEventRight="moreShow=true" :spanShow="true"></serviceArea>-->
    <mt-popup class="information_picker" v-model="pickerShow" position="bottom">
      <div class="picker_btn">
        <mt-button v-on:click="pickerShow=false">取消</mt-button>
        <mt-button v-on:click="getCardType">确认</mt-button>
      </div>
      <mt-picker v-bind:slots="slots" v-on:change="onValueChange"></mt-picker>
    </mt-popup>
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
    <mt-popup position="bottom" v-model="moreShow">
      <div class="more">
        <div class="choose">
          <div v-on:click="cashBillfn">提现记录</div>
          <div v-on:click="$router.push('/helpCenter')">常见问题</div>
        </div>
        <div class="close" v-on:click="moreShow = false">取消</div>
      </div>
    </mt-popup>
    <transition name="toggle">
      <calculation v-on:num="numInput" v-if="inputShow" v-bind:newNum="withdrawMoney" v-on:inputClose="inputClose" key="money"></calculation>
    </transition>
    <mt-popup position="bottom" v-model="passwordinput">
      <div class="password_input">
        <div class="title">
          <div class="close" v-on:click="passwordinput = false">
            <img src="../../../../static/images/go.png">
          </div>
          <span v-if="isSecurity == 1">请输入短信验证码</span>
          <span v-else-if="isSecurity == 2">请输入密码</span>
        </div>
        <div class="password_block">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="another_click">
          <span v-if="isSecurity ==1">验证码已发送至{{mobile | plusXing(3, 4)}},<span class="color_text">{{seconds}}s后</span>可
            <span  v-bind:class="{color_text: used}" v-on:click="getAgain">重新获取</span>
          </span>
          <span v-else-if="isSecurity == 2" class="color_text" v-on:click="$router.push('/code')">忘记密码</span>
        </div>
        <calculation v-on:num="passwordInput" v-on:inputClose="passwordSubmit" key="password" newNum="" ref="passwordInput"></calculation>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn';
  import serviceArea from '../../../components/service/service'
  import {bankCardJson} from "../../../../static/js/bankCardJson";
  import { customerInit, customerClick } from "../../../../static/js/basic"
  import calculation from '../../../components/keyboard/calculation'
  export default {
    name: 'withdraw',
    components: {
      orangeBtn: orangeBtn,
      serviceArea: serviceArea,
      calculation: calculation
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
        userBankCardDTOList: [],//银行卡信息列表
        mountedDid: false,//检测数据是否获取成功
        bankList: [],//处理后的银行卡信息列表，用于页面循环中
        bankCardJson: bankCardJson,//银行卡信息数组
        slots: [
          {
            values: [],
            textAlign: 'center'
          }
        ],//选择银行卡弹窗的数据
        pickerShow: false,//控制选择银行卡弹窗是否显示
        changeValue: '',//选择银行卡弹窗的数值
        index: 0,//被选择的银行卡位于银行卡数组的位置
        withdrawClick: false,//控制提现弹窗是否显示
        withdrawBtnName: '确认',//提现弹窗按钮名称
        moreShow: false,//控制联系客服按钮是否显示
        inputShow: true,//控制输入框是否显示
        passwordinput: false,
        password: '',
        used: true,
        seconds: '',
        bankCardId: '',
        mobile: ''
/*
        serviceLeft: '联系客服',
        serviceRight: '更多',
        iconName1:'icon-withdraw_custom',
        iconName2:'icon-withdraw_more',
*/

      }
    },
    mounted () {
        this.setStorage('addCard','withdraw');
      //美恰初始化
      customerInit({
        name:this.getStorage('userName'),// 名字
        tel:this.getStorage('mobile'),// 电话
      });
      this.mobile = localStorage.getItem('mobile');
      /**
       * 接口：用户中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/
      this.$http({
        method: 'post',
        url: process.env.API_ROOT + 'user/center/usercenter',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // post请求
        }
      }).then((res)=>{
        if(res.data.code == '3001'){
          this.$router.push('/');
        }else{
          this.isSecurity = res.data.data.isSecurity;
          if(res.data.data.isVerify == 0 || res.data.data.isVerify == 3){
            this.$messagebox({
              title: '提示',
              message: '当前账户尚未进行实名认证，完成实名认证后方可提现',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: '去认证',
              cancelButtonText: '取消',
              cancelButtonClass:'cancel_btn',
              confirmButtonClass:'confirm_btn_orange',
              closeOnClickModal: false
            }).then((res)=>{
              if(res == 'cancel'){
                this.$router.go(-1);
              }else if(res == 'confirm'){
                this.setStorage('hrefId','4');
                this.$router.push('/certificationChoose');
              }
            });
          }else if(res.data.data.isVerify == 2){
            this.$messagebox({
              title: '提示',
              message: '实名认证审核中，审核通过后方可提现',
              confirmButtonText: '我知道了',
              confirmButtonClass:'confirm_btn_orange',
            }).then(()=>{
              this.$router.go(-1);
            })
          }else{
            /**
             * 接口：检测用户发起提现操作
             * 请求方式：GET
             * 接口：user/work/checkwithdraw
             * 入参：null
             **/
            this.$http({
              method: 'get',
              url: process.env.API_ROOT + 'user/work/checkwithdraw'
            }).then((res)=>{
              if(res.data.code == -10){
                this.$messagebox({
                  title: '提示',
                  message: '您有文件待签署，请至 “ 我的签约”中完成签署后再提现',
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: '去签约',
                  cancelButtonText: '取消',
                  cancelButtonClass:'cancel_btn',
                  confirmButtonClass:'confirm_btn_orange',
                }).then((res)=>{

                  if(res == 'confirm'){

                    this.$router.push('/contractList');

                  }


                }).catch((res=>{}))

              }
              else if(res.data.code == -7){
                this.$messagebox({
                  title: '提示',
                  message: res.data.msg,
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: '去添加',
                  cancelButtonText: '取消',
                  cancelButtonClass:'cancel_btn',
                  confirmButtonClass:'confirm_btn_orange',
                }).then((res)=>{
                  if(res == 'cancel'){
                    this.$router.go(-1);
                  }else if(res == 'confirm'){
                    this.$router.push('/addCard');
                  }
                })
              }else if(res.data.code == '0000'){
                this.amountMax = res.data.data.amountMax;
                this.amountMin = res.data.data.amountMin;
                this.balance = res.data.data.balance;
                this.dayMaxAmount = res.data.data.dayMaxAmount;
                this.monthMaxAmount = res.data.data.monthMaxAmount;
                this.rate = res.data.data.rate;
                this.userBankCardDTOList = res.data.data.userBankCardDTOList;
                this.mountedDid = true;
              }
            })
          }
        }
      });
    },
    destroyed (){
      this.$messagebox.close();
    },
    watch: {
      //监听数据是否获取成功
      mountedDid: function () {
        for(var bankCard of this.userBankCardDTOList){
          var bankInfo = {};
          bankInfo.bankName = bankCard.bankName;
          if(bankCard.cardType == 1){
             bankInfo.bankType = '储蓄卡';
          }else if(bankCard.cardType == 2){
            bankInfo.bankType = '信用卡';
          }
          for(var bankImgList of this.bankCardJson){
            if(bankImgList.name == bankCard.bankName){
              bankInfo.img = bankImgList.img;
            }
          }
          this.slots[0].values.push(bankCard.bankName + '(' + bankCard.bankNo.substr(-4) + ')');
          bankInfo.bankNo = bankCard.bankNo;
          this.bankList.push(bankInfo);
        }
      },
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
      //选择银行卡弹出框值
      onValueChange: function (picker,values) {
        console.log(picker);
        console.log(values);
        this.changeValue = values;
      },
      //获取选择银行卡弹出框值
      getCardType: function () {
        this.index = this.slots[0].values.indexOf(this.changeValue[0]);
        this.pickerShow = false;
      },
      //弹出限额提醒
      popUp: function () {
        this.$messagebox({
          title: '提现限额说明',
          message: '单卡单笔'+this.amountMax+'元，当日'+this.dayMaxAmount+'元，当月'+this.monthMaxAmount+'元',
          confirmButtonText: '确认',
          confirmButtonClass:'confirm_btn_orange',
        });
      },
      //提现按钮，弹出提现弹窗
      withdrawFn: function () {
        var reg = /^\d+\.?(\d{1,2})?$/;
        var dot = /([1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?)/;
        if(this.withdrawMoney == ''){
          this.$toast({
            message: '请输入金额',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(parseFloat(this.withdrawMoney) < parseFloat(this.amountMin)){
          this.$toast({
            message: '单笔提现金额需大于'+this.amountMin+'元',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(parseFloat(this.withdrawMoney) > parseFloat(this.amountMax)){
          this.$toast({
            message: '单笔提现金额需小于'+this.amountMax+'元',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(parseFloat(this.withdrawMoney) > parseFloat(this.dayMaxAmount)){
          this.$toast({
            message: '提现金额超出当日最大额度',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(parseFloat(this.withdrawMoney) > parseFloat(this.monthMaxAmount)){
          this.$toast({
            message: '提现金额超出当月最大限额',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(parseFloat(this.withdrawMoney) > parseFloat(this.balance)){
          this.$toast({
            message: '金额已超过可提余额',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(!dot.test(this.withdrawMoney)){
          this.$toast({
            message: '输入金额格式有误',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(!reg.test(this.withdrawMoney)){
          this.$toast({
            message: '输入金额限小数点后两位',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        this.setStorage('withdraw','1');//设定值来区分是转账还是提现
        this.setStorage('change','0');
        this.setStorage('withdrawMoney',(+this.withdrawMoney).toFixed(2));
        this.setStorage('rate',this.rate/100);
        for(var bankCard of this.userBankCardDTOList){
          if(this.bankList[this.index].bankNo == bankCard.bankNo){
            this.bankCardId = bankCard.bankCardId;
            this.setStorage('bankCardId',bankCard.bankCardId);
          }
        }
        this.withdrawClick = true;
      },
      //跳转到输入密码界面
      jumpTo: function () {

        this.withdrawClick = false;

        this.passwordinput = true;

        this.password = '';

        var divs = document.getElementsByClassName('password_block')[0].children;

        for(let div of divs){

          div.innerText = '';

        }

        (this.isSecurity == 1) && (this.getAgain());

      },
      customerFn:function () {
        customerClick()
      },


      cashBillfn:function () {

        this.setStorage('whichBill', '1');

        this.$router.push('/bill')

      },

      numInput: function (num) {
        this.withdrawMoney = num;
      },

      inputClose: function (value) {
        this.inputShow = value;
      },

      passwordInput: function (num) {

        var divs = document.getElementsByClassName('password_block')[0].children;

        var length = divs.length;

        if(num === ''){

          if(event.target.dataset.num == 'C'){

            for(let div of divs){

              div.innerHTML = '';

              this.password = num;

            }

            return;

          }

          else if(event.target.dataset.num == 'D'){

            this.password = this.password.slice(0,-1);

          }

        }

        else if(num.indexOf('.') != -1 || this.password.length >= 6){

          this.$refs.passwordInput.money = '';

          return;

        }else{

          this.password = this.password + num;

        }

        if(this.isSecurity == 1){

          while(length--){

            if((typeof this.password[length]) == 'string'){

              divs[length].innerHTML = this.password[length];

            }else{

              divs[length].innerHTML = '';

            }

          }

        }else if(this.isSecurity == 2){

          while(length--){

            if((typeof this.password[length]) == 'string'){

              divs[length].innerHTML = '●';

            }else{

              divs[length].innerHTML = '';

            }

          }

        }

        this.$refs.passwordInput.money = '';

        console.log(this.password);
      },
      passwordSubmit: function (num) {
        var type;
        (this.isSecurity == 1) && (type='验证码');
        (this.isSecurity == 2) && (type='密码');

        if(this.password == ''){
          this.$toast({
            message: '请输入' + type,
            position: 'bottom',
            duration: 1500
          });
        }else if(this.password.length != 6){
          this.$toast({
            message: '请输入正确的' + type,
            position: 'bottom',
            duration: 1500
          });
        }else{

          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });

          var params = {

            balance: this.withdrawMoney,

            bankCardId: this.bankCardId

          };

          (this.isSecurity == 1) && (params.code = this.password);
          (this.isSecurity == 2) && (params.payPassword = hexMD5(this.password));

          /*
           * 接口： 用户发起提现操作
           * 请求方式： GET
           * 接口： /user/withdraw/dowithdraw
           * 入参： bankCardId,balance,payPassword
           * */

          this.$http({

            method: 'get',
            url: process.env.API_ROOT + 'user/withdraw/dowithdraw',
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

              (this.setStorage('orderId',res.data.data));

              setTimeout(() => {
                this.$router.replace( '/paySuccess');
              },1500);

            }

          }).catch(res=>console.log(res));

        }
      },
      //获取验证码
      getAgain: function () {
        const TIME_COUNT = 60;
        if(this.used){
          this.used = false;
          this.seconds = TIME_COUNT;

          /**
           * 接口：支付发送短信认证
           * 请求方式：GET
           * 接口：/jx/action/withdrawmsg
           * 入参：null
           * */
          this.$http({
            method: 'post',
            url: process.env.API_ROOT + 'jx/action/withdrawmsg'
          }).then((res)=>{

            this.$toast({

              message: res.data.msg,
              position: 'bottom',
              duration: 1500

            });

            if(res.data.code == '0000'){

              //倒计时
              var countDown = setInterval(()=>{
                this.seconds--;
                if(!this.seconds){
                  clearInterval(countDown);
                  this.used = true;
                }
              },1000);


            }else{
              this.seconds = 0;
              this.used = true;
            }
          }).catch((res)=>{
            console.log(res);
          })
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
