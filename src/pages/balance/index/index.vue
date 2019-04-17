<template>

  <div class="balance">

    <backHome></backHome>

    <div class="detail change_color_background">

      <div class="money">
        <p>{{totalSalary| thousandBitSeparator}}</p>
        <p>收入余额（元）</p>
      </div>

      <div class="special_money">
        <div>
          <p>可提金额（元）</p>
          <p>{{enableSalary| thousandBitSeparator}}</p>
        </div>

        <div>
          <p v-on:click="frozenFn">不可提金额（元）<img src="../../../../static/images/jx_ask_mine.png"/></p>
          <p>{{frozenSalary| thousandBitSeparator}}</p>
        </div>

      </div>

    </div>


    <div class="list">
      <!--设置 -->
      <div class="cell" v-on:click="$router.push('/details')">
        <div class="title">
          <span class="iconfont icon-wages_details1 blue"></span><span class="cell_text">明细</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>
    </div>

    <div class="list">
      <!--设置 -->
      <div class="cell" v-on:click="transferUrlFn">
        <div class="title">
          <span class="iconfont icon-wages_transfer1"></span><span class="cell_text">转账</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>
      <!--设置 -->
      <div class="cell" v-on:click="cashUrlFn">
        <div class="title">
          <span class="iconfont icon-wages_wallet"></span><span class="cell_text">提现</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>

      <!--预约提现-->
      <div class="cell" v-on:click="bookingUrlFn">
        <div class="title">
          <span class="iconfont icon-withdraw_cash"></span><span class="cell_text">预约提现</span>
        </div>
        <div class="cell_value">到期自动提现</div>
        <i class="allow_right"></i>
      </div>
    </div>

    <div class="list">

      <div class="cell" v-on:click="jbtUrlFn">
        <div class="title">
          <span class="iconfont icon-wage_advance"></span><span class="cell_text">工资预支</span>
        </div>
        <div class="cell_value">工资不够花？到这借！</div>
        <i class="allow_right"></i>
      </div>

    </div>

    <div class="tips">
      <p>账户资金由以下机构进行委托管理：</p>
      <p>平安付科技服务有限公司、汇潮支付有限公司、新浪支付有限公司</p>
    </div>



  </div>

</template>
<script>

  import backHome from '../../../components/back_home/back_home'
  export default {

    name: 'balance',

    components: {

      backHome: backHome

    },

    data(){

      return {

        wages:'--.--',//可提资金

        enableSalary:'--.--',

        frozenSalary:'--.--',//冻结资金

        totalSalary:'--.--',//工资余额

        isVerify:'',

        mobile:'',

        isOpen:'',


      }

    },

    mounted(){

      (localStorage.getItem('bookingBack') == '1') && ((localStorage.removeItem('bookingBack')) || (this.$router.push('/bookingList')));



      /**
       * 接口：获取用户工资金额状况
       * 请求方式：GET
       * 接口：/user/bank/getsalarystatus
       * 入参：null
       **/
      this.$http({

        method: 'get',

        url:process.env.API_ROOT+'user/bank/getsalarystatus',

      }).then((res)=>{

        console.log(res.data)

        if(!res.data.data.frozenSalary&&!res.data.data.totalSalary){

            this.frozenSalary='0.00'

            this.enableSalary='0.00'

            this.totalSalary='0.00'


        }

        else {

          this.frozenSalary=res.data.data.frozenSalary;

          this.enableSalary=res.data.data.enableSalary;

          this.totalSalary=res.data.data.totalSalary;


        }

      }).catch((res)=>{});


      /**
       * 接口：用户中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：mobile
       **/

      this.$http({

        method: 'post',

        url:process.env.API_ROOT+'user/center/usercenter',

      }).then((res)=>{

          console.log(res.data);

          this.isVerify=res.data.data.isVerify

          this.mobile =res.data.data.mobile

          this.isOpen = res.data.data.isOpen


      }).catch((res)=>{})




    },


    destroyed (){
      this.$messagebox.close();
    },
    methods: {


      jbtUrlFn: function () {

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

        }




      },
      frozenFn:function () {

        this.$messagebox({
          title: '不可提金额只可消费，不可提现',
          message: '在“发薪企业”中同意企业邀请，身份验证通过后，即可提现',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '加入企业',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then((res) => {
          if (res == 'cancel') {
            return;
          } else if (res == 'confirm') {

            //点击去解冻 储存 用于判断跳回哪个页面(再实名认证成功之后获取）
            this.setStorage('goFrozen','1');

            console.log('数值'+this.getStorage('goFrozen'))

            this.$router.push('/company');



          }
        })


      },

      transferUrlFn:function () {


        //获取已认证未认证
        var _isVerify = this.isVerify;


        //没认证的去认证 已认证直接跳接口
        if (_isVerify == '0'||_isVerify == '3') {

          //存指定的页面  （在实名认证中取值）
          this.setStorage('hrefId','10');

          this.setStorage('personCenter','2');

          this.$messagebox({
            title: '提示',
            message: '为保障账户资金安全，实名用户才能使用转账服务，请先完成实名认证',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: '去认证',
            cancelButtonText: '取消',
            cancelButtonClass:'cancel_btn',
            confirmButtonClass:'confirm_btn_orange',
          }).then((res)=>{

              if(res == 'confirm'){

                this.$router.push('/certificationChoose');

              }
              else {

                 return

              }

          }).catch((res=>{}))





        }

        else if(_isVerify == '2'){
          //存指定的页面  （在实名认证中取值）
          this.setStorage('hrefId','10');

          this.setStorage('personCenter','2');

          this.$messagebox({
            title: '提示',
            message: '实名认证审核中，审核通过后即可使用转账服务',
            showCancelButton: false,
            confirmButtonText: '我知道了',
            confirmButtonClass:'confirm_btn_orange',
          }).then((res)=>{

            if(res == 'confirm'){

              //this.$router.push('/certification');

            }


          }).catch((res=>{}))


        }


        else{

          /**
           * 接口：用户发起转账操作
           * 请求方式：get
           * 接口：user/work/checktransfer
           * 入参：null
           **/
          this.$http({

            method: 'get',

            url: process.env.API_ROOT + 'user/work/checktransfer',

            params:{

              mobile:this.mobile
            }


          }).then((res)=>{

            console.log(res.data)

            if(res.data.code=='-10'){

              this.$messagebox({
                title: '提示',
                message: '您有文件待签署，请至 “ 我的签约”中完成签署后再转账',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '去签约',
                cancelButtonText: '取消',
                cancelButtonClass:'cancel_btn',
                confirmButtonClass:'confirm_btn_orange',
              }).then((res)=>{

                if(res == 'confirm'){

                  this.$router.push('/contractList');

                }


              }).catch((res=>{}))

            }

            else {

              /**
               * 接口：查询历史收款人
               * 请求方式：post
               * 接口：/record/selecthistoricalpayee
               * 入参：null
               **/

              this.$http({

                method: 'post',

                url: process.env.API_ROOT + 'record/selecthistoricalpayee',

              }).then((res)=>{

                console.log(res.data)

                if(res.data.data.length !=0){

                  console.log('有历史');

                  this.$router.push('/transferAccounts')

                }

                else {

                  //储存刚进来时候的状态 在转账成功的时候获取

                  this.$router.push('/transfer')



                }


              }).catch((res)=>{})


            }


          }).catch((res)=>{})


        }


      },

      cashUrlFn:function () {


        //获取已认证未认证
        var _isVerify = this.isVerify;


        //没认证的去认证 已认证直接跳接口
        if (_isVerify == '0'||_isVerify == '3') {

          //存指定的页面  （在实名认证中取值）
          this.setStorage('hrefId','10');

          this.setStorage('personCenter','2');

          this.$messagebox({
            title: '提示',
            message: '为保障账户资金安全，实名用户才能使用提现服务，请先完成实名认证',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: '去认证',
            cancelButtonText: '取消',
            cancelButtonClass:'cancel_btn',
            confirmButtonClass:'confirm_btn_orange',
          }).then((res)=>{

            if(res == 'confirm'){

              this.$router.push('/certificationChoose');

            }
            else {

              return

            }

          }).catch((res=>{}))





        }

        else if(_isVerify == '2'){
          //存指定的页面  （在实名认证中取值）
          this.setStorage('hrefId','10');

          this.setStorage('personCenter','2');

          this.$messagebox({
            title: '提示',
            message: '实名认证审核中，审核通过后即可使用提现服务',
            showCancelButton: false,
            confirmButtonText: '我知道了',
            confirmButtonClass:'confirm_btn_orange',
          }).then((res)=>{

            if(res == 'confirm'){

              //this.$router.push('/certification');

            }


          }).catch((res=>{}))


        }


        else{

          /**
           * 接口：用户发起提现操作
           * 请求方式：get
           * 接口：user/work/checkwithdraw
           * 入参：null
           **/
          this.$http({

            method: 'get',

            url: process.env.API_ROOT + 'user/work/checkwithdraw',

          }).then((res)=>{

            console.log(res.data)

            if(res.data.code=='-10'){

              this.$messagebox({
                title: '提示',
                message: '您有文件待签署，请至 “ 我的签约”中完成签署后再提现',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '去签约',
                cancelButtonText: '取消',
                cancelButtonClass:'cancel_btn',
                confirmButtonClass:'confirm_btn_orange',
              }).then((res)=>{

                if(res == 'confirm'){

                  this.$router.push('/contractList');

                }


              }).catch((res=>{}))

            }

            else {

              this.$router.push('/withdraw')


            }


          }).catch((res)=>{})

        }



      },


      bookingUrlFn: function () {

        //获取已认证未认证
        var _isVerify = this.isVerify;


        //没认证的去认证 已认证直接跳接口
        if (_isVerify == '0'||_isVerify == '3') {

          //存指定的页面  （在实名认证中取值）
          this.setStorage('hrefId','10');

          this.setStorage('personCenter','2');

          this.$messagebox({
            title: '提示',
            message: '为保障账户资金安全，实名用户才能使用预约提现服务，请先完成实名认证',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: '去认证',
            cancelButtonText: '取消',
            cancelButtonClass:'cancel_btn',
            confirmButtonClass:'confirm_btn_orange',
          }).then((res)=>{

            if(res == 'confirm'){

              localStorage.setItem('bookingCertification','1');

              this.$router.push('/certificationChoose');

            }
            else {

              return

            }

          }).catch((res=>{}))





        }

        else if(_isVerify == '2'){
          //存指定的页面  （在实名认证中取值）
          this.setStorage('hrefId','10');

          this.setStorage('personCenter','2');

          this.$messagebox({
            title: '提示',
            message: '实名认证审核中，审核通过后即可使用预约提现服务',
            showCancelButton: false,
            confirmButtonText: '我知道了',
            confirmButtonClass:'confirm_btn_orange',
          }).then((res)=>{}).catch((res=>{}))


        }else{

          this.$router.push('/bookingList');

        }

      }

    }
  }
</script>
<style lang="less" scoped>

  @import 'index.less';

</style>
