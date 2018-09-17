<template>
  <div class="transfer_accounts">
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
        <input type="text" placeholder="请输入转账金额" v-model="money">
        <span v-on:click="money = transferBalance">全部</span>
      </div>
      <div class="transfer_accounts_input_ps">可转余额{{transferBalance}}</div>
    </div>
    <div class="transfer_ps">
      <input type="text" placeholder="添加备注（20字以内）" maxlength="20">
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
    <mt-popup v-model="transferClick" position="bottom">
      <div class="withdraw_money_info">
        <div class="withdraw_title">确认转账<span class="close_btn" v-on:click="withdrawClick=false"></span></div>
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
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'transferAccounts',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        money: '',//转账金额
        btnName: '确认转账',//按钮名称
        transferMobile: '',//收款人账号
        transferName: '',//收款人姓名
        transferBalance: '',//可转金额
        transferClick: false,//控制弹框
        transferBtnName: '确认转账'//弹框内按钮名称
      }
    },
    mounted () {
      this.transferName = this.getStorage('transferName');
      this.transferMobile = this.getStorage('transferMobile');
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
      });
    },
    methods: {
      //判断输入的转账金额是否符合标准
      handleClick: function () {
        var reg = /^\d+\.?(\d{1,2})?$/;
        var dot = /([1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?)/;
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
          this.transferClick = true;
        }
      },
      jumpTo: function () {
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
            this.setStorage('transferMoney',(+this.money).toFixed(2));
            if(res.data.data.isSecurity == 2){
              this.$router.push('/pswCertification');
            }else if(res.data.data.isSecurity == 1){
              this.$router.push('/smsCertification');
            }
            return
          }
          else{
            console.log(res);
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "account_cash.less";
</style>
