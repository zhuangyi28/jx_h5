<template>

  <div class="discovery">

    <div class="box">
      <div class="title">金融服务</div>
      <div class="content">
        <!-- 嘉白条 -->
        <div v-on:click="urlFn" v-bind:data-url="jbtUrl">
          <div class="btn_icon"><img src="../../../static/images/icon_jbt_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">嘉白条</span>
            <span class="btn_slogen">工资不够花?到这借!</span>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="title">购物</div>
      <div class="content">
        <!-- 惠购商城 -->
        <div v-on:click="urlFn" v-bind:data-url="jdUrl">
          <div class="btn_icon"><img src="../../../static/images/icon_jd_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">惠购商城</span>
            <span class="btn_slogen">综合商品中心</span>
          </div>
        </div>
        <!-- 卡券商城 -->
        <div v-on:click="urlFn" v-bind:data-url="cardUrl">
          <div class="btn_icon"><img src="../../../static/images/icon_card_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">卡券商城</span>
            <span class="btn_slogen">卡券商城中心</span>
          </div>
        </div>
      </div>
    </div>


    <div class="box">
      <div class="title">便民生活</div>
      <div class="content">
        <!-- 美团点评 -->
        <div v-on:click="urlFn" v-bind:data-url="mtUrl">
          <div class="btn_icon"><img src="../../../static/images/icon_mt_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">美团外卖</span>
            <span class="btn_slogen">美团餐饮服务</span>
          </div>
        </div>

        <!-- 餐饮美食 -->
        <div v-on:click="urlFn" v-bind:data-url="dpUrl">
          <div class="btn_icon"><img src="../../../static/images/icon_dp_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">餐饮美食</span>
            <span class="btn_slogen">点评餐饮服务</span>
          </div>
        </div>

        <!-- 丽人 -->
        <div v-on:click="urlFn" v-bind:data-url="beautyUrl">
          <div class="btn_icon"><img src="../../../static/images/icon_beauty_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">丽人</span>
            <span class="btn_slogen">都市美容美发系列</span>
          </div>
        </div>

        <!-- 生活服务 -->
        <div v-on:click="urlFn" v-bind:data-url="lifeUrl">
          <div class="btn_icon"><img src="../../../static/images/icon_life_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">生活服务</span>
            <span class="btn_slogen">日常生活开支缴费</span>
          </div>
        </div>

        <!-- 休闲娱乐 -->
        <div v-on:click="urlFn" v-bind:data-url="playUrl">
          <div class="btn_icon"><img src="../../../static/images/icon_play_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">休闲娱乐</span>
            <span class="btn_slogen">最前沿的娱乐导向</span>
          </div>
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

        cardUrl:'',//电子卡券

        dpUrl:'',//点评餐饮

        beautyUrl:'',//丽人消费

        lifeUrl:'',//生活服务

        playUrl:'',//休闲娱乐

        mtUrl:'',//美团

        jbtUrl:'',//嘉白条

        jdUrl:'',//京东

        isOpen:'',//是否在

        isVerify:''//时候认证

      }

    },

    mounted () {


        this.setStorage('ajaxHomepage','1')

      //获取UnionID

      this.$http({

        method: 'post',

        url: process.env.API_ROOT+'jx/action/toaddunionid',

        params: {


          key:this.getStorage('thisKey')

        }



      }).then((res) => {

        console.log(res.data)


      }).catch((res)=>{});


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
       * 接口：消费场景-丽人消费
       * 请求方式：GET
       * 接口：open/beauty/redirect
       * 入参：null
       **/
      this.$http({

        method: 'get',

        url: process.env.API_ROOT + 'open/beauty/redirect',

      }).then((res) => {

        console.log(res.data);

        this.beautyUrl = res.data.data

      }).catch((res)=>{})


      /**
       * 接口：消费场景-电子卡券
       * 请求方式：GET
       * 接口：open/card/redirect
       * 入参：null
       **/
      this.$http({

        method: 'get',

        url: process.env.API_ROOT + 'open/card/redirect',

      }).then((res) => {

        console.log(res.data);

        this.cardUrl = res.data.data

      }).catch((res)=>{})



      /**
       * 接口：消费场景-点评餐饮
       * 请求方式：GET
       * 接口：open/catering/redirect
       * 入参：null
       **/
      this.$http({

        method: 'get',

        url: process.env.API_ROOT + 'open/catering/redirect',

      }).then((res) => {

        console.log(res.data);

        this.dpUrl = res.data.data

      }).catch((res)=>{})


      /**
       * 接口：消费场景-休闲娱乐
       * 请求方式：GET
       * 接口：open/entertainment/redirect
       * 入参：null
       **/
      this.$http({

        method: 'get',

        url: process.env.API_ROOT + 'open/entertainment/redirect',

      }).then((res) => {

        console.log(res.data);

        this.playUrl = res.data.data

      }).catch((res)=>{})


      /**
       * 接口：消费场景-生活服务
       * 请求方式：GET
       * 接口：open/life/redirect
       * 入参：null
       **/
      this.$http({

        method: 'get',

        url: process.env.API_ROOT + 'open/life/redirect',

      }).then((res) => {

        console.log(res.data);

        this.lifeUrl = res.data.data

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
            if(action == 'confirm'){
              this.$router.push('/certification');
            }
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


/*          this.$indicator.open({
            text: '跳转中...',
            spinnerType: 'fading-circle'
          });*/

          window.location.href = e.currentTarget.dataset.url

        }


      },
    },


  }
</script>
<style lang="less" scoped>

  @import 'discovery.less';

</style>
