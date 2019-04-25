<template>
  <div class="IDCard_certification">
    <div class="IDCard_certification_input">
      <div class="IDCard_title">
        <span v-if="isVerify=='1'&&isHaveUserVerifyImg=='0'">请上传（证件号：{{idNumberAll}}）对应的证件照片</span>
        <span v-else>上传<span v-if="userName">（姓名：{{userName}}）</span>身份证照片，请确保证件照片完整、清晰</span>
      </div>
      <div class="certification_pic_input">
      <div class="img" v-if="faceUrl == './static/images/jx_card_face.png'">
        <div class="color_background"></div>
        <div class="card_background">
          <div class="left_border border_color"></div>
          <div class="right_border border_color"></div>
          <div class="top_border border_color"></div>
          <div class="bottom_border border_color"></div>
          <img v-bind:src="faceUrl">
        </div>
        <div class="face_img"></div>
        <input type="file" name="file" accept="image/*" @change="updateface" class="face_img"/>
      </div>
        <div class="img" v-else>
          <img v-bind:src="faceUrl">
          <input type="file" name="file" accept="image/*" @change="updateface" class="face_img"/>
        </div>
      <div class="title">
        <span>上传身份证正面</span>
        <span v-on:click="exampleImg" class="face color_text">示例</span>
      </div>
    </div>
      <div class="certification_pic_input">
        <div class="img" v-if="backUrl == './static/images/jx_card_back.png'">
          <div class="color_background"></div>
          <div class="card_background">
            <div class="left_border border_color"></div>
            <div class="right_border border_color"></div>
            <div class="top_border border_color"></div>
            <div class="bottom_border border_color"></div>
            <img v-bind:src="backUrl">
          </div>
          <input type="file" name="file" accept="image/*" @change="updateback" class="back_img"/>
        </div>
        <div class="img" v-else>
          <img v-bind:src="backUrl">
          <input type="file" name="file" accept="image/*" @change="updateback" class="back_img"/>
        </div>
        <div class="title">
          <span>上传身份证反面</span>
          <span v-on:click="exampleImg" class="back color_text">示例</span>
        </div>
      </div>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="submit"></orangeBtn>
    <div class="input_ps">此信息仅用于身份验证，平台不会向第三方透露用户信息</div>
    <mt-popup v-model="popupExample">
      <div class="example">
        <div class="example_title">
          证件示例
        </div>
        <div class="example_img">
          <img v-bind:src="exampleUrl">
        </div>
        <div class="example_button">
          <button class="color_text" v-on:click="popupExample = false">确定</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {

    name: 'IDCardCertification',

    components: {

      orangeBtn: orangeBtn

    },

    data () {

      return {

        btnName: '',

        userName: '',

        faceUrl: './static/images/jx_card_face.png',

        backUrl: './static/images/jx_card_back.png',

        popupExample: false,

        exampleUrl: '',

        isVerify:'',//实名认证

        isHaveUserVerifyImg:'',//是否上传图片

        idNumberAll:'',//身份证号码



      }

    },

    mounted () {



      /**
       * 接口：用户中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/

      this.$http({

        method: 'post',

        url: process.env.API_ROOT + 'user/center/usercenter',



      }).then(function(res) {

        console.log(res.data);

        this.isVerify = res.data.data.isVerify;

        this.isHaveUserVerifyImg = res.data.data.isHaveUserVerifyImg;

        this.idNumberAll = res.data.data.idNumberAll;

        (res.data.data.source == 0) && (res.data.data.userName) && (this.userName = res.data.data.userName);

        if(res.data.code=='0000'){

          if(this.isVerify=='1'&&this.isHaveUserVerifyImg=='0'){

              document.title = '补充证件照片'

              this.btnName = '提交'

          }

          else {

            document.title = '实名认证'

            this.btnName = '下一步'
          }




        }


      }.bind(this)).catch(function (error) {}.bind(this))



    },


    methods: {


      updateface1: function (event) {

        var that = this;

        var Event = event;

        var file = event.target.files[0];

        var imgSize = file.size;

        var param = new FormData(); //创建form对象

        param.append('File', file);//通过append向form对象添加数据

          that.$indicator.open({
            text: '上传中,请耐心等待',
            spinnerType: 'fading-circle'
          });

        that.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss', param, {
          headers: {'Content-Type': 'multipart/form-data'}

        }).then((res) => {

          console.log(res.data);

          if (res.data.code == '0000') {



            var imgUrl = res.data.data.url;

            (function () {

              var img = new Image();

                img.onload = function () {

                  that.$indicator.close();

                  setTimeout(function () {

                    that.$toast({

                      message: '上传成功',
                      position: 'middle',
                      duration: 1500
                    });

                  },500)





                if (Event.target.classList.contains('face_img')) {

                  that.faceUrl = res.data.data.url;

                }

                else if (Event.target.classList.contains('back_img')) {


                  that.backUrl = res.data.data.url;

                }

                //console.log("img is loaded")



              };

              img.onerror = function () {

                that.$indicator.close();

                that.$toast({
                  message: '上传失败，页面自动刷新后请重试',
                  position: 'middle',
                  duration: 1500
                });

                setTimeout(function () {

                  window.location.reload();

                },1000)



              };

              img.src = imgUrl;

            })();

          }
        }).catch((res)=>{})

/*          lrz(file, {
            width : 800,
            quality: 0.8   //自定义使用压缩方式
          })
            .then(function(rst) {
              //成功时执行
              console.log(rst)

              var thisfiles = new window.File([rst.file], file.name, {type: file.type})


              var param = new FormData(); //创建form对象

              param.append('File', thisfiles);//通过append向form对象添加数据

              if(rst.file.size>1024*1024*2){

                  that.$toast({

                    message: '文件大于2M，请重新上传！',
                    position: 'middle',
                    duration: 1500

                  })

              }
              else {*/
/*

                that.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss', param, {
                  headers: {'Content-Type': 'multipart/form-data'}

                }).then((res) => {

                  console.log(res.data);

                  if (res.data.code == '0000') {

                    var imgUrl = res.data.data.url;


                    (function () {

                      var img = new Image();

                      img.onload = function () {

                        loading.close();

                        that.$toast({

                          message: '上传成功',
                          position: 'middle',
                          duration: 1500
                        });

                        if (Event.target.classList.contains('face_img')) {

                          that.faceUrl = res.data.data.url;

                        }

                        else if (Event.target.classList.contains('back_img')) {


                          that.backUrl = res.data.data.url;

                        }

                          //console.log("img is loaded")



                      };

                      img.onerror = function () {

                        loading.close();

                        that.$toast({
                          message: '上传失败，页面自动刷新后请重试',
                          position: 'middle',
                          duration: 1500
                        });

                        setTimeout(function () {

                          window.location.reload();

                        },1000)



                      };

                      img.src = imgUrl;

                    })();
*/



                    /*that._http({

                      method: 'get',

                      url: imgUrl,

                    }).then(function(res) {


                      loading.close();

                      console.log(res)

                      that.$toast({

                        message: '上传成功',
                        position: 'middle',
                        duration: 1500
                      });

                      if (Event.target.classList.contains('face_img')) {

                        that.faceUrl = res.data.data.url;

                      }

                      else if (Event.target.classList.contains('back_img')) {


                        that.backUrl = res.data.data.url;

                      }



                    }).catch((res)=>{

                      console.log(res);

                    })*/




              //}

 /*             }).catch(function(error) {
              //失败时执行
            }).always(function() {
              //不管成功或失败，都会执行
            })
*/








      },

      photoCompress:function(file,obj,callback){
        let that=this;
        let ready=new FileReader();
        /*开始读取指定File对象中的内容. 读取操作完成时,返回一个URL格式的字符串.*/
        ready.readAsDataURL(file);
        ready.onload=function(){
          let re=this.result;
          that.canvasDataURL(re,obj,callback)  //开始压缩
        }
      },

      canvasDataURL(path, obj, callback){

        let img = new Image();
        img.src = path;
        img.onload = function(){
          let that = this;   //指到img
          // 默认按比例压缩
          let w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          let quality = 0.7;  // 默认图片质量为0.7
          //生成canvas
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          // 创建属性节点
          let anw = document.createAttribute("width");
          anw.nodeValue = w;
          let anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
          callback(base64);
        }
      },
      /*这里转blob*/
      base64UrlToBlob:function(urlData){
        let arr = urlData.split(','),
          mime = arr[0].match(/:(.*?);/)[1],  // 去掉url的头，并转化为byte
          bstr = atob(arr[1]),    // 处理异常,将ascii码小于0的转换为大于0
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
        //转file
        //return new File([u8arr], filename, {type:mime});
      },
      /*上传正面*/
      updateface:function(e) {    //选择文件后执行
        let that=this
        let fileObj=e.target.files[0]  //获取file
        console.log(fileObj)
        var form = new FormData();  // 创建FormData 对象
        if(fileObj.size/1024 > 1025) { //文件大于1M（根据需求更改），进行压缩上传
          that.photoCompress(fileObj, {   //调用压缩图片方法
            quality: 0.2
          }, function(base64Codes){
            //console.log("压缩后：" + base.length / 1024 + " " + base);
            let bl = that.base64UrlToBlob(base64Codes);
            console.log(bl)
            form.append("File", bl, "File_"+Date.parse(new Date())+".jpg"); // 文件对象
            that.imgRequest(form,'face')

          });
        }else{ //小于等于1M 原图上传
          form.append("File", fileObj); // 文件对象
          that.imgRequest(form,'face');   //请求图片上传接口
        }
      },
      /*上传反面面*/
      updateback:function(e) {    //选择文件后执行
        let that=this
        let fileObj=e.target.files[0]  //获取file
        console.log(fileObj)
        var form = new FormData();  // 创建FormData 对象
        if(fileObj.size/1024 > 1025) { //文件大于1M（根据需求更改），进行压缩上传
          that.photoCompress(fileObj, {   //调用压缩图片方法
            quality: 0.2
          }, function(base64Codes){
            //console.log("压缩后：" + base.length / 1024 + " " + base);
            let bl = that.base64UrlToBlob(base64Codes);
            console.log(bl)
            form.append("File", bl, "File_"+Date.parse(new Date())+".jpg"); // 文件对象
            that.imgRequest(form,'back')

          });
        }else{ //小于等于1M 原图上传
          form.append("File", fileObj); // 文件对象
          that.imgRequest(form,'back');   //请求图片上传接口
        }
      },

      imgRequest:function(param,type){

        let that =this;

        let Event = event;

        that.$indicator.open({
          text: '上传中,请耐心等待',
          spinnerType: 'fading-circle'
        });



        that.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss', param, {
          headers: {'Content-Type': 'multipart/form-data'}

        }).then((res) => {

          console.log(res.data);

          if (res.data.code == '0000') {

            var imgUrl = res.data.data.url;

            (function () {

              var img = new Image();

              img.onload = function () {



                that.$indicator.close();

                setTimeout(function () {

                  that.$toast({

                    message: '上传成功',
                    position: 'middle',
                    duration: 1500
                  });

                },500);

                if(type=='face'){

                  that.faceUrl = res.data.data.url;

                }

                else if(type=='back'){

                  that.backUrl = res.data.data.url;

                }

                /*               if () {

                 that.faceUrl = res.data.data.url;

                 }


                 else if (Event.target.classList.contains('back_img')) {


                 that.backUrl = res.data.data.url;

                 }*/

                //console.log("img is loaded")



              };

              img.onerror = function () {

                that.$indicator.close();

                that.$toast({
                  message: '上传失败，页面自动刷新后请重试',
                  position: 'middle',
                  duration: 1500
                });

                setTimeout(function () {

                  window.location.reload();

                },1000)



              };

              img.src = imgUrl;

            })();

          }
        }).catch((res)=>{})


      },




      exampleImg: function () {

        if(event.currentTarget.classList.contains('back')){
          this.exampleUrl = './static/images/jx_idCard_back_example.png'
        }
        else if(event.currentTarget.classList.contains('face')){
          this.exampleUrl = './static/images/jx_idCard_face_example.png'
        }

        this.popupExample = true;

      },



      submit: function () {

        /*faceUrl: './static/images/jx_card_face.png', backUrl: './static/images/jx_card_back.png',*/
        if(this.faceUrl == './static/images/jx_card_face.png'){

          this.$toast({

            message: '请上传身份证正面照片',

            position: 'middle',

            duration:1500

          });

        }else if(this.backUrl == './static/images/jx_card_back.png'){

          this.$toast({

            message: '请上传身份证反面照片',

            position: 'middle',

            duration:1500

          });

        }else{

          if(this.isVerify=='1'&&this.isHaveUserVerifyImg=='0'){


            this.$indicator.open({
              text: '证件信息核对中...',
              spinnerType: 'fading-circle'
            });

          }

          else {


            this.$indicator.open({
              text: '图片信息读取中...',
              spinnerType: 'fading-circle'
            });
          }





          /**
           * 接口：保存用户证件URL
           * 请求方式：POST
           * 接口：/user/center/orc/userverify
           * 入参：urls
           **/

          this.$http({

            method: 'post',

            url:process.env.API_ROOT+'user/center/orc/userverify',

            params: {

              urls: this.faceUrl + ',' + this.backUrl,

              idType: 1

            }

          }).then(function (res) {

            if(res.data.code == -1){

              this.$toast({

                message: res.data.msg,

                position: 'middle',

                duration: 1500

              });

              this.$indicator.close();

            }else if(res.data.code == '0000'){

              this.$indicator.close();

              this.$store.state.imageUrl = this.faceUrl + ',' + this.backUrl;

              this.$store.state.personInformation = res.data.data;

              if(this.isVerify=='1'&&this.isHaveUserVerifyImg=='0'){

                this.$router.go(-1);

                this.$toast({

                  message: '身份证照片上传成功',

                  position: 'middle',

                  duration: 3500

                });


              }

              else {

                this.$router.push('/IDCardInformation');
              }




            }

          }.bind(this));

        }

      }


    }

  }
</script>
<style lang="less" scoped>
  @import "IDCard_certification.less";
</style>
