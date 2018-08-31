<template>
  <div class="personal_center">
    <div class="personal_information">
      <div class="information_list" v-on:click="$router.push('/telChange')">
        <span>账号</span>
        <span class="mobile">{{mobile|plusXing(3,4)}}</span>
      </div>
      <div class="information_list" v-on:click="$router.push('/certification')">
        <span>实名认证</span>
        <span class="identification">
          <span v-if="isVerify == 0">未认证</span>
          <span v-else-if="isVerify == 1">已认证</span>
          <span v-else-if="isVerify == 2">审核中</span>
          <span v-else-if="isVerify == 3">审核未通过</span>
          <img src="/static/images/reset_go.png">
        </span>
      </div>
    </div>
    <div class="personal_btn">
      <orangeBtn v-bind:name="btnName" v-on:clickEvent="logout"></orangeBtn>
    </div>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'personalCenter',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        mobile: '',
        isVerify: '',
        btnName: '退出登录'
      }
    },
    mounted () {
      this.isVerify = this.getStorage('isVerify');
      this.mobile = this.getStorage('mobile');
    },
    methods: {
      logout: function () {
        this.$messagebox({
          title: '提示',
          message: '确定要退出登录',
          showConfirmButton: 'true',
          showCancelButton: 'true',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then((res) => {
          if(res == 'cancel'){
            return;
          }else if(res == 'confirm'){
            this.$http({
              method: 'get',
              url:this.API_HOST+'/user/set/logout',
            }).then( (res) => {
              if(res.data.code == '0000'){
                this.$router.push('/');
              }else{
                console.log(res.data);
                alert(res.data.msg);
              }
            }).catch( (res) => {
              console.log(res);
              alert(res.data.msg);
              this.$router.push('/');
            })
          }
        }).catch((res) => {
          console.log(res);
          alert(res.data.msg);
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'personal_center.less';
</style>
