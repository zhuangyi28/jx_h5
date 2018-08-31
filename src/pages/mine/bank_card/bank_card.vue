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
          <span v-if="bank.cardType == 1">储蓄卡</span>
          <span v-else-if="bank.cardType == 2">信用卡</span>
          <div class="card_ID">{{bank.bankNo}}</div>
        </div>
        <div class="delete_btn" v-on:click="deleteCard">
          <img src="/static/images/jx_delate.png">
        </div>
      </div>
    </div>
    <div class="add_card_btn">
      <orangeBtn v-bind:name="btnName"></orangeBtn>
    </div>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  import { bankCardJson } from "../../../../static/js/bankCardJson"

  export default {
    name: 'addCard',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        btnName: '+添加银行卡',
        banks: [],
        bankCardJson: bankCardJson,
        cardID: ''
      }
    },
    mounted () {
      this.$http({
        method: 'get',
        url: this.API_HOST+ '/user/bank/getbankcardinfo',
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
        debugger
      });
    },
    methods: {
      deleteCard: function () {
        for(var parent of event.path){
          if(parent.classList.contains('bank_card')){
            this.cardID = parent.getElementsByClassName('card_ID')[0].innerText;
            break;
          }
        }
        var divArr = event.path;
        this.$messagebox.confirm('确认删除尾号是'+this.cardID.substr(this.cardID.length - 4)+'的银行卡', '提示').then(action => {
          for (var obj of divArr) {
            if (obj.classList.contains('bank_card')) {
              this.$http({
                method: 'get',
                url: this.API_HOST+ '/user/bank/deletebankcardinfo?bankCardId='+this.cardID
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
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'bank_card.less';
</style>
