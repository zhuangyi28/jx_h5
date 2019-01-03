<template>
  <div class="person_information" id="personInformation">
    <div class="person_information_ps">技能标签能让企业在搜索相应人才时，优先看到您。</div>
    <div class="skill_part">
      <div class="skill_title before_border"><span>*</span>技能标签</div>
      <div class="skill_tags">
        <div v-for="tag in tags" class="color_text color_text">
          <span>{{tag}}</span>
          <span class="delete_btn color_background" v-bind:data-tag="tag" v-on:click="tagsDel"></span>
        </div>
        <div v-on:click="tagsAdd" v-if="tags.length < 6" class="add_btn">
          <span>添加</span>
          <span class="delete_btn"></span>
        </div>
      </div>
      <div class="skill_ps">注：最多添加5个标签，每个标签最多6个字</div>
    </div>
    <div class="introduce_yourself">
      <div class="introduce_title before_border">自我介绍</div>
      <div class="introduce_input">
        <textarea cols="30" rows="6" placeholder="详细描述下你自己，字数控制在200字以内" v-model="introduceYourself" maxlength="200"></textarea>
      </div>
    </div>
    <!--<div class="supply_part" v-if="idType == 1">-->
      <!--<div class="supply_title before_border">-->
        <!--<div>-->
          <!--<span ><span>*</span>补充信息</span>-->
          <!--<span>（身份证照片）</span>-->
        <!--</div>-->
        <!--<div v-bind:class="supplyShow ? 'supply_part_show' : 'supply_part_hidden'" v-on:click="supplyShow = !supplyShow"></div>-->
      <!--</div>-->
      <!--<div class="upload" v-if="supplyShow || lookTaskToPersonInformation">-->
        <!--<div class="upload_title">请上传（证件号：<span>{{idNumber}}</span>）对应的证件照片</div>-->
        <!--<div class="upload_face">-->
          <!--<img v-bind:src="faceUrl">-->
          <!--<input type="file" v-on:change="inputImg" imgType="face" accept="image/*">-->
        <!--</div>-->
        <!--<div class="upload_name color_text">上传身份证正面<span v-on:click="exampleImg" class="face">示例</span></div>-->
        <!--<div class="upload_back">-->
          <!--<img v-bind:src="backUrl">-->
          <!--<input type="file" v-on:change="inputImg" imgType="back" accept="image/*">-->
        <!--</div>-->
        <!--<div class="upload_name color_text">上传身份证反面<span v-on:click="exampleImg" class="back">示例</span></div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<mt-popup v-model="popupExample">-->
      <!--<div class="example">-->
        <!--<div class="example_title">-->
          <!--证件示例-->
        <!--</div>-->
        <!--<div class="example_img">-->
          <!--<img v-bind:src="exampleUrl">-->
        <!--</div>-->
        <!--<div class="example_button">-->
          <!--<button v-on:click="popupExample = false">确定</button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</mt-popup>-->
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="saveInformation"></orangeBtn>
  </div>
</template>
<script>

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'person_information',

    components: {

      orangeBtn: orangeBtn

    },

    data () {

      return {

        btnName: '提交',

        popupShow: false,

        tags: [],

        faceUrl: './static/images/jx_idcard_face.png',

        backUrl: './static/images/jx_idcard_back.png',

        introduceYourself: '',

        idType: '',

        idNumber: '',

        supplyShow: false,

        lookTaskToPersonInformation: '',

        exampleUrl: '',

        popupExample: false

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

      /**
       * 接口：用户中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/

//      this.$http({
//
//        method: 'post',
//
//        url: process.env.API_ROOT + 'user/center/usercenter',
//
//      }).then(function (res) {
//
//        if(res.data.data.isVerify == 0 || res.data.data.isVerify == 3){
//
//          this.$messagebox({
//            title: '提示',
//            message: '未实名认证用户，需先完成实名认证才填写个人履历',
//            showCancelButton: true,
//            showConfirmButton: true,
//            confirmButtonText: '去认证',
//            cancelButtonText: '取消',
//            closeOnClickModal: false,
//            cancelButtonClass: 'cancel_btn',
//            confirmButtonClass: 'confirm_btn_orange',
//          }).then((res)=>{
//
//            if(res == 'confirm'){
//
//              this.setStorage('hrefId','4');
//
//              this.$router.push('/certificationChoose');
//
//            }else if(res == 'cancel'){
//
//              window.history.go(-1);
//
//            }
//
//          })
//
//        }else if(res.data.data.isVerify == 2){
//
//          this.$messagebox({
//            title: '提示',
//            message: '实名认证审核中，审核通过后即可填写个人履历',
//            confirmButtonText: '确认',
//            confirmButtonClass: 'confirm_btn_orange',
//          }).then((res)=>{
//            window.history.go(-1);
//          })
//
//        }
//
//      }.bind(this));

      this.lookTaskToPersonInformation = localStorage.getItem('lookTaskToPersonInformation');

      this.getUserCenter();

      this.getPersonInformation();

    },




    methods: {

      tagsAdd: function () {

        /*this.$messagebox({

          title: '请输入标签',
          showInput: true,
          inputType: 'text',
          inputPlaceholder: '请输入您的标签(最多6个字)',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',

        }).then(function (res) {

          debugger;

        }.bind(this));*/

        this.$messagebox.prompt('请输入标签','').then(function ({value,action}){

          if(value){

            if(value.length > 6){

              this.$toast({

                message: '每个标签最多6个字',

                position: 'middle',

                duration: 1500

              });

            }else if (this.tags.indexOf(value) != -1) {

              this.$toast({

                message: '请不要添加重复的标签',

                position: 'bottom',

                duration: 1500

              })

            }else{

              this.tags.push(value);

            }

          }

          if(document.body.scrollTop){

              document.body.scrollTop = 0;

          }else if(document.documentElement.scrollTop){


            document.documentElement.scrollTop = 0;


          }


        }.bind(this));

      },

      tagsDel: function () {

        var tag = event.currentTarget.dataset.tag;

        this.tags.splice(this.tags.indexOf(tag),1);

      },


      inputImg: function () {

        var imgType = event.currentTarget.getAttribute('imgType');

        var file = event.currentTarget.files[0];

        //console.log(file);

        var param = new FormData(); //创建form对象

        param.append('File',file);//通过append向form对象添加数据

          this.$indicator.open({
            text: '上传中',
            spinnerType: 'triple-bounce'
          });


        /*
         * 接口：图片上传
         * 请求方式：POST
         * 接口：/jx/uploadimg/oss
         * 入参：File
         * */
        this.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss',param,{
          headers:{'Content-Type':'multipart/form-data'}

        }).then(function (res) {

          console.log(res.data);

          if(res.data.code=='0000'){

            this.$indicator.close();

              this.$toast({

                message: '上传成功',
                position: 'middle',
                duration: 1500
              });



            if (imgType == 'face'){

              this.faceUrl = res.data.data.url;


            }

            else if(imgType == 'back'){


              this.backUrl = res.data.data.url;

            }
          }

        }.bind(this)).catch((res)=>{
          console.log(res);
        })

      },

      saveInformation: function () {

        if(this.tags.length == 0){

          this.$toast({

            message: '至少添加一个技能标签',

            position: 'bottom',

            duration: 1500

          });

        }else if((this.faceUrl == './static/images/jx_idcard_face.png' || this.backUrl == './static/images/jx_idcard_back.png')&&this.idType=='1'){

          this.$toast({

            message: '请先上传身份证正面/反面照片',

            position: 'bottom',

            duration: 1500

          });

        }else{

          /*
         * 接口：用户填写履历
         * 请求方式：POST
         * 接口：/user/task/add/userresume
         * 入参：label,introduce,pictureFrontUrl,pictureBinhendUrl
         * */
          this.$http({

            method: 'post',

            url: process.env.API_ROOT + 'user/task/add/userresume',

            header: {

              'content-type': 'application/x-www-form-urlencoded'

            },

            params: {

              label: this.tags.join(','),

              introduce: this.introduceYourself,

              pictureFrontUrl: this.faceUrl,

              pictureBinhendUrl: this.backUrl

            }

          }).then(function (res) {

            if(res.data.code == '0000'){

              if(this.lookTaskToPersonInformation){

                localStorage.removeItem('lookTaskToPersonInformation');

                localStorage.setItem('personalInformationAlready','true');

                this.$router.push('/lookTask');

              }else{

                this.$router.push('/workDesk/mine');

              }

            }

          }.bind(this)).catch((res)=>{

            console.log(res);

          })

        }

      },

      getUserCenter: function () {

        /**
         * 接口：用户中心
         * 请求方式：POST
         * 接口：/user/center/usercenter
         * 入参：null
         **/

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/center/usercenter',

        }).then(function (res) {

          if(res.data.code == '0000'){

            this.idType = res.data.data.idType;

            this.idNumber = res.data.data.idNumberAll ;



          }

        }.bind(this)).catch((res)=>{

          console.log(res);

        });

      },

      getPersonInformation: function () {

        /**
         * 接口：查看用户履历信息
         * 请求方式：POST
         * 接口：/user/task/get/userresume
         * 入参：null
         **/

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/task/get/userresume',

        }).then(function (res) {

          if(res.data.data){

            console.log(res);

            this.tags = res.data.data.label.split(',');

            this.faceUrl = res.data.data.pictureFrontUrl;

            this.backUrl = res.data.data.pictureBinhendUrl;

            this.introduceYourself = res.data.data.introduce;

          }

        }.bind(this)).catch((res)=>{

          console.log(res);

        });

      },

      exampleImg: function () {

        var type = event.currentTarget.getAttribute('class');

        this.exampleUrl = './static/images/jx_idCard_' + type + '_example.png';

        this.popupExample = true;

      }




    },


    destroyed () {

      this.$messagebox.close();

      if(localStorage.getItem('lookTaskToPersonInformation')){

        localStorage.removeItem('lookTaskToPersonInformation');

      }

    }

  }

</script>
<style lang="less" scoped>
  @import "person_information.less";
</style>
<style>
  .mint-msgbox-btns> .mint-msgbox-confirm{
    color: #ff7a3b;
  }
  .mint-msgbox-input>input{
    box-sizing: border-box;
  }
</style>
