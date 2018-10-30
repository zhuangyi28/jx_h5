<template>
  <div class="find">
    <div class="find_input">
      <div class="input_place">
        <img src="../../../../static/images/jx_find.png">
        <input type="text" placeholder="请输入公司、任务名称或者任务编号">
      </div>
      <div class="cancel">取消</div>
    </div>
    <div class="find_history">
      <div class="title">
        <span>搜索历史</span>
        <img src="../../../../static/images/jx_delete.png">
      </div>
      <div class="history">
        <div>
          <span>小程序开发</span>
          <span class="delete_btn"></span>
        </div>
        <div>
          <span>设计logo</span>
          <span class="delete_btn"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'find'
  }
</script>
<style lang="less" scoped>
  @import "find.less";
</style>
