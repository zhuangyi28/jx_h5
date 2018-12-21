<template>
  <div class="button">
    <mt-button size="large"  class="btn_color" :class="className" v-on:click="clickEvent">{{name}}</mt-button>
  </div>
</template>
<script>
  export default {

    name: 'orangeBtn',

    props: {

      name: '',//定义传值的类型

      className:''

    },
    methods: {

      clickEvent: function () {

        this.$emit('clickEvent')
      }
    }
  }
</script>

<style  scoped lang="less">
  @import "orange_btn.less";

</style>
