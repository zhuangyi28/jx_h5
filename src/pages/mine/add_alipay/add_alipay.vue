<template>

  <div class="add_alipay">

    <div class="alipay_input">

      <div class="alipay_num">

        <div>支付宝账号</div>
        <input type="text" placeholder="请输入手机号或邮箱" v-model="alipayNum">

      </div>

      <div class="alipay_name">

        <div>真实姓名</div>
        <div>{{userName}}</div>

      </div>

    </div>

    <orangeBtn v-bind:name=btnName v-on:clickEvent="submit"></orangeBtn>

  </div>

</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {

    name: 'addAlipay',
    components: {

      orangeBtn: orangeBtn

    },
    data () {

      return {

        userName: '',

        btnName: '添加',

        alipayNum: ''

      }

    },

    mounted () {

      this.init();

    },

    methods: {

      init: function () {

        this.userName = localStorage.getItem('userName');

      },




      submit: function () {

        if(this.checkAlipayNum()){

          /**
           * 接口：添加用户支付宝信息
           * 请求方式：POST
           * 接口：user/alipay/addalipayinfo
           * 入参：alipayNo
           **/
          this.$http({
            method: 'get',
            url: process.env.API_ROOT + 'user/alipay/addalipayinfo',
            params: {

              alipayNo: this.alipayNum

            }
          }).then(res=>{

            this.$toast({

              message: res.data.msg,
              position: 'middle',
              duration: 1500

            });

            if(res.data.code == '0000'){

              setTimeout(()=>{

                this.$store.type = true;

                this.$router.go(-1);

              },1000);

            }

          })

        }

      },




      checkAlipayNum: function () {

        var myMail=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

        var myPhone = /^1[3|4|5|6|7|8|9]\d{9}$/;

        if(myMail.test(this.alipayNum) || myPhone.test(this.alipayNum)){

          return true;

        }else{

          this.$toast({

            message: '请输入正确的支付宝账号',
            position: 'middle',
            duration: 1500

          });

          return false;

        }

      }


    }

  }
</script>
<style scoped lang="less">
  @import "add_alipay.less";
</style>
