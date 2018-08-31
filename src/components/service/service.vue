<template>
  <div class="service_area">

    <span v-on:click="clickEventLeft">{{type1}}</span><span>|</span><span v-on:click="clickEventRight">{{type2}}</span>

  </div>
</template>
<script>
  export default {

    name: 'serviceArea',

    props: {

      type1: '',

      type2:''

    },
    methods: {

      clickEventLeft: function () {

        this.$emit('clickEventLeft')
      },

      clickEventRight: function () {

        this.$emit('clickEventRight')
      },
    }
  }
</script>

<style  scoped lang="less">
  @import "service.less";

</style>
