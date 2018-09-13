<template>
  <div class="help_pages">
    <div class="title"><i></i>{{ask}}</div>
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
