<template>
  <div class="certification">
    <div class="certification_information">
      <div class="certification_name">
        <span>姓名</span>
        <div class="information_btn">
         <!-- <input type="text" v-model="userName" placeholder="请输入姓名" v-if="(isVerify == 0||isVerify == 3)&&source==1">-->
          <span>{{userName}}</span>
        </div>
      </div>
<!--      <div class="certification_name" onclick="if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ){setTimeout(function() {$('.mint-indexlist-content').css('height','auto') },200)}" v-on:click="indexShow = true" v-if="(isVerify == 0||isVerify == 3)">
        <span>国籍（地区）</span>
        <div class="information_btn">
          <span>{{country}}</span>
          <img src="../../../../static/images/reset_go.png">
        </div>
      </div>-->
      <div class="certification_name">
        <span>国籍（地区）</span>
        <div class="information_btn">
          <span>{{country}}</span>
        </div>
      </div>
<!--      <div class="certification_name" v-on:click="pickerShow = true" v-if="isVerify == 0||isVerify == 3">
        <span>证件类型</span>
        <div class="information_btn">
          <span>{{cardType}}</span>
          <img src="../../../../static/images/reset_go.png">
        </div>
      </div>-->
      <div class="certification_name">
        <span>证件类型</span>
        <div class="information_btn">
          <span>{{cardType}}</span>
        </div>
      </div>
      <div class="certification_name">
        <span>证件号码</span>
        <div class="information_btn">
          <span>{{IDNumber}}</span>
        </div>
      </div>
      <div class="certification_name" v-if="isVerify == 1">
        <span v-if="cardType == '身份证'&&isHaveUserVerifyImg == 1">身份证照片</span>
        <span v-else-if="cardType == '身份证'&&isHaveUserVerifyImg == 0">补充身份证照片</span>
        <span v-else>证件照片</span>

        <div class="information_btn">
          <span class="red" v-if="isHaveUserVerifyImg == 1">已上传</span>
          <span class="red" v-else v-on:click="$router.push('/IDCardCertification')">未上传<img src="../../../../static/images/reset_go.png"></span>
        </div>
      </div>
    </div>

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
            values: ['身份证','港澳居民来往内地通行证','台湾居民来往大陆通行证','护照'],
            textAlign: 'center'
          }
        ],//证件类型弹窗值
        closeBtn: '',//国家列表取消按键显示
        select: '',//国家列表筛选值
        source:'',
        isHaveUserVerifyImg:''//是否上传图片0为未上传1为上传
      }
    },
    mounted () {

      /**
       * 接口：用户中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/

      this.$http({

        method: 'post',

        url: process.env.API_ROOT + 'user/center/usercenter',



      }).then(function(res) {

        console.log(res.data);


        if(res.data.code=='0000'){

          this.isVerify = res.data.data.isVerify;

          this.isHaveUserVerifyImg = res.data.data.isHaveUserVerifyImg

          res.data.data.userName ? (this.userName = res.data.data.userName) : (this.userName = '');

          this.source=res.data.data.source;

          (res.data.data.idNumber) && (this.IDNumber = res.data.data.idNumber);

          (res.data.data.idType) && (this.cardType = res.data.data.idType);

          (res.data.data.idType) && (this.country = res.data.data.nationality);

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
            this.cardType = '台湾居民来往大陆通行证'
          }

          if(this.cardType == 5){
            this.cardType = '临时身份证'

          }

        }


      }.bind(this)).catch(function (error) {}.bind(this))


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





                }else if(_hrefId == '7'){

                  console.log('从签约合同详情');

                  setTimeout(function () {

                    _this.$router.push('/contractList');

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
        if(this.cardType == '台湾居民来往大陆通行证'){
          return 4;
        }
        if(this.cardType == '临时身份证'){
          return 5;
        }
      }
    },
    watch: {
      //清楚证件号码中的空格
      IDNumber: function (newValue, oldValue) {

        if(newValue.indexOf(' ') != -1){

          this.IDNumber = newValue.split(' ').join('');

        }

      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'certification.less';
</style>
<style>
  .certification .mint-indexlist-nav{
    display: none;
  }
  .certification .mint-indexlist{
    background-color: white;
  }
  .certification .mint-indexlist{
    overflow: scroll;
    height:auto;
    bottom: 0;
  }
  .certification .mint-indexlist-content{
    overflow: scroll!important;

  }
</style>
