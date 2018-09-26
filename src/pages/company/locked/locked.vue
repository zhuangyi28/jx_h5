<template>

  <div class="locked">

    <div class="locked_box">

      <img src="/static/images/jx_locked.png"/>

      <div class="circle">

        <div class="circle_bot"></div>
        <div class="circle_mid"></div>


      </div>

      <div class="wave"></div>


    </div>


    <div class="text_area">

      <div class="title">您已连续输错3次，请第二天再试或联系HR进行处理</div>

    </div>

    <orangeBtn :name="btnName" v-on:clickEvent="$router.go(-1)"></orangeBtn>

    <serviceArea :type1="serviceLeft" :iconName1="iconName1" :spanShow="false"></serviceArea>


  </div>


</template>

<script>
  //按钮
  import orangeBtn from '../../../components/orange_btn/orange_btn'

  //帮助
  import serviceArea from '../../../components/service/service'

  export default {


    name: 'locked',

    components: {

      orangeBtn: orangeBtn,

      serviceArea: serviceArea,


    },

    data(){

      return {

        btnName: '确定',//按钮名称

        serviceLeft: '查看帮助',

        iconName1:'icon-help_question',



      }

    },

  }
</script>

<style lang="less">

  @import "locked.less";

</style>
