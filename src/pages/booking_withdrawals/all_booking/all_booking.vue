<template>
  <div class="all_booking">
    <topTips :tips="tipsText"></topTips>
    <div class="booking_list" v-if="bookingList.length !=0">
      <div class="list_one" v-for="content in bookingList">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals" v-if="content.banlane == '∞'">自动提现全部余额</div>
            <div class="withdrawals" v-else>自动提现{{content.banlane | thousandBitSeparator}}元</div>
            <div class="time">{{content.executionDate}}</div>
          </div>
        </div>
        <div class="cell" v-on:click="showReasonFn(content.remarkDetails)" v-if="content.planState == 4">
          <div class="state">执行失败</div>
          <div class="reason">{{content.remark}}</div>
        </div>
        <span class="next_btn" v-if="content.planState == 4"></span>
        <div class="cell" v-else-if="content.planState == 2">
          <div class="state">执行中</div>
        </div>
        <div class="cell" v-else-if="content.planState == 3">
          <div class="state color_text">执行成功</div>
        </div>
      </div>
      <!--<div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state color_text">执行成功</div>
          <div class="reason"></div>
        </div>


      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state">执行失败</div>
          <div class="reason">账户余额不足</div>
        </div>
        <span class="next_btn"></span>
      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state color_text">执行成功</div>
          <div class="reason"></div>
        </div>


      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state">执行失败</div>
          <div class="reason">账户余额不足</div>
        </div>
        <span class="next_btn"></span>
      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state color_text">执行成功</div>
          <div class="reason"></div>
        </div>


      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state">执行失败</div>
          <div class="reason">账户余额不足</div>
        </div>
        <span class="next_btn"></span>
      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state color_text">执行成功</div>
          <div class="reason"></div>
        </div>


      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state">执行失败</div>
          <div class="reason">账户余额不足</div>
        </div>
        <span class="next_btn"></span>
      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state color_text">执行成功</div>
          <div class="reason"></div>
        </div>


      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state">执行失败</div>
          <div class="reason">账户余额不足</div>
        </div>
        <span class="next_btn"></span>
      </div>
      <div class="list_one">
        <div class="list_title">
          <span class="iconfont icon-withdraw_cash"></span>
          <div>
            <div class="withdrawals">自动提现300.00元</div>
            <div class="time">2019-02-15</div>
          </div>
        </div>
        <div class="cell">
          <div class="state color_text">执行成功</div>
          <div class="reason"></div>
        </div>


      </div>-->

     <!-- <div class="loadmore" v-show="!noData">
        &lt;!&ndash; 暂无账单 &ndash;&gt;
        <div class="bill_nodata_img" v-if="taskList.length == 0">
          <img src="../../../../static/images/nodetail_img.png">
          <div>暂无相关任务</div>
        </div>
        &lt;!&ndash; 加载完毕&ndash;&gt;
        <div class="loadmore_tips" v-else><span class="data">没有更多数据啦~</span></div>
      </div>-->
      <!-- 显示加载中-->
      <!--<div class="loadmore" v-show="noData">
        <mt-spinner class="loadmore_icon" type="double-bounce" color="#ababab" :size="16"></mt-spinner>
        <div class="loadmore_tips">正在加载</div>
      </div>-->
    </div>
    <div class="nodata" v-else>
      <div class="nodata_img">
        <img src="../../../../static/images/jx_list.png">
      </div>
      <div class="nodata_ps">暂无预约提现执行记录</div>
    </div>
    <div class="look_bill color_text" v-on:click=""><i class="iconfont icon-withdraw_cash"></i>查看预约提现订单</div>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  import topTips from '../../../components/tips/tips'
  export default {
    name: 'all_booking',
    components: {
      topTips: topTips,
      orangeBtn: orangeBtn
    },
    data(){
        return{
          tipsText:'温馨提示：执行成功仅代表系统自动提交了一笔提现订单，提现处理结果请在“我的订单”中查看',

          pageNum: 1,//接口数据页目录

          bookingList:[],//预约列表

/*          hasMoreData: true,//是否可以加载更多

          noData: false,//是否显示暂无数据 false为隐藏 true为显示

          moreLoading: false,//上拉加载
         */

        }

    },

    mounted () {

        this.init()

    },
    methods: {

      init: function () {

        this.appointmentId = this.$route.query.appointmentId;

        /**
         * 接口：预约提现详情
         * 请求方式：GET
         * 接口：userappointment/update/getappointmentplan
         * 入参：appointmentId, pageNum, pageSize
         **/
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'userappointment/update/getappointmentplan',
          params: {

            appointmentId: this.appointmentId

          }
        }).then(res=>{

          if(!!res.data.data.list){

            this.bookingList = res.data.data.list;

            for(var content of this.bookingList){

              (content.banlane != '∞') && (content.banlane = (+content.banlane).toFixed(2));

              var date = new Date(content.executionDate);

              content.executionDate = date.getFullYear() + '-' + ((date.getMonth()+1)+'').padStart(2,'0') + '-' + (date.getDate()+'').padStart(2,'0') + ' ' + date.getHours() + ':' + (date.getMonth()+'').padStart(2,'0') + ':' + (date.getSeconds()+'').padStart(2,'0');

            }

          }

        });

      },

      showReasonFn:function (reason) {

        this.$messagebox({
          title: '提示',
          message: reason,
          showCancelButton: false,
          confirmButtonText: '确定',
          confirmButtonClass: 'confirm_btn_orange',
        }).then((res)=>{
          if(res == 'confirm'){
          }
        })


      }

    }

  }
</script>
<style lang="less" scoped>
  @import "all_booking.less";
</style>
