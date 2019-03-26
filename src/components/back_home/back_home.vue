<template>
  <div class="back_home" v-if="backHomeShow && company">
    <div class="title">查看嘉薪更多业务</div>
    <div class="go_home color_text" v-on:click="toHomeFn" >点击进入</div>
  </div>
</template>
<script>
  export default {

    name: 'backHome',

    data () {

      return {

        backHomeShow: false,

        company: false

      }

    },

    mounted () {

      (localStorage.getItem('needBackHome')) && (this.backHomeShow = true) && (localStorage.removeItem('needBackHome'));

      (!this.getCookie('anotherCompany') || this.getCookie('anotherCompany') == 'orange') && (this.company = true);

    },

    methods: {


      //获取数据
      toHomeFn: function () {

        localStorage.removeItem('contractDetailBack');

        this.$router.push('/workDesk/mine')



      }

    }

  }
</script>
<style lang="less" scoped>
  @import "back_home.less";
</style>
