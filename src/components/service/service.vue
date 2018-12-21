<template>
  <div class="service_area">

    <div class="area_box"></div>
    <div class="footer" :class="classBgName">
      <span v-on:click="clickEventLeft"><i class="iconfont color_text" :class="iconName1"></i>{{type1}}</span><span v-on:click="clickEventRight" v-show="spanShow" :spanlShow="spanShow"><i class="iconfont color_text" :class="iconName2"></i>{{type2}}</span>
    </div>


  </div>
</template>
<script>
  export default {

    name: 'serviceArea',

    props: {

      type1: '',

      type2:'',

      iconName1:'',

      iconName2:'',

      spanShow:true,

      classBgName:'',

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
