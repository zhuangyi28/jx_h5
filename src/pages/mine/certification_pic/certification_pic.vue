<template>
  <div class="certification_pic">
    <div class="certification_pic_title">
      请上传（证件号：{{idNumber}}）对应的证件照片
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
        <input type="file" name="file" accept="image/png,image/gif,image/jpeg" @change="updateface" class="face_img"/>
      </div>
      <div class="img" v-else>
        <img v-bind:src="faceUrl">
        <input type="file" name="file" accept="image/*" @change="updateface" class="face_img"/>
      </div>
      <div class="title">
        <span v-if="cardTypeId == 4 || cardTypeId == 3">上传港、澳、台通行证正面</span>
        <span v-else-if="cardTypeId == 2">上传护照照片</span>
        <span v-on:click="exampleImg" class="face color_text">示例</span>
      </div>
    </div>
    <div class="certification_pic_input" v-if="cardTypeId == 4 || cardTypeId == 3">
      <div class="img" v-if="backUrl == './static/images/jx_card_back.png'">
        <div class="color_background"></div>
        <div class="card_background">
          <div class="left_border border_color"></div>
          <div class="right_border border_color"></div>
          <div class="top_border border_color"></div>
          <div class="bottom_border border_color"></div>
          <img v-bind:src="backUrl">
        </div>
        <input type="file" name="file" accept="image/png,image/gif,image/jpeg" @change="updateface" class="back_img"/>
      </div>
      <div class="img" v-else>
        <img v-bind:src="backUrl">
        <input type="file" name="file" accept="image/*" @change="updateface" class="back_img"/>
      </div>
      <div class="title">
        上传港、澳、台通行证反面<span v-on:click="exampleImg" class="back">示例</span>
      </div>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
    <div class="certification_pic_ps">
      此信息仅用于身份验证，平台不会像第三方透露用户信息
    </div>
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
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'certificationPic',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        btnName: '提交',
        cardTypeId: '',
        idNumber: '',
        popupExample: false,
        faceUrl: "./static/images/jx_card_face.png",
        backUrl: "./static/images/jx_card_back.png",
        exampleUrl: '',
        files: [],
        userName: '',
        nationality: ''
      }
    },
    mounted () {
      //判断安卓
      var u = navigator.userAgent

      if(u.indexOf('Android') > -1){


        let em = document.getElementsByTagName('input')

        for(var i=0;i<em.length;i++){

          em[i].style.multiple = 'multiple'

        }

      }


      this.cardTypeId = this.getStorage('idType');
      this.idNumber = this.getStorage('idNumber');
      this.userName = this.getStorage('userName');
      this.nationality = this.getStorage('country');
    },
    methods: {

      updateface: function (event) {

        var _this = this;

        var Event = event;

        var file = event.target.files[0];

        console.log(file);

        var param = new FormData(); //创建form对象

        param.append('File',file);//通过append向form对象添加数据

        this.$indicator.open({
          text: '上传中...',
          spinnerType: 'fading-circle'
        });


        this.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss',param,{
          headers:{'Content-Type':'multipart/form-data'}

        }).then((res)=>{

          console.log(res.data);

          if(res.data.code=='0000'){

            var imgUrl = res.data.data.url;




            (function () {

              var img = new Image();

              img.onload = function () {

                console.log(res)

                _this.$toast({

                  message: '上传成功',
                  position: 'middle',
                  duration: 1500
                });

                if (Event.target.classList.contains('face_img')) {

                  _this.faceUrl = res.data.data.url;

                }

                else if (Event.target.classList.contains('back_img')) {


                  _this.backUrl = res.data.data.url;

                }

                _this.$indicator.close();

                //console.log("img is loaded")



              };

              img.onerror = function () {

                loading.close();

                _this.$toast({
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





        }).catch((res)=>{
          console.log(res);
        })

      },
      exampleImg: function () {
        if(this.cardTypeId == 2){
          this.exampleUrl = './static/images/jx_example_password.jpg'
        }
        else if(this.cardTypeId == 3 || this.cardTypeId == 4){
          if(event.currentTarget.classList.contains('back')){
            this.exampleUrl = './static/images/jx_example_back.jpg'
          }
          else if(event.currentTarget.classList.contains('face')){
            this.exampleUrl = './static/images/jx_example_paper.jpg'
          }
        }
        this.popupExample = true;
      },
      handleClick: function () {

          if(this.faceUrl == "./static/images/jx_card_face.png"){

            this.$toast({

              message: '请上传证件照正面',

              position: 'middle',

              duration: 1500

            });

          }

          else{

            if(this.cardTypeId != 2 && this.backUrl == "./static/images/jx_card_back.png"){

              this.$toast({

                message: '请上传证件照反面',

                position: 'middle',

                duration: 1500

              })

            }

            else{

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

                  idNumber:this.idNumber,

                  idType:this.cardTypeId,

                  nationality:this.nationality,

                  urls:this.faceUrl+','+this.backUrl

                }

              }).then((res)=>{

                console.log(res);

                if(res.data.code == '0000'){

                  this.$router.push('/certificationSuccess');

                }else{

                  this.$toast({
                    message: res.data.msg,
                    position: 'middle',
                    duration: 1500
                  });

                }

              }).catch((res)=>{

                debugger;

                console.log(res);

              })

            }

          }

      }
    }
  }
</script>
<style lang="less" scoped>
  @import "certification_pic.less";
</style>
