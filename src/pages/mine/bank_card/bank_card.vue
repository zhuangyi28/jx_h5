<template>
  <div class="add_card">
    <div class="bank_cards">
      <!--此处应用for循环-->
      <div class="bank_card change_color_background_bank_card" v-for="bank in banks">
        <div class="bank_logo">
          <img v-bind:src="bank.bankImg">
        </div>
        <div class="bank_card_information" v-on:click="chooseCard(bank.bankCardId, bank.bankName, bank.bankNo)">
          <span>{{bank.bankName}}</span>
          <div v-if="bank.cardType == 1">储蓄卡</div>
          <div v-else-if="bank.cardType == 2">信用卡</div>
          <div class="card_ID" v-bind:bankCardId="bank.bankCardId">**** **** **** {{bank.bankNo.substr(-4)}}</div>
        </div>
        <div class="delete_btn" v-bind:data-card="bank.bankCardId" v-bind:data-num="bank.bankNo" v-on:click="checkCard(bank.bankCardId)">
          <img src="../../../../static/images/jx_delate.png">
        </div>
      </div>
    </div>

    <!-- 添加 -->
    <div class="add_card_btn" v-on:click="addCard">
      <p class="color_background">＋</p>
      <p>添加银行卡</p>
    </div>


  </div>
</template>
<script>
  import { bankCardJson } from "../../../../static/js/bankCardJson"

  export default {
    name: 'addCard',
    data () {
      return {
        banks: [],//银行卡数组
        bankCardJson: bankCardJson,//银行卡信息数组
        cardID: '',//银行卡卡号
        bankCardId: '',//银行卡唯一ID
        isVerify: ''
      }
    },
    mounted () {

      (localStorage.getItem('addBankBack') == 1) && ((localStorage.removeItem('addBankBack')) || (this.$router.go(-2)));

      /**
       * 接口：个人中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/
      this.$http({

        method: 'post',

        url: process.env.API_ROOT + 'user/center/usercenter',

      }).then(res=>{

        this.isVerify = res.data.data.isVerify;

        this.data();

      }).catch(res=>{
        console.log(res);
      })

    },
    methods: {

      data: function () {

        /*
      * 接口： 获取用户银行卡信息
      * 请求方式： GET
      * 接口： /user/bank/getbankcardinfo
      * 传参： null
      * */
        this.$http({
          method: 'get',
          url: process.env.API_ROOT+ 'user/bank/getbankcardinfo',
        }).then((res) => {
          console.log(res.data);
          this.banks = res.data.data;
          for(var bank of this.banks){
            for(var bankCard of this.bankCardJson){
              if(bankCard.name == bank.bankName){
                bank.bankImg = bankCard.img;
              }
            }
          }
        }).catch((res) => {
          console.log(res);
        });

      },

      deleteCard: function (msg, cardId) {

        this.$messagebox({
          title: '提示',
          message: msg,
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '删除',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then((action) =>{

          console.log(action);

          if (action == 'confirm') {

            /*
               * 接口： 删除用户银行卡信息
               * 请求方式： GET
               * 接口： /user/bank/deletebankcardinfo
               * 传参： bankCardId
               * */
            this.$http({
              method: 'get',
              url: process.env.API_ROOT + 'user/bank/deletebankcardinfo?bankCardId=' + cardId
            }).then((res) => {
              console.log(res);
              if (res.data.code == '0000') {
                this.data();
              } else {
                this.$toast({
                  message: res.data.msg,
                  position: 'bottom',
                  duration: 1500
                });
              }
            }).catch((res) => {

              console.log(res);

            });
          }


        }).catch((res)=>{
          console.log(res);
        });
      },
      addCard: function () {
        var thisisVerify = this.isVerify;
        if(thisisVerify == 0 || thisisVerify == 3){
          this.$messagebox({
            title: '提示',
            message: '未完成实名认证的用户，需先完成实名认证才可添加银行卡',
            showCancelButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '去认证',
            cancelButtonClass: 'cancel_btn',
            confirmButtonClass: 'confirm_btn_orange',
          }).then((res)=>{
            if(res == 'confirm'){
              this.setStorage('hrefId','4');
              this.$router.push('/certificationChoose');
            }
          })
        }else if(thisisVerify == 2){
          this.$messagebox({
            title: '提示',
            message: '实名认证审核中，审核通过后即可添加银行卡',
            confirmButtonText: '我知道了',
            confirmButtonClass: 'confirm_btn_orange',
          })
        }else{
            this.setStorage('addCard','');
          this.$router.push('/addCard');
        }
      },


      chooseCard: function (card, bankName, bankNo) {

        if(localStorage.getItem('booking') || localStorage.getItem('withdraw')){

          this.$store.bank = {};

          this.$store.bank.bankCardId = card;

          this.$store.bank.bankName = bankName;

          this.$store.bank.bankNo = bankNo;

          this.$router.go(-1);

        }

      },


      checkCard: function (cardId) {

        /*
               * 接口： 检测删除用户银行卡信息
               * 请求方式： GET
               * 接口： /user/bank/deletecheckbandcardinfo
               * 传参： bankCardId
               * */
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'user/bank/deletecheckbankcardinfo?bankCardId=' + cardId
        }).then(res=>{

          if(res.data.code == '0000'){

            this.deleteCard(res.data.msg, cardId);

          }

        })

      }
    },
    destroyed (){
      this.$messagebox.close();
    }
  }
</script>
<style lang="less" scoped>
  @import 'bank_card.less';
</style>
