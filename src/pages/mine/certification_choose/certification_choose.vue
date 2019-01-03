<template>
  <div class="certification_choose">
    <div class="choose_list">

      <div class="choose" v-on:click="$router.push('/IDCardCertification')">
        <span>身份证认证</span>
        <span class="jump_to_logo">
            <i class="allow_right"></i>
        </span>
      </div>

      <div class="choose" v-on:click="$router.push('/anotherCertification')">
        <span>其他证件认证</span>
        <span class="jump_to_logo">
          <i class="allow_right"></i>
        </span>
      </div>
    </div>

  </div>
</template>
<script>
  export default {

    name: 'certificationChoose',

    data () {

      return {



      }

    }

  }
</script>
<style lang="less" scoped>
  @import "certification_choose.less";
</style>
