<template>
  <div class="help_pages">
    <div class="title"><i class="iconfont icon-question_time1 color_text"></i>{{ask}}</div>
    <div v-html="answer" class="answer"></div>
    <div class="tips" v-show="tipsShow" v-on:click="helpFn"><i class="iconfont icon-withdraw_more color_text"></i>更多问题</div>
  </div>
</template>
<script>
  export default {

    name: 'helpPages',

    props: {

      ask:'',

      answer:'',

      tipsShow:false

    },
    methods: {

      helpFn: function () {

          this.$router.push('/helpCenter')

      },

    }

  }
</script>

<style  scoped lang="less">
  @import "help.less";

</style>
