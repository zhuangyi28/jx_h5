<template>
  <div class="transfer_history">
    <div class="transfer_another" v-on:click="$router.push('/transfer')">
      <img src="/static/images/jx_accounts.png">
      <span>转给其他账户</span>
    </div>
    <div class="transfer_history_title">
      <span>转给最近收款人</span>
      <div>
        <img src="/static/images/jx_payee.png">
        <span v-on:click="$router.push('/transferHistoryUser')">全部收款人</span>
      </div>
    </div>
    <div class="transfer_history_recent">
      <div class="transfer_history_one" v-for="user in transferUser" v-bind:recordId="user.recordId" v-on:click="jumpTo">
        <div class="transfer_history_user"><img src="/static/images/jx_photo.png">
          <div class="transfer_history_user_name">
            <span>{{user.userName}}</span>
            <span>{{user.hideMobile}}</span>
          </div>
        </div>
        <div class="close_btn" v-on:click="deleteThis"><img src="/static/images/jx_delete_grey.png"></div>
      </div>
    </div>
    <service v-bind:type1="serviceLeft"></service>
    <div class="transfer_account_help">
      <span>联系客服</span>
      <span>转账记录</span>
    </div>
  </div>
</template>
<script>
  import service from '../../../components/service/service'
  export default {
    name: 'transferHistory',
    components: {
      service: service
    },
    data () {
      return {
        transferUser: [],//历史收款人
        recordId: ''//收款人Id
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
            this.$router.push('/accountCash');
            return;
          }
        }
      }
    },
    mounted () {
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
            this.$router.push('/transfer');
            return;
          }else{
            this.transferUser = res.data.data;
          }
        }
      }).catch((res)=>{
        console.log(res);
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "transfer_accounts.less";
</style>
