<template>
  <div class="task_details">

    <!-- 任务详情 -->
    <div class="task_title">

      <div><img src="../../../../static/images/jx_task_icon.png"/></div>
      <div class="content">
        <div>
          <p>微信小程序开发</p>
          <p>200/元</p>
        </div>

        <div>
          <p>报名已结束</p>
          <p>截止时间:2018-10-10</p>
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
          <p>提交结果</p>
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
            <div class="feedback_details"><span>反馈</span>反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容</div>
            <div class="time">2019-09-20 10:00:00</div>
          </div>


        </div>
      </div>

      <!-- 添加反馈 -->
      <div class="add_feedback"><span>+</span>添加任务反馈</div>


    </div>


  </div>
</template>
<script>
  export default {
    name: 'taskDetail',
    data () {
      return{
        brandMore: true
      }
    },
    mounted () {

    },
    methods:{

      changeFoldState() {
        this.brandMore = !this.brandMore
      }
    }


  }
</script>
<style lang="less" scoped>
  @import "task_details.less";
</style>
