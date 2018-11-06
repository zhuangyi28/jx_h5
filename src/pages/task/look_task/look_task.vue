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
      <div class="file">
        <a v-bind:href="url" v-bind:download="taskDetail.originalFileNames">
          <img src="../../../../static/images/jx_task_files.png">
          <p>{{taskDetail.originalFileNames}}</p>
        </a>
      </div>
      <!-- 补充内容-->
      <div class="tips_title">补充内容</div>
      <div class="tips_content">补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢补充什么内容呢</div>
    </div>

    <!-- 名称-->
    <div class="name">
      <div class="icon"><img src="../../../../static/images/jx_mine_image.png"/></div>
      <div class="people">
        <div>{{userName}}</div>
        <div><span><img src="../../../../static/images/jx_people_authentication.png"/>已认证</span></div>
      </div>
    </div>
    <div class="task_btn_area">
      <!-- 按钮-->
      <orange-btn :name="btnName" v-on:clickEvent="cancelRegistrationFn"></orange-btn>
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

        btnName: '取消报名',

        taskId: '',

        taskDetail: '',

        url: '',

        userName: ''

      }
    },
    mounted () {

      this.userName = localStorage.getItem('userName');

      this.taskId = localStorage.getItem('taskId');

      this.getData();

    },
    methods:{

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

        }.bind(this)).catch((res)=>{

          console.log(res);

        });

      },



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

      }




    }


  }
</script>
<style lang="less" scoped>
  @import "look_task.less";
</style>
