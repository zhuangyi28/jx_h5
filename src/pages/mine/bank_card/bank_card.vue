<template>
  <div class="add_card">
    <div class="bank_cards">
      <!--此处应用for循环-->
      <div class="bank_card" v-for="bank in banks">
        <div class="bank_logo">
          <img v-bind:src="bank.bankImg">
        </div>
        <div class="bank_card_information">
          <span>{{bank.bankName}}</span>
          <div v-if="bank.cardType == 1">储蓄卡</div>
          <div v-else-if="bank.cardType == 2">信用卡</div>
          <div class="card_ID" v-bind:bankCardId="bank.bankCardId">{{bank.bankNo}}</div>
        </div>
        <div class="delete_btn" v-bind:data-card="bank.bankCardId" v-bind:data-num="bank.bankNo" v-on:click="deleteCard">
          <img src="../../../../static/images/jx_delate.png">
        </div>
      </div>
    </div>

    <!-- 添加 -->
    <div class="add_card_btn" v-on:click="addCard">
      <p>＋</p>
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
        banks: [],
        bankCardJson: bankCardJson,
        cardID: '',
        bankCardId: ''
      }
    },
    mounted () {
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
    methods: {
      deleteCard: function (e) {

          this.bankCardId=e.currentTarget.dataset.card,

          this.cardID=e.currentTarget.dataset.num,

        this.$messagebox({
          title: '提示',
          message: '确认删除尾号是'+ this.cardID.substr(this.cardID.length-4)+'的银行卡',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '删除',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',

        }).then(action => {

          if(action == 'confirm'){

            for (var obj of divArr) {
              if (obj.classList.contains('bank_card')) {
                this.$http({
                  method: 'get',
                  url: process.env.API_ROOT+ 'user/bank/deletebankcardinfo?bankCardId='+this.bankCardId
                }).then((res)=>{
                  if(res.data.code == '0000'){
                    obj.remove();
                  }else{
                    this.$toast({
                      message: res.data.msg,
                      position: 'middle',
                      duration: 1500
                    });
                  }
                }).catch((res)=>{
                  alert(res.data.msg);
                });
                return;
              }
            }
          }


        })

        this.$messagebox.close(false);
      },
      addCard: function () {
        var thisisVerify = this.getStorage('isVerify');
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
              this.$router.push('/certification');
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
          this.$router.push('/addCard');
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'bank_card.less';
</style>
