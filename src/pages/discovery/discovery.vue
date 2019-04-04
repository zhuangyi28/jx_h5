<template>

  <div class="discovery">

    <div class="box">
      <div class="title before_border">金融服务</div>
      <div class="content">
        <!-- 嘉白条 -->
        <div v-on:click="urlFn" class="jbt">
          <div class="btn_icon"><img src="../../../static/images/icon_jbt_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">工资预支</span>
            <span class="btn_slogen">工资不够花?到这借!</span>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="title before_border">购物</div>
      <div class="content">
        <!-- 惠购商城 -->
        <div v-on:click="urlFn" class="jd">
          <div class="btn_icon"><img src="../../../static/images/icon_jd_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">惠购商城</span>
            <span class="btn_slogen">综合商品中心</span>
          </div>
        </div>
        <!-- 卡券商城 -->
        <!--<div v-on:click="urlFn" v-bind:data-url="cardUrl">-->
          <!--<div class="btn_icon"><img src="../../../static/images/icon_card_1.png"/></div>-->
          <!--<div class="btn_information">-->
            <!--<span class="btn_name">卡券商城</span>-->
            <!--<span class="btn_slogen">卡券商城中心</span>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>

    <div class="box">
      <div class="title before_border">便民生活</div>
      <div class="content">
        <!-- 美团点评 -->
        <div v-on:click="urlFn" class="meituan">
          <div class="btn_icon"><img src="../../../static/images/icon_mt_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">美团外卖</span>
            <span class="btn_slogen">美团餐饮服务</span>
          </div>
        </div>

        <!-- 餐饮美食 -->
        <div v-on:click="urlFn" class="dianping">
          <div class="btn_icon"><img src="../../../static/images/icon_dp_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">餐饮美食</span>
            <span class="btn_slogen">点评餐饮服务</span>
          </div>
        </div>

        <!-- 丽人 -->
        <div v-on:click="urlFn" class="beauty">
          <div class="btn_icon"><img src="../../../static/images/icon_beauty_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">丽人</span>
            <span class="btn_slogen">都市美容美发</span>
          </div>
        </div>

        <!-- 生活服务 -->
<!--        <div v-on:click="urlFn" v-bind:data-url="lifeUrl">
          <div class="btn_icon"><img src="../../../static/images/icon_life_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">生活服务</span>
            <span class="btn_slogen">日常生活开支缴费</span>
          </div>
        </div>-->

        <!-- 休闲娱乐 -->
        <div v-on:click="urlFn" class="play">
          <div class="btn_icon"><img src="../../../static/images/icon_play_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">休闲娱乐</span>
            <span class="btn_slogen">最前沿的娱乐导向</span>
          </div>
        </div>

      </div>
    </div>

    <div class="box">
      <div class="title before_border">旅游出行</div>
      <div class="content">
        <!-- 美团点评 -->
        <div v-on:click="urlFn" class="didi">
          <div class="btn_icon"><img src="../../../static/images/icon_didi_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">打车</span>
            <span class="btn_slogen">滴滴出行</span>
          </div>
        </div>

        <!-- 餐饮美食 -->
        <div v-on:click="urlFn" class="train">
          <div class="btn_icon"><img src="../../../static/images/icon_train_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">订火车票</span>
            <span class="btn_slogen">在线订购火车票</span>
          </div>
        </div>

        <!-- 丽人 -->
        <div v-on:click="urlFn" class="hotel">
          <div class="btn_icon"><img src="../../../static/images/icon_hotel_1.png"/></div>
          <div class="btn_information">
            <span class="btn_name">酒店</span>
            <span class="btn_slogen">在线预定酒店</span>
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

        playUrl:'',//休闲娱乐

        mtUrl:'',//美团

        jbtUrl:'',//嘉白条

        jdUrl:'',//京东

        didiUrl:'',//滴滴打车

        trainUrl:'',//订火车票

        hotelUrl:'',//酒店

        isOpen:'',//是否在

        isVerify:''//时候认证

      }

    },

    mounted () {

      this.bus.$emit('pageChange','2');

      document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset = 0;

      localStorage.getItem('Authorization') && (this.getData());
 /*     if(this.getStorage('taskSquare')=='1'){

        window.location.reload();

        this.setStorage('taskSquare','0')

      }
*/



      //this.setStorage('ajaxHomepage','1')

      //获取UnionID

//      this.$http({
//
//        method: 'post',
//
//        url: process.env.API_ROOT+'jx/action/toaddunionid',
//
//        params: {
//
//
//          key:this.getStorage('thisKey')
//
//        }
//
//
//
//      }).then((res) => {
//
//        console.log(res.data)
//
//
//      }).catch((res)=>{});

      //


    },
    methods: {

      urlFn: function (e) {

        if(!localStorage.getItem('Authorization')){

          this.$router.push('/login');

        }else{

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
                this.$router.push('/certificationChoose');
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
              message:'为保障账户资金安全，实名用户才能使用账户消费，您的账户正在审核中',
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

            this.jumpTo(e);

          }

        }

      },


      getData: function () {

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

      },


      jumpTo: function (e) {

        var buttonName = e.currentTarget.classList[0];

        switch (buttonName) {

          case 'meituan':

            this.meituan();

            break;

          case 'dianping':

            this.dianping();

            break;

          case 'jbt':

            this.jbt();

            break;

          case 'jd':

            this.jd();

            break;

          case 'beauty':

            this.beauty();

            break;

          case 'play':

            this.play();

            break;

          case 'didi':

            this.didi();

            break;

          case 'train':

            this.train();

            break;

          case 'hotel':

            this.hotel();

            break;

        }

      },



      meituan: function () {

        /**
         * 接口：消费场景-美团点评
         * 请求方式：GET
         * 接口：/open/wm/redirect
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'open/wm/redirect',

        }).then((res) => {

          console.log(res.data);

          window.location.href = res.data.data;

        }).catch((res)=>{})

      },



      dianping: function () {

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

          location.href = (res.data.data);

        }).catch((res)=>{})

      },


      didi: function () {

        /**
         * 接口：消费场景-滴滴打车
         * 请求方式：GET
         * 接口：open/didi/redirect
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'open/didi/redirect',

        }).then((res) => {

          console.log(res.data);

          location.href = (res.data.data);

        }).catch((res)=>{})

      },



      jbt: function () {

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

          window.location.href = res.data.data;

        }).catch((res)=>{})

      },


      jd: function () {

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

          location.href = (res.data.data);

        }).catch((res)=>{})

      },



      play: function () {

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

          location.href = (res.data.data);

        }).catch((res)=>{})

      },



      card: function () {

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

          location.href = (res.data.data);

        }).catch((res)=>{})

      },



      beauty: function () {

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

          location.href = (res.data.data);

        }).catch((res)=>{})

      },



      hotel: function () {

        /**
         * 接口：消费场景-酒店
         * 请求方式：GET
         * 接口：open/hotel/redirect
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'open/hotel/redirect',

        }).then((res) => {

          console.log(res.data);

          location.href = (res.data.data);

        }).catch((res)=>{})

      },



      train: function () {

        /**
         * 接口：消费场景-订火车票
         * 请求方式：GET
         * 接口：open/trainticket/redirect
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'open/trainticket/redirect',

        }).then((res) => {

          console.log(res.data);

          location.href = (res.data.data);

        }).catch((res)=>{})

      }




    },



  }
</script>
<style lang="less" scoped>

  @import 'discovery.less';

</style>
