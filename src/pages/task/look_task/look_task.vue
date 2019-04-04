<template>
  <div class="look_task">
    <!-- 编号-->
    <div class="task_no">任务编号：<span>{{taskDetail.taskId}}</span></div>
    <!-- 详细-->
    <div class="task_detail">
      <div class="title before_border">{{taskDetail.taskName}}</div>
      <div class="sort">
        <span><i class="iconfont color_text icon-form_star"></i>{{taskDetail.type}}</span>
        <span><i class="iconfont color_text icon-form_star"></i>{{taskDetail.industry}}</span>
      </div>
      <div class="detail">
        <div>
          <p class="color_text">￥<span>{{taskDetail.taskMinUnit}}</span><span v-if="taskDetail.taskMinUnit != taskDetail.taskMaxUnit">-{{taskDetail.taskMaxUnit}}</span></p>
          <p>预算</p>
        </div>
        <div>
          <p class="color_text">{{taskDetail.peopleCount}}<span v-if="taskDetail.peopleCount != '不限'">人</span></p>
          <p>需要人数</p>
        </div>
        <div>
          <p class="color_text">{{taskDetail.abortDate}}</p>
          <p>截止时间</p>
        </div>
      </div>
      <div class="buttonState">
        <!-- 已结束-->
        <img src="../../../../static/images/jx_finish.png" v-if="taskDetail.state == 3">
        <!--报名结束-->
        <img src="../../../../static/images/jx_sign_over.png" v-else-if="taskDetail.signupState == 3 && taskDetail.buttonState== 2">
        <!--已报名-->
        <img src="../../../../static/images/jx_already_signup.png" v-else-if="taskDetail.buttonState == 3">
        <!--已被录取-->
        <img src="../../../../static/images/jx_been_hired.png" v-else-if="taskDetail.buttonState == 4">
        <!--未被录取-->
        <img src="../../../../static/images/jx_unemploy.png" v-else-if="taskDetail.buttonState == 5">
        <!--已关闭-->
        <img src="../../../../static/images/jx_closed.png" v-if="taskDetail.state == 4 && taskDetail.buttonState == 1">
      </div>
    </div>
    <!-- 需求描述 -->
    <div class="task_describe">
      <div class="title before_border">需求描述</div>
      <div class="content" v-for="detail in taskDetail.taskDetails">{{detail}}</div>
      <!-- 文件下载 -->
      <div class="file" v-if="originalFileNames">
        <div>附件：</div>
        <a :href ="item.downLoadUrl" v-for="item in filesList">
          <p class="color_text">{{item.name}}</p>
        </a>
      </div>
      <!-- 补充内容-->
      <div class="tips_title" v-if="taskDetail.entTaskAddList">补充内容</div>
      <div class="tips_content" v-for="taskAddtionDetail in taskDetail.entTaskAddList">{{taskAddtionDetail.taskAddtionDetail}}</div>
      <div class="tips_files">
        <div v-if="addListFile">附件：</div>
        <a v-for="fileDetail in entTaskAddList" v-bind:href="fileDetail.file">
          <p class="color_text">{{fileDetail.fileName}}</p>
        </a>
      </div>
    </div>

    <!-- 名称-->
    <div class="name">
      <div class="icon person_bg_color"><img src="../../../../static/images/people.png"/></div>
      <div class="taskCreateInfo">
        <div class="people">
          <div>{{nickName}}</div>
          <div><span class="color_background"><img src="../../../../static/images/jx_people_authentication.png"/>已认证</span></div>
        </div>
        <div class="createDate">发布时间：{{taskDetail.createDate}}</div>
      </div>
    </div>
    <div class="task_btn_area">
      <!-- 按钮-->
      <orange-btn :name="btnName" v-on:clickEvent="handleClick" v-if="taskDetail.buttonState == 6"></orange-btn>
      <div class="gray_btn" v-else-if="taskDetail.buttonState == 7">
        <div>报名</div>
      </div>
      <div class="jump_to btn_border" v-else v-on:click="$router.push({path: '/taskDetail', query: {taskId: taskId}})">查看任务详情</div>
    </div>

    <mt-popup v-model="popupShow">

      <div class="protocol">

        <div class="title">自由职业者入驻协议</div>

        <div class="content">
          感谢您使用众包平台，在使用本服务前，请您务必认真阅读
          <span v-on:click="$router.push('/protocol')">《自由职业者入驻协议》</span>
          ，同意后方可继续报名参加众包任务。
        </div>

        <div class="button">
          <div class="cancel" v-on:click="popupShow = false">不同意</div>
          <div class="confirm" v-on:click="protocolAgree">&nbsp;&nbsp;同意&nbsp;&nbsp;</div>
        </div>

      </div>

    </mt-popup>

  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'lookTask',
    components: {
      orangeBtn: orangeBtn
    },
    data () {

      return{

        btnName: '报名',//按钮名称

        taskId: '',//任务编号

        taskDetail: '',//任务详情

        url: '',//文件链接

        nickName: '',//企业名称

        relId: '',//任务用户关联Id

        filesList:[],//文件列表

        entTaskAddList: [], //补充文件列表

        originalFileNames:[],

        addListFile:'',

        popupShow: false

      }
    },
    mounted () {

      if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

        location.href = location.href.split('#')[0] +'#'+ this.$route.fullPath;

        console.log('isIOS');

      }

      this.popupShow = this.$store.state.popupShow;

      this.taskId = this.$route.query.taskId;

      localStorage.setItem('taskId',this.taskId);

      this.$parent.detailShow = false;

      this.getData();

      if(this.getStorage('personalInformationAlready')){

        this.$messagebox({
          title: '提示',
          message: '您已完善个人履历，确认报名参加该任务？',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '暂不',
          closeOnClickModal: false,
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then(function (res) {

          if(res == 'confirm'){

            this.signUp();

          }

        }.bind(this)).catch(res=>{

          console.log(res);

        });

        this.removeStorage('personalInformationAlready');

      }

    },
    destroyed(){

      this.$store.state.popupShow = this.popupShow;

      this.$messagebox.close();

      this.$parent.detailShow = true;
    },
    methods:{
      //取消报名
      cancelRegistrationFn:function () {


        this.$messagebox({
          title: '提示',
          message: '确定取消报名？',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then(function (res) {

          if(res == 'confirm'){

            this.$http({

              method: 'post',

              url: process.env.API_ROOT + 'user/task/cancel/enroll',

              header: {

                'content-type': 'application/x-www-form-urlencoded'

              },

              params: {

                relId: this.relId

              }

            }).then(function (res) {

              console.log(res);

              if(res.data.code == '0000'){

                this.$toast({

                  message: res.data.msg,

                  position: 'bottom',

                  duration: 1500

                });

                this.btnName = '报名';

                this.taskDetail.buttonState = 6;

              }

            }.bind(this));

          }

        }.bind(this))

      },
      //获取任务详情
      getData: function () {

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'task/home/gettaskdetail',

          header: {

            'content-type': 'application/x-www-form-urlencoded'

          },

          params: {

            taskId: this.taskId

          }

        }).then(function (res) {

          console.log(res);

          this.taskDetail = res.data.data.list[0];

          this.taskDetail.abortDate = this.timeChange(this.taskDetail.abortDate);

          this.taskDetail.createDate = this.timeChange(this.taskDetail.createDate);

          this.taskDetail.type = this.typeChange(+this.taskDetail.type);

          this.taskDetail.industry = this.industryChange(+this.taskDetail.industry);

          this.nickName = this.taskDetail.nickname;

          this.originalFileNames = this.taskDetail.originalFileNames

          if(this.taskDetail.nicknameHide=='0'){

            this.nickName = this.hiddenName(this.nickName);

          }

          this.relId = this.taskDetail.relId;

          if(this.taskDetail.taskDetails){

            this.taskDetail.taskDetails = this.taskDetail.taskDetails.split('\n');
          }

          if(this.taskDetail.originalFileNames||this.taskDetail.taskFile){

            let pArray = res.data.data.list[0].originalFileNames.split(",");//文件名转为数组

            let urlArray = res.data.data.list[0].taskFile.split(",");//文件url转为数组


            let _Array = [], x,y;

            //循环文件名字
            for (x in pArray) {

              for(y in urlArray){

                if(x==y){

                  _Array.push({

                    name: pArray[x],

                    downLoadUrl:urlArray[y]

                  })

                }
              }


            }

            this.filesList = _Array;

          }
          if(res.data.data.list[0].entTaskAddList){

            for(var entTask of res.data.data.list[0].entTaskAddList){

              if(entTask.originalFileNamesAdd || entTask.taskAddtionFile){

                var fileNames = entTask.originalFileNamesAdd.split(',');

                this.addListFile = fileNames

                var files = entTask.taskAddtionFile.split(',');



                var length = fileNames.length;

                while(length -- ){

                  var obj = {};

                  obj.fileName = fileNames[length];

                  obj.file = files[length];

                  this.entTaskAddList.push(obj);

                }

              }

            }

          }

          console.log('补充列表'+this.entTaskAddList)

        }.bind(this)).catch((res)=>{

          console.log(res);

        });

      },
      //更改时间格式
      timeChange: function (time) {

        if(time == 0){

          return '不限';

        }

        var datetime = new Date(time);

        var year = datetime.getFullYear();

        var month = datetime.getMonth() + 1;

        var day = datetime.getDate();

        if(month<10){

          month = '0' + month;

        }

        if(day<10){

          day = '0' + day;

        }

        return time = year + '-' + month + '-' + day;

      },
      //获取任务分类
      typeChange: function (type) {



        switch(type){

          case 1:

            return '设计/制作/咨询';

          case 2:

            return '市场调研/服务督导/竞品调研';

          case 3:

            return '代驾服务';

          case 4:

            return '软件开发';

          case 5:

            return '跑腿代办';

          case 6:

            return '产品试用/定价调研';

          case 7:

            return '中介服务';

          case 8:

            return '其他';

          case 9:

            return '会展服务';

          case 10:

            return '技术服务';

          case 11:

            return '运输配送';

          case 12:

            return '运营策划';

          case 13:

            return '生活服务';

          case 14:

            return '影视剧务';

          case 15:

            return '文化传播';

          case 16:

            return '销售/营销/推广';

          case 17:

            return '医疗健康';

          case 18:

            return '旅游';

          case 19:

            return '采购/贸易';

          case 20:

            return '生产制造';

          case 21:

            return '前台/接待';

          case 22:

            return '物业/家政/保洁/保安';

          case 23:

            return '酒店/餐饮';

          case 24:

            return '新闻/媒体/娱乐/广告';

          case 25:

            return '维修服务';

          case 26:

            return '运动健身';

          case 27:

            return '会计/金融/保险';

          case 28:

            return '物流/仓储';

          case 29:

            return '建筑/房地产';

          case 30:

            return '人事/行政/高级管理';

          case 31:

            return '美容保健/运动健身/休闲娱乐';

          case 32:

            return '艺术/摄影';

          default:

            return '其他';

        }

      },
      //获取任务行业
      industryChange: function (industry) {

        /*"1",  "互联网IT/电子/通信"
         "2",  "广告/传媒/文化/体育"
         "3",  "金融"
         "4",  "房地产/建筑"
         "5",  "消费品"
         "6",  "汽车/机械/制造业"
         "7",  "服务业"
         "8",  "交通/物流/贸易/零售"
         "9",  "教育培训"
         "10",  "其他"*/

        switch (industry) {

          case 1:

            return '互联网IT/电子/通信';

          case 2:

            return '广告/传媒/文化/体育';

          case 3:

            return '金融';

          case 4:

            return '房地产/建筑';

          case 5:

            return '消费品';

          case 6:

            return '汽车/机械/制造业';

          case 7:

            return '服务业';

          case 8:

            return '交通/物流/贸易/零售';

          case 9:

            return '教育培训';

          case 10:

            return '其他';

        }

      },
      //报名
      signUp: function () {

        /**
         * 接口：用户报名
         * 请求方式：POST
         * 接口：/user/task/add/taskuserrel
         * 入参：taskId
         **/

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/task/add/taskuserrel',

          header: {

            'content-type': 'application/x-www-form-urlencoded'

          },

          params: {

            taskId: localStorage.getItem('taskId')

          }

        }).then(function (res) {

          console.log(res);

          if(res.data.code == '0000'){

            this.$toast({
              message: '报名成功',
              position: 'bottom',
              duration: 1500
            });

            this.taskDetail.buttonState = 3;

          }else{

            this.$toast({

              message: res.data.msg,
              position: 'bottom',
              duration: 1500

            })

          }

        }.bind(this));

      },
      //获取按键状态
      /* btnNameChange: function (name) {

       if(name == 6){

       return '报名';

       }else{

       return '查看任务详情';

       }

       },*/
      //隐藏企业名称
      hiddenName: function (name) {

        var entName = name;

        if(entName.length > 2){

          entName = entName.split('');

          entName = entName[0] + '****' + entName[entName.length-1];

          return entName;

        }else{

          return '******';

        }

      },
      //按键点击事件
      handleClick: function () {

        if(!localStorage.getItem('Authorization')){

          this.$router.push('/login');

        }else{

          if(this.taskDetail.buttonState == 6){

            /**
             * 接口：用户中心
             * 请求方式：POST
             * 接口：/user/center/usercenter
             * 入参：null
             **/

            this.$http({

              method: 'post',

              url: process.env.API_ROOT + 'user/center/usercenter',

            }).then((res)=>{

              console.log(res);

              if(res.data.data.isVerify == 0 || res.data.data.isVerify == 3){

                this.$messagebox({
                  message: '未实名认证用户，需先完成实名认证才可报名',
                  showCancelButton: true,
                  showConfirmButton: true,
                  confirmButtonText: '去认证',
                  cancelButtonText: '取消',
                  cancelButtonClass: 'cancel_btn',
                  confirmButtonClass: 'confirm_btn_orange'
                }).then(function (res) {

                  if(res == 'confirm'){

                    this.$router.push('/certificationChoose');

                    return;

                  }

                }.bind(this))

              }else if(res.data.data.isVerify == 2){

                this.$messagebox({
                  message: '实名认证审核中，审核通过后即可报名',
                  showConfirmButton: true,
                  confirmButtonText: '确定',
                  cancelButtonClass: 'cancel_btn',
                })

              }else{

                if(res.data.data.isCommitAuthorize == 0){

                  this.popupShow = true;

                }else{

                  if(res.data.data.isHaveResume == 0){

                    this.$messagebox({
                      title: '完善个人履历',
                      message: '丰富的技能标签，精彩的个人介绍，可以增加企业录用的概率',
                      showCancelButton: true,
                      showConfirmButton: true,
                      confirmButtonText: '去完善',
                      cancelButtonText: '取消',
                      cancelButtonClass: 'cancel_btn',
                      confirmButtonClass: 'confirm_btn_orange'
                    }).then((res)=>{

                      if(res == 'confirm'){

                        localStorage.setItem('lookTaskToPersonInformation','true');

                        this.$router.push('/personInformation');

                      }

                    });

                  }else if(res.data.data.isHaveResume == 1){

                    this.$messagebox({
                      message: '确认报名参加该任务？',
                      showCancelButton: true,
                      showConfirmButton: true,
                      confirmButtonText: '确认',
                      cancelButtonText: '取消',
                      cancelButtonClass: 'cancel_btn',
                      confirmButtonClass: 'confirm_btn_orange'
                    }).then((res)=>{

                      if(res == 'confirm'){

                        this.signUp();

                      }

                    });

                  }

                }

              }

            });

          }

        }



      },

      //同意协议
      protocolAgree: function () {

        /**
         * 接口：用户同意广场授权
         * 请求方式：POST
         * 接口：/user/task/commit/usertaskaggree
         * 入参：isCommitAuthorize
         **/

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/task/commit/usertaskaggree',

          params: {

            isCommitAuthorize: 1

          }

        }).then(function (res) {

          if(res.data.code == '0000'){

            this.popupShow = false;

          }else{

            console.log(res);

          }

        }.bind(this)).catch((res)=>{

          console.log(res);

        });

      }

      /*downloadFile: function () {

       // 创建隐藏的可下载链接
       var eleLink = document.createElement('a');
       eleLink.download = event.currentTarget.dataset.url;
       eleLink.style.display = 'none';
       // 字符内容转变成blob地址
       var blob = new Blob();
       eleLink.href = URL.createObjectURL(blob);
       // 触发点击
       document.body.appendChild(eleLink);
       eleLink.click();
       // 然后移除
       document.body.removeChild(eleLink);

       }*/




    }


  }
</script>
<style lang="less" scoped>
  @import "look_task.less";
</style>
