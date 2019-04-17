<template>
  <div class="booking_list">
    <!--预约提现列表-->
    <div class="list_show" v-if="bookingList.length != 0">
      <div class="list_one" v-for="content in bookingList" v-on:click="$router.push({path: '/allBooking', query: {appointmentId: content.appointmentId}})">
        <div class="title">
          <div>
            <div class="color_background"><img src="../../../../static/images/cash_appt_clock.png"></div>
            <span v-if="!!content.remark">{{content.remark}}</span>
            <span v-else>预约提现{{bookingList.indexOf(content)+1}}</span>
          </div>
          <div class="img" v-on:click="getChange('delete',content.appointmentId,bookingList.indexOf(content))" v-on:click.stop>
            <img src="../../../../static/images/contract_close.png">
          </div>
        </div>
        <div class="booking_content color_text" v-if="content.banlane == '∞'">{{content.caseDate}}提现全部余额</div>
        <div class="booking_content color_text" v-else>{{content.caseDate}}提现{{content.banlane|thousandBitSeparator}}元</div>
        <div class="booking_card">至{{content.bankName}}（{{content.bankNo}}）</div>
        <div class="booking_time_state">
          <div class="booking_time" v-if="content.isStartup == 1">
            <span v-if="!!content.nextDate">下期{{content.nextDate}}执行（{{content.endDate}}截止）</span>
            <span v-else>
              <span v-if="content.close">预约提现已截止</span>
              <span v-else>无下期计划({{content.endDate}}截止)</span>
            </span>
          </div>
          <div class="booking_time booking_pause" v-else-if="content.isStartup == 2">预约提现已暂停</div>
          <div class="booking_state border_color" v-if="content.isStartup == 2"
               v-on:click="getChange('open',content.appointmentId,bookingList.indexOf(content))" v-on:click.stop>
            开启</div>
          <div class="booking_state border_color" v-else-if="content.isStartup == 1 && !!content.nextDate"
               v-on:click="getChange('stop',content.appointmentId,bookingList.indexOf(content))" v-on:click.stop>
            暂停</div>
        </div>
      </div>
    </div>
    <!--长度为零时-->
    <div class="list_no" v-else>
      <div class="nodata_img">
        <img src="../../../../static/images/jx_list.png">
      </div>
      <div class="title color_text">您还没有预约提现哦~</div>
      <div class="content">添加后系统将按您的计划时间自动执行提现操作</div>
    </div>
    <!--按钮-->
    <orangeBtn v-bind:name="btnName" v-if="bookingList.length < 5" v-on:clickEvent="addBookingWithdrawalsFn"></orangeBtn>
    <!--提示-->
    <div class="ps">温馨提示：最多可设置<span class="color_text">5个</span>预约提现任务</div>
    <!--帮助-->
    <div class="help" v-bind:data-no="12" v-on:click="helpDetailFn">
      <span class="iconfont icon-rule_declaration color_text"></span><span class="rule">规则说明</span>
    </div>
  </div>
</template>
<script>

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'booking_list',

    data () {

      return {

        bookingList: [],

        btnName: '添加预约提现'

      }

    },

    components: {

      orangeBtn: orangeBtn

    },

    mounted () {

      this.data();

    },

    methods: {

      data: function () {

        delete this.$store.bank;

        localStorage.removeItem('addBankBack');

        localStorage.removeItem('bookingList');

        /*
      * 接口： 查询预约列表
      * 请求方式： GET
      * 接口： userappointment/user/getappoinmentlist
      * 传参： null
      * */
        this.$http({
          method: 'get',
          url: process.env.API_ROOT+ 'userappointment/user/getappointmentlist',
        }).then(res=>{

          console.log(res.data);

          this.bookingList = res.data.data;

          for(var list of this.bookingList){

            if(!!list.nextDate){

              var date = new Date(list.nextDate);

              list.nextDate = ((date.getMonth()+1)+'').padStart(2,'0') + '月' + ((date.getDate()+'').padStart(2,'0') + '日');

            }

            var now = new Date();

            var endDate = new Date(list.endDate);

            if(now.getTime() > endDate.getTime()){

              list.close = true;

            }

          }

        })

      },

      addBookingWithdrawalsFn: function () {
        /**
         * 接口：检测用户添加预约提现操作
         * 请求方式：GET
         * 接口：user/work/checkappointment
         * 入参：null
         **/
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'user/work/checkappointment'
        }).then(res=>{

          console.log(res);

          if(res.data.code == -10){

            this.$messagebox({
              title: '提示',
              message: res.data.msg,
              showCancelButton:true,
              confirmButtonText: '去签约',
              cancelButtonText: '取消',
              closeOnClickModal: true,
              cancelButtonClass: 'cancel_btn',
              confirmButtonClass: 'confirm_btn_orange',
            }).then(res=>{

              if(res == 'confirm'){

                this.$router.push('/contractList');

              }

            })

          }else{

            /*
      * 接口： 获取用户银行卡信息
      * 请求方式： GET
      * 接口： /user/bank/getbankcardinfo
      * 传参： null
      * */
            this.$http({
              method: 'get',
              url: process.env.API_ROOT+ 'user/bank/getbankcardinfo',
            }).then(res=>{

              console.log(res);

              localStorage.setItem('booking','1');

              (res.data.data.length == 0) ? (this.addCard()) : (this.$router.push('/addBookingWithdrawals'));

            }).catch(res=>{console.log(res)});

          }

        });



      },

      addCard: function () {

        localStorage.setItem('bookingList','1');

      this.$messagebox({
          title: '提示',
          message: '您还没有可用于提现的银行卡，请先添加一张储蓄卡',
          showCancelButton:true,
          confirmButtonText: '去添加',
          cancelButtonText: '取消',
          closeOnClickModal: true,
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then(res=>{

          if(res == 'confirm'){

            this.$router.push('/addCard');

          }

        })

      },

      getChange: function (type, id, index) {

        var isStartup;

        switch (type) {

          case 'delete':

            isStartup = 3;

            this.$messagebox({

              title: '提示',
              message: '预约提现删除后，将不再进行自动提现，确定要删除吗？',
              showCancelButton:true,
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              closeOnClickModal: true,
              cancelButtonClass: 'cancel_btn',
              confirmButtonClass: 'confirm_btn_orange',

            }).then(res=>{

              (res == 'confirm') && (this.changeBooking(isStartup ,id ,index));

            });

            break;

          case  'open':

            isStartup = 1;

            this.$messagebox({

              title: '提示',
              message: '重新开启后，将继续按照计划时间自动提现，确定要开启吗？',
              showCancelButton:true,
              confirmButtonText: '开启',
              cancelButtonText: '取消',
              closeOnClickModal: true,
              cancelButtonClass: 'cancel_btn',
              confirmButtonClass: 'confirm_btn_orange',

            }).then(res=>{

              (res == 'confirm') && (this.changeBooking(isStartup ,id ,index));

            });

            break;

          case 'stop':

            isStartup = 2;

            this.$messagebox({

              title: '提示',
              message: '预约提现暂停后，将不再进行自动提现，确定要暂停吗？',
              showCancelButton:true,
              confirmButtonText: '暂停',
              cancelButtonText: '取消',
              closeOnClickModal: true,
              cancelButtonClass: 'cancel_btn',
              confirmButtonClass: 'confirm_btn_orange',

            }).then(res=>{

              (res == 'confirm') && (this.changeBooking(isStartup ,id ,index));

            });

            break;

        }

      },

      helpDetailFn:function (e) {

        this.setStorage('helpPage',e.currentTarget.dataset.no)

        this.$router.push('/helpDetail')

      },
      changeBooking: function (isStartup, id, index) {

        /*
      * 接口： 更改预约状态
      * 请求方式： POST
      * 接口： userappointment/update/updateappointmentlist
      * 传参： appointmentId, isStartup
      * */
        this.$http({
          method: 'get',
          url: process.env.API_ROOT+ 'userappointment/update/updateappointmentlist',
          params: {

            isStartup: isStartup,

            appointmentId: id

          }
        }).then(res=>{
          this.$toast({

          message: res.data.msg,
          position: 'middle',
          duration: 1500

        });

          if(res.data.code == '0000'){

            (isStartup != 3) ? (this.bookingList[index].isStartup = isStartup) : (this.bookingList.splice(index,1));

          }

        })

      }

    },

  }
</script>
<style lang="less" scoped>
  @import "booking_list.less";
</style>
