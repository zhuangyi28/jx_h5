<template>
  <div class="mine">
    <!-- 个人信息 -->
    <div class="user">
      <div class="user_img">
        <img src="/static/images/jx_mine_image.png">
      </div>
      <div class="user_information">
        <div class="user_tel">{{mobile|plusXing(3,4)}}</div>

        <!-- 未认证-->
        <div class="user_auth" v-if="isVerify=='0'">
          <img src="/static/images/jx_uncertified.png">
          <span>未认证</span>
        </div>
        <!-- 已认证-->
        <div class="user_auth" v-else-if="isVerify=='1'">
          <img src="/static/images/jx_authentication.png">
          <span>已认证</span>
        </div>
        <!-- 已认证-->
        <div class="user_auth" v-else-if="isVerify=='2'">
          <img src="/static/images/jx_uncertified.png">
          <span>审核中</span>
        </div>
        <!-- 已认证-->
        <div class="user_auth" v-else-if="isVerify=='3'">
          <img src="/static/images/jx_uncertified.png">
          <span>审核未通过</span>
        </div>
      </div>
    </div>

    <!-- 列表1 -->

    <div class="list">
      <mt-cell title="工资余额" is-link>
        <span class="red">{{totalSalary|thousandBitSeparator}}</span>
        <img slot="icon" src="/static/images/jx_balance.png" width="24" height="24">
      </mt-cell>

      <mt-cell title="我的账单" is-link>
        <img slot="icon" src="/static/images/jx_bill.png" width="24" height="24">
      </mt-cell>

      <mt-cell title="银行卡" is-link>
        <img slot="icon" src="/static/images/jx_bank.png" width="24" height="24">
      </mt-cell>

    </div>

    <!-- 列表2 -->

    <div class="list">
      <mt-cell title="我的发薪企业" is-link>
        <span v-show="hasJoinEnt" class="orange">您有新的企业邀请</span>
        <img slot="icon" src="/static/images/jx_unit.png" width="24" height="24">
      </mt-cell>

      <mt-cell title="消息" is-link>
        <span v-show="hasNewMsg" class="red">您有新消息</span>
        <img slot="icon" src="/static/images/jx_mail.png" width="24" height="24">
      </mt-cell>

    </div>

    <!-- 列表3 -->

    <div class="list">
      <mt-cell title="设置" is-link>
        <img slot="icon" src="/static/images/jx_set.png" width="24" height="24">
      </mt-cell>

      <mt-cell title="帮助与客服" is-link>
        <img slot="icon" src="/static/images/jx_ask.png" width="24" height="24">
      </mt-cell>

    </div>

  </div>
</template>
<script>
  export default {

    name: 'mine',

    data(){

      return{

        mobile: '',//个人中心手机号

        totalSalary: '',//工资余额

        hasJoinEnt: false,//默认不显示有新的邀请 true为不显示 false为显示

        isVerify: '',//是否认证

        hasNewMsg: false,//默认不显示有新消息 true为不显示 false为显示

      }

    },

    mounted(){

        let _this = this

      /**
       * 接口：用户中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/

      this.$http({

        method: 'post',

        url:this.API_HOST+'/user/center/usercenter',

        headers:{

          'Content-type': 'application/x-www-form-urlencoded'
        },


      }).then((res)=>{

        console.log(res.data);

      if(res.data.code=='0000'){


        let ishasNewMsg = res.data.data.isHaveNewMsg;

        _this.mobile = res.data.data.mobile;

        _this.isVerify =  res.data.data.isVerify;

        //获取手机号
        this.setStorage('mobile', res.data.data.mobile);

        //获取是否设置密码
        this.setStorage('isPayPwd', res.data.data.isPayPwd);

        //是否开启验证
        this.setStorage('isSecurity', res.data.data.isSecurity);

        //存姓名和身份证
        this.setStorage('idNumber', res.data.data.idNumber);

        this.setStorage('userName', res.data.data.userName);

        //是否实名认证
        this.setStorage('isVerify', res.data.data.isVerify);

        //证件类型 只有花名册导入的时候有
        this.setStorage('idType',res.data.data.idType);

        //国籍
        this.setStorage('nationality',res.data.data.nationality);

        this.setStorage('source',res.data.data.source);

        //如果审核不通过的话 存储一下不通过的原因
        if(this.setStorage('isVerify')=='3'){

          this.setStorage('refuseReason',res.data.data.refuseReason);

        }


        //判断是否有新消息

        if (ishasNewMsg == '1') {

            _this.hasNewMsg = true


        }

        else {

          _this.hasNewMsg = false


        }


        }



      }).catch((res)=>{

      })

      /**
       * 接口：有待加入企业
       * 请求方式：GET
       * 接口：/user/workunit/selectisjoinent
       * 入参：null
       **/

      this.$http({

        method: 'get',

        url:this.API_HOST+'/user/workunit/selectisjoinent',


      }).then((res)=>{

        console.log(res.data);

        let hasEntType = res.data.data.type;

        //判断是否有加入企业

        if (hasEntType == '1') {

            _this.hasJoinEnt=true

        }

        else {

          _this.hasJoinEnt=false

        }



      }).catch((res)=>{

        //console.log(res.data);


      })

      /**
       * 接口：获取用户工资金额状况
       * 请求方式：GET
       * 接口：/user/bank/getsalarystatus
       * 入参：null
       **/

      this.$http({

        method: 'get',

        url:this.API_HOST+'/user/bank/getsalarystatus',

      }).then((res)=>{

        console.log(res.data);

        if(!res.data.data.totalSalary){


            _this.totalSalary= '--.--'



        }

        else {


          _this.totalSalary= res.data.data.totalSalary


        }



      }).catch((res)=>{

        //console.log(res.data);


      })





  },
    methods:{



    }
  }
</script>
<style lang="less" scoped>

  @import 'mine.less';

</style>
