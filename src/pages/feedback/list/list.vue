<template>
<div class="feedbackList" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">

  <mt-loadmore :top-method="loadTop" ref="loadmore">
    <div class="list_box" v-for="item in feedBackList" v-bind:data-detail="item.salaryDetailId"  v-bind:data-id="item.salaryId" v-bind:data-name="item.taskName" v-bind:data-click="item.isClick" v-bind:data-type="item.salaryType" v-on:click="feedBackUrlFn">

      <div class="icon_orange" v-if="item.isUserHaveNew=='1'"><img src="../../../../static/images/feedback_unlook.png"/></div>
      <div class="icon_blue" v-else>
        <img src="../../../../static/images/company_look.png" v-if="item.salaryType=='X'"/>
        <img src="../../../../static/images/feedback_look.png" v-else/>
      </div>
      <div class="content">
        <div>
          <p v-if="item.salaryType=='X'">众包任务通知</p>
          <p v-else-if="item.salaryType=='Y'">签约提醒</p>
          <p v-else>反馈处理结果</p>
          <span v-if="item.isUserHaveNew=='1'">new</span>
        </div>
        <div>
          {{item.contentTitle}}
          <span class="click_class color_text"
                v-bind:data-sign="item.salaryDetailId"
                v-bind:data-process="item.isProcess"
                v-on:click="contractDetailFn(item.salaryDetailId,item.isProcess)"
                v-if="item.contentTitle=='您收到一份新合同,'">点击查看</span>
          <span class="click_class color_text"
                v-bind:data-sign="item.salaryDetailId"
                v-bind:data-process="item.isProcess"
                v-on:click="contractDetailFn(item.salaryDetailId,item.isProcess)"
                v-else-if="item.contentTitle.indexOf('去签署')>-1">合同</span>
        </div>
        <div v-if="item.salaryType=='X'">
          <p class="color_text">{{item.taskName}}</p>
          <p>{{item.createDate|fmtDateStr}}</p>
        </div>
        <div v-else-if="item.salaryType=='Y'">
          <p class="color_text">{{item.contractName}}</p>
          <p>{{item.createDate|fmtDateStr}}</p>
        </div>
        <div v-else-if="item.salaryType=='7'||item.salaryType=='8'">
          <p class="color_text">{{item.salaryMonth}}个体经营所得</p>
          <p>{{item.sendDate|fmtDateStr}}</p>
        </div>
        <div v-else>
          <p class="color_text">{{item.salaryMonth}}工资</p>
          <p>{{item.sendDate|fmtDateStr}}</p>
        </div>
      </div>

    </div>
  </mt-loadmore>


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

        loading: false

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

          this.loading = true;



        }).catch((res)=>{})


          }


      },
      //上拉加载
      loadMore:function () {

        if(this.loading){

          this.loading = false;

          this.loadList();

        }

      },

      feedBackUrlFn:function (e) {

          if(e.currentTarget.dataset.click=='0'){


              if(e.currentTarget.dataset.type=='X'){

            /*      console.log(e.currentTarget.dataset.detail)

                console.log(e.currentTarget.dataset.name)*/

                this.setStorage('salaryDetailId',e.currentTarget.dataset.detail);

                this.setStorage('taskName',e.currentTarget.dataset.name)

                this.$router.push('/taskNews')

              }
              else{

                this.setStorage('salaryDetailId',e.currentTarget.dataset.detail);

                this.setStorage('salaryId',e.currentTarget.dataset.id);

                this.$router.push('/feedback')


              }



          }





      },
      //下拉刷新
      loadTop: function () {

        console.log('下拉刷新');
        //重新调用data方法
        Object.assign(this.$data, this.$options.data());
        //重新加载
        this.init();
        //固定方法，查询完要调用一次，用于重新定位
        this.$refs.loadmore.onTopLoaded();

      },

      //点击跳转
      contractDetailFn:function (signId,process) {

          if(process=='4'){

            this.$toast({
              message: '管理员已撤销该合同',
              position: 'middle',
              duration: 1500
            });
          }

          else {

            this.setStorage('signId',signId);

            this.$router.push({path: '/contractDetail', query: {signId: signId}});

          }





      }


    }



  }

</script>
<style lang="less">

  @import "list.less";
</style>
