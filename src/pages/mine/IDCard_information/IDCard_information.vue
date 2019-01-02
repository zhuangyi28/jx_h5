<template>
  <div class="IDCard_information">
    <div class="information_title">请核对身份证信息，如有问题请手动进行更正</div>
    <div class="information_part">
      <div class="information_detail">
        <span>姓名</span>
        <input type="text" v-bind:value="userName">
      </div>
      <div class="information_detail">
        <span>身份证号</span>
        <input type="text" v-bind:value="idNumber" disabled>
      </div>
      <div class="information_detail">
        <span>性别</span>
        <input type="text" v-bind:value="sex">
      </div>
      <div class="information_detail">
        <span>民族</span>
        <input type="text" v-bind:value="nation">
      </div>
      <div class="information_detail">
        <span>出生日期</span>
        <input type="text" v-bind:value="birth" disabled>
      </div>
      <div class="information_detail">
        <span class="address">地址</span>
        <textarea v-bind:rows="addressRows" v-on:input="addressChange"></textarea>
      </div>
    </div>
    <orangeBtn v-bind:name="btnName"></orangeBtn>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {

    name: 'IDCard_information',

    components: {

      orangeBtn: orangeBtn

    },

    data () {

      return {

        btnName: '提交认证',

        address: '',

        addressRows: 1,

        userName: '',

        sex: '',

        nation: '',

        birth: '',

        idNumber: '',

        pickerVisible: true

      }

    },

    mounted () {

      //this.$store.state.personInformation

      this.userName = this.$store.state.personInformation.name;

      this.sex = this.$store.state.personInformation.sex;

      this.nation = this.$store.state.personInformation.nation;

      this.address = this.$store.state.personInformation.address;

      this.birth = this.$store.state.personInformation.birth;

      this.idNumber = this.$store.state.personInformation.idNumber;

      this.birth = this.birthChange(this.birth);

      this.addressInput();

    },


    methods: {
      addressChange: function () {

        this.address = document.getElementsByTagName('textarea')[0].value;

      },

      addAddressRows: function () {

        var textarea = document.getElementsByTagName('textarea')[0];

        if((this.addressRows == 1) && (textarea.scrollHeight > 16)){

          this.addressRows++;

          this.address = document.getElementsByTagName('textarea')[0].value;

        }else if((this.addressRows == 2) && (textarea.scrollHeight > 32)){

          this.addressRows++;

          this.address = document.getElementsByTagName('textarea')[0].value;

        }else if((this.addressRows == 3) && (textarea.scrollHeight > 48)){

          document.getElementsByTagName('textarea')[0].value = this.address;

        }else{

          this.address = document.getElementsByTagName('textarea')[0].value;

        }

      },

      addressInput: function () {

        var address = this.address.split('');

        this.address = '';

        for(let word of address){

          document.getElementsByTagName('textarea')[0].value = document.getElementsByTagName('textarea')[0].value + word;

          this.addAddressRows();

        }

      },

      birthChange: function (oldBirth) {

        var birth = oldBirth.split('');

        birth = '' + birth[0] + birth[1]+birth[2]+birth[3]+'年'+birth[4]+birth[5]+'月'+birth[6]+birth[7]+'日';

        return birth;

      },




    },
    watch: {
      address: function (newValue,oldValue) {



        if(newValue.length < oldValue.length && this.addressRows > 1){

          this.addressRows--;

        }

        setTimeout(function () {

          var textarea = document.getElementsByTagName('textarea')[0];

          if((this.addressRows == 1) && (textarea.scrollHeight > 16)){

            this.addressRows++;

            this.address = document.getElementsByTagName('textarea')[0].value;

          }else if((this.addressRows == 2) && (textarea.scrollHeight > 32)){

            this.addressRows++;

            this.address = document.getElementsByTagName('textarea')[0].value;

          }else if((this.addressRows == 3) && (textarea.scrollHeight > 48)){

            this.address = document.getElementsByTagName('textarea')[0].value = oldValue;

          }else{

            this.address = document.getElementsByTagName('textarea')[0].value;

          }

        }.bind(this),1);

      }
    }
  }
</script>
<style lang="less" scoped>
  @import "IDCard_information.less";
</style>
