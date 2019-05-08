<template>
  <div class="add_booking_withdrawals"  v-on:click="keyboardShow = false"
       v-bind:class="{overflow: (cycleShow || firstTimeShow || timeBoxShow || passwordBoxShow || firstTimeWeek)}">

    <!--银行卡选择-->
    <div class="bank_choose" v-on:click="$router.push('/bankCard')">
      <div>
        <div class="bank_icon">
        <img v-bind:src="bankImg">
      </div>
        <div class="bank_information">
          <div class="bank_name">{{bankName}}</div>
          <div class="bank_card">尾号{{bankNo.substr(-4)}}储蓄卡</div>
        </div>
      </div>
      <span class="allow_right"></span>
    </div>

    <!--提现输入-->
    <div class="withdraw_detail">
      <div class="title">提现金额<span class="help btn_border" v-on:click="showPs">?</span></div>
      <div class="withdraw_input">
        <span>￥</span>
        <div v-on:click="keyboardShow = true" v-on:click.stop>
          <span v-if="withdrawMoney!=''" class="withdraw_money">{{withdrawMoney}}</span>
          <span v-if="keyboardShow" class="flicker"></span>
          <span v-if="withdrawMoney==''">每笔最高{{amountMax}}元</span>
        </div>
        <!--<input type="text" v-bind:placeholder="maxWithdraw+amountMax+'元'" v-model="withdrawMoney" v-on:blur="moneyToFixed">-->
        <span class="color_text" v-on:click="withdrawMoney = '到期提现全部余额'">全部提现</span>
      </div>
    </div>

    <!--预约选项-->
    <div class="withdraw_option">

      <!--提现周期-->
      <div class="withdraw_cycle" v-on:click="cycleShow = true ; char = cycleType">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_cycle.png"></div>
          <div>提现周期</div>
        </div>
        <div class="option">
          <span>{{cycleType}}</span>
          <span class="allow_right"></span>
        </div>
      </div>

      <!--首次开始时间-->
      <div class="withdraw_start" v-on:click="firstTimeSelect">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_start.png"></div>
          <div>
            <div>首次开始时间</div>
            <div>首次提现： <span class="color_text">{{firstTimeBooking}}</span></div>
          </div>
        </div>
        <div class="option">
          <span v-if="cycleType == '按月循环'">每月{{firstTimeType}}</span>
          <span v-else-if="cycleType == '按周循环'">每周{{firstTimeType}}</span>
          <span v-else-if="cycleType == '按日循环'">{{firstTimeType}}</span>
          <span class="allow_right"></span>
        </div>
      </div>

      <!--预约截止时间-->
      <div class="withdraw_end" v-on:click="selectTimeShow">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_end.png"></div>
          <div>
            <div>预约截止时间</div>
            <div v-show="!!newDate">最后一次提现： <span class="color_text">{{newDate}} 00:00</span></div>
          </div>
        </div>
        <div class="option">
          <span>{{newDate}}</span>
          <span class="allow_right"></span>
        </div>
      </div>

      <!--备注-->
      <div class="withdraw_tips">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_tips.png"></div>
          <div>备注</div>
        </div>
        <input type="text" placeholder="选填，1-10个字" maxlength="10" v-model="remark" @blur="lostPointFn">
      </div>
    </div>

    <!--提现服务协议-->
    <div class="agreement">
      <input type="checkbox" name="agree" id="agree" checked>
      <label for="agree">同意</label><span class="color_text" v-on:click="$router.push('/bookingAgreement')">《预约提现服务协议》</span>
    </div>

    <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>

    <div class="limit">
      <div>温馨提示</div>
      <div>限额说明：单卡单笔{{amountMax}}元，当日{{dayMaxAmount}}元，当月{{monthMaxAmount}}元</div>
    </div>

    <!--提示弹框-->
    <mt-popup v-model="psShow">
      <div class="ps">
        <div class="title">提示</div>
        <div class="content">
          <div>*手续费：0%，单卡单笔{{amountMax|thousandBitSeparator}}元，当日{{dayMaxAmount|thousandBitSeparator}}元，当月{{monthMaxAmount|thousandBitSeparator}}元</div>
          <div class="import">*若提现金额超出单笔最高额度，将分多笔进行提现</div>
        </div>
        <div class="close" v-on:click="psShow=false">确定</div>
      </div>
    </mt-popup>

    <!--时间组件-->
    <mt-datetime-picker v-model="date" type="date" ref="date" v-bind:startDate="new Date(startDate)" @confirm="selectTime" @cancel="cancelTime"></mt-datetime-picker>

    <!--提现周期选择组件-->
    <mt-popup v-model="cycleShow" position="bottom">

      <div class="button">

        <div class="cancel" v-on:click="cycleShow=false">取消</div>
        <div class="confirm" v-on:click="cycleConfirm">确定</div>

      </div>

      <mt-picker v-bind:slots="cycleList" @change="cycleChange"></mt-picker>

      <!--首次开始时间选择组件（按周循环）-->
    </mt-popup>

    <mt-popup v-model="firstTimeWeek" position="bottom">

      <div class="button">

        <div class="cancel" v-on:click="firstTimeWeek=false">取消</div>
        <div class="confirm" v-on:click="firstTimeConfirm">确定</div>

      </div>

      <mt-picker v-bind:slots="cycleWeekList" @change="firstTimeChange"></mt-picker>
    </mt-popup>

    <!--首次开始时间选择组件（按月循环）-->
    <mt-popup v-model="firstTimeShow" position="bottom">

      <div class="button">

        <div class="cancel" v-on:click="firstTimeShow=false">取消</div>
        <div class="confirm" v-on:click="firstTimeConfirm">确定</div>

      </div>

      <mt-picker v-bind:slots="firstTimeList" @change="firstTimeChange"></mt-picker>
    </mt-popup>

    <!--密码/验证码输入组件-->
    <keep-alive>
      <passwordBox v-on:clickEvent="submit" v-if="passwordBoxShow" v-on:boxClose="boxClose" v-on:getCode="getCode" ref="passwordbox" v-on:getSoundCode="getSoundCode"></passwordBox>
    </keep-alive>

    <keyboard v-if="keyboardShow" v-on:num="keyboardInput" v-bind:newNum="withdrawMoney" ref="keyboard" v-on:inputClose="inputClose"></keyboard>
  </div>
</template>
<script>
  import { bankCardJson } from "../../../../static/js/bankCardJson"
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  import passwordBox from '../../../components/password_box/password_box'
  import keyboard from '../../../components/keyboard/calculation'

  export default {

    name: 'addBookingWithdrawals',

    components: {

      orangeBtn: orangeBtn,

      passwordBox: passwordBox,

      keyboard: keyboard

    },

    data () {

      return {

        btnName: '完成',//按钮名称

        bankName: '',//银行名称

        cardId: '',//银行卡代码

        bankCardJson: bankCardJson,//银行logo列表

        bankImg: '',//银行logo

        bankNo: '',//银行卡号码

        amountMax: '',//最大提现金额
        amountMin: '',//最小提现金额
        balance: '',//账户余额
        dayMaxAmount: '',//每日最大提现金额
        monthMaxAmount: '',//每月最大提现金额
        rate: '',//费率,

        psShow: false,//预约提现介绍显示

        withdrawMoney: '',//预约提现金额

        date: '',//提现截止时间

        startDate: '',//时间插件开始时间

        newDate: '',//页面显示的提现截止时间

        cycleShow: false,//周期选择插件

        cycleList: [

          {
            flex: 1,
            values: ['按月循环','按周循环','按日循环']
          }

        ],//周期显示插件数据

        cycleWeekList: [

          {
            flex: 1,
            values: ['每周一','每周二','每周三','每周四','每周五','每周六','每周日'],
            defaultIndex: 0
          }

        ],//首次开始时间选择插件数据（按周循环）

        cycleType: '按月循环',//提现周期值

        char: '',//临时变量，临时保存数据

        firstTimeShow: false,//首次开始提现插件

        firstTimeList: [

          {
            flex: 1,
            values: ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日","28日"],
            defaultIndex: 0,
          }

        ],//首次开始提现插件数据（按月循环）

        firstTimeType: '',//首次开始提现时间（每月）

        firstTimeBooking: '',//首次开始提现事件（最近一次）

        passwordBoxShow: false,//密码输入显示

        params: {},//添加预约参数

        remark: '',//备注

        dateFor: '',//时间插件内容控制

        firstTimeWeek: false,//按周循环选择弹窗

        timeBoxShow: false,//时间插件状态

        keyboardShow: false,

        soundCodeTime: 60

      }

    },

    mounted () {

      this.data();

    },

    methods: {

      /*页面数据初始化*/
      data: function () {

        var _this = this;

        var div = document.getElementsByClassName('add_booking_withdrawals')[0];

        div.addEventListener('click',function () {

          if(event.target.classList.contains('v-modal')){

            _this.timeBoxShow = false;

          }

        });

        /**
         * 接口：检测用户发起添加预约操作操作
         * 请求方式：GET
         * 接口：user/work/checkwithdraw
         * 入参：null
         **/
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'user/work/checkappointment'
        }).then(res=>{

          if(res.data.code == '0000'){

            this.amountMax = res.data.data.amountMax;
            this.amountMin = res.data.data.amountMin;
            this.balance = res.data.data.balance;
            this.dayMaxAmount = res.data.data.dayMaxAmount;
            this.monthMaxAmount = res.data.data.monthMaxAmount;
            this.rate = res.data.data.rate;

            var bank;

            (!!this.$store.bank) ? (bank = this.$store.bank) : (bank = res.data.data.userBankCardDTOList[0]);

            this.bankName = bank.bankName;

            this.cardId = bank.bankCardId;

            this.bankNo = bank.bankNo;

            this.bankImg = this.getBankImg(this.bankName);

            this.date = new Date((new Date()).getTime()+60*60*24*1000);

            this.startDate = this.date.getFullYear() + '-' + (this.date.getMonth()+1) + '-' + (this.date.getDate());

            this.firstTimeType = this.date.getDate()-1 + '日';

            this.firstTimeList[0].defaultIndex = this.firstTimeList[0].values.indexOf(this.firstTimeType);

            this.firstTimeBooking = this.firstTimeNear(this.firstTimeType);

          }else if(res.data.code == '-7'){

            this.$messagebox({
              title: '提示',
              message: res.data.msg,
              showCancelButton:true,
              confirmButtonText: '去添加',
              cancelButtonText: '取消',
              closeOnClickModal: true,
              cancelButtonClass: 'cancel_btn',
              confirmButtonClass: 'confirm_btn_orange',
            }).then(res=>{

              if(res == 'confirm'){

                this.$router.push('/bankCard');

              }else if(res == 'cancel'){

                this.$router.go(-1);

              }

            })

          }

        });

      },



      /*获取银行卡照片*/
      getBankImg: function (bankName) {

        for(var bankCard of this.bankCardJson){
          if(bankCard.name == bankName){
            return bankCard.img;
          }
        }

      },


      /*时间组件确定事件*/
      selectTime: function () {

        this.timeBoxShow = false;

        (this.dateFor == 'stop') && (this.newDate = this.dateChange('-',this.date));

        (this.dateFor == 'start') && (this.firstTimeType = this.dateChange('-',this.date)) && (this.firstTimeBooking = this.firstTimeType);

      },


      /*时间组件取消事件*/
      cancelTime: function () {

        this.timeBoxShow = false;

        this.date = new Date((new Date()).getTime()+60*60*24*1000);

      },


      /*调用时间组件*/
      selectTimeShow: function () {

        /*var div = document.getElementsByClassName('picker-slot')[2];

        var divLong = div.getElementsByClassName('picker-item')[0];

        divLong.innerText = '长期有效';*/

        this.dateFor = 'stop';

        var nowTime = this.firstTimeBooking.split('-');

        nowTime[2] = ((+nowTime[2].slice(0,2) + 1)+'').padStart(2,'0');

        nowTime = nowTime.join('-');

        this.startDate = nowTime;

        this.date = new Date(nowTime);

        this.$refs.date.open();

        this.timeBoxShow = true;

      },



      /*周期组件滑动事件*/
      cycleChange: function (component,value) {

        this.char = value[0];

      },



      /*周期组件确定事件*/
      cycleConfirm: function () {

        var date = new Date();

        this.cycleType = this.char;

        (this.char == '按月循环') && (this.firstTimeType = date.getDate() + '日');

        (this.char == '按周循环') && (this.firstTimeType = this.weekChange(date.getDay())) && (this.cycleWeekList[0].defaultIndex = this.cycleWeekList[0].values.indexOf('每周'+this.firstTimeType));

        (this.char == '按日循环') && (this.firstTimeType = this.dateChange('-',date));

        this.firstTimeBooking = this.firstTimeNear(this.firstTimeType);

        this.cycleShow = false;

      },


      /*首次开始时间组件滑动事件*/
      firstTimeChange: function (componet,value) {

        this.char = value[0];

      },


      /*首次开始时间组件确定事件*/
      firstTimeConfirm: function () {

        (this.cycleType == '按月循环') && (this.firstTimeType = this.char);

        (this.cycleType == '按周循环') && (this.firstTimeType = this.char[2]);

        this.firstTimeBooking = this.firstTimeNear(this.firstTimeType);

        this.firstTimeShow = false;

        this.firstTimeWeek = false;

      },



      /*首次提现时间计算*/
      firstTimeNear: function (time) {

        var now = new Date();

        var show;

        if(this.cycleType == '按月循环'){

          if(parseInt(time) >= now.getDate()){

            show =  now.getFullYear() + '-' + ((now.getMonth()+1)+'').padStart(2,'0') + '-' + (parseInt(time)+'').padStart(2,'0');

          }else{

            show =  now.getFullYear() + '-' + ((now.getMonth()+2)+'').padStart(2,'0') + '-' + (parseInt(time)+'').padStart(2,'0');

          }

        }else if(this.cycleType == '按周循环'){

          var weekArr = ['0','一','二','三','四','五','六','日'];

          var week = weekArr.indexOf(time);

          var thisWeek = weekArr.indexOf(this.weekChange(now.getDay()));

          if(week >= thisWeek){

            show = this.dateChange('-', new Date((new Date()).getTime()+60*60*24*1000*(week - thisWeek)));

          }else{

            show = this.dateChange('-', new Date((new Date()).getTime()+60*60*24*1000*(week - thisWeek+7)));

          }

        }else if(this.cycleType == '按日循环'){

          show = time;

        }

        var timeArr = show.split('-');

        if(now.getFullYear() == timeArr[0] && now.getMonth()+1 == timeArr[1] && now.getDate() == timeArr[2]){

          show = show + ' ' + (now.getHours()+1) + ':00';

        }else{

          show = show + ' 01:00';

        }

        return show;

      },



      /*添加预约提现*/
      submit: function (password, type) {

        this.params[type] = password;

        /**
         * 接口：用户添加预约提现操作
         * 请求方式：GET
         * 接口：user/user/addappointment
         * 入参：bankCardId, banlane, appoinmentType, startDate, endDate, remark, payPassword, code
         **/
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'user/user/addappointment',
          params: this.params
        }).then(res=>{

          if(res.data.code == '0000'){

            this.$store.data = res.data.data;

            this.passwordBoxShow = false;

            this.$router.replace('/addBookingSuccess');

          }else{

            this.$indicator.close();

            if((res.data.code != '-4') && (res.data.code != '-1')){

              this.$messagebox({
                title: '提示',
                message: res.data.msg,
                confirmButtonText: '确定',
                closeOnClickModal: true,
                confirmButtonClass: 'confirm_btn_orange',
              });

              this.passwordBoxShow = false;

            }else{

              this.$toast({

                message: res.data.msg,
                position: 'middle',
                duration: 1500

              });

            }

          }

        })


      },



      /*验证码/密码组件控制*/
      boxClose: function (bool) {

        this.passwordBoxShow = bool;

      },




      /*检测页面数据*/
      handleClick: function () {

        if(this.withdrawMoney){

          (this.withdrawMoney == '到期提现全部余额') ? (this.params.banlane = '∞') : (this.params.banlane = this.withdrawMoney);

        }else{

          this.$toast({

            message: '请输入提现金额',
            position: 'middle',
            duration: 1500

          });

          return;

        }

        if(!this.newDate){

          this.$toast({

            message: '请选择截止时间',
            position: 'middle',
            duration: 1500

          });

          return;

        }else{

          var first = new Date(this.firstTimeBooking);

          var last = new Date(this.newDate);

          if(first.getTime() > last.getTime()){

            this.$toast({

              message: '提示：截止日期必须大于首次执行时间',
              position: 'middle',
              duration: 1500

            });

            return;

          }

        }

        var checkbox = document.getElementById('agree');

        if(!checkbox.checked){

          this.$toast({

            message: '请同意《预约提现服务协议》',
            position: 'middle',
            duration: 1500
          });

          return;

        }

        switch (this.cycleType) {

          case '按月循环':

            this.params.appoinmentType = '1';

            break;

          case '按周循环':

            this.params.appoinmentType = '2';

            break;

          case '按日循环':

            this.params.appoinmentType = '3';

            break;

        }

        this.params.startDate = this.firstTimeBooking;

        this.params.bankCardId = this.cardId;

        this.params.remark = this.remark;

        this.passwordBoxShow = true;

        this.params.endDate = this.newDate;

        console.log(this.params);

      },



      /*显示提现提醒*/
      showPs: function () {

        this.$messagebox({

          title: '提示',
          message: '*设置后,系统将在提现日期当天每隔1小时(整点)自动执行一次,直到执行成功<br/>*若提现金额超出单笔最高额度,将分多笔进行提现',
          confirmButtonText: '我知道了',
          closeOnClickModal: true,
          confirmButtonClass: 'confirm_btn_orange',

        })

      },




      /*金额显示状态改变*/
      moneyToFixed: function () {

        (this.withdrawMoney != '') && (this.withdrawMoney = (+this.withdrawMoney).toFixed(2));

      },



      /*首次时间选择组件显示*/
      firstTimeSelect: function () {

        (this.cycleType == '按月循环') && (this.firstTimeShow = true) && (this.char = this.firstTimeType);

        (this.cycleType == '按周循环') && (this.firstTimeWeek = true) && (this.char = '每周'+this.firstTimeType);

        if(this.cycleType == '按日循环'){

          this.dateFor = 'start';

          this.startDate = this.dateChange('-',new Date());

          this.date = new Date(this.firstTimeBooking);

          this.$refs.date.open();

          this.timeBoxShow = true;

        }

      },



      /*首次开始时间滑动事件*/
      weekChange: function (day) {

        var weekArr = ['日','一','二','三','四','五','六'];

        return weekArr[day];

      },



      /*时间格式输出*/
      dateChange: function (addPoint, date) {

        var year = date.getFullYear();

        var month = ((date.getMonth()+1)+'').padStart(2,'0');

        var day = (date.getDate()+'').padStart(2,'0');

        return year + addPoint + month + addPoint + day;

      },


      /*获取验证码*/
      getCode: function () {

        /**
         * 接口：预约提现发送短信验证码
         * 请求方式：GET
         * 接口：jx/action/appointment
         * 入参：null
         **/
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'jx/action/appointment'
        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          (res.data.code != '0000') && (this.$refs.passwordbox.seconds = 0);

        })

      },


      lostPointFn:function () {

        document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset = 100;

      },


      keyboardInput: function (value) {

        this.withdrawMoney = value;

      },


      inputClose: function () {

        this.keyboardShow = false;

      },


      getSoundCode: function () {

        if(this.soundCodeTime < 60){

          this.$toast({

            message: '操作过于频繁，请稍后再试',
            position: 'middle',
            duration: 1500

          });

          return;

        }

        /**
         * 接口：预约提现发送语音验证码
         * 请求方式：GET
         * 接口：jx/action/appointmentaudio
         * 入参：null
         * */

        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'jx/action/appointmentaudio',


        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code == '0000'){

            this.soundCodeTime = 0;

            var addTime = setInterval(()=>{

              this.soundCodeTime++;

              if(this.soundCodeTime > 60){

                clearInterval(addTime);

              }

            },1000);

          }

        })

      }


    },


    watch: {

      /*监听提现金额*/
      withdrawMoney: function (newVal, oldVal) {

        if(this.withdrawMoney != ''){

          if(oldVal.length < newVal.length){

            if(this.withdrawMoney != '到期提现全部余额'){

              (Number.isNaN(+this.withdrawMoney)) && (this.withdrawMoney = oldVal);

              (+this.withdrawMoney > +this.dayMaxAmount) && (this.withdrawMoney = this.dayMaxAmount);

              (+this.withdrawMoney < +this.amountMin) && (this.withdrawMoney = this.amountMin);

              ((this.withdrawMoney + '').indexOf('.') != -1) && ((this.withdrawMoney + '').split('.')[1].length > 2)
              && (this.withdrawMoney = (+this.withdrawMoney).toFixed(2));

            }

          }else{

            if(this.withdrawMoney == '到期提现全部余'){

              this.withdrawMoney = '';

            }

          }

        }

        (!!this.$refs.keyboard) && (this.$refs.keyboard.money = this.withdrawMoney);

      }



    },



    destroyed () {

      this.$indicator.close();

    }

  }
</script>
<style lang="less" scoped>
  @import "add_booking_withdrawals.less";
</style>
<style scoped>
  .button + .mint-popup{
    background-color: transparent;
  }
  .mint-popup>.button{
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .mint-popup>.button>.cancel, .mint-popup>.button>.confirm{

    padding: 5px 10px;
    font-size: 16px;
    background-color: #f5f5f5;
    border-radius: 8px;

  }
</style>
