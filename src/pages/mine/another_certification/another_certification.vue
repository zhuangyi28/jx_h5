<template>
  <div class="another_certification">
    <div class="certification_information">
      <div class="certification_name">
        <span>姓名</span>
        <div class="information_btn">
          <input type="text" v-model="userName" placeholder="请输入姓名" v-if="(isVerify == 0||isVerify == 3)&&source==1">
          <span v-else>{{userName}}</span>
        </div>
      </div>
      <div class="certification_name" v-on:click="$router.push('/countryList')" v-if="(isVerify == 0||isVerify == 3)">
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
      <div class="certification_name" v-on:click="pickerShow = true" v-if="(isVerify == 0||isVerify == 3)">
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
      <div class="another_title">
        证件照片
      </div>
      <div class="certification_pic_input">
        <div class="img" v-if="faceUrl == './static/images/jx_card_face.png'">
          <div class="color_background"></div>
          <div class="card_background">
            <div class="left_border border_color"></div>
            <div class="right_border border_color"></div>
            <div class="top_border border_color"></div>
            <div class="bottom_border border_color"></div>
            <img v-bind:src="faceUrl">
          </div>
          <input type="file" name="file" accept="image/*" @change="updateface" class="face_img"/>
        </div>
        <div class="img" v-else>
          <img v-bind:src="faceUrl">
          <input type="file" name="file" accept="image/*" @change="updateface" class="face_img"/>
        </div>
        <div class="title">
          <span v-if="cardTypeId==3">上传港澳通行证正面</span>
          <span v-else-if="cardTypeId==4">上传台湾通行证正面</span>
          <span v-else-if="cardTypeId==5">上传临时身份证正面</span>
          <span v-else>上传护照照片</span>
          <span v-on:click="exampleImg" class="face color_text">示例</span>
        </div>
      </div>
      <div class="certification_pic_input" v-if="cardTypeId != 2&&cardTypeId != 5">
        <div class="img" v-if="backUrl == './static/images/jx_card_back.png'">
          <div class="color_background"></div>
          <div class="card_background">
            <div class="left_border border_color"></div>
            <div class="right_border border_color"></div>
            <div class="top_border border_color"></div>
            <div class="bottom_border border_color"></div>
            <img v-bind:src="backUrl">
          </div>
          <input type="file" name="file" accept="image/*" @change="updateface" class="back_img"/>
        </div>
        <div class="img" v-else>
          <img v-bind:src="backUrl">
          <input type="file" name="file" accept="image/*" @change="updateface" class="face_img"/>
        </div>
        <div class="title">
          <span v-if="cardTypeId == 3">上传港澳通行证反面</span>
          <span v-else-if="cardTypeId == 4">上传台湾通行证反面</span>
          <span v-on:click="exampleImg" class="back color_text">示例</span>
        </div>
      </div>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="submit"></orangeBtn>
    <div class="input_ps">此信息仅用于身份验证，平台不会向第三方透露用户信息</div>
    <mt-popup v-model="popupExample">
      <div class="example">
        <div class="example_title">
          证件示例
        </div>
        <div class="example_img">
          <img v-bind:src="exampleUrl">
        </div>
        <div class="example_button">
          <button class="color_text" v-on:click="popupExample = false">确定</button>
        </div>
      </div>
    </mt-popup>
    <div class="certification_popup">
      <mt-popup class="information_picker" v-model="pickerShow" position="bottom">
        <div class="picker_btn">
          <mt-button v-on:click="pickerShow=false">取消</mt-button>
          <mt-button v-on:click="getCardType">确认</mt-button>
        </div>
        <mt-picker v-bind:slots="slots" v-on:change="onValueChange"></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>
<script>

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'anotherCertification',

    components: {

      orangeBtn: orangeBtn

    },

    data () {

      return {

        btnName: '提交',

        userName: '',

        faceUrl: './static/images/jx_card_face.png',

        backUrl: './static/images/jx_card_back.png',

        popupExample: false,

        exampleUrl: '',
        IDNumber: '',//证件号码
        pickerValue: '',//证件弹窗取值
        pickerShow: false,//证件弹窗显示
        cardType: "港澳居民来往内地通行证",//证件类型
        country: '中国大陆',//国籍
        countryArr: {},//国家列表
        indexShow: false,//国家列表显示
        isVerify: '',//是否认证
        slots: [
          {
            values: ['港澳居民来往内地通行证','台湾居民来往大陆通行证','护照','临时身份证'],
            textAlign: 'center'
          }
        ],//证件类型弹窗值
        closeBtn: '',//国家列表取消按键显示
        select: '',//国家列表筛选值
        source:'',
        urls: ''
      }

    },
    mounted() {

      this.getData();

    },

    activated () {

      (this.$store.state.place) && (this.country = this.$store.state.place);

      delete this.$store.state.place;

    },


    methods: {

      //获取数据
      getData: function () {

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

            res.data.data.userName ? (this.userName = res.data.data.userName) : (this.userName = '');

            this.source=res.data.data.source;

            if(this.source == 0){

              (res.data.data.idNumber) && (this.IDNumber = res.data.data.idNumber);

              (res.data.data.idType) && (this.cardType = res.data.data.idType);

              (res.data.data.idType) && (this.country = res.data.data.nationality);


              (this.cardType == 1)&&(this.cardType = 3) && (this.IDNumber = '');

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

          }


        }.bind(this)).catch(function (error) {}.bind(this))

      },



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
      //提交
      submit: function () {
        var check = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

        if(this.cardTypeId == 3){
          //港澳
          check = /^[a-z0-9A-Z]{9}$/;
        }
        else if(this.cardTypeId == 4){
          //台湾
          check = /^[a-z0-9A-Z]{8}$/;
        }
        else if(this.cardTypeId == 2){

          //护照
          check = /^[a-z0-9A-Z]{6,20}$/;
        }
        else if(this.cardTypeId == 5){

         check = idcardReg

            //临时身份证

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
        /*faceUrl: './static/images/jx_card_face.png',

        backUrl: './static/images/jx_card_back.png',',*/
        if(this.cardTypeId != 2&&this.cardTypeId != 5){

          if(this.faceUrl == './static/images/jx_card_face.png' && this.backUrl == './static/images/jx_card_back.png'){

            this.$toast({
              message: '请上传证件照片',
              position: 'middle',
              duration: 1500
            });
            return;

          }else if(this.faceUrl == './static/images/jx_card_face.png'){

            this.$toast({
              message: '请上传证件照正面',
              position: 'middle',
              duration: 1500
            });
            return;

          }else if(this.backUrl == './static/images/jx_card_back.png'){

            this.$toast({
              message: '请上传证件照反面',
              position: 'middle',
              duration: 1500
            });
            return;

          }else{

            this.urls = this.faceUrl + ',' + this.backUrl;

          }

        }else if(this.cardTypeId == 2||this.cardTypeId == 5){

          if(this.faceUrl == './static/images/jx_card_face.png'){

            this.$toast({
              message: '请上传证件照片',
              position: 'middle',
              duration: 1500
            });
            return;

          }else{

            this.urls = this.faceUrl;

          }

        }
        /**
         * 接口：实名认证
         * 请求方式：POST
         * 接口：user/center/verifyuserinfo
         * 入参：userName,idNumber,idType,nationality,urls
         **/
        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/center/verifyuserinfo',

          header: {

            'content-type': 'application/x-www-form-urlencoded'

          },

          params: {

            userName:this.userName,

            idNumber:this.IDNumber,

            idType:this.cardTypeId,

            nationality:this.country,

            urls:this.urls

          }

        }).then(function(res){

          console.log(res);

          if(res.data.code == '0000'){

            this.setStorage('anotherCertification','1');

            this.$router.push('/certificationSuccess');

          }else{

            this.$toast({
              message: res.data.msg,
              position: 'middle',
              duration: 1500
            });

          }

        }.bind(this)).catch((res) => {
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
      },
      //上传照片
      updateface: function () {

        var that = this

        var Event = event;

        var file = event.target.files[0];

        var imgSize = file.size;

        var param = new FormData(); //创建form对象

        param.append('File', file);//通过append向form对象添加数据

        console.log(file);

        that.$indicator.open({
          text: '上传中,请耐心等待',
          spinnerType: 'fading-circle'
        });



        that.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss', param, {
          headers: {'Content-Type': 'multipart/form-data'}

        }).then((res) => {

          console.log(res.data);

          if (res.data.code == '0000') {

            var imgUrl = res.data.data.url;

            (function () {

              var img = new Image();

              img.onload = function () {



                that.$indicator.close();

                setTimeout(function () {

                  that.$toast({

                    message: '上传成功',
                    position: 'middle',
                    duration: 1500
                  });

                },500)



                if (Event.target.classList.contains('face_img')) {

                  that.faceUrl = res.data.data.url;

                }

                else if (Event.target.classList.contains('back_img')) {


                  that.backUrl = res.data.data.url;

                }

                //console.log("img is loaded")



              };

              img.onerror = function () {

                that.$indicator.close();

                that.$toast({
                  message: '上传失败，页面自动刷新后请重试',
                  position: 'middle',
                  duration: 1500
                });

                setTimeout(function () {

                  window.location.reload();

                },1000)



              };

              img.src = imgUrl;

            })();

          }
        }).catch((res)=>{})



        /*
                  lrz(file, {
                    width: 800,
                    quality: 0.8   //自定义使用压缩方式
                  })
                    .then(function (rst) {
                      //成功时执行
                      console.log(rst)

                      var thisfiles = new window.File([rst.file], file.name, {type: file.type})

                      var param = new FormData(); //创建form对象

                      param.append('File', thisfiles);//通过append向form对象添加数据

                      if(rst.file.size>1024*1024*2){

                        that.$toast({

                          message: '文件大于2M，请重新上传！',
                          position: 'middle',
                          duration: 1500

                        })

                      }

                      else {

                        that.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss', param, {
                          headers: {'Content-Type': 'multipart/form-data'},


                        }).then((res) => {

                          console.log(res.data);

                          if (res.data.code == '0000') {

                            var imgUrl = res.data.data.url;


                            (function () {

                              var img = new Image();

                              img.onload = function () {

                                loading.close();

                                console.log(res)

                                that.$toast({

                                  message: '上传成功',
                                  position: 'middle',
                                  duration: 1500
                                });

                                if (Event.target.classList.contains('face_img')) {

                                  that.faceUrl = res.data.data.url;

                                }

                                else if (Event.target.classList.contains('back_img')) {


                                  that.backUrl = res.data.data.url;

                                }

                                //console.log("img is loaded")



                              };

                              img.onerror = function () {

                                loading.close();

                                that.$toast({
                                  message: '上传失败，页面自动刷新后请重试',
                                  position: 'middle',
                                  duration: 1500
                                });

                                setTimeout(function () {

                                  window.location.reload();

                                },1000)



                              };

                              img.src = imgUrl;

                            })();
                          }


                        }).catch((res) => {
                          console.log(res);
                        })

                      }
                    }).catch(function (error) {
                    //失败时执行
                  }).always(function () {
                    //不管成功或失败，都会执行
                  })
        */



      },

      //示例照片弹出
      exampleImg: function () {

        if(this.cardTypeId == 4){

          if(event.currentTarget.classList.contains('back')){
            this.exampleUrl = './static/images/jx_example_back.jpg'
          }
          else if(event.currentTarget.classList.contains('face')){
            this.exampleUrl = './static/images/jx_example_paper.jpg'
          }

        }else if(this.cardTypeId == 2){

          this.exampleUrl = './static/images/jx_example_password.jpg'

        }else if(this.cardTypeId == 3){

          if(event.currentTarget.classList.contains('back')){
            this.exampleUrl = './static/images/jx_example_exit_back.jpg'
          }
          else if(event.currentTarget.classList.contains('face')){
            this.exampleUrl = './static/images/jx_example_exit_face.jpg'
          }

        }
        else if(this.cardTypeId == 5){

          this.exampleUrl = './static/images/jx_example_linshi_face.jpg'
        }

        this.popupExample = true;

      },



  },
    computed: {
      cardTypeId: function () {
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

            return 5
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
  @import "another_certification.less";
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
  }
  .certification .mint-indexlist-content{
    overflow: scroll!important;

  }
  .mint-indexlist-nav{
    display: none;
  }
</style>
