<template>

  <div class="balance">

    <div class="detail">

      <div class="money">
        <p>{{totalSalary| thousandBitSeparator}}</p>
        <p>工资余额（元）</p>
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
      <div class="cell">
        <div class="title">
          <span class="iconfont icon-wages_transfer1"></span><span class="cell_text">转账</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>
      <!--设置 -->
      <div class="cell" v-on:click="$router.push('/withdraw')">
        <div class="title">
          <span class="iconfont icon-wages_wallet"></span><span class="cell_text">提现</span>
        </div>
        <div class="cell_value"></div>
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
  export default {

    name: 'balance',

    data(){

      return {

        wages:'--.--',//可提资金

        enableSalary:'--.--',

        frozenSalary:'--.--',//冻结资金

        totalSalary:'--.--',//工资余额

        isVerify:'',

      }

    },

    mounted(){

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


      }).catch((res)=>{})



    },
    methods: {

      frozenFn:function () {

        this.$messagebox({
          title: '不可提金额只可消费，不可提现',
          message: '在“我的发薪企业”中同意企业邀请，身份验证通过后，即可提现',
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

            this.$router.push('/company');



          }
        })


      }
    }
  }
</script>
<style lang="less" scoped>

  @import 'index.less';

</style>
