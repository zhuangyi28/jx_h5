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

      <div class="select" v-on:click="selectDropDown" v-bind:class="{'color_text': (type != '' || selectShow)}">

        <span>分类</span>

        <span v-bind:class="selectShow?'up':'down'"></span>

      </div>

      <div class="select" v-on:click="timeDropDown" v-bind:class="{'color_text': (timeShow != 'none')}">

        <span>发布时间</span>

        <span v-bind:class="timeShow?'down':'up'"></span>

      </div>

      <div class="select" v-on:click="orderDropDown" v-bind:class="{'color_text': (industry != '' || taskMinUnit != '' || taskMaxUnit != '' || orderShow)}">

        <span>筛选</span>

        <span v-bind:class="orderShow?'up':'down'"></span>

      </div>

    </div>

    <div class="box"></div>

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

              <div v-on:click="industry = ''" v-bind:class="{'border_text_bg  selected': industry == ''}">不限</div>

              <div v-on:click="industry = 1" v-bind:class="{'border_text_bg  selected': industry == 1}">互联网/IT/电子/通信</div>

              <div v-on:click="industry = 2" v-bind:class="{'border_text_bg  selected': industry == 2}">广告/传媒/文化/体育</div>

              <div v-on:click="industry = 3" v-bind:class="{'border_text_bg  selected': industry == 3}">金融</div>

              <div v-on:click="industry = 9" v-bind:class="{'border_text_bg  selected': industry == 9}">教育培训</div>

              <div v-on:click="industry = 8" v-bind:class="{'border_text_bg  selected': industry == 8}">交通/物流/贸易/零售</div>

              <div v-on:click="industry = 7" v-bind:class="{'border_text_bg  selected': industry == 7}">服务业</div>

              <div v-on:click="industry = 4" v-bind:class="{'border_text_bg  selected': industry == 4}">房地产/建筑</div>

              <div v-on:click="industry = 6" v-bind:class="{'border_text_bg  selected': industry == 6}">汽车/机械/制造业</div>

              <div v-on:click="industry = 5" v-bind:class="{'border_text_bg  selected': industry == 5}">消费品</div>

              <div v-on:click="industry = 10" v-bind:class="{'border_text_bg  selected': industry == 10}">其他</div>



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

            <div class="cancel btn_border" v-on:click="resetAll">重置</div>

            <div class="confirm btn_color" v-on:click="confirmClick">确定</div>

          </div>

        </div>

      </transition>

      <transition name="toggleTask">


        <!--分类下拉框-->
        <div class="select_content" v-if="selectShow"  v-bind:class="{'body_overflow': selectShow}">

          <div class="select_list">

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == '')}" v-bind:data-type="''">全部</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 1)}" v-bind:data-type="1">设计/制作/咨询</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 2)}" v-bind:data-type="2">市场调研/服务督导/竞品调研</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 3)}" v-bind:data-type="3">代驾服务</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 4)}" v-bind:data-type="4">软件开发</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 5)}" v-bind:data-type="5">跑腿代办</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 6)}" v-bind:data-type="6">产品试用/定价调研</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 7)}" v-bind:data-type="7">中介服务</div>

            <!--<div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 8)}" v-bind:data-type="8">其他</div>-->

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 9)}" v-bind:data-type="9">会展服务</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 10)}" v-bind:data-type="10">技术服务</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 11)}" v-bind:data-type="11">运输配送</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 12)}" v-bind:data-type="12">运营策划</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 13)}" v-bind:data-type="13">生活服务</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 14)}" v-bind:data-type="14">影视剧务</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 15)}" v-bind:data-type="15">文化传播</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 16)}" v-bind:data-type="16">销售/营销/推广</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 17)}" v-bind:data-type="17">医疗健康</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 18)}" v-bind:data-type="18">旅游</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 19)}" v-bind:data-type="19">采购/贸易</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 20)}" v-bind:data-type="20">生产制造</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 21)}" v-bind:data-type="21">前台/接待</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 22)}" v-bind:data-type="22">物业/家政/保洁/保安</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 23)}" v-bind:data-type="23">酒店/餐饮</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 24)}" v-bind:data-type="24">新闻/媒体/娱乐/广告</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 25)}" v-bind:data-type="25">维修服务</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 26)}" v-bind:data-type="26">运动健身</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 27)}" v-bind:data-type="27">会计/金融/保险</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 28)}" v-bind:data-type="28">物流/仓储</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 29)}" v-bind:data-type="29">建筑/房地产</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 30)}" v-bind:data-type="30">人事/行政/高级管理</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 31)}" v-bind:data-type="31">美容保健/运动健身/休闲娱乐</div>

            <div v-on:click="changeType" v-bind:class="{'border_text_bg  selected': (type == 32)}" v-bind:data-type="32">艺术/摄影</div>


          </div>

        </div>

      </transition>

    </div>

    <!--空-->
    <div class="void"></div>


    <!--任务列表-->
    <mt-loadmore :top-method="loadTop" ref="loadmore">

      <div class="task_list" v-if="taskLists.length != 0">

        <div class="list_one"
             v-for="taskList in taskLists" v-bind:data-taskId="taskList.taskId" v-on:click="jumpTo(taskList.taskId)"
             v-bind:class="{'gary_text': taskHistory.indexOf(taskList.taskId) != -1}">

          <div class="task_information">

            <div class="task_title">

              <div class="task_title_img color_background">
                <img src="../../../../static/images/jx_bag.png">
              </div>

              <span>{{taskList.taskName}}</span>

            </div>
            <div class="line"><img src="../../../../static/images/jx_task_bg.png"/></div>

            <div class="task_pay color_text">

              <span><img src="../../../../static/images/jx_task_icon2.png"/>￥{{taskList.taskMinUnit}}</span><span v-if="taskList.taskMaxUnit != taskList.taskMinUnit">-{{taskList.taskMaxUnit}}</span>

            </div>

          </div>

          <div class="task_need">

            <div class="need_person">

              <span><img src="../../../../static/images/jx_task_icon3.png"/>报名人数:<span><span class="color_text">{{taskList.signUpTotal}}</span>个人已报名</span></span>

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

    </mt-loadmore>

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

        findWordShow: '',

        taskHistory: [],

        scrollTop:''



      }

    },



    mounted () {

      this.$store.state.popupShow = false;

      this.bus.$emit('pageChange','1');

      localStorage.getItem('taskHistory') && (this.taskHistory = localStorage.getItem('taskHistory').split(','));

      this.userMobile = localStorage.getItem('mobile');

      localStorage.getItem(this.userMobile + 'findWord') && (this.findWordShow = localStorage.getItem(this.userMobile + 'findWord'));

      this.getData();

      this.findWord = localStorage.getItem(this.userMobile + 'findWord');

      localStorage.removeItem(this.userMobile + 'findWord');

      localStorage.getItem('Authorization') && this.onShow();

      //监听滚动条事件
      window.addEventListener('scroll', this.handelscroll);



    },
    deactivated (){

    },
    activated () {

      document.getElementsByClassName('task_square')[0].scrollTop= document.documentElement.getElementsByClassName('task_square')[0].scrollTop = this.getStorage('scrollTop')

    },

    destroyed(){


      window.removeEventListener('scroll', this.handelscroll);

    },

    methods: {


      //页面加载方法
      onShow: function () {

        var _this = this;


        /**
         * 接口：签约弹框提醒
         * 请求方式：POST
         * 接口：user/contract/get/contract/remind
         * 入参：null
         **/

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/contract/get/contract/remind',


        }).then((res) => {


            console.log(res.data)

          if(res.data.data.type==1){

            this.$messagebox({
              title: '提示',
              message: '您有新的合同待签署，请在“我的”-“我的签约”中查看并签署',
              showCancelButton: true,
              showConfirmButton: true,
              confirmButtonText: '查看',
              cancelButtonText: '不再提醒',
              closeOnClickModal: false,
              cancelButtonClass: 'cancel_btn',
              confirmButtonClass: 'confirm_btn_orange',
            }).then(action => {

              if (action == 'confirm') {

                /**
                 * 接口：查看签约提醒
                 * 请求方式：POST
                 * 接口：user/contract/update/contract/remind
                 * 入参：null
                 **/

                this.$http({

                  method: 'post',

                  url: process.env.API_ROOT + 'user/contract/update/contract/remind',


                }).then(function (res) {

                    console.log(res.data)

                  this.$router.push('/contractList')


                }.bind(this)).catch((res)=>{})



              }else {

                /**
                 * 接口：查看签约提醒
                 * 请求方式：POST
                 * 接口：user/contract/update/contract/remind
                 * 入参：null
                 **/

                this.$http({

                  method: 'post',

                  url: process.env.API_ROOT + 'user/contract/update/contract/remind',


                }).then(function (res) {

                  console.log(res.data)


                }.bind(this)).catch((res)=>{})




              }


            })


          }



        }).catch((res)=>{})


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

          var thisType = res.data.data[0].type;

          if(res.data.data[0].salaryType == 1 || res.data.data[0].salaryType == 7){

            localStorage.setItem('goFrozen','2');

          }else{

            this.setStorage('salaryDetailId', res.data.data[0].salaryDetailId);

            localStorage.setItem('goFrozen','3');

          }

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
                message: thisEnName + '邀请您查看' + thisSalaryMonth + '收入',
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

                      _this.$messagebox({
                        message: '首次查看需进行身份验证，在“我的”-“发新企业”中同意企业邀请，验证通过后即可查看',
                        showCancelButton: false,
                        showConfirmButton: true,
                        confirmButtonText: '确定',
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

                      _this.$messagebox({
                        message: '首次查看需进行身份验证，在“我的”-“发新企业”中同意企业邀请，验证通过后即可查看',
                        showCancelButton: false,
                        showConfirmButton: true,
                        confirmButtonText: '确定',
                      })

/*

                      _this.$toast({

                        message: '必须加入企业才可查看哦~关闭后可在“发薪企业”中继续加入',
                        duration: 1500

                      })
*/


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

      handelscroll() {


          if(this.scrollTop){


            this.scrollTop = document.getElementsByClassName('task_square')[0].scrollTop|| document.documentElement.getElementsByClassName('task_square')[0].scrollTop
          }


        //console.log('当前数值'+this.scrollTop)

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
      jumpTo: function (taskid) {

        localStorage.setItem('taskId', taskid);

  /*      if(localStorage.getItem('taskHistory')){
          (localStorage.getItem('taskHistory').indexOf(taskId) == -1) &&
          localStorage.setItem('taskHistory',localStorage.getItem('taskHistory') + ',' + taskId);
        }else{
          localStorage.setItem('taskHistory',taskId);
        }
*/
        this.scrollTop = document.getElementsByClassName('task_square')[0].scrollTop|| document.documentElement.getElementsByClassName('task_square')[0].scrollTop;

        this.setStorage('scrollTop',this.scrollTop);

        this.taskHistory.indexOf(taskid) == -1 && this.taskHistory.push(taskid);

        this.$parent.detailShow = false;

        this.$router.push({path: '/lookTask',query: {taskId: taskid}});

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




      //下拉刷新
      loadTop: function () {

        console.log('下拉刷新');
        //重新调用data方法
        Object.assign(this.$data, this.$options.data());
        //重新加载
        this.getData();
        //固定方法，查询完要调用一次，用于重新定位
        this.$refs.loadmore.onTopLoaded();

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
