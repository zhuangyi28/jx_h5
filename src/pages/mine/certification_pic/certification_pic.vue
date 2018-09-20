<template>
  <div class="certification_pic">
    <div class="certification_pic_title">
      请上传（证件号：{{idNumber}}）对应的证件照片
    </div>
    <div class="certification_pic_input">
      <div class="img">
        <img v-bind:src="faceUrl">
        <input type="file" v-on:change="changeImg" class="face">
      </div>
      <div class="title">
        <span v-if="cardTypeId == 2 || cardTypeId == 3">上传港、澳、台通行证正面</span>
        <span v-else-if="cardTypeId == 4">上传护照照片</span>
        <span v-on:click="exampleImg" class="face">示例</span>
      </div>
    </div>
    <div class="certification_pic_input" v-if="cardTypeId == 2 || cardTypeId == 3">
      <div class="img">
        <img v-bind:src="backUrl">
        <input type="file" v-on:change="changeImg" class="back">
      </div>
      <div class="title">
        上传港、澳、台通行证反面<span v-on:click="exampleImg" class="back">示例</span>
      </div>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
    <div class="certification_pic_ps">
      此信息仅用于身份验证，平台不会像第三方透露用户信息
    </div>
    <mt-popup v-model="popupExample">
      <div class="example">
        <div class="example_title">
          证件示例
        </div>
        <div class="example_img">
          <img v-bind:src="exampleUrl">
        </div>
        <div class="example_button">
          <button v-on:click="popupExample = false">确定</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'certificationPic',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        btnName: '提交',
        cardTypeId: '2',
        idNumber: 'fda4s456',
        popupExample: false,
        faceUrl: "/static/images/ID_card_face.png",
        backUrl: "/static/images/ID_card_back.png",
        exampleUrl: '',
        files: []
      }
    },
    mounted () {
      //this.cardTypeId = this.getStorage('cardTypeId');
      //this.idNumber = this.getStorage('idNumber');
    },
    methods: {
      changeImg: function () {
        var Event = event;
        var file = event.currentTarget.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
          var url = reader.result;
          this.files.push(file);
          if(Event.target.classList.contains('face')){
            this.faceUrl = url;
          }
          else if(Event.target.classList.contains('back')){
            this.backUrl = url;
          }
        }
      },
      exampleImg: function () {
        if(this.cardTypeId == 4){
          this.exampleUrl = '/static/images/jx_example_password.jpg'
        }
        else if(this.cardTypeId == 3 || this.cardTypeId == 2){
          if(event.currentTarget.classList.contains('back')){
            this.exampleUrl = '/static/images/jx_example_back.jpg'
          }
          else if(event.currentTarget.classList.contains('face')){
            this.exampleUrl = '/static/images/jx_example_paper.jpg'
          }
        }
        this.popupExample = true;
      },
      handleClick: function () {
        for(var file of this.files){
          this.$http({
            method: 'post',
            url: process.env.API_ROOT+ 'jx/uploadimg/oss',
            headers:{
              'Content-Type':'multipart/form-data'
            },
            params: {
              File: file
            }
          }).then((res)=>{
            debugger;
          }).catch((res)=>{
            console.log(res);
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "certification_pic.less";
</style>
