<template>
 <div class="reset_payment">
   <div class="content_list">
     <div class="list_one" v-on:click="$router.push('/code')"><span>忘记支付密码</span></div>
     <div class="list_one" v-on:click="$router.push('/modifyPayPassWord')"><span>修改支付密码</span></div>
   </div>


 </div>


</template>

<script>


</script>

<style lang="less">

  @import "reset_payment.less";

</style>
