<template>
  <div class="transfer_details">

    <backHome></backHome>
    <!-- 提现金额 -->
    <div class="cash change_color_background">
      <p>
        <span v-if="orderType=='02'"><img src="../../../../static/images/jx_transfer_out.png"/>转出金额（元）</span>
        <span v-else-if="orderType=='03'"><img src="../../../../static/images/jx_transfer_go.png"/>转入金额（元）</span>
      </p>
      <p>
        <span v-if="orderType=='02'">-</span>
        <span v-else-if="orderType=='03'">+</span>
        <span>{{orderAmount}}</span>
      </p>
    </div>

    <div class="details_list">
      <div class="cell">
        <div>订单状态</div>
        <div v-if="orderState=='1'">成功</div>
      </div>

      <div class="cell">
        <div>转账金额</div>
        <div>￥{{orderAmount}}</div>
      </div>



    </div>

    <div class="details_list">

      <div class="cell">
        <div>订单类型</div>
        <div v-if="orderType=='02'">转账-转出</div>
        <div v-else-if="orderType=='03'">转账-转入</div>
      </div>
      <div class="cell">
        <div>订单时间</div>
        <div>{{createDate| fmtDateStr}}</div>
      </div>

      <div class="cell">
        <div>订单号</div>
        <div>{{orderId}}</div>
      </div>

      <div class="cell">
        <div>对方姓名</div>
        <div>{{userName}}</div>
      </div>

      <div class="cell">
        <div>对方账号</div>
        <div>{{mobile}}</div>
      </div>
      <div class="cell" v-if="remark&&remark!='null'">
        <div>转账备注</div>
        <div>{{remark}}</div>
      </div>

    </div>

    <!-- 联系客户 -->
    <serviceArea :type1="serviceLeft" :iconName1="iconName1" v-on:clickEventLeft="customerFn" :spanShow="false"></serviceArea>

  </div>
</template>
<script>

  //帮助
  import serviceArea from '../../../components/service/service'

  import backHome from '../../../components/back_home/back_home'

  import { customerInit, customerClick } from "../../../../static/js/basic"

  export default{

     name:'transferDetail',

      components: {

        serviceArea: serviceArea,

        backHome: backHome


   },

    data(){

         return{

           orderAmount: '',

           orderId: '',

           orderState: '',

           orderType:'',

           /*payAmount: '',*/

           createDate:'',

           userName:'',//转账姓名

           mobile:'',//转账号码

           remark:'',//转账备注

           btnName: '确定',//按钮名称

           serviceLeft: '联系客服',

           iconName1:'icon-withdraw_custom',



         }

    },

   mounted () {

     if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

       location.href = location.href.split('#')[0] +'#'+ this.$route.fullPath;

       console.log('isIOS');

     }

     this.orderId = this.$route.query.orderId;

     this.orderType = this.$route.query.orderType;


     //美恰初始化
     customerInit({
       name:this.getStorage('userName'),// 名字
       tel:this.getStorage('mobile'),// 电话

     });


     this.init();

   },

   methods: {

     init:function () {




       var _orderId = this.orderId;

       var _orderType = this.orderType;

         //console.log(_orderId)





       console.log('从账单过来的')

       /**
        * 接口：
        * 请求方式：GET
        * 接口：user/withdraw/getdetailrecord
        * 入参：orderId
        **/

       this.$http({

         method: 'get',

         url: process.env.API_ROOT + 'user/withdraw/getdetailrecord',

         params: {

           orderId: _orderId,

           orderType:_orderType,

         }


       }).then((res)=>{

         console.log(res.data)
         /*
          if(res.data.data.remark){


          this.remark=res.data.data.remark


          }*/

         this.remark = res.data.data.remark

         this.orderAmount= res.data.data.orderAmount;

         this.orderState= res.data.data.orderState;

         this.orderId=res.data.data.orderId;

         this.orderType= res.data.data.orderType;

         this.userName=res.data.data.userName;

         this.mobile=res.data.data.mobile;

         this.createDate=res.data.data.createDate;




       }).catch((res)=>{})





     },

     customerFn:function () {

       customerClick()

     }




   },



 }



</script>
<style lang="less">

  @import "transfer_details.less";


</style>
