<template>
<div class="feedbackList" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">

  <div class="list_box" v-for="item in feedBackList" v-bind:data-detail="item.salaryDetailId"  v-bind:data-id="item.salaryId" v-bind:data-click="item.isClick" v-on:click="feedBackUrlFn">

    <div class="icon_orange" v-if="item.isUserHaveNew=='1'"><img src="../../../../static/images/feedback_unlook.png"/></div>
    <div class="icon_blue" v-else>
      <img src="../../../../static/images/company_look.png" v-if="item.salaryType=='9'"/>
      <img src="../../../../static/images/feedback_look.png" v-else/>
    </div>
    <div class="content">
      <div>
         <p v-if="item.salaryType=='9'">企业消息</p>
         <p v-else>反馈处理结果</p>
         <span v-if="item.isUserHaveNew=='1'">new</span>
      </div>
      <div>{{item.contentTitle}}</div>
      <div v-if="item.salaryType=='9'"><p>{{item.taskName}}</p><p>{{item.createDate|fmtDateStr}}</p></div>
      <div v-if="item.salaryType=='8'"><p>{{item.salaryMonth}}个体综合所得</p><p>{{item.sendDate|fmtDateStr}}</p></div>
      <div v-else-if="item.salaryType=='3'"><p>{{item.salaryMonth}}工资</p><p>{{item.sendDate|fmtDateStr}}</p></div>
    </div>

  </div>


  <div class="loadmore" v-show="!noData">
    <div class="list_box_nomessage_img" v-if="feedBackList.length == 0">
      <img src="../../../../static/images/nomessage_img.png">
      <div>暂无相关消息反馈</div>
    </div>
    <div class="loadmore_tips" v-else><span class="data">{{moreText}}</span></div>
  </div>
  <div class="loadmore" v-show="noData">
    <mt-spinner class="loadmore_icon" type="double-bounce" color="#ababab" :size="16"></mt-spinner>
    <div class="loadmore_tips">正在加载</div>
  </div>

</div>


</template>
<script>
  export default {

    name:'feedbackList',

    data(){
      return {

        feedBackList:[],//反馈消息列表

        pageNum: 1,//初始值为2

        pageSize: 10,//一页的数量

        moreText:'没有更多数据啦~',//无数据显示暂无数据

        noData: true,//是否显示暂无数据 true为隐藏 false为显示

        moreLoading: false,//上拉加载

      }

    },

    mounted:function (){

      this.init()
    },

    methods: {

      init:function () {


        this.feedBackList=[],//反馈消息列表

          this.pageNum= 1,//初始值为2

          this.pageSize= 10,//一页的数量

          this.moreText='没有更多数据啦~',//无数据显示暂无数据

          this.noData= true,//是否显示暂无数据 true为正在加载 false为暂无数据

          this.loadList()


      },

      loadList:function () {


        if(this.noData) {//如果数据没有见底

          /**
           * 接口：获取工资条反馈
           * 请求方式：POST
           * 接口：/salary/home/feedbacklist
           * 入参：pageNum,pageSize
           **/

          this.$http({


            method: 'post',

            url: process.env.API_ROOT + 'salary/home/feedbacklist',

            params: {

              pageNum: this.pageNum,

              pageSize: this.pageSize
            }


          }).then((res) => {

            console.log(res.data)

            var _feedBackList = res.data.data.list;

            //console.log(_feedBackList)


            if (!res.data.data.list || res.data.data.list.length == 0) {//这一组为空


              //如果第一页就没有数据显示暂无数据

              if (this.pageNum == '1') {

                this.noData = false;

                this.moreText = '暂无数据';

              }

              else {


                this.noData = false


              }

            }

            else if (res.data.data.list.length < 10) {


              if (this.pageNum == '1') {


                  this.noData= false;

                  this.feedBackList= _feedBackList;



              }

              else {

                  this.noData= false;

                  this.feedBackList= this.feedBackList.concat(_feedBackList);



              }


            }

            else {

              console.log('刷新')


              //增加数组内容

                  this.pageNum= this.pageNum + 1;//加一页

                  this.feedBackList=this.feedBackList.concat(_feedBackList);


          }




        }).catch((res)=>{})


          }


      },
      //上拉加载
      loadMore:function () {

        this.loadList()

      },
      feedBackUrlFn:function (e) {


          if(e.currentTarget.dataset.click=='0'){

            this.setStorage('salaryDetailId',e.currentTarget.dataset.detail);

            this.setStorage('salaryId',e.currentTarget.dataset.id);

            this.$router.push('/feedback')


          }


      },


    }



  }

</script>
<style lang="less">

  @import "list.less";
</style>
