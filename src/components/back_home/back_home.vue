<template>
  <div class="back_home" v-if="backHomeShow && company && 0">
    <div class="title">查看嘉薪更多业务</div>
    <div class="go_home color_text" v-on:click="$router.push('/workDesk/mine')">进入首页</div>
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

  }
</script>
<style lang="less" scoped>
  @import "back_home.less";
</style>
