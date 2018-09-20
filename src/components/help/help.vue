<template>
  <div class="help_pages">
    <div class="title"><i class="iconfont icon-question_time1"></i>{{ask}}</div>
    <div v-html="answer" class="answer"></div>
  </div>
</template>
<script>
  export default {

    name: 'helpPages',

    props: {

      ask:'',

      answer:''

    },

  }
</script>

<style  scoped lang="less">
  @import "help.less";

</style>
