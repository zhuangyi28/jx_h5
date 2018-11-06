<template>
  <div class="task_details">

    <!-- 任务详情 -->
    <div class="task_title" v-on:click="$router.push('/taskFeedback')">

      <div><img src="../../../../static/images/jx_task_icon.png"/></div>
      <div class="content">
        <div>
          <p>{{taskName}}</p>
          <p v-if="taskMaxUnit==taskMinUnit">￥{{taskMaxUnit}}</p>
          <p v-else>￥{{taskMinUnit}}-￥{{taskMaxUnit}}</p>
        </div>

          <div>
            <p v-if="signupState==2">{{signUpTotal}}个人已报名</p>
            <p v-else-if="signupState==3">报名已结束</p>
          <p>截止时间:{{abortDate| fmtDateStr2}}</p>
        </div>

      </div>

    </div>
    <div class="line"><img src="../../../../static/images/jx_bg.png"/></div>
    <!-- 任务状态 -->
    <div class="task_state">

      <div class="title">任务状态</div>
      <div class="state_content">
        <div class="state_box">
          <p><img src="../../../../static/images/jx_task_sign_1.png"/></p>
          <p>已报名</p>
          <p class="border"></p>
        </div>

        <div class="state_box selected">
          <p><img src="../../../../static/images/jx_task_sign_2.png"/></p>
          <p>被录用</p>
          <p class="border"></p>
        </div>

        <div class="state_box">
          <p><img src="../../../../static/images/jx_task_sign_3.png"/></p>
          <p>提交验收</p>
          <p class="border"></p>
        </div>

        <div class="state_box">
          <p><img src="../../../../static/images/jx_task_sign_4.png"/></p>
          <p>验收通过</p>
        </div>

      </div>
      <div class="state_time">
        <!-- 1 -->
        <div class="time_box">
          <div class="date">
            <p>2018-09-30</p>
            <p>10:20:10</p>
          </div>
          <div class="circle"></div>
          <div class="state">已报名，等待企业审核</div>

        </div>

        <!-- 2 -->
        <div class="time_box">
          <div class="date">
            <p>2018-09-30</p>
            <p>10:20:10</p>
          </div>
          <div class="circle"></div>
          <div class="state">您已被录用，等待企业联系您</div>

        </div>

        <!-- 3 -->
        <div class="time_box">
          <div class="date">
            <p>2018-09-30</p>
            <p>10:20:10</p>
          </div>
          <div class="circle"></div>
          <div class="state">提交验收成功，请耐心等待企业验收</div>

        </div>

        <!-- 4 -->
        <div class="time_box">
          <div class="date">
            <p>2018-09-30</p>
            <p>10:20:10</p>
          </div>
          <div class="circle"></div>
          <div class="state">任务验收通过<span class="green">验</span></div>
        </div>

      </div>
      <div class="show_more" v-on:click="changeFoldState">
        <span>{{brandMore?'展开∨':'收起∧'}}</span>
      </div>


    </div>

    <!-- 任务状态 -->
    <div class="task_feedback" v-on:click="$router.push('/taskFeedback')">

      <div class="title">任务反馈</div>
      <div class="feedback_content">
        <div class="feedback_box">
          <div>
            <div class="feedback_details"><span>反馈</span>{{taskDetails}}</div>
            <div class="time">2019-09-20 10:00:00</div>
          </div>


        </div>
      </div>

      <!-- 添加反馈 -->
      <div class="add_feedback"><span>+</span>添加任务反馈</div>


    </div>

    <orangeBtn v-on:clickEvent="taskBtn" :name="taskBtnName"></orangeBtn>


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

        taskDetails:'',//任务详情

        taskBtnName:'提交验收',//按钮名称

        brandMore: true//显示展开收回
      }
    },
    mounted () {

      this.taskId = this.getStorage('taskId')

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
        //反馈详情
        this.taskDetails = taskInfo.taskDetails



      }).catch((res)=>{})


    },
    methods:{

      changeFoldState:function() {

        this.brandMore = !this.brandMore

      },
      taskBtn:function () {

      }
    }


  }
</script>
<style lang="less" scoped>
  @import "task_details.less";
</style>
