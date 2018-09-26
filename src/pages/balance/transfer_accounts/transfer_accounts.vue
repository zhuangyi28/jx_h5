<template>
  <div class="transfer_history">
    <div class="transfer_another" v-on:click="$router.push('/transfer')">
      <img src="../../../../static/images/jx_transfer_users.png">
      <span>转账给其他账户</span>
    </div>
    <div class="transfer_history_title">
      <span>转给最近收款人</span>
      <div><i class="iconfont icon-all_people"></i>
        <span v-on:click="$router.push('/transferHistoryUser')">全部收款人</span>
      </div>
    </div>
    <div class="transfer_history_recent">
      <div class="transfer_history_one" v-for="user in transferUser" v-bind:recordId="user.recordId" v-on:click="jumpTo">
        <div class="transfer_history_user" v-on:click="jumpToPage">
          <img src="../../../../static/images/jx_transfer_user.png">
          <div class="transfer_history_user_name">
            <span>{{user.userName}}</span>
            <span>{{user.hideMobile}}</span>
          </div>
        </div>
        <div class="close_btn" v-on:click="deleteThis">
          <div></div>
        </div>
      </div>
    </div>
    <service v-bind:type1="serviceLeft" v-bind:type2="serviceRight" v-bind:spanShow="true" v-bind:iconName1="iconName1" v-bind:iconName2="iconName2" v-on:clickEventLeft="customerFn" v-on:clickEventRight="jumpToBill"></service>
  </div>
</template>
<script>
  import service from '../../../components/service/service'
  import { customerInit, customerClick } from "../../../../static/js/basic"
  export default {
    name: 'transferHistory',
    components: {
      service: service
    },
    data () {
      return {
        transferUser: [],//历史收款人
        recordId: '',//收款人Id
        serviceLeft: '联系客服',
        serviceRight: '转账记录',
        iconName1:'icon-withdraw_custom',
        iconName2:'icon-transfer_money',
      }
    },
    methods: {
      deleteThis: function () {
        var nodes = event.path;
        this.$messagebox({
          title: '提示',
          message: '确认删除？',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then((res)=>{
          if(res == 'cancel'){
            return;
          }else if(res == 'confirm'){
            for (var obj of nodes) {
              if (obj.classList.contains('transfer_history_one')) {
                this.recordId = obj.getAttribute('recordId');
                /*
                * 接口： 删除历史收款人
                * 请求方式：GET
                * 接口： /record/deletehistoricalpayye
                * 入参： recordId
                * */
                this.$http({
                  method: 'get',
                  url: process.env.API_ROOT + 'record/deletehistoricalpayee?recordId='+this.recordId
                }).then((res)=>{
                  obj.remove();
                });
                break;
              }
            }
          }
        });
      },
      //点击历史收款人，直接向历史收款人转账
      jumpTo: function () {
        var recordId = event.target.getAttribute('recordid');
        for(var obj of this.transferUser){
          if(obj.recordId == recordId){
            this.setStorage('transferMobile',obj.mobile);
            this.setStorage('transferName',obj.userName);
            /**
             * 接口：检测用户发起转账操作
             * 请求方式：post
             * 接口：/user/work/checktransfer
             * 入参：mobile
             **/
            this.$http({
              method: 'post',
              url: process.env.API_ROOT + 'user/work/checktransfer',
              header: {
                'content-type': 'application/x-www-form-urlencoded'// post请求
              },
              params: {
                mobile: obj.mobile
              }
            }).then((res)=>{
              if(res.data.code == '0000'){
                this.$router.push('/accountCash');
                return;
              }
              else{
                console.log(res);
              }
            });
            return;
          }
        }
      },
      jumpToPage: function () {
        var recordId = event.currentTarget.parentElement.getAttribute('recordid');
        for(var obj of this.transferUser){
          if(obj.recordId == recordId){
            this.setStorage('transferMobile',obj.mobile);
            this.setStorage('transferName',obj.userName);
            /**
             * 接口：检测用户发起转账操作
             * 请求方式：post
             * 接口：/user/work/checktransfer
             * 入参：mobile
             **/
            this.$http({
              method: 'post',
              url: process.env.API_ROOT + 'user/work/checktransfer',
              header: {
                'content-type': 'application/x-www-form-urlencoded'// post请求
              },
              params: {
                mobile: obj.mobile
              }
            }).then((res)=>{
              if(res.data.code == '0000'){
                this.$router.push('/accountCash');
                return;
              }
              else{
                console.log(res);
              }
            });
            return;
          }
        }
      },
      jumpToBill: function () {
        this.setStorage('whichBill','2');
        this.$router.push('/bill');
      },
      customerFn:function () {
        customerClick()
      },

    },

    mounted () {
        //美恰初始化
        customerInit({
          name:this.getStorage('userName'),// 名字
          tel:this.getStorage('mobile'),// 电话
        });
      /*
      * 接口： 查询历史收款人
      * 请求方式： POST
      * 接口： /record/selecthistoricalpayye
      * 入参： null
      * */
      this.$http({
        method: 'post',
        url: process.env.API_ROOT+ 'record/selecthistoricalpayee',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        }
      }).then((res)=>{
        console.log(res);
        if(res.data.code == '0000'){
          //没有历史收款人直接跳转到输入账号页面
          if(res.data.data.length == 0){
            this.$router.replace('/transfer');
            return;
          }else{
            this.transferUser = res.data.data;
          }
        }
      }).catch((res)=>{
        console.log(res);
      })
    },
    destroyed (){
      this.$messagebox.close();
    }
  }
</script>
<style lang="less" scoped>
  @import "transfer_accounts.less";
</style>
