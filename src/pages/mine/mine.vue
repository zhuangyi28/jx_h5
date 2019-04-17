<template>
  <div class="mine">

    <div class="mine_content change_color_background">
    <!-- 个人信息 -->
    <div class="user" v-on:click="$router.push('/personalCenter')">
      <div class="user_box">
        <div class="user_img person_bg_color" v-bind:class="{'grayScale': !isLogin}">
          <img src="../../../static/images/people.png">
        </div>
        <div class="user_information" v-if="isLogin">
          <div class="user_tel">{{mobile | plusXing(3, 4)}}</div>

          <!-- 未认证-->
          <div class="user_auth" v-if="isVerify=='0'">
            <i class="iconfont color_text icon-careful_Authenticati"></i>
            <span class="color_text">未认证</span>
          </div>
          <!-- 已认证-->
          <div class="user_auth" v-else-if="isVerify=='1'">
            <i class="iconfont color_text icon-main_success"></i>
            <span class="color_text">已认证</span>
          </div>
          <!-- 已认证-->
          <div class="user_auth" v-else-if="isVerify=='2'">
            <i class="iconfont color_text icon-careful_Authenticati"></i>
            <span class="color_text">审核中</span>
          </div>
          <!-- 已认证-->
          <div class="user_auth" v-else-if="isVerify=='3'">
            <i class="iconfont color_text icon-careful_Authenticati"></i>
            <span class="color_text">审核未通过</span>
          </div>
        </div>
        <div class="noUser" v-else>
          登录/注册
        </div>
      </div>
      <i class="allow_right"></i>
    </div>
    <!--工资余额 -->
    <div class="balance" v-on:click="$router.push('/balance')">
      <div class="title">
       <span class="cell_text">收入余额</span>
      </div>
      <div class="cell_value" v-if="isLogin"><span>{{totalSalary | thousandBitSeparator}}</span></div>
      <div class="cell_value" v-else><span style="font-size: 16px">******</span></div>
      <i class="allow_right"></i>
    </div>

  </div>

    <!-- 列表1 -->
    <div class="list">
      <!--工资条-->
      <div class="cell" v-on:click="$router.push('/salary')">
        <div class="title">
          <img src="../../../static/images/jx_payroll_1.png"><span class="cell_text">工资条</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>
      <!--银行卡 -->
      <div class="cell" v-on:click="$router.push('/bankCard')">
        <div class="title">
          <img src="../../../static/images/jx_bank_1.png"><span class="cell_text">银行卡</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>


    </div>

    <!-- 列表3 -->
    <div class="list">
      <!--我的账单 -->
      <div class="cell" v-on:click="billFn">
        <div class="title">
          <img src="../../../static/images/jx_bill_1.png"><span class="cell_text">我的订单</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>
      <!--我的发薪企业 -->
      <div class="cell" v-on:click="companyFn">
        <div class="title">
          <img src="../../../static/images/jx_unit_1.png"><span class="cell_text">发薪企业</span>
        </div>
        <div v-show="hasJoinEnt" class="cell_value"><span class="color_text">您有新的企业邀请</span></div>
        <i class="allow_right"></i>
      </div>


    </div>

    <!-- 列表2 -->
    <div class="list">
      <!--我的签约 -->
      <div class="cell" v-on:click="$router.push('/contractList')">
        <div class="title">
          <img src="../../../static/images/jx_content_1.png"><span class="cell_text">我的签约</span>
        </div>
        <div class="cell_value" v-show="hasNewSign"><span class="color_text">您有新的签约</span></div>
        <i class="allow_right"></i>
      </div>
      <!--我的账单 -->
      <div class="cell" v-on:click="$router.push('/myTask')">
        <div class="title">
          <img src="../../../static/images/jx_task_1.png"><span class="cell_text">众包任务</span>
        </div>
        <div v-show="hasNewTask" class="cell_value"><span class="color_text">您有新任务</span></div>
        <i class="allow_right"></i>
      </div>
      <!--银行卡 -->
      <div class="cell" v-on:click="$router.push('/personInformation')">
        <div class="title">
          <img src="../../../static/images/jx_resume_1.png"><span class="cell_text">个人履历</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>


    </div>




    <!-- 列表4 -->
    <div class="list">
      <!--消息 -->
      <div class="cell" v-on:click="$router.push('/feedbackList')">
        <div class="title">
          <img src="../../../static/images/jx_mail_1.png" ><span class="cell_text">消息</span>
        </div>
        <div v-show="hasNewMsg" class="cell_value"><span class="color_text">您有新消息</span></div>
        <i class="allow_right"></i>
      </div>
      <!--帮助与客服 -->
      <div class="cell" v-on:click="$router.push('/helpCenter')">
        <div class="title">
          <img src="../../../static/images/jx_ask_1.png"><span class="cell_text">帮助与客服</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>
      <!--设置 -->
      <div class="cell" v-on:click="$router.push('/setHomepage')">
        <div class="title">
          <img src="../../../static/images/jx_set_1.png"><span class="cell_text">设置</span>
        </div>
        <div class="cell_value"></div>
        <i class="allow_right"></i>
      </div>


    </div>

  </div>
</template>
<script>
  export default {

    name: 'mine',

    data(){

      return {

        mobile: '',//个人中心手机号

        totalSalary: '',//工资余额

        hasJoinEnt: false,//默认不显示有新的邀请 true为不显示 false为显示

        isVerify: '',//是否认证

        hasNewMsg: false,//默认不显示有新消息 true为不显示 false为显示

        hasNewSign:false,//默认不显示有新签约 true为不显示 false为显示

        hasNewTask: false,//默认不显示有新任务 true为不显示  false 为显示

        isLogin: ''



      }

    },

    mounted(){

      localStorage.removeItem('booking');

      localStorage.removeItem('bookingCertification');

      localStorage.removeItem('addBankBack');

      //(this.getStorage('anotherCertification') == 1) && (this.removeStorage('anotherCertification') || this.$router.push('/personalCenter'));

      this.bus.$emit('pageChange','3');

      if(localStorage.getItem('contractDetailBack') == 1){

        localStorage.removeItem('contractDetailBack');

        this.$router.push('/contractList');

      }

      this.isLogin = !!localStorage.getItem('Authorization');

      console.log(this.isLogin);

      document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset = 0

/*
      if(this.getStorage('taskSquare')=='1'){

          window.location.reload();

          this.setStorage('taskSquare','0')

      }
*/


      localStorage.getItem('Authorization') && (this.getData());




    },
    methods: {

      billFn:function () {

          this.setStorage('whichBill','3');

           this.$router.push('/bill')

      },

      companyFn:function () {

        this.$router.push('/company');

        this.setStorage('goFrozen','5')

        console.log(this.getStorage('goFrozen'))
      },



      getData: function () {

        var _this = this;

        /**
         * 接口：用户中心
         * 请求方式：POST
         * 接口：/user/center/usercenter
         * 入参：null
         **/

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/center/usercenter',



        }).then(function (res) {


          console.log(res.data);

          if (res.data.code == '0000') {


            var ishasNewMsg = res.data.data.isHaveNewMsg;

            var ishasNewSign = res.data.data.isNewSign;

            var ishasNewTask = res.data.data.isHaveNewTask;



            //判断是否有新消息

            if (ishasNewMsg == '1') {

              _this.hasNewMsg = true

            }

            else {

              _this.hasNewMsg = false


            }


            //判断是否有新签约

            if (ishasNewSign == '1') {

              _this.hasNewSign = true


            }

            else {

              _this.hasNewSign = false


            }

            //判断是否有新任务

            if (ishasNewTask == '1') {

              _this.hasNewTask = true


            }

            else {

              _this.hasNewTask = false


            }

            /**
             * 接口：有待加入企业
             * 请求方式：GET
             * 接口：/user/workunit/selectisjoinent
             * 入参：null
             **/

            this.$http({

              method: 'get',

              url: process.env.API_ROOT + 'user/workunit/selectisjoinent',


            }).then(function (res) {


              console.log(res.data);

              let hasEntType = res.data.data.type;

              //判断是否有加入企业

              if (hasEntType == '1') {

                _this.hasJoinEnt = true

              }

              else {

                _this.hasJoinEnt = false

              }

              console.log('亮点'+this.$parent.$children[0].hasNew)

              if(this.hasJoinEnt || this.hasNewMsg || this.hasNewSign || this.hasNewTask){

                this.bus.$emit('hasNew',true);

              }else{

                this.bus.$emit('hasNew',false);

              }






            }.bind(this)).catch((res) => {

              //console.log(res.data);


            })


            _this.mobile = res.data.data.mobile;

            _this.isVerify = res.data.data.isVerify;

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
            this.setStorage('idType', res.data.data.idType);

            //国籍
            this.setStorage('nationality', res.data.data.nationality);

            this.setStorage('source', res.data.data.source);



            //如果审核不通过的话 存储一下不通过的原因
            if (this.setStorage('isVerify') == '3') {

              this.setStorage('refuseReason', res.data.data.refuseReason);

            }



          }




        }.bind(this)).catch((res) => {

        })

        /**
         * 接口：获取用户工资金额状况
         * 请求方式：GET
         * 接口：/user/bank/getsalarystatus
         * 入参：null
         **/

        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'user/bank/getsalarystatus',

        }).then((res) => {

          console.log(res.data);

          if (!res.data.data.totalSalary) {


            _this.totalSalary = '--.--'


          }

          else {


            _this.totalSalary = res.data.data.totalSalary


          }


        }).catch((res) => {

          //console.log(res.data);


        });

      }

    }
  }
</script>
<style lang="less" scoped>

  @import 'mine.less';

</style>
