<template>
  <div class="transfer_history">
    <div class="transfer_list" v-for="list in transferList" v-bind:recordId="list.recordId">
      <div class="user_img">
        <img src="/static/images/jx_photo.png">
      </div>
      <div class="user_info">
        <div>{{list.userName}}</div>
        <div>{{list.hideMobile}}</div>
      </div>
      <div class="close_btn" v-on:click="deleteThisOne"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'transferHistory',
    data () {
      return {
        transferList: []
      }
    },
    mounted () {
      this.$http({
        method: 'get',
        url: process.env.API_ROOT + 'record/selectallhistoricalpayee'
      }).then((res)=>{
        console.log(res);
        this.transferList = res.data.data.list;
      })
    },
    methods: {
      deleteThisOne: function () {
        var parents = event.path;
        for(var parent of parents){
          if(parent.classList.contains('transfer_list')){
            this.$messagebox({
              title: '提示',
              message: '是否需要删除该联系人',
              showConfirmButton: 'true',
              showCancelButton: 'true',
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              cancelButtonClass:'cancel_btn',
              confirmButtonClass:'confirm_btn_orange',
            }).then((res)=>{
              if(res == 'confirm'){
                var recordId = parent.getAttribute('recordId');
                /*
                * 接口： 删除历史收款人
                * 请求方式：GET
                * 接口： /record/deletehistoricalpayye
                * 入参： recordId
                * */
                this.$http({
                  method: 'get',
                  url: process.env.API_ROOT + 'record/deletehistoricalpayee?recordId='+recordId
                }).then((res)=>{
                  console.log(res);
                  if(res.data.code == '0000'){
                    parent.remove();
                  }
                });
                return;
              }else if(res == 'cancel'){
                return;
              }
            });
            return;
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "transfer_history_user.less";
</style>
