<template>
  <div class="IDCard_certification">
    <div class="IDCard_certification_input">
      <div class="IDCard_title">
        <span v-if="isVerify=='1'&&isHaveUserVerifyImg=='0'">请上传（证件号：{{idNumberAll}}）对应的证件照片</span>
        <span v-else>上传<span v-if="userName">（姓名：{{userName}}）</span>身份证照片，请确保证件照片完整、清晰</span>
      </div>
      <div class="certification_pic_input">
      <div class="img">
        <img v-bind:src="faceUrl">
        <input type="file" name="file" accept="image/png,image/gif,image/jpeg" @change="updateface" class="face_img"/>
      </div>
      <div class="title">
        <span>上传身份证正面</span>
        <span v-on:click="exampleImg" class="face">示例</span>
      </div>
    </div>
      <div class="certification_pic_input">
        <div class="img">
          <img v-bind:src="backUrl">
          <input type="file" name="file" accept="image/png,image/gif,image/jpeg" @change="updateface" class="back_img"/>
        </div>
        <div class="title">
          <span>上传身份证反面</span>
          <span v-on:click="exampleImg" class="back">示例</span>
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
          <button v-on:click="popupExample = false">确定</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {

    name: 'IDCardCertification',

    components: {

      orangeBtn: orangeBtn

    },

    data () {

      return {

        btnName: '',

        userName: '',

        faceUrl: './static/images/ID_card_face.png',

        backUrl: './static/images/ID_card_back.png',

        popupExample: false,

        exampleUrl: '',

        isVerify:'',//实名认证

        isHaveUserVerifyImg:'',//是否上传图片

        idNumberAll:'',//身份证号码



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

        this.isVerify = res.data.data.isVerify;

        this.isHaveUserVerifyImg = res.data.data.isHaveUserVerifyImg;

        this.idNumberAll = res.data.data.idNumberAll;

        (res.data.data.userName) && (this.userName = res.data.data.userName);

        if(res.data.code=='0000'){

          if(this.isVerify=='1'&&this.isHaveUserVerifyImg=='0'){

              document.title = '补充证件照片'

              this.btnName = '提交'

          }

          else {

            document.title = '实名认证'

            this.btnName = '下一步'
          }




        }


      }.bind(this)).catch(function (error) {}.bind(this))



    },


    methods: {

      updateface: function () {

        var loading = this.$toast({
          message: '图片上传中',
          position: 'middle'
        });

        var Event = event;

        var file = event.target.files[0];

        console.log(file);

        var param = new FormData(); //创建form对象

        param.append('File',file);//通过append向form对象添加数据


        this.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss',param,{
          headers:{'Content-Type':'multipart/form-data'}

        }).then((res)=>{

          console.log(res.data);

          if(res.data.code=='0000'){

            loading.close();

            this.$toast({

              message: '上传成功',
              position: 'middle',
              duration: 1500
            })

            if (Event.target.classList.contains('face_img')){

              this.faceUrl = res.data.data.url;

            }

            else if(Event.target.classList.contains('back_img')){


              this.backUrl = res.data.data.url;

            }
          }





        }).catch((res)=>{
          console.log(res);
        })

      },



      exampleImg: function () {

        if(event.currentTarget.classList.contains('back')){
          this.exampleUrl = './static/images/jx_idCard_back_example.png'
        }
        else if(event.currentTarget.classList.contains('face')){
          this.exampleUrl = './static/images/jx_idCard_face_example.png'
        }

        this.popupExample = true;

      },



      submit: function () {

        /*faceUrl: './static/images/ID_card_face.png', backUrl: './static/images/ID_card_back.png',*/
        if(this.faceUrl == './static/images/ID_card_face.png'){

          this.$toast({

            message: '请上传身份证正面照片',

            position: 'middle',

            duration:1500

          });

        }else if(this.backUrl == './static/images/ID_card_back.png'){

          this.$toast({

            message: '请上传身份证反面照片',

            position: 'middle',

            duration:1500

          });

        }else{

          if(this.isVerify=='1'&&this.isHaveUserVerifyImg=='0'){


            this.$indicator.open({
              text: '证件信息核对中...',
              spinnerType: 'fading-circle'
            });

          }

          else {


            this.$indicator.open({
              text: '图片信息读取中...',
              spinnerType: 'fading-circle'
            });
          }





          /**
           * 接口：保存用户证件URL
           * 请求方式：POST
           * 接口：/user/center/orc/userverify
           * 入参：urls
           **/

          this.$http({

            method: 'post',

            url:process.env.API_ROOT+'user/center/orc/userverify',

            params: {

              urls: this.faceUrl + ',' + this.backUrl,

              idType: 1

            }

          }).then(function (res) {

            if(res.data.code == -1){

              this.$toast({

                message: res.data.msg,

                position: 'middle',

                duration: 1500

              });

              this.$indicator.close();

            }else if(res.data.code == '0000'){

              this.$indicator.close();

              this.$store.state.imageUrl = this.faceUrl + ',' + this.backUrl;

              this.$store.state.personInformation = res.data.data;

              if(this.isVerify=='1'&&this.isHaveUserVerifyImg=='0'){

                this.$router.go(-1);

                this.$toast({

                  message: '身份证照片上传成功',

                  position: 'middle',

                  duration: 3500

                });


              }

              else {

                this.$router.push('/IDCardInformation');
              }




            }

          }.bind(this));

        }

      }


    }

  }
</script>
<style lang="less" scoped>
  @import "IDCard_certification.less";
</style>
