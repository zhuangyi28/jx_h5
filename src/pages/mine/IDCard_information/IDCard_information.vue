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
      <div class="information_detail" @click="openPicker">
        <span>出生日期</span>
        <input type="text" v-bind:value="birth" disabled>
      </div>
      <div class="information_detail">
        <span class="address">地址</span>
        <textarea v-bind:rows="addressRows" v-on:input="addressChange"></textarea>
      </div>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="submit"></orangeBtn>
    <mt-datetime-picker
      type="date"
      ref="picker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      :startDate="startDate"
      v-model="timeDefault"
    >
    </mt-datetime-picker>
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

        pickerVisible: true,

        startDate: new Date('1968-01-01'),

        timeDefault: ''

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

      this.timeDefault = this.timeDefaultChange(this.birth);

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

      timeDefaultChange: function (oldTime) {

        var time = oldTime.split('');

        time = '' + time[0] + time[1]+time[2]+time[3]+'-'+time[4]+time[5]+'-'+time[6]+time[7];

        return time;

      },


      openPicker: function () {

        this.$refs.picker.open();

      },


      handleConfirm: function (data) {

        var year = data.getFullYear();

        var month = data.getMonth() + 1;

        var day = data.getDate();

        (month < 10) && (month = '0' + month);

        (day < 10) && (day = '0' + day);

        this.birth = year + '年' + month + '月' + day + '日';

      },


      submit: function () {

        if(!this.userName){

          this.$toast({

            message: '请输入姓名',
            position: 'middle',
            duration: 1000

          });

        }else{


          /**
           * 接口：用户中心
           * 请求方式：POST
           * 接口：/user/center/usercenter
           * 入参：null
           **/

          this.$http({

            method: 'post',

            url:process.env.API_ROOT+'user/center/usercenter',

          }).then(function (res) {

            if(res.data.code == '0000'){

              if(res.data.data.source == 1 && res.data.data.userName != this.userName){

                this.$toast({

                  message: '请使用姓名为' + res.data.data.userName + '的证件认证，核对一致再进行实名认证',
                  position: 'middle',
                  duration: 1000

                });

              }else{

                this.$indicator.open({
                  text: '实名认证中...',
                  spinnerType: 'fading-circle'
                });

                /**
                 * 接口：证件实名认证
                 * 请求方式：POST
                 * 接口：/user/center/verifyuserinfo
                 * 入参：urls
                 **/

                this.$http({

                  method: 'post',

                  url:process.env.API_ROOT+'user/center/verifyuserinfo',

                  params: {

                    userName: this.userName,

                    idNumber: this.idNumber,

                    idType: 1,

                    nationality: '中国大陆',

                    urls: this.$store.state.imageUrl

                  }

                }).then(function(res){

                  this.$indicator.close();

                  if(res.data.code == '0000'){

                    this.$router.push('/certification');

                  }else if(res.data.code == '-1'){

                    this.$toast({

                      message: res.data.msg,
                      position: 'middle',
                      duration: 1000

                    });

                  }else{

                    this.$toast({

                      message: '实名认证失败',
                      position: 'middle',
                      duration: 1000

                    });

                  }

                }.bind(this));

              }

            }

          }.bind(this))





        }

      }




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
