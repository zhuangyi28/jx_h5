<template>
  <div class="task_details">

    <!-- 任务详情 -->
    <div class="task_title" v-on:click="$router.push('/lookTask')">

      <div><img src="../../../../static/images/jx_task_icon.png"/></div>
      <div class="content">
        <div>
          <p class="name">{{taskName}}</p>
          <p class="pay" v-if="taskMaxUnit==taskMinUnit">￥{{taskMaxUnit}}</p>
          <p class="pay" v-else>￥{{taskMinUnit}}-￥{{taskMaxUnit}}</p>
        </div>

          <div>
            <p v-if="signupState==2">{{signUpTotal}}个人已报名</p>
            <p v-else-if="signupState==3">报名已结束</p>

            <p v-if="abortDate==0">截止时间：不限</p>
            <p v-else>截止时间：{{abortDate| fmtDateStr2}}</p>
        </div>

      </div>

    </div>
    <div class="line"><img src="../../../../static/images/jx_bg.png"/></div>
    <!-- 任务状态 -->
    <div class="task_state">

      <div class="title">任务状态</div>
      <div class="state_content">
        <div class="state_box" v-bind:class="brightState=='1'? 'selected':''">
          <p><img src="../../../../static/images/jx_task_sign_1.png"/></p>
          <p>已报名</p>
          <p class="border"></p>
        </div>

        <div class="state_box" v-bind:class="brightState=='2'? 'selected':''">
          <p><img src="../../../../static/images/jx_task_sign_2.png"/></p>
          <p>被录用</p>
          <p class="border"></p>
        </div>

        <div class="state_box" v-bind:class="brightState=='3'? 'selected':''">
          <p><img src="../../../../static/images/jx_task_sign_3.png"/></p>
          <p>提交验收</p>
          <p class="border"></p>
        </div>

        <div class="state_box" v-bind:class="brightState=='4'? 'selected':''">
          <p><img src="../../../../static/images/jx_task_sign_4.png"/></p>
          <p>验收通过</p>
        </div>

      </div>
      <!-- 显示部分-->
      <div class="state_time">
        <!-- 1 -->
        <div class="time_box" v-for="item in showTaskTimeArea" v-bind:class="taskTimeArea.length>4 ? '' : 'last_part_show'">
          <div class="date">
            <p>{{item.data|fmtDateStr}}</p>
          </div>
          <div class="circle"></div>
          <div v-if="item.type=='1'" class="state">已报名，等待企业审核</div>
          <div v-else-if="item.type=='2'" class="state">您已被录用，可以开始工作啦</div>
          <div v-else-if="item.type=='3'" class="state">提交验收成功，请耐心等待企业验收</div>
          <div v-else-if="item.type=='4'" class="state">任务验收通过<span class="green">验</span></div>
          <div v-else-if="item.type=='5'" class="state">很遗憾，您未被录用<span class="red">未</span></div>
          <div v-else-if="item.type=='6'" class="state">企业已关闭改任务</div>
          <div v-else-if="item.type=='7'" class="state">您已取消报名</div>
        </div>

      </div>
      <!-- 隐藏部分-->
      <div class="state_time"  v-bind:class="brandMore ? 'area_part_hidden' : 'area_part_show'">

        <div class="time_box" v-for="item in hideTaskTimeArea" v-if="taskTimeArea.length>4">
          <div class="date">
            <p>{{item.data|fmtDateStr}}</p>
          </div>
          <div class="circle"></div>
          <div v-if="item.type=='1'" class="state">已报名，等待企业审核</div>
          <div v-else-if="item.type=='2'" class="state">您已被录用，等待企业联系您哦</div>
          <div v-else-if="item.type=='3'" class="state">提交验收成功，请耐心等待企业验收</div>
          <div v-else-if="item.type=='4'" class="state">任务验收通过<span class="green">验</span></div>
          <div v-else-if="item.type=='5'" class="state">很遗憾，您未被录用</div>
          <div v-else-if="item.type=='6'" class="state">企业已关闭改任务</div>
          <div v-else-if="item.type=='7'" class="state">您已取消报名</div>
        </div>
      </div>
      <!-- 赞开关闭-->
      <div class="show_more" v-if="taskTimeArea.length>4" v-on:click="changeFoldState">
        <span>{{brandMore?'展开∨':'收起∧'}}</span>
      </div>


    </div>

    <!-- 任务状态 -->
    <div class="task_feedback" v-if="brightState!='1'">

      <div class="task_feedback_list">
        <div class="title">任务反馈</div>
        <div class="feedback_content" v-for="item in feedbackList" v-bind:data-id="item.pFeedbackId" v-on:click="lookFeedBackDetailFn">
          <div class="feedback_box">
            <div>
              <div class="feedback_details"><span>反馈</span><span>{{item.pContent}}</span></div>
              <div class="time">{{item.pCreateDate|fmtDateStr}}</div>
            </div>
          </div>
        </div>

      </div>
      <!-- 添加反馈 -->
      <div v-if="canSubmit=='1'||brightState=='2'||brightState=='4'" class="add_feedback" v-on:click="$router.push('/taskFeedback')"><span>+</span>添加任务反馈</div>

    </div>

    <!-- 提交验收 -->
    <div v-if="canSubmit=='1'||brightState=='2'||brightState=='4'">
      <orangeBtn v-on:clickEvent="taskBtn" :name="taskBtnName1"></orangeBtn>
    </div>

    <!-- 取消报名 -->
    <div v-if="selectState=='1'&&brightState=='1'">
      <orangeBtn v-on:clickEvent="cancelTaskBtn" :name="taskBtnName2"></orangeBtn>
    </div>

    <!-- 返回任务广场-->

      <div class="button_box" v-if="brightState=='1'">
        <button class="go_back" v-on:click="$router.push('/workDesk/taskSquare')">返回任务广场</button>
      </div>



  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'taskDetail',
    components: {
      orangeBtn: orangeBtn,
    },
    data () {
      return{

        taskId:'',//任务详情id

        taskName:'',//任务名称

        abortDate:'',//报名截止时间

        taskMaxUnit:'',//任务单价最大值

        taskMinUnit:'',//任务单价最小值

        signUpTotal:'',//已报名人数

        signupState:'',//报名状态

        taskBtnName1:'提交验收',//按钮名称

        taskBtnName2:'取消报名',//按钮名称

        brightState:'',//任务状态 返回几代表第几个高亮

        canSubmit:'',//canSubmit=1 显示申请验收按钮高亮 canSubmit=0 不显示申请验收按钮置灰

        selectState:'',//selectState=1 显示取消报名按钮  selectState=0 不显示取消报名按钮

        feedbackList:[],//反馈列表

        taskTimeArea:[],//任务反馈时间详情

        showTaskTimeArea:[],//显示部分

        hideTaskTimeArea:[],//隐藏部分

        brandMore: true//显示展开收回
      }
    },
    mounted () {


        this.init()


    },

    methods:{
      //获取数据
      init:function () {


          this.taskId = this.getStorage('taskId');


        /**
         * 接口：获取任务详情
         * 请求方式：GET
         * 接口：user/task/getapplyinfo
         * 入参：taskId
         **/

        this.$http({

            method: 'get',

            url: process.env.API_ROOT + 'user/task/getapplyinfo',

            params: {

              taskId:this.taskId


            },

          }).then((res) => {

            console.log(res.data);

            let taskInfo = res.data.data.taskInfo;
            //任务状态高亮 第几个显示第几个状态
            this.brightState = res.data.data.brightState;
            //任务详情
            this.taskInfo = res.data.data.taskInfo;
            //任务名称
            this.taskName =taskInfo.taskName;
            //任务时间
            this.abortDate =taskInfo.abortDate;
            //任务金额
            this.taskMaxUnit =taskInfo.taskMaxUnit;
            this.taskMinUnit =taskInfo.taskMinUnit;
            //任务人数
            this.signUpTotal = taskInfo.signUpTotal;
            //报名状态 2-报名中 3-报名结束
            this.signupState = taskInfo.signupState;
            //按钮状态
            this.canSubmit = res.data.data.canSubmit;
            //反馈列表
            this.feedbackList = res.data.data.feedbacks;
            //是否显示取消报名
            this.selectState = res.data.data.selectState;
            //任务详情时间及状态
            this.taskTimeArea = res.data.data.taskTimeArea

          if(this.taskTimeArea<=4){

            this.showTaskTimeArea = this.taskTimeArea;
          }
          else {

            this.showTaskTimeArea = this.taskTimeArea.slice(0,4);

            this.hideTaskTimeArea  =this.taskTimeArea.slice(4)

          }

            //任务用户关联id-添加反馈中获取
            this.setStorage('recordId',res.data.data.recordId)
            this.setStorage('relId',res.data.data.relId)


          }).catch((res)=>{})

        },
      //展开收起
      changeFoldState:function() {

        this.brandMore = !this.brandMore

      },
      //提交验收
      taskBtn:function () {

          if(!this.feedbackList){

            this.$toast({

              message: '请先提交任务反馈',
              duration: 1500,
              position: 'bottom',

            })

          }
          else {

            /**
             * 接口：提交验收
             * 请求方式：POST
             * 接口：user/task/submitcheck
             * 入参：relId，pRecordId
             **/

            this.$http({

              method: 'post',

              url: process.env.API_ROOT + 'user/task/submitcheck',

              params: {

                relId:this.getStorage('relId'),

                pRecordId:this.getStorage('recordId'),

              },

            }).then((res) => {

              console.log(res.data)

              if(res.data.code=='0000'){


                this.$toast({

                  message: res.data.msg,
                  duration: 1500,
                  position: 'bottom',

                })

                this.init()

              }


            }).catch((res)=>{})

          }


      },
      //取消报名
      cancelTaskBtn:function () {
        this.$messagebox({
          title: '提示',
          message: '确定取消报名？',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then((action) =>{

          if (action == 'confirm') {

            /**
             * 接口：取消报名
             * 请求方式：GET
             * 接口：user/task/cancel/enroll
             * 入参：relId
             **/

            this.$http({

              method: 'get',

              url: process.env.API_ROOT + 'user/task/cancel/enroll',

              params: {

                relId:this.getStorage('relId'),

              },

            }).then((res) => {

              console.log(res.data)

              if(res.data.code=='0000'){

                this.$toast({

                  message: res.data.msg,
                  duration: 1500,
                  position: 'bottom',

                })

                this.init()

              }

              else if(res.data.code=='-1'){

                this.$toast({

                  message: res.data.msg,
                  duration: 1500,
                  position: 'bottom',

                })



              }

            }).catch((res)=>{})


          }
        }).catch((res)=>{})
      },
      //查看反馈详情
      lookFeedBackDetailFn:function (e) {
        console.log('详情id'+e.currentTarget.dataset.id);
        this.setStorage('pFeedbackId',e.currentTarget.dataset.id);
        this.$router.push('/taskFeedbackContent')
      },
    },
    /*    computed: {
      showTaskTimeArea: {
        get: function () {
          if (this.brandMore) {
            if (this.taskTimeArea.length < 5) {
              return this.taskTimeArea
            }
            let newArr = []
            for (var i = 0; i < 4; i++) {
              let item = this.taskTimeArea[i]
              newArr.push(item)
            }
            return newArr
          }
          return this.taskTimeArea
        },
        set: function (val) {
          this.showTaskTimeArea = val
        }
      }
    },*/


  }
</script>
<style lang="less" scoped>
  @import "task_details.less";
</style>
