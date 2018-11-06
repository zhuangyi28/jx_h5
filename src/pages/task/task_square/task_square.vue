<template>

  <div class="task_square">

    <div class="find_input" v-on:click="orderShow = false ; selectShow = false">

      <div class="input_place" v-on:click="$router.push('/find')">

        <img src="../../../../static/images/jx_find.png">

        <input type="text" placeholder="搜索公司职位" disabled>

      </div>

    </div>

    <div class="select_btn">

      <div class="select" v-on:click="selectDropDown">

        <span>分类</span>

        <span v-bind:class="selectShow?'up':'down'"></span>

      </div>

      <div class="select" v-on:click="timeDropDown">

        <span>截止时间</span>

        <span v-bind:class="timeShow?'up':'down'" v-if="timeShow != 'none'"></span>

      </div>

      <div class="select" v-on:click="orderDropDown">

        <span>筛选</span>

        <span v-bind:class="orderShow?'up':'down'"></span>

      </div>

    </div>

    <!--下拉框-->
    <div class="popup" v-if="orderShow || selectShow">

      <div class="order_bg" v-on:click="orderShow = false ; selectShow = false"></div>

      <!--筛选下拉框-->
      <div class="order" v-if="orderShow">

        <div class="ability_tags">

          <div class="title">技能标签</div>

          <div class="tags_list">

            <div v-on:click="industry = ''" v-bind:class="{selected: industry == ''}">不限</div>

            <div v-on:click="industry = 1" v-bind:class="{selected: industry == 1}">互联网/IT/电子/通信</div>

            <div v-on:click="industry = 2" v-bind:class="{selected: industry == 2}">广告/传媒/文化/体育</div>

            <div v-on:click="industry = 3" v-bind:class="{selected: industry == 3}">金融</div>

            <div v-on:click="industry = 9" v-bind:class="{selected: industry == 9}">教育培训</div>

            <div v-on:click="industry = 8" v-bind:class="{selected: industry == 8}">交通/物流/贸易/零售</div>

            <div v-on:click="industry = 7" v-bind:class="{selected: industry == 7}">服务业</div>

            <div v-on:click="industry = 4" v-bind:class="{selected: industry == 4}">房地产/建筑</div>

            <div v-on:click="industry = 6" v-bind:class="{selected: industry == 6}">汽车/机械/制造业</div>

            <div v-on:click="industry = 5" v-bind:class="{selected: industry == 5}">消费品</div>

            <div v-on:click="industry = 10" v-bind:class="{selected: industry == 10}">其他</div>

          </div>

        </div>

        <div class="money">

          <div class="title">任务金额（元）</div>

          <div class="money_input">

            <span>区间</span>

            <div class="input">

              <input type="number" placeholder="最低价" v-model="taskMinUnit">

              <span></span>

              <input type="number" placeholder="最高价" v-model="taskMaxUnit">

            </div>

          </div>

          <div class="money_select">

            <div v-on:click="(taskMaxUnit = 999)&& (taskMinUnit = 1)">1-999</div>

            <div v-on:click="(taskMaxUnit = 20000)&& (taskMinUnit = 10000)">10k-20k</div>

            <div v-on:click="(taskMinUnit = 20000)&& (taskMaxUnit = '')">20k以上</div>

          </div>

        </div>

        <div class="clickBtn">

          <div class="cancel" v-on:click="resetAll">重置</div>

          <div class="confirm" v-on:click="confirmClick">确定</div>

        </div>

      </div>

      <!--分类下拉框-->
      <div class="select_content" v-else-if="selectShow">

        <div class="select_list">

          <div v-on:click="changeType" v-bind:class="{'selected': (type == '')}" v-bind:data-type="''">全部</div>

          <div v-on:click="changeType" v-bind:class="{'selected': (type == 1)}" v-bind:data-type="1">技术服务</div>

          <div v-on:click="changeType" v-bind:class="{'selected': (type == 2)}" v-bind:data-type="2">设计服务</div>

          <div v-on:click="changeType" v-bind:class="{'selected': (type == 3)}" v-bind:data-type="3">营销/策划服务</div>

          <div v-on:click="changeType" v-bind:class="{'selected': (type == 4)}" v-bind:data-type="4">咨询服务</div>

          <div v-on:click="changeType" v-bind:class="{'selected': (type == 5)}" v-bind:data-type="5">电商服务</div>

          <div v-on:click="changeType" v-bind:class="{'selected': (type == 6)}" v-bind:data-type="6">其他</div>

        </div>

      </div>

    </div>

    <!--任务列表-->
    <div class="task_list">

      <div class="list_one" v-for="taskList in taskLists" v-bind:data-taskId="taskList.taskId" v-on:click="jumpTo">

        <div class="task_information">

          <div class="task_title">

            <img src="../../../../static/images/jx_bag.png">

            <span>{{taskList.taskName}}</span>

          </div>

          <div class="task_pay">

            <span>{{taskList.taskMinUnit}}</span><span v-if="taskList.taskMaxUnit != taskList.taskMinUnit">-{{taskList.taskMaxUnit}}</span>

          </div>

        </div>

        <div class="task_need">

          <div class="need_person">

            <span>报名人数：<span>{{taskList.signUpTotal}}个人已报名</span></span>

          </div>

          <div class="need_time">

            <span>截止时间：{{taskList.abortDate}}</span>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

  export default {

    name: 'taskSquare',



    data () {

      return {

        orderShow: false,//筛选下拉框显示

        selectShow: false,//分类下拉框显示

        timeShow: 'none',//时间排序显示

        industry: '',//所属行业

        type: '',//分类

        sort: '',//截止时间排序

        taskMinUnit: '',//任务单价最小值

        taskMaxUnit: '',//任务单价最大值

        taskLists: [],//任务列表

        selectLists: {}//筛选排序列表

      }

    },



    mounted () {

      this.getData();

    },



    methods: {

      //分类下拉框弹出
      selectDropDown: function () {

        this.orderShow = false;

        this.selectShow = !this.selectShow;

      },



      //筛选下拉框弹出
      orderDropDown: function () {

        this.selectShow = false;

        this.orderShow = !this.orderShow;

      },



      //时间排序图标控制
      timeDropDown: function () {

        this.orderShow = false;

        this.selectShow = false;

        (this.timeShow == 'none') ? (this.timeShow = true) : (this.timeShow = !this.timeShow);

        this.timeShow ? (this.sort = 1) : (this.sort = 2);

        this.selectLists.sort = this.sort;

        this.getData();

      },



      //转换时间格式
      timeChange: function (arr) {

        for(var taskList of arr){

          if(taskList.abortDate == 0){

            taskList.abortDate = '不限时间';

          }

          var datetime = new Date(taskList.abortDate);

          var year = datetime.getFullYear();

          var month = datetime.getMonth() + 1;

          var day = datetime.getDate();

          if(month<10){

            month = '0' + month;

          }

          if(day<10){

            day = '0' + day;

          }

          taskList.abortDate = year + '-' + month + '-' + day;

        }

      },



      //获取任务列表明细
      getData: function () {

        var _this = this;

        /**
         * 接口：任务广场列表
         * 请求方式：POST
         * 接口：/task/home/gettasklist
         * 入参：null
         **/

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'task/home/gettasklist',

          header: {

            'content-type': 'application/x-www-form-urlencoded'

          },

          params: this.selectLists

        }).then((res)=>{

          console.log(res);

          _this.taskLists = res.data.data.list;

          if(_this.taskLists){

            _this.timeChange(_this.taskLists);

          }

        })

      },



      //筛选排序
      changeType: function () {

        this.type = event.currentTarget.dataset.type;

        if(this.type == this.selectLists.type){

          return;

        }
        else if(this.type == '' && !this.selectLists.type){

          return;

        }

        if(this.type == ''){

          delete this.selectLists.type;

        }else{

          this.selectLists.type = this.type;

        }

        this.getData();

        this.orderShow = false;

        this.selectShow = false;

      },



      //重置按钮
      resetAll: function () {

        this.taskMaxUnit = '';

        this.taskMinUnit = '';

        this.industry = '';

      },



      //筛选提交按钮
      confirmClick: function () {

        this.taskMaxUnit ? (this.selectLists.taskMaxUnit = this.taskMaxUnit) : (this.selectLists.taskMaxUnit && (delete this.selectLists.taskMaxUnit));

        this.taskMinUnit ? (this.selectLists.taskMinUnit = this.taskMinUnit) : (this.selectLists.taskMinUnit && (delete this.selectLists.taskMinUnit));

        this.industry ? (this.selectLists.industry = this.industry) : (this.selectLists.industry && (delete this.selectLists.industry));

        this.getData();

        this.orderShow = false;

        this.selectShow = false;

      },



      //点击进入任务详情
      jumpTo: function () {

        var taskId = event.currentTarget.dataset.taskid;

        localStorage.setItem('taskId', taskId);

        this.$router.push('/lookTask');

      }



    }

  }

</script>

<style lang="less" scoped>

  @import "task_square.less";

</style>

