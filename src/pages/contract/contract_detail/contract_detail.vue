<template>
  <div class="contract_detail">
    <div class="contract_part_bg"></div>
    <div class="contract_part">
      <div class="contract_file">
        <object v-bind:data="contractUrl"></object>
      </div>
      <div class="cut_line" v-if="signStateNum == 1"></div>
      <a class="contract_down" v-bind:href="contractUrl" target="_blank" v-if="signStateNum == 1">
        <span>下载</span>
        <img src="../../../../static/images/jx_download.png">
      </a>
    </div>
    <div class="contract_information">
      <div class="information"><span>文件名称</span><span>{{contractName}}</span></div>
      <div class="information"><span>甲方</span><span>{{entSignName}}</span></div>
      <div class="information"><span>甲方签署时间</span><span>{{entSignDate}}</span></div>
      <div class="information"><span>乙方</span><span v-show="signStateNum == 1">{{userName}}</span></div>
      <div class="information"><span>乙方签署时间</span><span v-show="signStateNum == 1">{{userSignDate}}</span></div>
      <div class="information"><span>状态</span><span class="orange">{{signState}}</span></div>
      <div class="information"><span>截止签约时间</span><span>{{abortDate}}</span></div>
      <div class="contract_state_img" v-if="signStateNum == 1">
        <img src="../../../../static/images/jx_contract_state_sign.png">
      </div>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="signEvent" v-if="signStateNum == 2"></orangeBtn>
  </div>
</template>
<script>

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {
    name: 'contractDetail',

    components: {

      orangeBtn: orangeBtn

    },

    data () {

      return {

        contractName: '',

        contractUrl: '',

        entSignName: '',

        entSignDate: '',

        signState: '',

        signUrl: '',

        userName: '',

        userSignDate: '',

        signStateNum: '',

        btnName: '签约合同',

        abortDate: ''

      }

    },

    mounted () {

      /**
       * 接口：合同详情
       * 请求方式：POST
       * 接口：/user/contract/getcontractdetail
       * 入参：signId
       **/

      this.$http({

        method: 'post',

        url:process.env.API_ROOT+'user/contract/getcontractdetail',

        params: {

          signId: localStorage.getItem('signId')

        }


      }).then((res)=>{

        console.log(res);

        this.signStateNum = res.data.data.signState;

        this.contractName = res.data.data.contractName;

        this.contractUrl = res.data.data.contractUrl;

        this.signState = this.signStateChange(res.data.data.signState);

        this.userName = res.data.data.userName;

        this.entSignDate = this.timeChange(res.data.data.entSignDate);

        this.entSignName = res.data.data.entSignName;

        this.signUrl = res.data.data.signUrl;

        this.abortDate = this.timeChange(res.data.data.abortDate);

        if(res.data.data.userSignDate){

          this.userSignDate = this.timeChange(res.data.data.userSignDate)

        }

      })


    },

    methods: {

      timeChange: function (oldTime) {

        var datetime = new Date(oldTime);

        var year = datetime.getFullYear();

        var month = datetime.getMonth() + 1;

        (month < 10) && (month = '0' + month);

        var day = datetime.getDate();

        (day < 10) && (day = '0' + day);

        var hours = datetime.getHours();

        (hours < 10) && (hours = '0' + hours)

        var min = datetime.getMinutes();

        (min < 10) && (min = '0' + min);

        var sec = datetime.getSeconds();

        (sec < 10) && (sec = '0' + sec);

        var newTime = '' + year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;

        return newTime;

      },



      signStateChange: function (signState) {

        /*
         0表示未发送
         1 表示已签
         2 表示待签
         3表示发送失败
         4 表示已撤销
         5表示失效
         6表示拒签
         */

        switch (signState) {

          case '0':

            return '未发送';

          case '1':

            return '已签约';

          case '2':

            return '待签约';

          case '3':

            return '发送失败';

          case '4':

            return '已撤销';

          case '5':

            return '已过期';

          case '6':

            return '拒签';

        }

      },




      signEvent: function () {

        /**
         * 接口：用户中心
         * 请求方式：POST
         * 接口：/user/center/usercenter
         * 入参：null
         **/

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/center/usercenter',

        }).then(res=>{

          if(res.data.data.isVerify == 0){

            this.$messagebox({
              title: '提示',
              message: '当前账户尚未进行实名认证，完成实名认证后即可签约合同',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: '去认证',
              cancelButtonText: '取消',
              cancelButtonClass:'cancel_btn',
              confirmButtonClass:'confirm_btn_orange',
            }).then(res=>{

              if(res == 'cancel'){

                return;

              }else if(res == 'confirm'){

                this.setStorage('hrefId','7');
                this.$router.push('/certification');

              }

            });
            return;

          }else if(res.data.data.isVerify == 2){

            this.$messagebox({
              title: '提示',
              message: '实名认证审核中，审核通过后即可签约合同',
              confirmButtonText: '我知道了',
              confirmButtonClass:'confirm_btn_orange',
            });
            return;

          }else if(res.data.data.isVerify == 3){

            this.$messagebox({
              title: '提示',
              message: '当前账户实名认证审核失败，需要重新审核',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: '去认证',
              cancelButtonText: '取消',
              cancelButtonClass:'cancel_btn',
              confirmButtonClass:'confirm_btn_orange',
            }).then(res=>{

              if(res == 'cancel'){

                return;

              }else if(res == 'confirm'){

                this.setStorage('hrefId','7');
                this.$router.push('/certification');

              }

            });

          }else if(res.data.data.isVerify == 1){

            window.location.href = this.signUrl;

          }

        })

      }

    }

  }
</script>
<style lang="less" scoped>
  @import "contract_detail.less";
</style>
