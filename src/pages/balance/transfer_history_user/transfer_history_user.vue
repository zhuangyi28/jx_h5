<template>
  <div class="transfer_history" v-infinite-scroll="addList" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">
    <div class="transfer_history_user_list">
      <div class="transfer_list" v-for="list in transferList" v-bind:recordId="list.recordId" v-on:click="jumpTo">
        <div class="transfer_history_user">
          <div class="user_img">
            <img src="../../../../static/images/jx_transfer_user.png">
          </div>
          <div class="user_info">
            <div>{{list.userName}}</div>
            <div>{{list.hideMobile}}</div>
          </div>
        </div>
        <div class="close_btn" v-on:click="deleteThisOne"><div></div></div>
      </div>
    </div>
    <div class="loadmore" v-show="!noData">
      <div class="loadmore_tips"><span class="data">{{moreText}}</span></div>
    </div>
    <div class="loadmore" v-show="noData">
      <mt-spinner class="loadmore_icon" type="double-bounce" color="#ababab" :size="16"></mt-spinner>
      <div class="loadmore_tips">正在加载</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'transferHistory',
    data () {
      return {
        transferList: [],
        noData: true,
        moreText: '加载中',
        pageNum: 1,
        moreLoading: false
      }
    },
    mounted () {
      this.addList();
    },
    methods: {
      deleteThisOne: function () {
        var parents = event.path;
        for(var parent of parents){
          if(parent.classList.contains('transfer_list')){
            this.$messagebox({
              title: '提示',
              message: '是否需要删除该联系人',
              showConfirmButton: true,
              showCancelButton: true,
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
      },
      //点击历史收款人，直接向历史收款人转账
      jumpTo: function () {
        var recordId = event.target.getAttribute('recordId');
        for(var obj of this.transferList){
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
      addList: function () {
        this.moreLoading = true;
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'record/selectallhistoricalpayee',
          params:{
            pageNum: this.pageNum
          }
        }).then((res)=>{
          console.log(res);
          if(res.data.code == '0000'){
            if(res.data.data.totalCount == 0){
              this.moreText = '暂无数据';
              this.noData = false;
            }
            else if(res.data.data.list.length < 10){
              this.moreText = '没有更多数据啦';
              this.noData = false;
              this.transferList = this.transferList.concat(res.data.data.list);
            }
            else{
              this.transferList = this.transferList.concat(res.data.data.list);
              this.pageNum++;
              this.moreLoading = false;
            }
          }
        })
      }
    },
    destroyed (){
      this.$messagebox.close();
    }
  }
</script>
<style lang="less" scoped>
  @import "transfer_history_user.less";
</style>
