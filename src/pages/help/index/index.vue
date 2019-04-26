<template>

  <div class="help">
    <div class="help_box">
      <div class="title">提现相关</div>
      <div class="help_details">
        <div class="color_text"><i class="iconfont icon-help_withdrawal"></i></div>
        <div>
          <p v-for="item in helpDetail1" v-bind:data-no="item.no" v-on:click="detail1Fn">{{item.title}}</p>
        </div>

      </div>

    </div>
    <div class="help_box">
      <div class="title">支付相关</div>
      <div class="help_details">
        <div class="color_text"><i class="iconfont icon-help_pay"></i></div>
        <div>
          <p v-for="item in helpDetail2" v-bind:data-no="item.no" v-on:click="detail2Fn">{{item.title}}</p>
        </div>

      </div>

    </div>
    <div class="help_box">
      <div class="title">加入企业</div>
      <div class="help_details">
        <div class="color_text"><i class="iconfont icon-help_enterprise"></i></div>
        <div>
          <p v-for="item in helpDetail3" v-bind:data-no="item.no" v-on:click="detail3Fn">{{item.title}}</p>
        </div>

      </div>

    </div>

    <div class="service_area">

      <div class="area_box"></div>
      <div class="footer">
        <span v-on:click="customer"><i class="iconfont icon-withdraw_custom color_text"></i>联系客服</span>
        <a v-bind:href="phoneNumber"><i class="iconfont icon-phone_consult color_text"></i>拨打电话</a>
      </div>


    </div>


  </div>

</template>
<script>

  import { customerInit, customerClick } from "../../../../static/js/basic"

  export default {

    name: 'helpPayDate',

    data(){

      return{

        helpDetail1:[
          {
              'title':'提现到账时间？',
               'no':'1',
          },
          {
              'title':'提现提交后，可以撤回吗？',
              'no':'2',
          },
          {
              'title':'提现失败如何处理？',
               'no':'3',

          },
          {
              'title':'提现限额？',
              'no':'4',
          },
          {
              'title': '什么是预约提现？',
              'no': '11',
          },
          {
              'title': '预约提现规则？',
              'no': '12',
          },
          {
              'title': '如何设置预约提现？',
              'no': '13'
          },
          {
              'title': '预约提现失败怎么办？',
              'no': '14'
          }

        ],
        helpDetail2:[
          {
            'title':'如何设置支付密码？',
            'no':'5',
          },
          {
            'title':'忘记修改支付密码怎么办？',
            'no':'6',
          },
          {
            'title':'如何关闭支付验证？',
            'no':'7',

          },

        ],
        helpDetail3:[
          {
            'title':'如何同意企业邀请？',
            'no':'8',
          },
          {
            'title':'不加入企业会有何影响？',
            'no':'9',
          },
          {
            'title':'加入企业时，身份验证通不过怎么办？',
            'no':'10',

          },

        ],

        phoneNumber: 'tel:4008216990'

      }

    },

    mounted:function () {

      //美恰初始化
      customerInit({
        name:this.getStorage('userName'),// 名字
        tel:this.getStorage('mobile'),// 电话
      });

      var anotherCompany = this.getCookie('anotherCompany') || 'orange';

      if(anotherCompany){

        switch (anotherCompany) {

          case 'orange':

            this.phoneNumber = 'tel:4008216990';

            break;

          case 'blue':

            this.phoneNumber = 'tel:0731-85132713';

            break

          case 'lexiang':

            this.phoneNumber = 'tel:4001568886';

            break


          case 'rongyada':

            this.phoneNumber = 'tel:010-84176835';

            break

          case 'yibangsheng':

            this.phoneNumber = 'tel:022-65183210';

            break

          case 'xinqidian':

            this.phoneNumber = 'tel:010-59081288';

            break

          case 'zuirenli':

            this.phoneNumber = 'tel:025-66062636';

            break;

          case 'jianzhile':

            this.phoneNumber = 'tel:0311-68068000';

            break
        }

      }

    },
    methods: {

      detail1Fn:function (e) {

          this.setStorage('helpPage',e.currentTarget.dataset.no);

          this.$router.push('/helpDetail')


      },

      detail2Fn:function (e) {

        this.setStorage('helpPage',e.currentTarget.dataset.no);

        this.$router.push('/helpDetail')


      },

      detail3Fn:function (e) {

        this.setStorage('helpPage',e.currentTarget.dataset.no)

        this.$router.push('/helpDetail')


      },

      customer:function () {


        customerClick()


      }

    },

  }
</script>
<style lang="less" scoped>

  @import 'index.less';

</style>
