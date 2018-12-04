<template>
  <div class="contract_list">
    <!-- 订单 -->
    <div class="contract_list_order">
      <div class="tab_box">
        <div v-bind:class="{selected : !limit.signState}" v-on:click="changeData()">全部</div>
        <div v-bind:class="{selected : limit.signState == 2}" v-on:click="changeData(2)">待签</div>
        <div v-bind:class="{selected : limit.signState == 1}" v-on:click="changeData(1)">已签</div>
        <div v-bind:class="{selected : limit.signState == 5}" v-on:click="changeData(5)">失效</div>
        <div v-bind:class="{selected : limit.signState == 6}" v-on:click="changeData(6)">其他</div>
      </div>
      <div class="tab_box_content"></div>

    </div>

    <div class="bill" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">
      <!-- 列表 -->
      <div class="contract_list_list">
        <!-- list -->
        <div class="contract_list_one" v-for="contractList in contractLists" v-bind:data-signId="contractList.signId" v-on:click="jumpTo">
          <div class="contract_is_read" v-if="contractList.isRead == 0">
            <div class="border">New!</div>
            <div class="title">New!</div>
          </div>
          <div class="contract_is_read" v-else-if="contractList.flag != ''">
            <div class="border">{{contractList.flag}}</div>
            <div class="title">{{contractList.flag}}</div>
          </div>
          <div class="contract_information">
            <div class="contract_name">{{contractList.contractName}}</div>
            <div class="contract_state">{{contractList.signState}}</div>
          </div>
          <div class="contract_time">
            <img src="../../../../static/images/jx_time.png">
            <span>{{contractList.createDate}}</span>
          </div>
        </div>
        <div class="loadmore">
          <!-- 暂无账单 -->
          <div class="bill_nodata_img" v-if="contractLists.length == 0">
            <img src="../../../../static/images/nodetail_img.png">
            <div>暂无相关任务</div>
          </div>
          <!-- 加载完毕-->
          <div class="loadmore_tips" v-if="contractLists.length != 0 && moreData == false"><span class="data">没有更多数据啦~</span></div>
        </div>
        <!-- 显示加载中-->
        <div class="loadmore" v-if="contractLists.length != 0 && moreData == true">
          <mt-spinner class="loadmore_icon" type="double-bounce" color="#ababab" :size="16"></mt-spinner>
          <div class="loadmore_tips">正在加载</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'contractList',
    data(){

      return{

        limit: {},

        contractLists: [],

        pageNum: 1,

        moreData: true

      }

    },

    mounted () {

      this.getData();

    },



    methods: {

      getData: function () {

        if(!this.moreData){

          return;

        }

        /**
         * 接口：我的签约列表
         * 请求方式：POST
         * 接口：/user/contract/getcontractlist
         * 入参：signState, pageNum, pageSize
         **/

        this.$http({

          method: 'post',

          url:process.env.API_ROOT+'user/contract/getcontractlist',

          params: this.limit


        }).then(function (res) {

          console.log(res);

          if(res.data.data.list){

            for(var contractList of res.data.data.list){

              contractList.createDate = this.timeChange(contractList.createDate);

              contractList.signState = this.signStateChange(contractList.signState);

            }

            this.contractLists = this.contractLists.concat(res.data.data.list);

            if(res.data.data.list.length < 10){

              this.moreData = false;

            }

          }else{

            this.moreData = false;

          }

        }.bind(this)).catch((res)=>{

          console.log(res);

        })

      },



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

          case '1':

            return '已签';

          case '2':

            return '待签';

          /*case '3':

            return '发送失败';

          case '4':

            return '已撤销';*/

          case '5':

            return '失效';

          case '6':

            return '拒签';

        }

      },



      changeData: function (num) {

        this.pageNum = 1;

        this.limit.pageNum = this.pageNum;

        this.moreData = true;

        this.contractLists = [];

        if(!num){

          (this.limit.signState) && (delete this.limit.signState);

          this.getData();

        }else{

          this.limit.signState = num;

          this.getData();

        }

      },



      jumpTo: function () {

        localStorage.setItem('signId',event.currentTarget.dataset.signid);

        this.$router.push('/contractDetail');

      },



      loadMore: function () {

        if(this.moreData){

          this.pageNum++;

          this.limit.pageNum = this.pageNum;

          this.getData();

        }

      }
    }


  }
</script>
<style lang="less" scoped>
  @import "contract_list.less";
</style>

