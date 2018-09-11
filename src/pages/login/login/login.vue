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
      <li v-for="(item, index) in bubbles" :key="index"></li>
    </ul>


    <orangeBtn v-on:clickEvent="signin" :name="btnName"></orangeBtn>
    <div class="login_button">
      <div class="another_page">
        <div @click="$router.push('/forgetPsw')">忘记密码?</div>
        <div @click="$router.push('/Register')">免费注册</div>
      </div>
    </div>

  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'

  import qs from 'qs';
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

          btnName:'登录'//按钮名称

        }

    },

    created() {
      this.bubbles.length = 5;
    },

    methods:{

        signin:function () {

            let _this=this;

          console.log(process.env.API_ROOT)


          if(_this.mobile==''){

            this.$toast({
              message: '请输入手机号',
              duration: 1500


            });


          }

          else if(_this.password ==''){

            this.$toast({
              message: '请输入密码',
              duration: 1500


            });



          }

          else {

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


            }).then((res)=>{

              console.log(res.data);


              if(res.data.code=='-1'){

                this.$toast({
                  message: res.data.msg,
                  duration: 1500


                });


              }

              else if(res.data.code=='0000'){

                var Authorization = res.data.token.access_token;//Authorization数据

                this.setStorage('Authorization',Authorization);

                _this.$router.push('/workDesk/homepage')
              }



            }).catch((res)=>{

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
