<template>
  <div class="login">

    <div class="login_form">

      <div class="company_logo">
        <img src="../../../../static/images/logo.png">
      </div>

      <div class="content_box">
        <div class="field">
          <i class="iconfont icon-sign_phone"></i>
          <input type="number" pattern="\d*" v-model="mobile"  oninput="if(value.length > 11)value = value.slice(0, 11)" placeholder="请输入手机号" class="tel" >
        </div>
        <div class="field">
          <i class="iconfont icon-sign_password"></i>
          <input type="password" v-model="password" placeholder="请输入密码" class="password" maxlength="20">
        </div>

      </div>

    </div>

    <ul class="bg-bubbles">
      <li v-for="(item,index) in bubbles" :key="index"></li>
    </ul>


    <orangeBtn v-on:clickEvent="signin" :name="btnName"></orangeBtn>
    <div class="login_button">
      <div class="another_page">
        <div @click="$router.push('/forgetPsw')">忘记密码?</div>
        <div @click="$router.push('/Register')">注册</div>
      </div>
    </div>

  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {
    name: 'login',
    components: {
      orangeBtn: orangeBtn,
    },

    data(){
        return{

          bubbles:[],

          mobile: '',

          password:'',

          btnName:'登录',//按钮名称

          Authorization:'',

          code:''

        }

    },


    created() {
      this.bubbles.length = 5;
    },

    mounted(){


 /*  var str = window.location.href;

      this.code = str.split('?')[1].split('&')[0].split('=')[1]*/

      //alert('key的值='+this.getStorage('thisKey'))

    },
    methods:{

        signin:function () {

            let _this=this;



          if(_this.mobile==''){

            this.$toast({
              message: '请输入手机号',
              position: 'bottom',
              duration: 1500


            });


          }

          else if(_this.password ==''){

            this.$toast({
              message: '请输入密码',
              position: 'bottom',
              duration: 1500


            });



          }

          else {


            this.$indicator.open({
              text: '加载中...',
              spinnerType: 'double-bounce'
            });

            /**
             * 接口：登录
             * 请求方式：POST
             * 接口：/jx/action/login
             * 入参：mobile，password,code
             **/

            this.$http({

              method: 'post',

              url:process.env.API_ROOT+'jx/action/login',

              params: {

                mobile:_this.mobile,

                password:hexMD5(_this.password),

              }


            }).then(function (res) {

              console.log(res.data);

              console.log(res);


              if(res.data.code=='-1'){

                this.$toast({
                  message: res.data.msg,
                  position: 'bottom',
                  duration: 1500


                });


              }

              else if(res.data.code=='0000'){

                var Authorization = res.data.token.access_token;//Authorization数据

                this.Authorization = res.data.token.access_token;

                 this.$indicator.close();

                //存取token
                this.setStorage('Authorization',Authorization);

                this.setStorage('jxsid',res.data.jxsid);

                this.setStorage('userId',res.data.data.userId);

                this.setStorage('isCommitAuthorize',res.data.data.isCommitAuthorize);

                if(res.data.data.isCommitAuthorize == 0){

                  this.$router.push('/workDesk/homepage');

                }else if(res.data.data.isCommitAuthorize == 1){

                  this.$router.push('/workDesk/taskSquare');

                }

                this.setStorage('reloadtask','1')

                //是否跳转发现页面 1为跳转到发现 0为正常
                //this.setStorage('discoveryHref','1')


                //var discoveryHref = this.getStorage('discoveryHref')

                //console.log('应该是1='+discoveryHref)

              //if(discoveryHref=='1'){

                  //setTimeout(function () {

                    //_this.setStorage('discoveryHref','0');



                 // },1)

               // }


                //跳转
                //_this.$router.push('/workDesk/homepage');


              }



            }.bind(this)).catch((res)=>{

              //console.log(res.data);


            })






          }






        }


    }

  }
</script>
<style lang="less" scoped>
  @import "login.less";

</style>
