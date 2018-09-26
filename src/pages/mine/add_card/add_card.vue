<template>
  <div class="add_card_two">
    <topTips :tips="tipsText"></topTips>
    <div class="card_information_input">
      <div class="card_information">
        <div class="card_user must_input">
          <span>姓名</span>
          <span>{{userName}}</span>
        </div>
        <div class="card_ID must_input">
          <span>银行卡号</span>
          <input type="text" pattern="\d*" placeholder="请输入卡号" v-model="cardId" maxlength="19">
        </div>
        <div class="card_bank">
          <div class="bank_name" v-if="bankName == ''">
            <img src="../../../../static/images/bank_orc.png">
            <span>自动识别开户行</span>
          </div>
          <div class="bank_name" v-else>
            <img v-bind:src="bankImg">
            <span>{{bankName}}<span v-if="this.cardType == 1"></span><span v-else-if="this.cardType == 2"></span></span>
          </div>
          <span v-on:click="$router.push('/bankList')">查看支持银行</span>
        </div>
      </div>
      <div class="card_information_ps">信息填写完整，资金更安全</div>
      <div class="bank_information">
        <div class="bank_place must_input">
          <span>开户地区</span>
          <div v-on:click="pickerShow=true">
            <span v-if='bankPlaces.length == 0'>请选择开户地区</span>
            <span v-else v-for="bankPlace in bankPlaces">{{bankPlace}}</span>
            <i class="allow_right"></i>
          </div>
        </div>
        <div class="bank_sub">
          <span>开户支行</span>
          <input type="text" placeholder="请输入开户支行（选填）">
        </div>
      </div>
    </div>
    <mt-popup class="information_picker" v-model="pickerShow" position="bottom">
      <div class="picker_btn">
        <mt-button v-on:click="pickerShow=false">取消</mt-button>
        <mt-button v-on:click="getBankPlace">确认</mt-button>
      </div>
      <mt-picker v-bind:slots="slots" v-on:change="changeCity"></mt-picker>
    </mt-popup>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="addCard"></orangeBtn>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  import topTips from '../../../components/tips/tips'
  import { bankCardJson } from "../../../../static/js/bankCardJson"
  export default {
    name: 'addCard',
    components: {
      topTips: topTips,
      orangeBtn: orangeBtn
    },
    data () {
      return {
        btnName: '确认添加',
        userName: '',
        cardId: '',
        bankName: '',
        bankCardJson: bankCardJson,
        bankPlaces: [],
        pickerShow: false,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'province',
            textAlign: 'center'
          },
          {
            flex: 1,
            values: [],
            className: 'city',
            textAlign: 'center'
          }
        ],
        city: '',
        cardType: '',
        tipsText:'请绑定持卡人本人的银行卡'
      }
    },
    mounted () {
      this.userName = this.getStorage('userName');
      this.$http({
        method: 'get',
        url: process.env.API_ROOT + 'user/bank/provinces'
      }).then((res)=>{
        console.log(res);
        this.province = res.data.data;
        for(var data of res.data.data){
          this.slots[0].values.push(data.addrName);
        }
      });
    },
    watch: {
      cardId: function () {
        if(this.cardId.length >= 10 && this.bankName == ''){
          this.$http({
            method: 'post',
            url: process.env.API_ROOT+ 'user/bank/getbankname',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            params: {
              bankNo: this.cardId
            }
          }).then((res)=>{
            if(res.data.code == '0000'){
              console.log(res);
              if(Object.keys(res.data.data).length){
                this.cardType = res.data.data.type;
                this.bankName = res.data.data.bankName;
                for(var bankCard of this.bankCardJson){
                  if(bankCard.name == res.data.data.bankName){
                    this.bankImg = bankCard.img;
                  }
                }
              }else{
                this.bankName = '不支持该银行';
                this.bankImg = './static/images/bank_no.png';
              }
            }
          }).catch((res)=>{
            console.log(res);
          })
        }else if(this.cardId.length < 10){
          this.bankName =  '';
        }
        if(this.cardId.length > 19){
          this.cardId = this.cardId.slice(0,19);
        }
      }
    },
    methods: {
      getCity: function (provincesId) {
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'user/bank/citys?provinceId='+provincesId
        }).then((res)=>{
          if(this.slots[1].values.length != 0){
            this.slots[1].values.length = 0;
          }
          for(var data of res.data.data){
            this.slots[1].values.push(data.addrName);
          }
        })
      },
      changeCity: function (picker,value) {
        if(picker.getSlotValue(0)){
          for(var province of this.province) {
            if (province.addrName == picker.getSlotValue(0)) {
              this.getCity(province.uniqueId);
              break;
            }
          }
        }
        console.log(value);
        console.log(picker.getSlotValue(0));
        this.city = picker;
      },
      getBankPlace: function () {
        this.bankPlaces.length = 0;
        this.bankPlaces.push(this.city.getSlotValue(0));
        this.bankPlaces.push(this.city.getSlotValue(1));
        this.pickerShow = false;
      },
      addCard: function () {
        var regNeg = /^([1-9]\d{14,18})$/;
        /**
         * 接口：添加用户银行卡信息
         * 请求方式：POST
         * 接口：/user/bank/addbankcardinfo
         * 入参：bankNo，openBank，bankName，bankBranch，province，city
         * */

        //判断银行卡是否为空
        if (!this.cardId || this.cardId.length < 14) {

          this.$toast({

            message: '请填写正确的银行卡号',
            position: 'bottom',
            duration: 1500

          });
        }
        //判断卡号是否有误
        else if (!regNeg.test(this.cardId)) {

          this.$toast({

            message: '请填写正确的银行卡号',
            position: 'bottom',
            duration: 1500

          });
        }

        //判断是否写了所属银行
        else if (!this.bankName || this.bankName == '不支持该银行') {

          this.$toast({

            message: '不支持该银行卡',
            position: 'bottom',
            duration: 1500

          });
        }

        //判断是否写了开户地区

        else if (this.bankPlaces.length != 2) {

          this.$toast({

            message: '请选择开户地区',
            position: 'bottom',
            duration: 1500

          });
        }

        else{
          this.$http({
            method: 'post',
            url: process.env.API_ROOT + 'user/bank/addbankcardinfo',
            headers:{
              'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
              bankNo: this.cardId, //银行卡号
              bankName: this.bankName, //银行名称&所属银行
              province: this.bankPlaces[0], //开户省份
              city: this.bankPlaces[1], //开户城市
              cardType: this.cardType //卡类型
            }
          }).then((res)=>{
            var toast = this.$toast({
              message: res.data.msg,
              position: 'bottom',
              duration: 1500
            });
            if(res.data.code == '0000'){
              setTimeout(()=>{
                toast.close();
                if(this.getStorage('addCard') == 'withdraw'){
                    this.$router.push('/withdraw');
                    return;
                }
                this.$router.push('/bankCard');
              },500);
            }
          }).catch((res)=>{
            console.log(res);
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'add_card.less';
</style>
