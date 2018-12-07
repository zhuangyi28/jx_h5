<template>
  <div class="sign">

  </div>
</template>
<script>
  export default {
    name: 'sign',
    data(){

      return{



      }

    },

    mounted () {

      var that = this

      this.$indicator.open({
        text: '跳转中...',
        spinnerType: 'fading-circle'
      });

      setTimeout(function () {

        that.$router.push('/contractDetail');

      },2000)


    },



    methods: {


    },


    destroyed(){

      this.$indicator.close()

    },


  }
</script>
<style lang="less" scoped>
  @import "sign.less";
</style>

