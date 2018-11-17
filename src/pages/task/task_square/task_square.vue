<template>

  <div class="task_square" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">

    <div class="find_input" v-on:click="orderShow = false ; selectShow = false">

      <div class="input_place" v-on:click="$router.push('/find')">

        <img src="../../../../static/images/jx_find.png">

        <form action="">

        <input type="text" placeholder="搜索任务名称、任务编号"  v-bind:value="findWordShow">

        </form>

      </div>

    </div>

    <div class="select_btn">

      <div class="select" v-on:click="selectDropDown" v-bind:class="{orangeText: (type != '' || selectShow)}">

        <span>分类</span>

        <span v-bind:class="selectShow?'up':'down'"></span>

      </div>

      <div class="select" v-on:click="timeDropDown" v-bind:class="{orangeText: (timeShow != 'none')}">

        <span>发布时间</span>

        <span v-bind:class="timeShow?'down':'up'"></span>

      </div>

      <div class="select" v-on:click="orderDropDown" v-bind:class="{orangeText: (industry != '' || taskMinUnit != '' || taskMaxUnit != '' || orderShow)}">

        <span>筛选</span>

        <span v-bind:class="orderShow?'up':'down'"></span>

      </div>

    </div>

    <!--下拉框-->
    <div class="popup">

      <transition name="fade">

        <div class="order_bg" v-if="orderShow || selectShow" v-on:click="orderShow = false ; selectShow = false"></div>

      </transition>

      <transition name="toggleTask">

        <!--筛选下拉框-->
        <div class="order" v-if="orderShow">

          <div class="ability_tags">

            <div class="title">行业选择</div>

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

                <input type="text" placeholder="最低价" v-model="taskMinUnit">

                <span></span>

                <input type="text" placeholder="最高价" v-model="taskMaxUnit">

              </div>

            </div>

            <div class="money_select">

              <div v-on:click="(taskMaxUnit = '999')&& (taskMinUnit = '1')">1-999</div>

              <div v-on:click="(taskMaxUnit = '20000')&& (taskMinUnit = '10000')">10k-20k</div>

              <div v-on:click="(taskMinUnit = '20000')&& (taskMaxUnit = '')">20k以上</div>

            </div>

          </div>

          <div class="clickBtn">

            <div class="cancel" v-on:click="resetAll">重置</div>

            <div class="confirm" v-on:click="confirmClick">确定</div>

          </div>

        </div>

      </transition>

      <transition name="toggleTask">


        <!--分类下拉框-->
        <div class="select_content" v-if="selectShow">

          <div class="select_list">

            <div v-on:click="changeType" v-bind:class="{'selected': (type == '')}" v-bind:data-type="''">全部</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 1)}" v-bind:data-type="1">软件开发</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 2)}" v-bind:data-type="2">APP开发</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 3)}" v-bind:data-type="3">小程序开发</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 4)}" v-bind:data-type="4">UI设计</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 5)}" v-bind:data-type="5">技术咨询</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 6)}" v-bind:data-type="6">营销咨询</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 7)}" v-bind:data-type="7">促销推广</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 8)}" v-bind:data-type="8">代驾服务</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 9)}" v-bind:data-type="9">影视剧务</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 10)}" v-bind:data-type="10">临时演员</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 11)}" v-bind:data-type="11">快递运输</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 12)}" v-bind:data-type="12">保洁服务</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 13)}" v-bind:data-type="13">维修服务</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 14)}" v-bind:data-type="14">场馆活动服务</div>

            <div v-on:click="changeType" v-bind:class="{'selected': (type == 15)}" v-bind:data-type="15">其他</div>

          </div>

        </div>

      </transition>

    </div>


    <!--任务列表-->
    <div class="task_list" v-if="taskLists.length != 0">

      <div class="list_one" v-for="taskList in taskLists" v-bind:data-taskId="taskList.taskId" v-on:click="jumpTo">

        <div class="task_information">

          <div class="task_title">

            <img src="../../../../static/images/jx_bag.png">

            <span>{{taskList.taskName}}</span>

          </div>
          <div class="line"><img src="../../../../static/images/jx_task_bg.png"/></div>

          <div class="task_pay">

            <span><img src="../../../../static/images/jx_task_icon2.png"/>￥{{taskList.taskMinUnit}}</span><span v-if="taskList.taskMaxUnit != taskList.taskMinUnit">-{{taskList.taskMaxUnit}}</span>

          </div>

        </div>

        <div class="task_need">

          <div class="need_person">

            <span><img src="../../../../static/images/jx_task_icon3.png"/>报名人数:<span><span>{{taskList.signUpTotal}}</span>个人已报名</span></span>

          </div>

          <div class="need_time">

            <span>截止时间:<span>{{taskList.abortDate}}</span></span>

          </div>

        </div>

      </div>

      <div class="loadmore" v-show="!moreData">
        <!-- 暂无账单 -->
        <div class="bill_nodata_img" v-if="taskLists.length == 0">
          <img src="../../../../static/images/nodetail_img.png">
          <div>暂无相关任务</div>
        </div>
        <!-- 加载完毕-->
        <div class="loadmore_tips" v-else><span class="data">没有更多数据啦~</span></div>
      </div>
      <!-- 显示加载中-->
      <div class="loadmore" v-show="moreData">
        <mt-spinner class="loadmore_icon" type="double-bounce" color="#ababab" :size="16"></mt-spinner>
        <div class="loadmore_tips">正在加载</div>
      </div>

    </div>

    <div class="task_list_none" v-else>

      <img src="../../../../static/images/nodetail_img.png">

      <div>暂无相关任务</div>

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

        selectLists: {},//筛选排序列表

        userMobile: '',//用户账号

        findWord: '',//搜索关键字

        pageNum: 1,

        moreData: false,

        findWordShow: ''

      }

    },



    mounted () {

      this.userMobile = localStorage.getItem('mobile');

      localStorage.getItem(this.userMobile + 'findWord') && (this.findWordShow = localStorage.getItem(this.userMobile + 'findWord'));

      this.getData();

      this.findWord = localStorage.getItem(this.userMobile + 'findWord');

      localStorage.removeItem(this.userMobile + 'findWord');

      this.onShow();

    },



    methods: {


      //页面加载方法
      onShow: function () {


        /**
         * 接口：工资提醒
         * 请求方式：GET
         * 接口：/salary/home/selecttiptype
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'user/account/getsalarystate'

        }).then((res)=>{

          if(res.data.code == '0000'){

            console.log(res.data);
          }

        }).catch((res)=>{

          console.log(res);

        });

        /**
         * 接口：工资提醒
         * 请求方式：GET
         * 接口：/salary/home/selecttiptype
         * 入参：null
         **/


        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'salary/home/selecttiptype',


        }).then((res) => {

          console.log(res.data);

          var _this = this;

          var thisType = res.data.data[0].type;

          //console.log('tpye几'+thisType)

          //console.log(thisType==2)

          if(res.data.data[0].entId){
            //存储entId
            this.setStorage('entId', res.data.data[0].entId);

          }

          if(res.data.data[0].salaryDetailId){

            //存储salaryId
            this.setStorage('salaryDetailId', res.data.data[0].salaryDetailId);
          }



          //存储type
          //this.setStorage('thisType', res.data.data[0].type);

          //console.log('发薪'+wx.getStorageSync('salaryDetailId'))


          //是否查看工资条
          if (thisType == 1) {


            var thisEnName = res.data.data[0].entName;

            var thisSalaryMonth = res.data.data[0].salaryMonth;

            var thisSalaryDetailId = res.data.data[0].salaryDetailId

            /*console.log('发薪企业id'+that.data.salaryDetailId);*/


            setTimeout(function () {


              _this.$messagebox({
                title: '提示',
                message: thisEnName + '邀请您查看' + thisSalaryMonth + '工资',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: '查看',
                cancelButtonText: '暂不查看',
                closeOnClickModal: false,
                cancelButtonClass: 'cancel_btn',
                confirmButtonClass: 'confirm_btn_orange',
              }).then(action => {

                if (action == 'confirm') {

                  lockstatus();

                  function lockstatus() {


                    /**
                     * 接口：锁定状态查询
                     * 请求方式：GET
                     * 接口：/salary/home/selectlockstatus
                     * 入参：null
                     **/

                    _this.$http({

                      method: 'get',

                      url: process.env.API_ROOT + 'salary/home/selectlockstatus',


                    }).then((res) => {

                      console.log(res.data);


                      if (res.data.data.type == '1') {


                        _this.$router.push('/authentication')


                      }

                      else if (res.data.data.type == '0') {

                        _this.$router.push('/locked')

                      }


                    }).catch((res) => {})


                  }



                }

                else {

                  console.log('取消');
                  //调用暂不查看工资条

                  noLook();

                  function noLook() {
                    /**
                     * 接口：暂不查看工资条
                     * 请求方式：POST
                     * 接口：/salary/home/updateselectsalary
                     * 入参：salaryDetailId
                     **/

                    _this.$http({

                      method: 'post',

                      url: process.env.API_ROOT + 'salary/home/updateselectsalary',


                      params: {

                        salaryDetailId: thisSalaryDetailId

                      }
                    }).then((res) => {

                      console.log(res.data)

                      _this.$toast({

                        message: '必须加入企业才可查看工资条哦~关闭后可在“我的发薪企业”中继续加入',
                        duration: 1500

                      })


                    }).catch((res) => {})
                  }



                }
              }).catch(err => {});


            }, 1000)


          }

          //是否加入企业
          else if (thisType == 2) {


            var thisEnName = res.data.data[0].entName;

            var thisEntId = res.data.data[0].entId

            setTimeout(function () {

              _this.$messagebox({
                title: '提示',
                message: thisEnName + '邀请您加入企业，便捷查看工资和工资条',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: '查看',
                cancelButtonText: '暂不查看',
                closeOnClickModal: false,
                cancelButtonClass: 'cancel_btn',
                confirmButtonClass: 'confirm_btn_orange',
              }).then(action => {

                if (action == 'confirm') {

                  console.log('确定');

                  lockstatus();

                  function lockstatus() {


                    /**
                     * 接口：锁定状态查询
                     * 请求方式：GET
                     * 接口：/salary/home/selectlockstatus
                     * 入参：null
                     **/

                    _this.$http({

                      method: 'get',

                      url:process.env.API_ROOT + 'salary/home/selectlockstatus',


                    }).then((res) => {

                      console.log(res.data);

                      if (res.data.data.type == '1') {


                        _this.$router.push('/authentication')


                      }

                      else if (res.data.data.type == '0') {

                        _this.$router.push('/locked')

                      }


                    }).catch((res) => {})

                  }




                }

                else {

                  console.log('取消暂不加入企业');

                  //调用暂不加入企业

                  cancelJoin();


                  function cancelJoin() {


                    /**
                     * 接口：暂不加入企业
                     * 请求方式：POST
                     * 接口：/salary/home/updatejoinentstatus
                     * 入参：entId
                     **/

                    _this.$http({

                      method: 'post',

                      url: process.env.API_ROOT + 'salary/home/updatejoinentstatus',

                      params: {

                        entId: thisEntId

                      }
                    }).then((res) => {

                      console.log(res.data)

                      setTimeout(function () {

                        _this.$toast({

                          message: '必须加入企业才可查看工资条哦~关闭后可在“我的工作单位”',
                          duration: 1500

                        })



                      },1000)




                    }).catch((res) => {})

                  }










                }
              }).catch(err => {});


            }, 1000)


          }

          else if(thisType == 3){


            var thisEnName = res.data.data[0].entName;

            var thisSalaryMonth = res.data.data[0].salaryMonth;

            var thisSalaryDetailId = res.data.data[0].salaryDetailId

            /*console.log('发薪企业id'+that.data.salaryDetailId);*/


            setTimeout(function () {


              _this.$messagebox({
                title: '提示',
                message: '请查看【' + thisEnName + '】众包任务' + thisSalaryMonth + '个体经营所得',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: '查看',
                cancelButtonText: '暂不查看',
                closeOnClickModal: false,
                cancelButtonClass: 'cancel_btn',
                confirmButtonClass: 'confirm_btn_orange',
              }).then(action => {

                if (action == 'confirm') {

                  lockstatus();

                  function lockstatus() {


                    /**
                     * 接口：锁定状态查询
                     * 请求方式：GET
                     * 接口：/salary/home/selectlockstatus
                     * 入参：null
                     **/

                    _this.$http({

                      method: 'get',

                      url: process.env.API_ROOT + 'salary/home/selectlockstatus',


                    }).then((res) => {

                      console.log(res.data);


                      if (res.data.data.type == '1') {


                        _this.$router.push('/authentication')


                      }

                      else if (res.data.data.type == '0') {

                        _this.$router.push('/locked')

                      }


                    }).catch((res) => {})


                  }



                }

                else {

                  console.log('取消');
                  //调用暂不查看工资条

                  noLook();

                  function noLook() {
                    /**
                     * 接口：暂不查看工资条
                     * 请求方式：POST
                     * 接口：/salary/home/updateselectsalary
                     * 入参：salaryDetailId
                     **/

                    _this.$http({

                      method: 'post',

                      url: process.env.API_ROOT + 'salary/home/updateselectsalary',


                      params: {

                        salaryDetailId: thisSalaryDetailId

                      }
                    }).then((res) => {

                      console.log(res.data)

                      _this.$toast({

                        message: '必须加入企业才可查看工资条哦~关闭后可在“我的发薪企业”中继续加入',
                        duration: 1500

                      })


                    }).catch((res) => {})
                  }



                }
              }).catch(err => {});


            }, 1000)


          }

          //未收到任何邀请
          else if (thisType == 0) {}


        }).catch((res) => {


        })


        //分页
        this.chooseEntId();

        /**
         * 接口：发薪企业
         * 请求方式：GET
         * 接口：/salary/home/getselectent
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'salary/home/getselectent',


        }).then((res) => {

          console.log(res.data)

          var thisEntName = res.data.data;

          this.selectSalaryOptions = thisEntName

          this.allLoaded =  true;


        }).catch((res) => {
        })



      },

      //分页方法
      chooseEntId: function () {

        console.log('是否有更多数据'+this.hasMoreData)

        if (this.hasMoreData) {

          this.hasMoreData = false;

          //如果查看全部企业
          if (this.isAllCom) {


            this.salaryInfo('', this.pageSize, this.pageNum, this.addPage);

          }

          //如果看单独企业
          else {

            this.salaryInfo(this.entId, this.pageSize, this.pageNum, this.addPage);

          }


          //this.hasMoreData = true


        }

      },

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

        this.timeShow == 'none' ? (this.timeShow = false) : (this.timeShow = !this.timeShow);

        this.timeShow ? (this.sort = 1) : (this.sort = 2);

        this.selectLists.sort = this.sort;

        delete this.selectLists.pageNum;

        this.pageNum = 1;

        this.taskLists = [];

        this.getData();

      },



      //转换时间格式
      timeChange: function (arr) {

        for(var taskList of arr){

          if(taskList.abortDate == 0 || taskList.abortDate == '不限'){

            taskList.abortDate = '不限';

          }else{

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

        }).then(function (res) {

          console.log(res);

          if(res.data.data.list){

            res.data.data.list.length == 10 ? (this.moreData = true) : (this.moreData = false);

            this.taskLists = this.taskLists.concat(res.data.data.list);

            this.timeChange(this.taskLists);

            if(_this.findWord != '' && _this.findWord != null){

              _this.findTask();

              _this.findWord = '';

            }

          }

        }.bind(this)).catch((res)=>{

          console.log(res);

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

        delete this.selectLists.pageNum;

        this.pageNum = 1;

        this.taskLists = [];

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

        delete this.selectLists.pageNum;

        this.pageNum = 1;

        this.taskLists = [];

        this.getData();

        this.orderShow = false;

        this.selectShow = false;

      },



      //点击进入任务详情
      jumpTo: function () {

        var taskId = event.currentTarget.dataset.taskid;

        localStorage.setItem('taskId', taskId);

        this.$router.push('/lookTask');

      },




      findTask: function () {

        this.selectLists.searchCriteria = this.findWord;

        this.pageNum = 1;

        this.taskLists = [];

        this.getData();

      },




      loadMore: function () {

       if(this.moreData){

         if(this.taskLists){

           this.pageNum++;

         }

         this.selectLists.pageNum = this.pageNum;

         this.getData();

       }

      },



    },



    watch: {

      taskMinUnit: function () {

        if(this.taskMinUnit == '.'){
          this.taskMinUnit = '0.';
        }else if(isNaN(-this.taskMinUnit)){
          this.taskMinUnit = this.taskMinUnit.slice(0,-1);
        }else if(+this.taskMinUnit < 0){
          this.taskMinUnit = 0;
        }else if(this.taskMinUnit.length > 10){
          this.taskMinUnit = this.taskMinUnit.slice(0,-1);
        }else if(this.taskMinUnit.indexOf('.') != -1){
          if(this.taskMinUnit.split('.')[1].length > 2){
            this.taskMinUnit = this.taskMinUnit.slice(0,-1);
          }
        }else if(this.taskMinUnit.indexOf('00') == 0){
          this.taskMinUnit = this.taskMinUnit.slice(0,-1);
        }else if(+this.taskMinUnit > 0 && this.taskMinUnit.indexOf('0') == 0){
          this.taskMinUnit = this.taskMinUnit.slice(1)
        }

      },


      taskMaxUnit: function () {

        if(this.taskMaxUnit == '.'){
          this.taskMaxUnit = '0.';
        }else if(isNaN(-this.taskMaxUnit)){
          this.taskMaxUnit = this.taskMaxUnit.slice(0,-1);
        }else if(+this.taskMaxUnit < 0){
          this.taskMaxUnit = 0;
        }else if(this.taskMaxUnit.length > 10){
          this.taskMaxUnit = this.taskMaxUnit.slice(0,-1);
        }else if(this.taskMaxUnit.indexOf('.') != -1){
          if(this.taskMaxUnit.split('.')[1].length > 2){
            this.taskMaxUnit = this.taskMaxUnit.slice(0,-1);
          }
        }else if(this.taskMaxUnit.indexOf('00') == 0){
          this.taskMaxUnit = this.taskMaxUnit.slice(0,-1);
        }else if(+this.taskMaxUnit > 0 && this.taskMaxUnit.indexOf('0') == 0){
          this.taskMaxUnit = this.taskMaxUnit.slice(1)
        }

      }

    }

  }

</script>

<style lang="less" scoped>

  @import "task_square.less";

</style>
<style>
  .toggleTask-enter-active, .toggleTask-leave-active{
    transition: all 0.5s;
  }
  .toggleTask-enter, .toggleTask-leave-to{
    transform: translateY(-100vh);
  }
  .toggleTask-enter-to, .toggleTask-leave{
    transform: none;
  }
  .fade-enter-active, .fade-leave-active{
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
