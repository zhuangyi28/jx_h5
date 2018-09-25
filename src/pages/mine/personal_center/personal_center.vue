<template>
  <div class="personal_center">
    <div class="personal_information">
      <div class="information_list" v-on:click="$router.push('/telChange')">
        <span>账号</span>
        <span class="identification">
            <span class="mobile">{{mobile|plusXing(3,4)}}</span>
            <i class="allow_right"></i>
        </span>


      </div>
      <div class="information_list" v-on:click="$router.push('/certification')">
        <span>实名认证</span>
        <span class="identification">
          <span v-if="isVerify == 0">未认证</span>
          <span v-else-if="isVerify == 1">已认证</span>
          <span v-else-if="isVerify == 2">审核中</span>
          <span v-else-if="isVerify == 3">审核未通过</span>
          <i class="allow_right"></i>
        </span>
      </div>
    </div>

    <orange-btn :name="btnName" v-on:clickEvent="logout"></orange-btn>
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
      this.setStorage('hrefId','1');
    },
    destroyed (){
      this.$messagebox.close();
    },
    methods: {
      logout: function () {
        this.$messagebox({
          title: '提示',
          message: '确定要退出登录',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass:'cancel_btn',
          confirmButtonClass:'confirm_btn_orange',
        }).then((res) => {
          if(res == 'cancel'){
            return;
          }else if(res == 'confirm'){
            this.$http({
              method: 'get',
              url:process.env.API_ROOT+'user/set/logout',
            }).then( (res) => {
                console.log(res.data)
              if(res.data.code == '0000'){
                //清除token
                this.removeStorage('Authorization');
                this.$router.push('/login');
              }else{
                console.log(res.data);
                //alert(res.data.msg);
              }
            }).catch( (res) => {

                //console.log(res);
              //alert(res.data.msg);
              //this.$router.push('/login');
            })
          }
        }).catch((res) => {
          console.log(res);

        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'personal_center.less';

</style>
