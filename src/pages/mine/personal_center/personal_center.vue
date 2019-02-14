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
      <div class="information_list" v-on:click="onclickCertificationFn">
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
      this.mobile = this.getStorage('mobile');
      this.setStorage('hrefId','1');



      /**
       * 接口：个人中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/
      this.$http({

        method: 'post',

        url: process.env.API_ROOT + 'user/center/usercenter',



      }).then((res) => {

        console.log(res.data);

        if (res.data.code == '0000') {

          this.setStorage('idNumber', res.data.data.idNumber);

          this.setStorage('isVerify', res.data.data.isVerify);

          this.setStorage('source', res.data.data.source);



            this.mobile= res.data.data.mobile.substr(0, 3) + '****' + res.data.data.mobile.substr(7),

            this.isVerify=res.data.data.isVerify,

            this.idNumber=res.data.data.idNumber


        }
      }).catch((res=>{}))

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
              url:process.env.API_ROOT+'logout',
            }).then( (res) => {
                console.log(res);
              this.removeStorage('Authorization');
              this.removeStorage('jxsid');
              this.removeStorage('taskHistory');
              this.$router.push('/workDesk/mine');
            }).catch( (res) => {

                //console.log(res);
              //alert(res.data.msg);
              //this.$router.push('/login');
            })
          }
        }).catch((res) => {
          console.log(res);

        })
      },
      onclickCertificationFn:function () {


        var _isVerify = this.isVerify

        //console.log(_isVerify)

        //如果为1跳转的页面名字和身份证不能修改

        if(_isVerify=='1'){

          this.$router.push('/certification')


        }

        else if(_isVerify=='0'){

          this.$router.push('/certificationChoose')

        }
        //审核中
        else if(_isVerify=='2'){

          this.$router.push('/certificationSuccess')


        }

        //审核不通过
        else if(_isVerify=='3'){


          this.$router.push('/certificationFail')


        }





      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'personal_center.less';

</style>
