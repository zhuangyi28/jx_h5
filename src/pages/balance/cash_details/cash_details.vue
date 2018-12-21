<template>
  <div class="cash_details">
    <!-- 提现详情 -->
    <div class="details">
      <div class="details_box color_background_gradient">
        <div class="step" v-bind:class="orderState=='0'||orderState=='2'||orderState=='5'? 'selected':''">
          <p><img src="../../../../static/images/cash_detail1.png"></p>
          <p v-if="orderState=='0'">待支付</p>
          <p v-else-if="orderState=='5'">订单关闭</p>
          <p v-else>提交成功</p>
          <p class="border"></p>
        </div>
        <div class="step" v-bind:class="orderState=='3'||orderState=='7'? 'selected':''">
          <p><img src="../../../../static/images/cash_detail2.png"></p>
          <p v-if="orderState=='7'||orderState=='4'">退款中</p>
          <p v-else>处理中</p>
          <p class="border"></p>
        </div>
        <div class="step" v-bind:class="orderState=='4'||orderState=='1'? 'selected':''">
          <p><img src="../../../../static/images/cash_detail3.png"></p>
          <p v-if="orderState=='4'">已退款</p>
          <p v-else>完成</p>
        </div>
      </div>
    </div>

    <!-- 提现金额 -->
    <div class="cash">
      <p><img src="../../../../static/images/jx_bage.png"/>提现金额（元）</p>
      <p>{{orderAmount}}</p>
    </div>

    <div class="details_list">
      <div class="cell">
        <div>提现状态</div>
        <div v-if="orderState=='0'">待支付</div>
        <div v-else-if="orderState=='1'">完成</div>
        <div v-else-if="orderState=='2'">提交成功</div>
        <div v-else-if="orderState=='3'">处理中</div>
        <div v-else-if="orderState=='4'">已退款</div>
        <div v-else-if="orderState=='5'">订单关闭</div>
        <div v-else-if="orderState=='7'">退款中</div>

      </div>

      <div class="cell">
        <div>提现金额</div>
        <div>￥{{orderAmount}}</div>
      </div>

      <div class="cell" v-show="errorMsg?true:false">
        <div>退款原因</div>
        <div>{{errorMsg}}</div>
      </div>

      <div class="cell">
        <div>手续费</div>
        <div>￥{{rateAmount}}</div>
      </div>

      <div class="cell">
        <div>支付金额</div>
        <div>￥{{payAmount}}</div>
      </div>

    </div>

    <div class="details_list">
      <div class="cell">
        <div>订单时间</div>
        <div>{{createDate| fmtDateStr}}</div>
      </div>

      <div class="cell">
        <div>订单号</div>
        <div>{{orderId}}</div>
      </div>
      <div class="cell">
        <div>银行</div>
        <div>{{bankName}}</div>
      </div>

      <div class="cell">
        <div>卡号</div>
        <div>{{bankNo}}</div>
      </div>

    </div>

    <div v-show="orderState=='0'?true:false">
      <!-- 去支付 -->
      <orangeBtn v-on:clickEvent="payFn" :name="btnName"></orangeBtn>
    </div>


    <!-- 查看幫助 -->
    <serviceArea :type1="serviceLeft"  :iconName1="iconName1" v-on:clickEventLeft="customerFn"  :spanShow="false"></serviceArea>

  </div>
</template>
<script>

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  //帮助
  import serviceArea from '../../../components/service/service'

  import { customerInit, customerClick } from "../../../../static/js/basic"

  export default{

     name:'cashDetail',

     components: {

     orangeBtn: orangeBtn,

       serviceArea: serviceArea,

   },

   data(){

         return{

           bankName: '',

           bankNo: '',

           orderAmount: '',

           orderId: '',

           orderState: '',

           payAmount: '',

           rate: '',

           createDate:'',

           rateAmount: '',

           type: '',

           userName:'',

           mobile:'',

           errorMsg:'',

           hasErrorMsg:'',

           btnName:'去支付',

           serviceLeft: '联系客服',

           iconName1:'icon-withdraw_custom',


         }

    },
   mounted () {

     //美恰初始化
     customerInit({
       name:this.getStorage('userName'),// 名字
       tel:this.getStorage('mobile'),// 电话
     });

     this.init();

   },
   methods: {

     init:function () {



         this.userName=this.getStorage('userName');

         this.mobile=this.getStorage('mobile');

         var _orderId = this.getStorage('orderId');

         //console.log(_orderId)


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
         }


       }).then((res)=>{

           console.log(res.data)

           this.bankName = res.data.data.bankName;

           this.bankNo= res.data.data.bankNo;

           this.orderAmount= res.data.data.orderAmount;

           this.orderState= res.data.data.orderState;

           this.orderId= res.data.data.orderId;

           this.payAmount= res.data.data.payAmount;

           this.rate= res.data.data.rate;

           this.rateAmount=res.data.data.rateAmount;

           this.createDate= res.data.data.createDate;


         if(res.data.data.errorMsg){

             this.errorMsg =  res.data.data.errorMsg

         }

       }).catch((res)=>{})



     },

     payFn:function () {

       var _isSecurity = this.getStorage('isSecurity');


       /**
        * 接口：检测用户发起提现操作
        * 请求方式：GET
        * 接口：user/work/checkwithdraw
        * 入参：null
        * */

       this.$http({


         method: 'get',

         url: process.env.API_ROOT + 'user/work/checkwithdraw',



       }).then((res)=>{

         if (res.data.code == '0000') {


          /* wx.showModal({

             title: '确认付款',
             content: '支付金额￥' + that.data.payAmount + ',提现金额￥' + that.data.orderAmount + ',手续费￥' + that.data.rateAmount,
             confirmText: '确认付款',
             confirmColor: '#fe9728',

             success: function (res) {

               if (res.confirm) {

                 if (_isSecurity == '1') {

                   console.log('开启短信验证');

                   wx.navigateTo({

                     url: '../sms_verification/sms_verification'
                   })


                 }

                 else if (_isSecurity == '2') {

                   console.log('开启支付密码');

                   wx.navigateTo({

                     url: '../pws_verification/pws_verification'
                   })


                 }

                 else if (_isSecurity == '3') {

                   console.log('啥都没开启');

                   confirmation()

                 }


               }

               else if (res.cancel) {


               }
             }
           });*/


         }
         else {


           wx.showToast({
             title: res.data.msg,
             icon: 'none',
             duration: 1000
           })

         }


       }).catch((res)=>{})








       function confirmation() {

         /**
          * 接口：获取账户提现记录
          * 请求方式：GET
          * 接口：/user/withdraw/dowithdraw
          * 入参：bizId,bankCardId,balance,payPassword,code
          * */

         wx.request({

           url: thisCashUrl,

           method: 'GET',

           data: {

             bizId: that.data.orderId,//订单id

             bankCardId: that.data.bankCardId,//银行卡id

             balance: that.data.orderAmount,//提取现金

           },
           header: {

             'jxsid': jx_sid,

             'Authorization': Authorization

           },


           success: function (res) {

             console.log(res.data);

             if (res.data.code == '0000') {

               wx.redirectTo({

                 url: '../pay_success/pay_success'
               })

             }

             else {

               wx.showToast({
                 title: res.data.msg,
                 icon: 'none',
                 duration: 1000
               })
             }

           },


           fail: function (res) {

             console.log(res)

           }

         })


       }

     },

     customerFn:function () {

       customerClick()

     }



   }




 }



</script>
<style lang="less">

  @import "cash_details.less";


</style>
