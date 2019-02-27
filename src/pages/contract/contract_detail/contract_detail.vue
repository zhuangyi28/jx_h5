<template>
  <div class="contract_detail" v-bind:class="{'overFlow': popupShow}">
    <div class="contract_part_bg change_color_background"></div>
    <div class="contract_part">
      <div class="contract_file" v-on:click="showAll">
        <img v-bind:src="contractUrlImage">
      </div>
      <div class="showImg" v-on:click="showAll">
        <span>点击预览合同内容</span>
        <img src="../../../../static/images/jx_showImg.png">
      </div>
      <div class="cut_line" v-if="signStateNum == 1"></div>
      <a class="contract_down" v-bind:href="contractUrl" v-if="signStateNum == 1" target="_blank">
        <span>下载该合同</span>
        <img src="../../../../static/images/jx_download.png">
      </a>
    </div>
    <div class="contract_information">
      <div class="information"><span>文件名称</span><span>{{contractName}}</span></div>
      <div class="information"><span>甲方</span><span>{{entSignName}}</span></div>
      <div class="information"><span>甲方签署时间</span><span>{{entSignDate}}</span></div>
      <div class="information" v-if="contractType == 2"><span>乙方</span><span>{{entSignNamePartyB}}</span></div>
      <div class="information" v-if="contractType == 2"><span>乙方签署时间</span><span>{{entSignDate}}</span></div>
      <div class="information">
        <span v-if="contractType == 1">乙方</span>
        <span v-else-if="contractType == 2">丙方</span>
        <span v-show="signStateNum == 1">{{userName}}</span>
      </div>
      <div class="information">
        <span v-if="contractType == 1">乙方签署时间</span>
        <span v-else-if="contractType == 2">丙方签署时间</span>
        <span v-show="signStateNum == 1">{{userSignDate}}</span>
      </div>
      <div class="information"><span>状态</span><span v-bind:class="(signState == '已失效') ? 'grey' : 'color_text'">{{signState}}</span></div>
      <div class="contract_state_img" v-if="signStateNum == 1">
        <img src="../../../../static/images/jx_contract_sign_useful.png">
      </div>
      <!--<div class="contract_state_img" v-if="signStateNum == 5">-->
        <!--<img src="../../../../static/images/jx_contract_sign_unuseful.png">-->
      <!--</div>-->
    </div>

    <!-- 签署-->
    <orangeBtn v-bind:name="btnName" v-show="showBtn" v-on:clickEvent="signEvent" v-if="signStateNum == 2||signStateNum == 7"></orangeBtn>

    <!-- 签署loading -->
    <div class="button" v-show="!showBtn">
      <div class="loading"><mt-spinner color="#fff" :size="20" type="fading-circle"></mt-spinner></div>
      <mt-button size="large" class="btn_color" disabled>签署</mt-button>
    </div>

    <mt-popup v-model="popupShow" popup-transition="popup-fade">
      <div class="close" v-on:click="popupShow=false">
        <img src="../../../../static/images/contract_close.png">
      </div>
      <div class="contract_img">
        <img v-bind:src="contractUrlImage">
      </div>
    </mt-popup>
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

        signId: '',//合同ID

        contractName: '',//文件名称

        contractUrl: '',//文件链接

        entSignName: '',//甲方名称

        entSignDate: '',//甲方签署日期

        signState: '',//签约状态

        signUrl: '',//签署地址

        userName: '',//用户姓名

        userSignDate: '',//用户签署时间

        signStateNum: '',//签约状态

        btnName: '签署',//按钮名称

        abortDate: '',//签约截止日期

        popupShow: false,//弹框显示

        contractType: '',//合同类型 1 双方协议 2 三方协议

        entSignNamePartyB: '',//乙方名称

        contractUrlImage: '',//文件图片链接

        showBtn:true,

      }

    },

    mounted () {

      if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

        location.href = location.href.split('#')[0] +'#'+ this.$route.fullPath;

        console.log('isIOS');

      }

      this.signId = this.$route.query.signId;

      this.getData();

      localStorage.getItem('contractDetailBack') || localStorage.setItem('contractDetailBack','1');




    },

    methods: {


      //获取数据
      getData: function () {

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

            signId: this.signId

          }


        }).then((res)=>{

          console.log(res);

          this.signStateNum = res.data.data.signState;

          this.contractType = res.data.data.contractType;

          this.contractName = res.data.data.contractName;

          this.contractUrl = res.data.data.contractUrl;

          this.contractUrlImage = res.data.data.contractUrlImage;

          this.signState = this.signStateChange(res.data.data.signState);

          this.userName = res.data.data.userName;

          this.entSignDate = this.timeChange(res.data.data.entSignDate);

          this.entSignName = res.data.data.entSignName;

          (res.data.data.signUrl) && (this.signUrl = res.data.data.signUrl);

          (res.data.data.entSignNamePartyB) && (this.entSignNamePartyB = res.data.data.entSignNamePartyB);

          this.abortDate = this.timeChange(res.data.data.abortDate);

          if(res.data.data.userSignDate){

            this.userSignDate = this.timeChange(res.data.data.userSignDate)

          }

        })

      },


      //更改时间的显示模式
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

        var newTime = '' + year + '-' + month + '-' + day /*+ ' ' + hours + ':' + min + ':' + sec*/;

        return newTime;

      },



      //更改签约状态的显示模式
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

            return '已失效';

          case '6':

            return '拒签';

          case '7':

            return '待签约';

        }

      },




      //签约事件
      signEvent: function () {

        if(this.signStateNum == 7){

          this.$messagebox({
            message: '合同异常，请联系管理员重新发送',
            showConfirmButton: true,
            confirmButtonText: '确定',
            confirmButtonClass:'confirm_btn_orange',
          });

          return;

        }

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
                this.$router.push('/certificationChoose');

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
                this.$router.push('/certificationChoose');

              }

            });

          }else if(res.data.data.isVerify == 1){

            if(!this.signUrl){

              this.$messagebox({
                message: '正在为您申请电子签名资质，申请成后即可进行签署，请稍后再试',
                showConfirmButton: true,
                confirmButtonText: '确定',
                confirmButtonClass:'confirm_btn_orange',
              });

            }else{


              /**
               * 接口：重新发送合同
               * 请求方式：POST
               * 接口：user/contract/sendcontractagain
               * 入参：null
               **/

              this.$http({

                method: 'post',

                url: process.env.API_ROOT + 'user/contract/sendcontractagain',

                params: {

                  signId: localStorage.getItem('signId')

            },

              }).then(res=>{

                console.log(res.data)

                if(res.data.code=='-1'){

                  this.$toast({
                    message: res.data.msg,
                    duration: 1500

                  })

                }
                else if(res.data.code=='-7'){

                  this.$messagebox({
                    title: '提示',
                    message: '合同异常，请联系管理员重新发送',
                    confirmButtonText: '确定',
                    confirmButtonClass:'confirm_btn_orange',
                  });
                  return;

                }
                else {


                  this.showBtn = false

                  window.location.href = res.data.data;

                }



              }).catch((res)=>{})


              //window.location.href = this.signUrl;

              }

            }

        })

      },




      showAll: function () {

        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if(isAndroid){

          this.popupShow = true;

        }else if(isIOS){

          window.open(this.contractUrl);

        }

      }



    }

  }
</script>
<style lang="less" scoped>
  @import "contract_detail.less";
</style>
<style>
  .contract_detail .mint-popup{
    height: 100%;
    width: 100%;
  }
</style>
