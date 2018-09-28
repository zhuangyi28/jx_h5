<template>
  <div class="certification">
    <div class="certification_information">
      <div class="certification_name">
        <span>姓名</span>
        <div class="information_btn">
          <input type="text" v-model="userName" placeholder="请输入姓名" v-if="isVerify == 0||isVerify == 3">
          <span v-else>{{userName}}</span>
        </div>
      </div>
      <div class="certification_name" onclick="if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ){setTimeout(function() {$('.mint-indexlist-content').css('height','auto') },200)}" v-on:click="indexShow = true;" v-if="isVerify == 0||isVerify == 3">
        <span>国籍（地区）</span>
        <div class="information_btn">
          <span>{{country}}</span>
          <img src="../../../../static/images/reset_go.png">
        </div>
      </div>
      <div class="certification_name" v-else>
        <span>国籍（地区）</span>
        <div class="information_btn">
          <span>{{country}}</span>
        </div>
      </div>
      <div class="certification_name" v-on:click="pickerShow = true" v-if="isVerify == 0||isVerify == 3">
        <span>证件类型</span>
        <div class="information_btn">
          <span>{{cardType}}</span>
          <img src="../../../../static/images/reset_go.png">
        </div>
      </div>
      <div class="certification_name" v-else>
        <span>证件类型</span>
        <div class="information_btn">
          <span>{{cardType}}</span>
        </div>
      </div>
      <div class="certification_name">
        <span>证件号码</span>
        <div class="information_btn">
          <input type="text" placeholder="请填写证件号码" v-model="IDNumber" v-if="isVerify == 0||isVerify == 3">
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
        <div class="select_box">
          <div class="select_input">
            <img src="../../../../static/images/jx_found.png">
            <input type="text" placeholder="请输入国家中文名/英文名" v-on:click="closeBtn=true" v-model="select" v-on:input="displayChange">
          </div>
          <div class="close_btn" v-if="closeBtn==true" v-on:click="indexShow = false">取消</div>
        </div>
        <mt-index-section v-for="(values, key, index) in countryArr" v-bind:index="key" v-on:click="console.log('cehsi')">
          <div v-on:click="getPlace">
            <mt-cell :data-shortname="value.shortName" onclick="localStorage.setItem('dataCountry',this.getAttribute('data-shortName'))" v-for="value in values" v-bind:title="value.shortName" v-bind:value="value.englishName" v-if="(value.shortName + value.englishName).match(select)"></mt-cell>
          </div>
        </mt-index-section>
      </mt-index-list>
    </div>

    <orangeBtn v-if="isVerify == 0||isVerify == 3" v-bind:name="btnName" v-on:clickEvent="submit"></orangeBtn>

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
        btnName: '提交',//按键名称
        userName: '',//用户姓名
        IDNumber: '',//证件号码
        pickerValue: '',//证件弹窗取值
        pickerShow: false,//证件弹窗显示
        cardType: '身份证',//证件类型
        country: '中国大陆',//国籍
        countryArr: {},//国家列表
        indexShow: false,//国家列表显示
        isVerify: '',//是否认证
        slots: [
          {
            values: ['身份证','港澳居民来往内地通行证','台湾居民来往内地通行证','护照'],
            textAlign: 'center'
          }
        ],//证件类型弹窗值
        closeBtn: '',//国家列表取消按键显示
        select: ''//国家列表筛选值
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
      /*
      * 接口： 国籍查询
      * 访问方式： POST
      * 接口： /user/country/getcountry
      * 传参： null
      * */
      this.$http({
        method: 'post',
        url: process.env.API_ROOT+ 'user/country/getcountry',
        headers:{
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }).then( (res) => {
        var getCountry = res.data.data;
        delete getCountry.firstLetter;//去掉首字母列
        getCountry = JSON.parse(JSON.stringify(getCountry).replace(/hotCountry/g,'热门城市'));//将列表中hotCountry改成热门城市
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



      //证件类型切换
      onValueChange: function (picker,values) {
        console.log(picker);
        console.log(values);
        this.pickerValue = values[0];
      },
      //证件类型弹窗点击确定后获取证件类型
      getCardType: function () {
        this.cardType = this.pickerValue;
        this.pickerShow = false;
      },
      //国家弹窗点击国家获取国家名称
      getPlace: function () {


        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ){


            setTimeout(function () {


                var dataCountry=localStorage.getItem('dataCountry');

                if(dataCountry){

                  this.country = localStorage.getItem('dataCountry');

                  this.indexShow = false;

                  localStorage.removeItem('dataCountry')


                }




            }.bind(this),300)




        }
        else {
          for (var parent of event.path) {
            if (parent.nodeName == 'A') {
              var parentTest = parent.innerText.split('\n');
              this.country = parentTest[0];
            }
            if (parent.nodeName == 'BODY') {
              this.indexShow = false;
              return;
            }
          }
        }


      },
      //提交
      submit: function () {
        var check = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if(this.cardTypeId == 1){
          //身份证
          check = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        }
        else if(this.cardTypeId == 3){
          //港澳
          check = /^[a-z0-9A-Z]{11}$/;
        }
        else if(this.cardTypeId == 4){
          //台湾
          check = /^[a-z0-9A-Z]{8}$/;
        }
        else if(this.cardTypeId == 2){

          //护照
          check = /^[a-z0-9A-Z]{6,20}$/;
        }
        if(!this.userName){
          this.$toast({
            message: '请输入姓名',
            position: 'middle',
            duration: 1500
          });
          return;
        }
        if(!this.IDNumber){

          this.$toast({
            message: '请输入证件号码',
            position: 'middle',
            duration: 1500
          });
          return;
        }
        if(!check.test(this.IDNumber)){
          this.$toast({
            message: '请输入正确的证件号码',
            position: 'middle',
            duration: 1500
          });
          return;
        }
        /*
        * 接口： 证件实名认证
        * 访问方式： POST
        * 接口： /user/center/vertifyuserinfo
        * 参数： userName, idNumber, idType, nationality
        * */
        if(this.cardTypeId == 1){
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
          });
        }
        else{
          this.setStorage('idType',this.cardTypeId);
          this.setStorage('idNumber',this.IDNumber);
          this.setStorage('userName',this.userName);
          this.setStorage('country',this.country);
          this.setStorage('cardType',this.cardType);
          this.$router.push('/certificationPic');
        }
      },
      displayChange: function () {
        setTimeout(()=>{
          var nodes = document.getElementsByClassName('mint-indexsection');
          for(var node of nodes){
            var child = node.getElementsByClassName('mint-cell');
            if(child.length == 0){
              node.style.display = 'none';
            }else{
              node.style.display = '';
            }
          }
        },10);
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
<style>
  .mint-indexlist-nav{
    display: none;
  }
  .mint-indexlist{
    background-color: white;
  }
  .mint-indexlist{
    overflow: scroll;
    height:auto;
    bottom: auto;
  }
  .mint-indexlist-content{
    overflow: scroll!important;

  }
</style>
