<template>
  <div class="my_task">
    <!-- 订单 -->
    <div class="my_task_order">
      <div class="tab_box">
          <div v-for="item in tabList" @click="selectSort(item)"  v-bind:data-num="item.state" v-bind:class="{'selected':item.show===true}">{{item.sort}}</div>
        </div>

    </div>
    <!-- 列表 -->
    <div class="my_task_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">
      <!-- list -->
      <div class="my_task_one" v-for="item in taskList" v-bind:data-num="item.taskId">
        <div class="my_task_information">
          <div class="task_title">
            <img src="../../../../static/images/jx_bag.png">
            <span>{{item.taskName}}</span>
          </div>
          <div class="task_status">
            <span v-if="item.taskState=='1'">已报名</span>
            <span v-else-if="item.taskState=='2'">工作中</span>
            <span v-else-if="item.taskState=='3'">待验收</span>
            <span v-else-if="item.taskState=='4'">待收款</span>
            <span v-else-if="item.taskState=='5'">已收款</span>
            <span v-else-if="item.taskState=='6'">已取消</span>
            <span v-else-if="item.taskState=='7'">未被录用</span>
            <span v-else-if="item.taskState=='8'">已关闭</span>
            <span class="next_btn"></span>
          </div>
        </div>
        <div class="task_money_time">
          <div class="task_money">
            <span v-if="item.taskMaxUnit==item.taskMinUnit">￥{{item.taskMaxUnit}}</span>
            <span v-else>￥{{item.taskMinUnit}}-￥{{item.taskMaxUnit}}</span>
          </div>
        </div>
      </div>
      <div class="loadmore" v-show="!noData">
        <div class="bill_nodata_img" v-if="taskList.length == 0">
          <img src="../../../../static/images/nodetail_img.png">
          <div>暂无相关账单</div>
        </div>
        <div class="loadmore_tips" v-else><span class="data">{{moreText}}</span></div>
      </div>
      <div class="loadmore" v-show="noData">
        <mt-spinner class="loadmore_icon" type="double-bounce" color="#ababab" :size="16"></mt-spinner>
        <div class="loadmore_tips">正在加载</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'myTask',
    data(){

        return{

          tabList: [
            {
              sort: '全部',
              show: true,
              state:''
            },
            {
                sort: '未被录用',
                show: false,
                state:'7'
            },
            {
                sort: '已取消',
                show: false,
                state:'6'
            },
            {
                sort: '已报名',
                show: false,
               state:'1'
            },
            {
              sort:'工作中',
              show:false,
              state:'2'
            },
            {
              sort:'待验收',
              show:false,
              state:'3'
            },
            {
              sort:'待收款',
              show:false,
              state:'4'
            },
            {
              sort:'已收款',
              show:false,
              state:'5'
            },
            {
              sort:'已关闭',
              show:false,
              state:'8'
            },
          ],//tab列表

          taskList:[],//任务列表

          taskState:'',//任务状态

          pageNum: 1,//初始值为2

          pageSize: 10,//一页的数量

          moreText: '没有更多数据啦~',//无数据显示暂无数据

          noData: true,//是否显示暂无数据 false为隐藏 true为显示

          moreLoading: false,//上拉加载

        }


    },
    mounted(){

      this.loadList()

    },
    methods:{

      selectSort:function(item) {

          //点击高亮
        for (var i =0 ;i<this.tabList.length;i++) {

          this.tabList[i].show=false;

        }
        item.show=true;

        //全部不需要传
        if(!item.state){

            this.loadList()
        }
        else {

          //传入对应的状态
          this.loadList(item.state)
        }




      },

      loadList:function (num) {

        var thisData = {};

        if (num) {

          thisData = {

            taskState: num,

            pageNum: this.pageNum,

            pageSize: this.pageSize

          }


        }

        else {


          thisData = {

            pageNum: this.pageNum,

            pageSize: this.pageSize
          }

        }

          //console.log('有数据')

          /**
           * 接口：我的众包任务
           * 请求方式：POST
           * 接口：user/task/getapplytask
           * 入参：taskState(null-全部 1-已报名 2-工作中 3-待验收 4-待收款 5-已收款 6-已取消 7-未被录用 8-已关闭)
           **/

          this.$http({

            method: 'post',

            url: process.env.API_ROOT + 'user/task/getapplytask',

            params: thisData,

          }).then((res) => {

            console.log(res.data)

            var _taskList = res.data.data.list

            //如果没有数据
            if (!this.noData) {


            }

            else if (!res.data.data.list || res.data.data.list.length == 0) {//这一组为空

              if(this.pageNum == '1'){

                  this.moreText='暂无数据',//无数据显示暂无数据

                  this.noData= false

              }

              else {


                 this.noData= false,

                  this.moreText='没有更多数据啦~'//无数据显示暂无数据

              }



            }


            else if (res.data.data.list.length < 10) {//这一组小于十个

              //增加数组内容

              this.noData= false

              this.taskList= this.taskList.concat(_taskList)



            }
            else {

              //增加数组内容

                this.taskList= this.taskList.concat(_taskList)

                this.pageNum = this.pageNum + 1//加一页

            }


          }).catch((res) => {})





      },

      loadMore:function () {

        this.loadList()


      },





    }
  }
</script>
<style lang="less" scoped>
  @import "my_task.less";
</style>
