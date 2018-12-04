<template>
  <div class="contract_detail">
    <div class="contract_part_bg"></div>
    <div class="contract_part">
      <div class="contract_file">
        <object v-bind:data="contractUrl"></object>
      </div>
      <div class="cut_line"></div>
      <a class="contract_down" v-bind:href="contractUrl" target="_blank">
        <span>下载</span>
        <img src="../../../../static/images/jx_download.png">
      </a>
    </div>
    <div class="contract_information">
      <div class="information"><span>文件名称</span><span>{{contractName}}</span></div>
      <div class="information"><span>甲方</span><span>{{entSignName}}</span></div>
      <div class="information"><span>甲方签署时间</span><span>{{entSignDate}}</span></div>
      <div class="information"><span>乙方</span><span>{{userName}}</span></div>
      <div class="information" v-if="signState == 1"><span>乙方签署时间</span><span>{{userSignDate}}</span></div>
      <div class="information"><span>状态</span><span class="orange">{{signState}}</span></div>
      <div class="information"><span>截止签约时间</span><span>2018-08-18 18:30:00</span></div>
      <div class="contract_state_img">
        <img src="../../../../static/images/jx_contract_state_sign.png">
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'contractDetail',

    data () {

      return {

        contractName: '',

        contractUrl: '',

        entSignName: '',

        entSignDate: '',

        signState: '',

        signUrl: '',

        userName: '',

        userSignDate: ''

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

        this.contractName = res.data.data.contractName;

        this.contractUrl = res.data.data.contractUrl;

        this.signState = this.signStateChange(res.data.data.signState);

        this.userName = res.data.data.userName;

        this.entSignDate = this.timeChange(res.data.data.entSignDate);

        this.entSignName = res.data.data.entSignName;

        this.signUrl = res.data.data.signUrl;

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

        var newTime = '' + year + '-' + month + '-' + day + ' ' + hours + ':' + min;

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

            return '已完成';

          case '2':

            return '签署中';

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

    }

  }
</script>
<style lang="less" scoped>
  @import "contract_detail.less";
</style>
