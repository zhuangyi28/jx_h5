<template>
  <div class="transfer_accounts" v-on:click="inputShow=false">
    <div class="user_information">
      <div class="user_img">
        <img src="../../../../static/images/jx_transfer_user.png">
      </div>
      <div class="user_name_tel">
        <div>{{transferName}}</div>
        <div>{{transferMobile|plusXing(3,4)}}</div>
      </div>
    </div>
    <div class="transfer_accounts_input">
      <div class="transfer_accounts_input_title">转账金额</div>
      <div class="money_input">
        <span>￥</span>
        <div v-on:click.stop v-on:click="inputShow=true">
          <span class="money_show">{{money}}</span>
          <span class="input_cursor" v-if="inputShow == true"></span>
          <span v-if="money.length == 0">请输入转账金额</span>
        </div>
      </div>
      <div class="transfer_accounts_input_ps">可转余额{{transferBalance}}
        <span class="color_text" v-on:click="money = transferBalance">全部</span>
      </div>
    </div>
    <div class="transfer_ps">
      <input type="text" placeholder="添加备注（20字以内）" maxlength="20" v-model="tips" @blur="blurFn">
    </div>
    <div v-if="unused">
      <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
    </div>
    <div class="click_btn" v-else>
      <button>确认转账</button>
    </div>
    <!--转账确认框-->
    <mt-popup v-model="transferClick" position="bottom">
      <div class="withdraw_money_info">
        <div class="withdraw_title">确认转账<span class="close_btn" v-on:click="transferClick=false"></span></div>
        <div class="withdraw_detail">
          <div class="pay_money">
            <span>支付金额</span>
            <span>￥{{(+money).toFixed(2)}}</span>
          </div>
          <div class="withdraw_money">
            <span>转账金额</span>
            <span>￥{{(+money).toFixed(2)}}</span>
          </div>
          <div class="withdraw_money">
            <span>对方姓名</span>
            <span>{{transferName}}</span>
          </div>
          <div class="rate_money">
            <span>对方账号</span>
            <span>{{transferMobile}}</span>
          </div>
        </div>
      </div>
      <orangeBtn v-bind:name="transferBtnName" v-on:clickEvent="jumpTo"></orangeBtn>
    </mt-popup>
    <!--键盘-->
    <transition name="toggle">
      <calculation v-on:num="numInput" v-if="inputShow" v-bind:newNum="money" v-on:inputClose="inputClose"></calculation>
    </transition>
    <!--验证码/密码框-->
    <keep-alive>
      <passwordInput v-on:boxClose="passwordInputClose" v-if="passwordInputShow" v-on:clickEvent="submit" v-on:getCode="getAgain" v-on:getSoundCode="getSoundCode"></passwordInput>
    </keep-alive>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  import calculation from '../../../components/keyboard/calculation'
  import passwordInput from '../../../components/password_box/password_box'
  export default {
    name: 'transferAccounts',
    components: {
      orangeBtn: orangeBtn,
      calculation: calculation,
      passwordInput: passwordInput
    },
    data () {
      return {
        money: '',//转账金额
        btnName: '确认转账',//按钮名称
        transferMobile: '',//收款人账号
        transferName: '',//收款人姓名
        transferBalance: '',//可转金额
        transferClick: false,//控制弹框
        transferBtnName: '确认转账',//弹框内按钮名称
        unused: false, //控制显示button
        tips: '',//备注
        inputShow: true,//控制输入框是否显示
        passwordinput: false,//输入密码/验证码弹出框是否显示
        password: '',//密码/验证码
        used: true,//获取验证码按钮判断
        seconds: '',//倒计时
        isSecurity: '',//支付验证方式
        mobile: '',//用户手机号
        passwordInputShow: false,

        soundCodeTime: 60
      }
    },

    mounted () {

      this.getData();

    },
    methods: {

      //页面数据初始化
      getData: function () {


        this.transferName = this.getStorage('transferName');
        this.transferMobile = this.getStorage('transferMobile');
        this.mobile = localStorage.getItem('mobile');

        /*
        * 接口： 获取账户余额信息
        * 请求方式： GET
        * 接口： /user/account/getbalance
        * 入参： null
        * */
        this.$http({
          method: 'get',
          url: process.env.API_ROOT+ 'user/account/getbalance'
        }).then((res)=>{
          if(res.data.code == '0000'){
            this.transferBalance = res.data.data;
          }
          /**
           * 接口：查询支付验证方式
           * 请求方式：GET
           * 接口：/user/set.getpaymode
           * 入参：null
           * */
          this.$http({
            method: 'get',
            url: process.env.API_ROOT + 'user/set/getpaymode'
          }).then((res)=>{
            if(res.data.code == '0000'){
              this.setStorage('withdraw','0');//设定值来区分是转账还是提现
              this.setStorage('change','1');
              this.isSecurity = res.data.data.isSecurity;
            }
            else{
              console.log(res);
            }
          })
        });

      },
      //判断输入的转账金额是否符合标准
      handleClick: function () {
        var reg = /^\d+\.?(\d{1,2})?$/;
        var dot = /([1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?)/;

        if(this.tips){
          this.setStorage('transferTips', this.tips);//存备注
        }


        if(this.money == ''){
          this.$toast({
            message: '请输入金额',
            position: 'middle',
            duration: 1500
          });
        }
        else if(+this.money > (+this.transferBalance)){
          this.$toast({
            message: '可转余额不足',
            position: 'middle',
            duration: 1500
          });
        }
        else if(!reg.test(this.money)){
          this.$toast({
            message: '输入金额有误',
            position: 'middle',
            duration: 1500
          });
        }
        //判断有几个小数点
        else if(!dot.test(this.money)){
          this.$toast({
            message: '输入金额格式有误',
            position: 'middle',
            duration: 1500
          });
        }else {
          this.setStorage('transferMoney',(+this.money).toFixed(2));
          this.transferClick = true;
        }
      },

      //验证码/密码框弹出
      jumpTo: function () {

        this.transferClick = false;

        this.passwordInputShow = true;

      },

      //键盘输入事件
      numInput: function (num) {
        this.money = num;
      },

      //键盘确认事件
      inputClose: function (value) {
        this.inputShow = value;
      },

      //备注获取焦点事件（页面适应系统键盘）
      blurFn:function () {



        var container = document.getElementsByClassName('transfer_accounts')[0];


        setTimeout(function () {

          container.scrollTop = container.scrollHeight;

          document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset = container.scrollHeight;

        },50)



      },

      //验证码/密码框键盘输入事件

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

      //验证码/密码框键盘确认事件
      submit: function (password, type) {

        var params = {

          mobile: this.transferMobile,

          balance: this.money,

          remark: this.tips

        };

        params[type] = password;

        /*
       * 接口： 用户发起转账操作
       * 请求方式： GET
       * 接口： /user/transfer/dotransfer
       * 入参： mobile,balance,code,remark
       * */

        this.$http({

          method: 'get',
          url: process.env.API_ROOT + 'user/transfer/dotransfer',
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

            this.setStorage('transferOrderId',res.data.data);

            setTimeout(() => {
              this.$router.replace( '/paySuccess');
            },1500);

          }else{

            this.password = '';

            var divs = document.getElementsByClassName('password_block')[0].children;

            for(let div of divs){

              div.innerHTML = '';

            }

          }

        }).catch(res=>console.log(res));
      },
      //获取验证码
      getAgain: function () {

        /**
         * 接口：转账发送短信认证
         * 请求方式：GET
         * 接口：/jx/action/dotransferp
         * 入参：null
         * */
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'jx/action/dotransferp'
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


      passwordInputClose: function () {

        this.passwordInputShow = false;

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


        /**
         * 接口：转账发送语音短信认证
         * 请求方式：GET
         * 接口：/jx/action/dotransferpaudio
         * 入参：null
         * */
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'jx/action/dotransferpaudio'
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

      }

    },
    watch: {

      //限制转账金额格式
      money: function () {
        var reg = /^\d+\.?(\d{1,2})?$/;
        if(this.money == ''){
          this.unused = false;
          return;
        }
        else if(this.money == '00'){
          this.money = 0;
        }
        else if(isNaN(+this.money) || !reg.test(this.money)){
          this.money = this.money.slice(0,-1);
        }
        else if((+this.money) > 0){
          this.unused = true;
        }
        else if((+this.money) == 0){
          this.unused = false;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "account_cash.less";
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
