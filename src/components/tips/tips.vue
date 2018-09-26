<template>
  <div class="tips">

    <div class="add_card_two_ps">
      <img src="../../../static/images/jx_prompt.png">
      <span>{{tips}}</span>
    </div>

  </div>
</template>
<script>
  export default {

    name: 'topTips',

    props: {

      tips: '',

    },
  }
</script>

<style  scoped lang="less">
  @import "tips.less";

</style>
