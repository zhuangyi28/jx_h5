<template>
  <div class="look_task">
    <!-- 编号-->
    <div class="task_no">任务编号：<span>12345</span></div>
    <!-- 详细-->
    <div class="task_detail">
      <div class="title">微信小程序开发/APP</div>
      <div class="sort"><span><img src="../../../../static/images/jx_task_sort.png">技术服务</span><span><img src="../../../../static/images/jx_task_sort.png">互联网/IT/电子</span></div>
      <div class="detail">
        <div>
          <p>￥2000-5000</p>
          <p>预算</p>
        </div>
        <div>
          <p>5人</p>
          <p>需要人数</p>
        </div>
        <div>
          <p>2018-10-20</p>
          <p>截止时间</p>
        </div>
      </div>
    </div>
    <!-- 需求描述 -->
    <div class="task_describe">
      <div class="title">需求描述</div>
      <div class="content">这是一个什么具体需求这是一个什么具体需求这是一个什么具体需求这是一个什么具体需求这是一个什么具体需求这是一个什么具体需求这是一个什么具体需求</div>
      <!-- 文件下载 -->`
      <div class="file">
        <div><img src="../../../../static/images/jx_task_files.png"><p>app接口文档啦啦啦啦.pdf</p></div>
        <div><img src="../../../../static/images/jx_task_files.png"><p>app接口文档.pdf</p></div>
        <div><img src="../../../../static/images/jx_task_files.png"><p>app接口文档2.pdf</p></div>
        <div><img src="../../../../static/images/jx_task_files.png"><p>产品原型.pdf</p></div>
        <div><img src="../../../../static/images/jx_task_files.png"><p>app接口文档.pdf</p></div>
        <div><img src="../../../../static/images/jx_task_files.png"><p>app接口文档.pdf</p></div>
      </div>
      <!-- 补充内容-->
      <div class="tips_title">补充内容</div>
      <div class="tips_content">补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢</div>
    </div>

    <!-- 名称-->
    <div class="name">
      <div class="icon"><img src="../../../../static/images/jx_mine_image.png"/></div>
      <div class="people">
        <div>易烊千玺</div>
        <div><span><img src="../../../../static/images/jx_people_authentication.png"/>已认证</span></div>
      </div>
    </div>
    <div class="task_btn_area">
      <!-- 按钮-->
      <orange-btn :name="btnName" v-on:clickEvent="cancelRegistrationFn"></orange-btn>
    </div>





  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'lookTask',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return{
        btnName: '取消报名'
      }
    },
    mounted () {

    },
    methods:{

      cancelRegistrationFn:function () {


        this.$messagebox({
          title: '提示',
          message: '确定取消报名？',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: '查看',
          cancelButtonText: '暂不查看',
          closeOnClickModal: false,
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then(action => {


      })

      }

    }


  }
</script>
<style lang="less" scoped>
  @import "look_task.less";
</style>
