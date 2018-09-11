<template>
  <div class="certification">
    <div class="certification_information">
      <div class="certification_name">
        <span>姓名</span>
        <div class="information_btn">
          <input type="text" v-model="userName" placeholder="请输入姓名" v-if="isVerify == 0">
          <span v-else>{{userName}}</span>
        </div>
      </div>
      <div class="certification_name">
        <span>国籍（地区）</span>
        <div class="information_btn">
          <span>{{country}}</span>
        </div>
      </div>
      <div class="certification_name">
        <span>证件类型</span>
        <div class="information_btn">
          <span>{{cardType}}</span>
        </div>
      </div>
      <div class="certification_name">
        <span>证件号码</span>
        <div class="information_btn">
          <input type="text" placeholder="请填写证件号码" v-model="IDNumber" v-if="isVerify == 0">
          <span v-else>{{IDNumber}}</span>
        </div>
      </div>
    </div>
    <div class="certification_popup">
      <mt-popup class="information_picker" v-model="pickerShow" position="bottom">
        <div class="picker_btn">
          <mt-button v-on:click="pickerShow=false">取消</mt-button>
          <mt-button v-on:click="getCardType">确认</mt-button>
        </div>
        <mt-picker v-bind:slots="slots" v-on:change="onValueChange"></mt-picker>
      </mt-popup>
      <mt-index-list v-if="indexShow">
        <mt-index-section v-for="(values, key, index) in countryArr" v-bind:index="key">
          <div v-on:click="getPlace">
            <mt-cell v-for="value of values" v-bind:title="value.shortName" v-bind:value="value.englishName"></mt-cell>
          </div>
        </mt-index-section>
      </mt-index-list>
    </div>

    <orangeBtn v-if="isVerify == 0" v-bind:name="btnName" v-on:clickEvent="submit"></orangeBtn>

  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'certification',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        btnName: '提交',
        userName: '',
        IDNumber: '',
        pickerValue: '',
        pickerShow: false,
        cardType: '身份证',
        country: '中国大陆',
        countryArr: {},
        indexShow: false,
        isVerify: '',
        slots: [
          {
            values: ['身份证','港澳居民来往内地通行证','台湾居民来往内地通行证','护照'],
            textAlign: 'center'
          }
        ]
      }
    },
    mounted () {
      this.isVerify = this.getStorage('isVerify');
      this.userName = this.getStorage('userName');
      this.country = this.getStorage('nationality');
      this.cardType = this.getStorage('idType');
      this.IDNumber = this.getStorage('idNumber');
      if(this.cardType == 1){
        this.cardType = '身份证'
      }
      if(this.cardType == 2){
        this.cardType = '护照'
      }
      if(this.cardType == 3){
        this.cardType = '港澳居民来往内地通行证'
      }
      if(this.cardType == 4){
        this.cardType = '台湾居民来往内地通行证'
      }
      this.$http({
        method: 'post',
        url: process.env.API_ROOT+ 'user/country/getcountry',
        headers:{
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }).then( (res) => {
        var getCountry = res.data.data;
        delete getCountry.firstLetter;
        getCountry = JSON.parse(JSON.stringify(getCountry).replace(/hotCountry/g,'热门城市'));
        this.countryArr = getCountry;
      }).catch((res) => {
        this.$toast({
          message: res.data.msg,
          position: 'middle',
          duration: 1500
        });
      });
    },
    methods: {
      onValueChange: function (picker,values) {
        console.log(picker);
        console.log(values);
        this.pickerValue = values[0];
      },
      getCardType: function () {
        this.cardType = this.pickerValue;
        this.pickerShow = false;
      },
      getPlace: function () {
        for(var parent of event.path){
          if(parent.nodeName == 'A'){
            var parentTest = parent.innerText.split('\n');
            this.country = parentTest[0];
          }
          if(parent.nodeName == 'BODY'){
            this.indexShow = false;
            return;
          }
        }
      },
      submit: function () {
        var check = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if(!this.userName){
          this.$toast({
            message: '请输入姓名',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        if(!this.IDNumber){

          this.$toast({
            message: '请输入证件号码',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        if(!check.test(this.IDNumber)){
          this.$toast({
            message: '请输入正确的证件号码',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        this.$http({
          method: 'post',
          url: process.env.API_ROOT+ 'user/center/verifyuserinfo',
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          },
          params: {
            userName: this.userName,
            idNumber: this.IDNumber,
            idType: this.cardTypeId,
            nationality: this.country
          }
        }).then((res) => {
          console.log(res);
          var toast = this.$toast({
            message: res.data.msg,
            position: 'middle',
            duration: 1500
          });
          var _hrefId = this.getStorage('hrefId');
          if(res.data.code == '0000'){
            this.setStorage('isVerify','1');
            var _this = this
            setTimeout(()=>{
              toast.close();

              if(_hrefId=='1'){



                console.log('从个人中心');

                setTimeout(function () {

                  _this.$router.push('/personalCenter');

                  _this.mounted();


                },1000)


              }

              else if(_hrefId=='4'||_hrefId=='8'){

                setTimeout(function () {

                  _this.$router.go(-1)

                },1000)

              }

              else if(_hrefId=='10'){

                console.log('从转账');





              }

              else if(_hrefId=='6'){

                console.log('从京东');

                  setTimeout(function () {

                    _this.$router.push('/workDesk/discovery')

                  },1000)





              }


            },500);
          }
        }).catch((res) => {
          var toast = this.$toast({
            message: res.data.msg,
            position: 'middle',
            duration: 1500
          });
          if(res.data.code == '3001'){
            setTimeout( () => {
              toast.close();
              this.$router.push('/');
            },500);
          }
        })
      }
    },
    computed: {
      cardTypeId: function () {
        if(this.cardType == '身份证'){
          return 1;
        }
        if(this.cardType == '护照'){
          return 2;
        }
        if(this.cardType == '港澳居民来往内地通行证'){
          return 3;
        }
        if(this.cardType == '台湾居民来往内地通行证'){
          return 4;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'certification.less';
</style>
