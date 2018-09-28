<template>
  <div class="pay_certification">
    <div class="certification_list">
      <div class="list_one">
        <span>短信动态验证</span>
        <div>
          <mt-switch v-model="certificationSelect" v-on:change="changeCertification(0)"></mt-switch>
        </div>
      </div>
      <div class="list_one">
        <span>支付密码验证</span>
        <div ><!--v-on:click="personalCertification"-->
          <mt-switch v-model="noCertificationSelect" v-on:change="changeCertification(1)"></mt-switch>
        </div>
      </div>
    </div>
    <div class="bg" v-if="bgShow"></div>
  </div>
</template>
<script>
  export default {
    name: 'payCertification',
    data () {
      return {
        certificationSelect: true,//控制两个switch的状态
        isPayPwd: '',//获取是否有支付密码
        isSecurity: '',//获取当前的支付验证方式
        isVerify: '',//获取当前实名认证情况
        bgShow: true,
        noCertificationSelect: false
      }
    },
    /*watch: {
      certificationSelect: function () {
          this.certificationSelect = !this.noCertificationSelect;
      },
      noCertificationSelect: function () {
        this.noCertificationSelect = !this.certificationSelect;
      },
    },*/
    mounted () {
      /*
      * 接口： 用户中心
      * 请求方式： POST
      * 接口： /user/center/usercenter
      * 参数： null
      * */
      this.$http({
        method: 'post',
        url: process.env.API_ROOT + 'user/center/usercenter',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // post请求
        }
      }).then((res)=>{
        this.isPayPwd = res.data.data.isPayPwd;
        this.isSecurity = res.data.data.isSecurity;
        this.isVerify = res.data.data.isVerify;
        if(this.isSecurity == '1'){
          this.certificationSelect = true;
          this.noCertificationSelect= false
        }else{
          this.certificationSelect = false;
          this.noCertificationSelect= true
        }
        setTimeout(()=>{
          this.bgShow = false;
        },1500);
      }).catch((res)=>{
        console.log(res);
      })
    },
    methods: {
      changeCertification: function (num) {//num为0 第一个 num为1 第二个


        var thisA,thisB;


        if(num==0){

            thisB=this.certificationSelect;

            thisA=!this.certificationSelect;

          setTimeout(function () {

              this.certificationSelect=thisB;

              this.noCertificationSelect=thisA

              changeCer()

            }.bind(this),100)


        }

        else {

           thisB=this.noCertificationSelect;

          thisA=!this.noCertificationSelect;

          setTimeout(function () {

            this.noCertificationSelect=thisB;

            this.certificationSelect=thisA

            changeCer()

          }.bind(this),100)

        }





        var _this=this;

        function changeCer() {

          var msgMode;//设定短信验证状态
          var pwdMode;//设定密码验证状态
          if(_this.personalCertification()){
            if(_this.certificationSelect){
              msgMode = 1;
              pwdMode = 0;
            }else{
              msgMode = 0;
              pwdMode = 1;
            }
            /*
             * 接口： 修改支付验证方式
             * 请求方式： POST
             * 接口： /user/set/updatepaymode
             * 参数： msgMode,pwdMode
             * */
            _this.$http({
              method: 'post',
              url: process.env.API_ROOT + 'user/set/updatepaymode',
              header: {
                'content-type': 'application/x-www-form-urlencoded', // post请求
              },
              params: {
                msgMode: msgMode,
                pwdMode: pwdMode
              }
            }).then((res)=>{
              console.log(res);
              _this.$toast({
                message: res.data.msg,
                position: 'bottom',
                duration: 1500
              });
            }).catch((res)=>{
              console.log(res);
            });
          }
        }

      },
      personalCertification: function () {
        if(this.isVerify == 0 || this.isVerify == 3){//未认证状态，先认证
          setTimeout(()=>{//直接设定后面变量赋值出现问题
            //this.certificationSelect = !this.certificationSelect;
            this.certificationSelect = true;
            this.noCertificationSelect=false
          },300);
          this.$messagebox({
            title: '提示',
            message: '当前账户尚未进行实名认证，完成实名认证后即可设置支付密码',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: '去认证',
            cancelButtonText: '取消',
            cancelButtonClass:'cancel_btn',
            confirmButtonClass:'confirm_btn_orange',
          }).then((res) => {
            if(res == 'cancel'){
              return false;
            }else if(res == 'confirm'){
              this.setStorage('hrefId','4');
              this.$router.push('/certification');
            }
          });
          return false;
        }else if(this.isVerify == 2){//认证审核中，等待审核
          setTimeout(()=>{
            //this.certificationSelect = !this.certificationSelect;
            this.certificationSelect = true;
            this.noCertificationSelect=false
          },300);
          this.$messagebox({
            title: '提示',
            message: '实名认证审核中，审核通过后即可设置支付密码',
            confirmButtonText: '我知道了',
            confirmButtonClass:'confirm_btn_orange',
          });
          return false;
        }else{
          if(this.isPayPwd == 0){
            setTimeout(()=>{
              //this.certificationSelect = !this.certificationSelect;
              this.certificationSelect = true;
              this.noCertificationSelect=false
            },300);
            this.$messagebox({
              title: '提示',
              message: '还未设置支付密码，设置后即可开启',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: '去设置',
              cancelButtonText: '取消',
              cancelButtonClass:'cancel_btn',
              confirmButtonClass:'confirm_btn_orange',
            }).then((res)=>{
              if(res == 'cancel'){
                return;
              }else if(res == 'confirm'){
                this.setStorage('paySettingHref','4');
                this.$router.push("/code");
              }
            });
            return false;
          }
        }
        return true;
      }
    },
    destroyed (){
      this.$messagebox.close();
    }
  }
</script>
<style lang="less" scoped>
  @import "pay_certification.less";
</style>
<style>
  .mint-switch-input:checked +  span.mint-switch-core{
     background-color: #ff7d37;
     border-color: #ff7d37;
   }
</style>
