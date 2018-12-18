<template>

  <div class="bill" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">

      <div class="bill_box" v-for="item in billList" v-on:click="clickBill" v-bind:data-no="item.orderId"
         v-bind:data-type="item.orderType">
        <div class="bill_img">
          <img v-if="item.orderType=='01'" src="../../../../static/images/jx_record.png"/>
          <img v-else-if="item.orderType=='02'" src="../../../../static/images/jx_roll_out.png"/>
          <img v-else-if="item.orderType=='03'" src="../../../../static/images/jx_switch_to.png"/>
        </div>
        <div class="bill_content">
          <div class="bill_cell">
            <p>￥{{item.orderAmount}}</p>
            <p v-if="item.orderType=='01'">余额提现</p>
            <p v-else-if="item.orderType=='02'">转账-转出</p>
            <p v-else-if="item.orderType=='03'">转账-转入</p>
          </div>
          <div class="bill_cell">
            <p class="orange_text" v-if="item.orderType=='01'&& item.orderState=='0'">待支付</p>
            <p class="orange_text" v-else-if="item.orderType=='01'&& item.orderState=='1'">完成</p>
            <p class="orange_text" v-else-if="item.orderType=='02'&& item.orderState=='1'">成功</p>
            <p class="orange_text" v-else-if="item.orderType=='03'&& item.orderState=='1'" >成功</p>
            <p class="orange_text" v-else-if="item.orderType=='01'&& item.orderState=='2'">提交成功</p>
            <p class="orange_text" v-else-if="item.orderType=='01'&& item.orderState=='3'">处理中</p>
            <p class="gray" v-else-if="item.orderType=='01'&& item.orderState=='4'">已退款</p>
            <p class="gray" v-else-if="item.orderType=='01'&& item.orderState=='5'">订单关闭</p>
            <p class="gray" v-else-if="item.orderType=='01'&& item.orderState=='7'">退款中</p>
            <p>{{item.createTime | fmtDateStr}}</p>
          </div>
        </div>

      </div>

      <div class="loadmore" v-show="!noData">
        <div class="bill_nodata_img" v-if="billList.length == 0">
          <img src="../../../../static/images/nodetail_img.png">
          <div>暂无相关账单</div>
        </div>
        <div class="loadmore_tips" v-else><span class="data">{{moreText}}</span></div>
      </div>
      <div class="loadmore" v-show="noData">
        <mt-spinner class="loadmore_icon" type="double-bounce" color="#ababab" :size="16"></mt-spinner>
        <div class="loadmore_tips">正在加载</div>
      </div>



  </div>

</template>

<script>
  export default {
    name: 'bill',
    data () {
      return {

        billList: [],

        orderId: '',

        pageNum: 1,//

        pageSize: 10,//一页的数量

        orderTypes: '',//订单类型 01提现 02 03转入转出 全部订单不用传

        moreText: '没有更多数据啦~',//无数据显示暂无数据

        noData: true,//是否显示暂无数据 false为隐藏 true为显示

        moreLoading: false,//上拉加载

      }
    },
    mounted () {

        this.init();

    },

    methods: {

      init:function () {

        var _whichBill = this.getStorage('whichBill');


        //存储从哪个页面跳到我的账单 来判断导航名称（在我的账单取到 1为提现记录 2为转账记录）

        //1为
        if(_whichBill=='1'){

          console.log('提现')

          this.orderTypes='01',

          //判断导航
            document.title="提现订单"

          this.loadList();

        }

        else if(_whichBill=='2'){

          console.log('转账')

            this.orderTypes='02,03',

          document.title="转账订单";

          this.loadList();

        }

        else if(_whichBill=='3'){

          console.log('我的');

          document.title="我的订单"

          this.loadList();

        }



        },

      loadList:function () {

        //存取是从账单进入（在转账详情里面取出）
        this.setStorage('billHref','4');

        //存储从哪个页面跳到我的账单 来判断导航名称（在我的账单取到 1为提现记录 2为转账记录）
        var _whichBill = this.getStorage('whichBill');

        if(_whichBill=='1'||_whichBill=='2'){

          var dataList = {

            pageNum: this.pageNum,

            pageSize: this.pageSize,

            orderTypes:this.orderTypes,

          }

        }

        else if(_whichBill=='3'){

          var dataList = {

            pageNum: this.pageNum,

            pageSize: this.pageSize,


          }


        }


        if(this.noData) {//如果数据没有见底

          /**
           * 接口：获取账户提现记录
           * 请求方式：GET
           * 接口：/user/withdraw/getsimplerecord
           * 入参：null
           **/

          this.$http({

            method: 'get',

            url: process.env.API_ROOT + 'user/withdraw/getsimplerecord',

            params:dataList


          }).then((res)=>{

            console.log(res.data)


            var _billList = res.data.data.list;


            //转换数据
            function addDList() {

              function comma(num) {

                var source = String(num).split(".");//按小数点分成2部分

                source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");//只将整数部分进行都好分割

                return source.join(".");//再将小数部分合并进来

              }

              for (var j = 0; j < _billList.length; j++) {

                _billList[j].orderAmount = comma(_billList[j].orderAmount)

              }

            }

            //console.log(res.data.data.list)
            //如果没有数据
            if (!this.noData) {


            }

            else if (!res.data.data.list || res.data.data.list.length == 0) {//这一组为空

              if(this.pageNum == '1'){

                  this.moreText='暂无数据',//无数据显示暂无数据

                  this.noData= false

              }

              else {


                  this.noData= false,

                  this.moreText='没有更多数据啦~'//无数据显示暂无数据

              }



            }


            else if (res.data.data.list.length < 10) {//这一组小于十个


               addDList()

              //增加数组内容

                this.noData= false

                this.billList= this.billList.concat(_billList)



            }
            else {

              console.log('添加1页')

               addDList()
              //增加数组内容

                this.billList = this.billList.concat(_billList),

                this.pageNum = this.pageNum + 1//加一页

            }



          }).catch((res)=>{})



        }


      },

      //上拉加载
      loadMore:function () {

        this.loadList()


      },

      clickBill: function (e) {

        this.orderId=e.currentTarget.dataset.no;

        this.orderType=e.currentTarget.dataset.type;

        this.setStorage('orderId',this.orderId);

        //console.log(this.getStorage('orderId'));

        this.setStorage('orderType',e.currentTarget.dataset.type);

        if(this.orderType=='02' || this.orderType=='03'){


          this.$router.push('/transferDetail')

        }
        else {

          this.$router.push('/cashDetail')


        }



      }

    }

  }
</script>

<style lang="less">

  @import "bill.less";


</style>
