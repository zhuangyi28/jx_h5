<template>
  <div class="task_feedback">
    <div class="feedback_content">
      <div class="feedback_content_title">反馈内容</div>
      <div class="feedback_content_input">
        <textarea name="" id="" cols="30" rows="6" placeholder="请填写反馈内容（200字以内）" maxlength="200" v-model="feedBackContent"></textarea>
      </div>
    </div>
    <div class="upload_file">
      <div class="upload_file_title">上传凭证<span>（最多上传6个附件）</span></div>
      <div class="upload_file_input">
        <div class="input_file" v-for="(file,index) in files">
          <div class="file_img">
            <img src="../../../../static/images/jx_file.png">
          </div>
          <div class="file_name">{{file.name}}</div>
          <span class="delete_btn" v-on:click="deleteFile(index)" v-bind:data-fileName="file.name"></span>
        </div>
        <div class="input_add" v-if="files.length < 6">
          <input type="file" v-on:change="addFile">
        </div>
      </div>
      <div class="position">
        <img src="../../../../static/images/jx_position.png">
        <span v-if="place">{{place}}</span>
        <span v-else>所在位置</span>
      </div>
    </div>
    <div class="save_btn" v-on:click="keepTaskDetailFn">提交</div>
  </div>
</template>
<script>
  export default {

    name: 'taskFeedback',

    data () {

      return {

        files: [],

        inputFile: '',

        resultUpload: '',//最终图片上传结果

        resultUploadList: [],//图片上传数组

        originalFileName: '',//最终名称上传结果

        originalFileNameList: [],//名字上传数组

        feedBackContent: '',//反馈内容

        longitude: '',//经度

        latitude: '',//纬度

        place: '',//位置

        gpsLocation: ''//转高德坐标


      }

    },


    mounted(){

      var lactionReload = this.getStorage('lactionReload')

      if (lactionReload == '1') {

          console.log('刷新')

        window.location.reload();

        this.setStorage('lactionReload', '0')

      }

      this.init()


    },
    methods: {

      init: function () {

        var self = this;


        /**
         * 接口：获取微信签名
         * 请求方式：POST
         * 接口：user/task/get/weixinsign
         * 入参：url
         **/

        console.log(window.location.href);

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/task/get/weixinsign',

          params: {

            url: window.location.href

          },

        }).then((res) => {

          console.log(res.data)

          console.log('获取签名')

          self.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxee620089167335f6', // 必填，公众号的唯一标识 - 测试版本
            //appId: 'wxee620089167335f6', // 必填，公众号的唯一标识 - 生产版本
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature,// 必填，签名
            jsApiList: ['checkJsApi', 'openLocation', 'getLocation'], // 必填，需要使用的JS接口列表
          });


          self.wx.checkJsApi({
            jsApiList: ['getLocation'],
            success: function (res) {
              if (res.checkResult.getLocation == false) {

                this.$messagebox({
                  title: '提示',
                  message: '你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！',
                  showCancelButton: false,
                  confirmButtonText: '我知道了',
                  confirmButtonClass: 'confirm_btn_orange',
                }).then((action) => {
                }).catch((res) => {
                })
                return;
              }
            }
          });

          self.wx.ready(function () {

            console.log('获得地址详细')

            self.wx.getLocation({

              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'

              success: function (res) {

                this.latitude = res.latitude;// 纬度，浮点数，范围为90 ~ -90

                this.longitude = res.longitude// 经度，浮点数，范围为180 ~ -180


                self.setStorage('pLatitude',res.latitude)

                self.setStorage('pLongitude',res.longitude)


                console.log('纬度' + this.latitude)

                console.log('经度' + this.longitude)

                //转gps
                self.$http({

                  method: 'get',

                  url: 'https://restapi.amap.com/v3/assistant/coordinate/convert',

                  params: {

                    key: '91346f1a20ac9f3db7691f94b8547873',//key值

                    locations: this.longitude + ',' + this.latitude,//key值

                    coordsys: 'gps',

                  }

                }).then((res) => {

                  console.log(res.data)

                  this.gpsLocation = res.data.locations

                  if (res.data.info == 'ok') {


                    //逆编译
                    self.$http({

                      method: 'get',

                      url: 'https://restapi.amap.com/v3/geocode/regeo',

                      params: {

                        key: '91346f1a20ac9f3db7691f94b8547873',//key值

                        location: this.gpsLocation

                      }

                    }).then(function (res) {

                      console.log(res.data);


                      console.log(res.data.regeocode.formatted_address)

                      self.place = res.data.regeocode.formatted_address


                    }.bind(this)).catch((res) => {

                      console.log(res);

                    });

                  }

                }).catch((res) => {
                })


              },
              cancel: function () {

                  console.log('不允许')

                  this.place = '暂无位置'
                // 用户取消后执行的回调函数
              }
            });


          });


        }).catch((res) => {
        })


      },

      addFile: function (event) {

        var thisFile = event.currentTarget.value.split('\\')[2];

        for (var file of this.files) {

          console.log(file);

        }

        //拼接文件
        this.files.push(event.currentTarget.files[0]);

        //拼接文件名称
        this.originalFileNameList.push(event.currentTarget.files[0].name);

        this.originalFileName = this.originalFileNameList.join(",");

        /*        var str = '';

         for(var j = 0;j<this.originalFileNameList.length;j++) {

         str += this.originalFileNameList[j] + ",";

         }

         if (str.length > 0) {
         str = str.substr(0, str.length - 1);
         }

         */


        //上传图片
        var selfFile = event.target.files[0];

        var param = new FormData(); //创建form对象

        param.append('File', selfFile);//通过append向form对象添加数据

        this.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss', param, {
          headers: {'Content-Type': 'multipart/form-data'}

        }).then((res) => {

          console.log(res.data)

          if (res.data.code == '0000') {

            this.$toast({
              message: '上传成功',
              position: 'middle',
              duration: 1500
            });
            //拼接文件url名称
            this.resultUploadList.push(res.data.data.url);
            this.resultUpload = this.resultUploadList.join(",");
          }

        }).catch((res) => {
          }
        )


        // console.log(this.files)


      },

      deleteFile: function (index) {

        this.$messagebox({
          title: '提示',
          message: '确认删除该附件？',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '删除',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then((action) => {

          if (action == 'confirm') {

            this.files.splice(index, 1)

            this.resultUploadList.splice(index, 1);

            this.resultUpload = this.resultUploadList.join(",");


          }
        }).catch
        ((res) => {
        })


      },

      keepTaskDetailFn: function () {



        //判断输入内容
        if (!this.feedBackContent) {

          this.$toast({

            message: '请输入反馈内容',
            duration: 1500,
            position: 'bottom',


          })

        }
        else {

          /**
           * 接口：获取任务详情
           * 请求方式：POST
           * 接口：user/task/addfeedback
           * 入参：taskId,relId,pContent(必填)
           **/

          this.$http({

            method: 'post',

            url: process.env.API_ROOT + 'user/task/addfeedback',

            params: {

              taskId: this.getStorage('taskId'),

              relId: this.getStorage('relId'), pContent: this.feedBackContent,

              originalFileName: this.originalFileName,

              pFiles: this.resultUpload,//附件

              pLongitude: this.getStorage('pLongitude'),//经度

              pLatitude: this.getStorage('pLatitude'),//纬度

              pPlace: this.place,//位置
            },

          }).then((res) => {

            console.log(res.data)
            if (res.data.code == '0000') {

              this.$toast({

                message: res.data.msg,
                duration: 1500,
                position: 'bottom',


              })

              this.$router.go(-1)


            }

          }).catch((res) => {
          })


        }


      },


    }

  }

</script>
<style lang="less" scoped>
  @import "task_feedback.less";
</style>
