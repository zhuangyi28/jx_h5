<template>
  <div class="my_task">
    <div class="my_task_order">
      <div class="selected">全部</div>
      <div>未被选中</div>
      <div>已取消</div>
      <div>已报名</div>
      <div>工作中</div>
      <div>已完成</div>
    </div>
    <div class="my_task_list">
      <div class="my_task_one">
        <div class="my_task_information">
          <div class="task_title">
            <img src="../../../../static/images/jx_bag.png">
            <span>微信小程序开发</span>
          </div>
          <div class="task_status">
            <span>已报名</span>
            <span class="next_btn"></span>
          </div>
        </div>
        <div class="task_money_time">
          <div class="task_money">
            <span>￥20000</span>
          </div>
          <div class="task_time">
            <span>截止时间:</span>
            <span>2018-10-10</span>
          </div>
        </div>
      </div>
      <div class="my_task_one">
        <div class="my_task_information">
          <div class="task_title">
            <img src="../../../../static/images/jx_bag.png">
            <span>微信小程序开发</span>
          </div>
          <div class="task_status">
            <span>任务关闭</span>
            <span class="next_btn"></span>
          </div>
        </div>
        <div class="task_money_time">
          <div class="task_money">
            <span>￥20000</span>
          </div>
          <div class="task_time">
            <span>截止时间:</span>
            <span>2018-10-10</span>
          </div>
        </div>
      </div>
      <div class="my_task_one">
        <div class="my_task_information">
          <div class="task_title">
            <img src="../../../../static/images/jx_bag.png">
            <span>微信小程序开发</span>
          </div>
          <div class="task_status">
            <span>待验收</span>
            <span class="next_btn"></span>
          </div>
        </div>
        <div class="task_money_time">
          <div class="task_money">
            <span>￥20000</span>
          </div>
          <div class="task_time">
            <span>截止时间:</span>
            <span>2018-10-10</span>
          </div>
        </div>
      </div>
      <div class="my_task_one">
        <div class="my_task_information">
          <div class="task_title">
            <img src="../../../../static/images/jx_bag.png">
            <span>微信小程序开发</span>
          </div>
          <div class="task_status">
            <span>已取消</span>
            <span class="next_btn"></span>
          </div>
        </div>
        <div class="task_money_time">
          <div class="task_money">
            <span>￥20000</span>
          </div>
          <div class="task_time">
            <span>截止时间:</span>
            <span>2018-10-10</span>
          </div>
        </div>
      </div>
      <div class="my_task_one">
        <div class="my_task_information">
          <div class="task_title">
            <img src="../../../../static/images/jx_bag.png">
            <span>微信小程序开发</span>
          </div>
          <div class="task_status">
            <span>未录用</span>
            <span class="next_btn"></span>
          </div>
        </div>
        <div class="task_money_time">
          <div class="task_money">
            <span>￥20000</span>
          </div>
          <div class="task_time">
            <span>截止时间:</span>
            <span>2018-10-10</span>
          </div>
        </div>
      </div>
      <div class="task_list_ps">
        <span>已没有更多数据</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'myTask'
  }
</script>
<style lang="less" scoped>
  @import "my_task.less";
</style>
