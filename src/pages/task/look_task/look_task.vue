<template>
  <div class="look_task">
    <!-- 编号-->
    <div class="task_no">任务编号：<span>{{taskDetail.taskId}}</span></div>
    <!-- 详细-->
    <div class="task_detail">
      <div class="title">{{taskDetail.taskName}}</div>
      <div class="sort">
        <span><img src="../../../../static/images/jx_task_sort.png">{{taskDetail.type}}</span>
        <span><img src="../../../../static/images/jx_task_sort.png">{{taskDetail.industry}}</span>
      </div>
      <div class="detail">
        <div>
          <p>￥<span>{{taskDetail.taskMinUnit}}</span><span v-if="taskDetail.taskMinUnit != taskDetail.taskMaxUnit">-{{taskDetail.taskMaxUnit}}</span></p>
          <p>预算</p>
        </div>
        <div>
          <p>{{taskDetail.peopleCount}}人</p>
          <p>需要人数</p>
        </div>
        <div>
          <p>{{taskDetail.abortDate}}</p>
          <p>截止时间</p>
        </div>
      </div>
    </div>
    <!-- 需求描述 -->
    <div class="task_describe">
      <div class="title">需求描述</div>
      <div class="content">{{taskDetail.taskDetails}}</div>
      <!-- 文件下载 -->
      <div class="file" v-if="url">
        <a v-bind:href="url" v-bind:download="taskDetail.originalFileNames">
          <img src="../../../../static/images/jx_task_files.png">
          <p>{{taskDetail.originalFileNames}}</p>
        </a>
      </div>
      <!-- 补充内容-->
      <div class="tips_title" v-if="taskDetail.taskAddtionDetail">补充内容</div>
      <div class="tips_content" v-if="taskDetail.taskAddtionDetail">{{taskDetail.taskAddtionDetail}}</div>
    </div>

    <!-- 名称-->
    <div class="name">
      <div class="icon"><img src="../../../../static/images/jx_mine_image.png"/></div>
      <div class="people">
        <div>{{entName}}</div>
        <div><span><img src="../../../../static/images/jx_people_authentication.png"/>已认证</span></div>
      </div>
    </div>
    <div class="task_btn_area">
      <!-- 按钮-->
      <orange-btn :name="btnName" v-on:clickEvent="handleClick"></orange-btn>
    </div>

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

        btnName: '',//按钮名称

        taskId: '',//任务编号

        taskDetail: '',//任务详情

        url: '',//文件链接

        entName: ''//企业名称

      }
    },
    mounted () {

      this.taskId = localStorage.getItem('taskId');

      this.getData();

    },
    methods:{

      //取消报名
      cancelRegistrationFn:function () {


        this.$messagebox({
          title: '提示',
          message: '确定取消报名？',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: '查看',
          cancelButtonText: '暂不查看',
          closeOnClickModal: false,
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then(action => {


      })

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

          this.taskDetail.type = this.typeChange(+this.taskDetail.type);

          this.taskDetail.industry = this.industryChange(+this.taskDetail.industry);

          this.url = this.taskDetail.taskFile;

          this.entName = this.taskDetail.entName;

          if(!this.taskDetail.nicknameHide){

            this.entName = '******';

          }

          this.btnName = this.btnNameChange(+this.taskDetail.buttonState);

        }.bind(this)).catch((res)=>{

          console.log(res);

        });

      },



      //更改时间格式
      timeChange: function (time) {

        if(time == 0){

          return '不限时间';

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

        /*"1",  "技术服务"),
          "2",  "设计服务"),
          "3",  "营销/策划服务"),
          "4",  "咨询服务"
          "5",  "电商"
          "6",  "其他"*/

        switch(type){

          case 1:

            return '技术服务';

          case 2:

            return '设计服务';

          case 3:

            return '营销/策划服务';

          case 4:

            return '咨询服务';

          case 5:

            return '电商';

          case 6:

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

          if(res.data.code == '-1'){

            this.$messagebox({
              message: res.data.msg,
              showCancelButton: true,
              showConfirmButton: true,
              confirmButtonText: '去认证',
              cancelButtonText: '取消',
              cancelButtonClass: 'cancel_btn',
              confirmButtonClass: 'confirm_btn_orange'
            }).then(function (res) {

              if(res == 'confirm'){

                this.$router.push('/personInformation');

              }

            }.bind(this));

          }

        }.bind(this));

      },



      //获取按键状态
      btnNameChange: function (name) {

        switch (name) {

          case 1:

            return '已关闭';

          case 2:

            return '已结束';

          case 3:

            return '取消报名';

          case 4:

            return '已被录用';

          case 5:

            return '未被录用';

          case 6:

            return '报名';

        }

      },



      //按键点击事件
      handleClick: function () {

        if(this.taskDetail.buttonState == 6){

          this.signUp();

        }else if(this.taskDetail.buttonState == 3){

          this.cancelRegistrationFn();

        }

      }




    }


  }
</script>
<style lang="less" scoped>
  @import "look_task.less";
</style>
