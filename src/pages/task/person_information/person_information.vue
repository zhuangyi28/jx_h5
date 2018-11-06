<template>
  <div class="person_information">
    <div class="person_information_ps">添加标签能让企业在搜索相应人才时，优先看到您</div>
    <div class="skill_part">
      <div class="skill_title">技能标签</div>
      <div class="skill_tags">
        <div><span>设计</span><span class="delete_btn"></span></div>
        <div><span>APP开发</span><span class="delete_btn"></span></div>
        <div v-on:click="tagsAdd"><span>添加</span><span class="delete_btn"></span></div>
      </div>
      <div class="skill_ps">注：最多添加5个标签，每个标签最多6个字</div>
    </div>
    <div class="supply_part">
      <div class="supply_title">
        <span>补充信息</span>
        <span>（身份证照片）</span>
      </div>
      <div class="upload">
        <div class="upload_title">请上传（证件号：<span>4564612341654</span>）对应的证件照片</div>
        <div class="upload_face">
          <img src="../../../../static/images/jx_idcard_face.png">
          <input type="file">
        </div>
        <div class="upload_name">上传身份证正面<span>示例</span></div>
        <div class="upload_back">
          <img src="../../../../static/images/jx_idcard_back.png">
          <input type="file">
        </div>
        <div class="upload_name">上传身份证反面<span>示例</span></div>
      </div>
    </div>
    <div class="introduce_yourself">
      <div class="introduce_title">自我介绍</div>
      <div class="introduce_input">
        <textarea cols="30" rows="6" placeholder="详细描述下你自己，字数控制在200字以内"></textarea>
      </div>
    </div>
    <orangeBtn v-bind:name="btnName"></orangeBtn>
  </div>
</template>
<script>

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'person_information',

    components: {

      orangeBtn: orangeBtn

    },

    data () {

      return {

        btnName: '保存',

        popupShow: false,

        tags: []

      }

    },

    methods: {

      tagsAdd: function () {

        this.$messagebox({

          title: '请输入标签',
          showInput: true,
          inputType: 'text',
          inputPlaceholder: '请输入您的标签(最多6个字)',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',

        }).then(function (res) {

          debugger;

        }.bind(this));

        /*this.$messagebox.prompt('请输入姓名','').then(function ({value,action}){

          debugger;

        })*/

      }

    }

  }

</script>
<style lang="less" scoped>
  @import "person_information.less";
</style>
