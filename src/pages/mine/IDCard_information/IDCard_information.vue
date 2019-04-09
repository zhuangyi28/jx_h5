<template>
  <div class="IDCard_information">
    <div class="information_title">请核对身份证信息，如有问题请手动进行更正</div>
    <div class="information_part">
      <div class="information_detail">
        <span>姓名</span>
        <input type="text" v-model="userName">
      </div>
      <div class="information_detail">
        <span>身份证号</span>
        <span>{{idNumber}}</span>
      </div>
      <div class="information_detail" v-on:click="pickerShow = true">
        <span>性别</span>
        <span>{{sex}}</span>
      </div>
      <div class="information_detail">
        <span>民族</span>
        <input type="text" v-model="nation">
      </div>
      <div class="information_detail" @click="openPicker">
        <span>出生日期</span>
        <span>{{birth}}</span>
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
    <mt-popup class="information_picker" v-model="pickerShow" position="bottom">
    <div class="picker_btn">
      <mt-button v-on:click="pickerShow=false">取消</mt-button>
      <mt-button v-on:click="getCardType">确认</mt-button>
    </div>
    <mt-picker v-bind:slots="slots" v-on:change="onValueChange"></mt-picker>
  </mt-popup>
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

        btnName: '提交认证',//按钮名称

        address: '',//地址

        addressRows: 3,//地址栏行数

        userName: '',//姓名

        sex: '',//性别

        nation: '',//民族

        birth: '',//出生日期

        idNumber: '',//身份证号

        startDate: new Date('1968-01-01'),//时间选择开始事件

        timeDefault: '',//时间选择值

        urls: '',//身份证链接

        issuingTime: '',//签发时间

        expiryTime: '',//有效日期

        riskType: '',//身份类型

        extTradeNoB: '',//交易号（反面流水交易号）

        extTradeNo: '',//交易号

        issuingAuthority: '', //签发机关

        pickerShow: false,

        slots: [
          {
            values: ['男','女'],
            textAlign: 'center'
          }
        ],

        pickerValue: ''

      }

    },

    mounted () {

      this.getData();

    },

    methods: {

      getData: function () {

        var personInformation = this.$store.state.personInformation;

        this.userName = personInformation.name;

        this.sex = personInformation.sex;

        this.nation = personInformation.nation;

        this.address = personInformation.address;

        this.birth = personInformation.birth;

        this.idNumber = personInformation.idNumber;

        this.timeDefault = this.timeDefaultChange(this.birth);

        this.birth = this.birthChange(this.birth);

        this.issuingTime = this.dateChange(personInformation.issuingDate);

        this.expiryTime = this.dateChange(personInformation.expiryDate);

        this.riskType = personInformation.riskType;

        this.extTradeNo = personInformation.extTradeNo;

        this.extTradeNoB = personInformation.extTradeNoB;

        this.issuingAuthority = personInformation.issuingAuthority;

        this.urls = this.$store.state.imageUrl;

        this.addressInput();


      },

      //地址赋值
      addressChange: function () {

        this.address = document.getElementsByTagName('textarea')[0].value;



      },

      //地址栏行数控制
      /*addAddressRows: function () {

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

      },*/

      //地址栏地址添加
      addressInput: function () {

        var address = this.address.split('');

        //this.address = '';

        for(let word of address){

          document.getElementsByTagName('textarea')[0].value = document.getElementsByTagName('textarea')[0].value + word;

          //this.addAddressRows();

        }

      },

      //更改生日格式
      birthChange: function (oldBirth) {

        var birth = oldBirth.split('');

        birth = '' + birth[0] + birth[1]+birth[2]+birth[3]+'年'+birth[4]+birth[5]+'月'+birth[6]+birth[7]+'日';

        return birth;

      },

      //日期格式更改
      dateChange: function (date) {

        if(isNaN(+date)){

          return date;

        }

        var newDate = new Date(date);

        var year = newDate.getFullYear();

        var month = newDate.getMonth() + 1;

        var day = newDate.getDate();

        (month < 10) && (month = '0' + month);

        (day < 10) && (day = '0' + day);

        return '' + year + '-' + month + '-' + day;

      },

      //日期弹窗默认值格式更改
      timeDefaultChange: function (oldTime) {

        var time = oldTime.split('');

        time = '' + time[0] + time[1]+time[2]+time[3]+'-'+time[4]+time[5]+'-'+time[6]+time[7];

        return time;

      },

      //打开日期弹窗
      openPicker: function () {

        this.$refs.picker.open();

      },

      //确认弹窗中选择的日期
      handleConfirm: function (data) {

        var year = data.getFullYear();

        var month = data.getMonth() + 1;

        var day = data.getDate();

        (month < 10) && (month = '0' + month);

        (day < 10) && (day = '0' + day);

        this.birth = year + '年' + month + '月' + day + '日';

      },

      checked: function () {


          console.log(this.address)

        if(!this.userName){

          this.$toast({

            message: '请输入姓名',
            position: 'middle',
            duration: 1000

          });

          return false;

        }

        if(!this.idNumber){

          this.$toast({

            message: '请输入身份证号码',
            position: 'middle',
            duration: 1000

          });

          return false;

        }

        if(!this.sex){

          this.$toast({

            message: '请选择您的性别',
            position: 'middle',
            duration: 1000

          });

          return false;

        }

        if(!this.nation){

          this.$toast({

            message: '请输入民族',
            position: 'middle',
            duration: 1000

          });

          return false;
        }

        if(!this.birth){

          this.$toast({

            message: '请选择出生日期',
            position: 'middle',
            duration: 1000

          });

          return false;

        }

        if(!this.address){

          this.$toast({

            message: '请输入地址',
            position: 'middle',
            duration: 1000

          });

          return false;

        }

        return true;


      },

      //提交认证
      submit: function () {

        if(this.checked()){


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

              if(res.data.data.source == 0 && res.data.data.userName != this.userName){

                this.$toast({

                  message: '姓名与企业管理员添加的不一致，请使用姓名为' + res.data.data.userName + '的证件认证',
                  position: 'middle',
                  duration: 2000

                });

              }else{

                this.$indicator.open({
                  text: '实名认证中...',
                  spinnerType: 'fading-circle'
                });

                /**
                 * 接口：提交认证
                 * 请求方式：POST
                 * 接口：/user/center/orc/commit/userverify
                 * 入参：urls
                 **/

                this.$http({

                  method: 'post',

                  url:process.env.API_ROOT+'user/center/orc/commit/userverify',

                  params: {

                    name: this.userName,

                    idNumber: this.idNumber,

                    idType: 1,

                    urls: this.urls,

                    sex: this.sex,

                    nation: this.nation,

                    birth: this.birth,

                    address: this.address,

                    issuingTime: this.issuingTime,

                    expiryTime: this.expiryTime,

                    riskType: this.riskType,

                    extTradeNo: this.extTradeNo,

                    extTradeNoB: this.extTradeNoB,

                    issuingAuthority: this.issuingAuthority

                  }

                }).then(function(res){

                  console.log(res);

                  this.$indicator.close();

                  if(res.data.code == '0000'){

                    this.$toast({
                      message: '实名认证成功',
                      position: 'middle',
                      duration: 2000
                    });

                    (localStorage.getItem('bookingCertification') == '1') && (localStorage.setItem('bookingBack','1')) && (localStorage.removeItem('bookingCertification'));

                    this.$router.go(-3);

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

      },

      onValueChange: function (picker,values) {
        console.log(picker);
        console.log(values);
        this.pickerValue = values[0];
      },
      //证件类型弹窗点击确定后获取证件类型
      getCardType: function () {
        this.sex = this.pickerValue;
        this.pickerShow = false;
      },




    },
    watch: {

        address: function (newValue,oldValue){

            if(newValue.length > 32){

              var textarea = document.getElementsByTagName('textarea')[0];

              this.address = document.getElementsByTagName('textarea')[0].value = oldValue;

            }

          this.address = document.getElementsByTagName('textarea')[0].value


        }

      //监听地址值调整地址栏高度
      /*address: function (newValue,oldValue) {



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

      }*/
    }
  }
</script>
<style lang="less" scoped>
  @import "IDCard_information.less";
</style>
<style>
  .IDCard_information .mint-popup{
    width: 100%;
  }
</style>
