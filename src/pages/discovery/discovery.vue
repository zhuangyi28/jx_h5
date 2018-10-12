<template>

  <div class="discovery">

    <div class="box">
      <div class="title">购物</div>
      <div class="content">
        <!-- 惠购商城 -->
        <div v-on:click="urlFn" v-bind:data-url="jdUrl">
          <p><img src="../../../static/images/icon_jd.png"/></p>
          <p>惠购商城</p>
        </div>
        <!-- 美团点评 -->
        <div v-on:click="urlFn" v-bind:data-url="mtUrl">
          <p><img src="../../../static/images/icon_mt.png"/></p>
          <p>美团点评</p>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="title">金融服务</div>
      <div class="content">
        <!-- 嘉白条 -->
        <div v-on:click="urlFn" v-bind:data-url="jbtUrl">
          <p><img src="../../../static/images/icon_jbt.png"/></p>
          <p>嘉白条</p>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  export default {

    name: 'discovery',

    data(){

      return {

        //jykUrl:'',//加油卡URL

        //trainUrl:'',//高铁管家URL

        //codeUrl:'',//二维码URL

        //didiUrl:'',//滴滴

        mtUrl:'',//美团

        jbtUrl:'',//嘉白条

        jdUrl:'',//京东

        isOpen:'',//是否在

        isVerify:''

      }

    },

    mounted () {


      /**
       * 接口：用户中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：mobile
       **/

      this.$http({

        method: 'post',

        url: process.env.API_ROOT + 'user/center/usercenter',

      }).then((res) => {

        console.log(res.data.data);


          this.isOpen=res.data.data.isOpen;

          this.isVerify=res.data.data.isVerify



      }).catch((res)=>{})




      /**
       * 接口：消费场景-惠购商城
       * 请求方式：GET
       * 接口：/open/jd/redirect
       * 入参：null
       **/
      this.$http({

        method: 'get',

        url: process.env.API_ROOT + 'open/jd/redirect',

      }).then((res) => {

        console.log(res.data);

        this.jdUrl = res.data.data

      }).catch((res)=>{})


      /**
       * 接口：消费场景-美团点评
       * 请求方式：GET
       * 接口：/open/mt/redirect
       * 入参：null
       **/
      this.$http({

        method: 'get',

        url: process.env.API_ROOT + 'open/mt/redirect',

      }).then((res) => {

        console.log(res.data);

        this.mtUrl = res.data.data

      }).catch((res)=>{})



      /**
       * 接口：消费场景-嘉白条
       * 请求方式：GET
       * 接口：/open/jbt/redirect
       * 入参：null
       **/
      this.$http({

        method: 'get',

        url: process.env.API_ROOT + 'open/jbt/redirect',

      }).then((res) => {

        console.log(res.data);

        this.jbtUrl = res.data.data

      }).catch((res)=>{})


    },
    methods: {

      urlFn: function (e) {


        if((this.isOpen=='0'&&this.isVerify == '3')||(this.isOpen=='0'&&this.isVerify == '0')){

          //存指定的页面  （在实名认证中取值）
          this.setStorage('hrefId','6');

          this.$messagebox({
            title: '提示',
            message:'为保障账户资金安全，实名用户才能使用账户消费，请先完成实名认证',
            showCancelButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '去认证',
            cancelButtonClass: 'cancel_btn',
            confirmButtonClass: 'confirm_btn_orange',
          }).then((action) =>{
            console.log(action);
            this.$router.push('/certification')
          }).catch((res)=>{
            console.log(res);
          });


        }

        else if(this.isOpen=='0'&&this.isVerify == '2'){

          //存指定的页面  （在实名认证中取值）
          this.setStorage('hrefId','6');

          this.$messagebox({
            title: '提示',
            message:'为保障账户资金安全，实名用户才能使用账户消费，请先完成实名认证',
            showCancelButton: false,
            confirmButtonText: '我知道了',
            confirmButtonClass: 'confirm_btn_orange',
          }).then((action) =>{
            console.log(action);
          }).catch((res)=>{
            console.log(res);
          });



        }

        else {


          this.$indicator.open({
            text: '跳转中...',
            spinnerType: 'fading-circle'
          });

          window.location.href = e.currentTarget.dataset.url

        }


      },
    },


  }
</script>
<style lang="less" scoped>

  @import 'discovery.less';

</style>
