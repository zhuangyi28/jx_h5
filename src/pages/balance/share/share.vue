<template>
  <div class="share">
    <div class="share_img">
      <img src="../../../../static/images/share_img.png">
    </div>
    <div class="share_popup" v-show="bg_show">
      <div class="share_bg" v-on:click="bg_show = false"></div>
      <img src="../../../../static/images/share_click.png">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'share',
    data () {
      return {
        bg_show: false
      }
    },
    mounted () {
      if(this.getStorage('share')){
        this.bg_show = true;
        this.setStorage('share','');
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "share.less";
</style>
