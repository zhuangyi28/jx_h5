 <template>
  <div class="task_news">

    <div class="name_title">

      <div class="title before_border">任务名称</div>

      <div class="content" v-on:click="lookTaskDetailFn">
        <div>{{taskName}}</div>
        <div class="color_text">查看</div>
      </div>

    </div>

    <div class="task_details">

      <div class="title before_border">消息列表</div>
      <div class="list">
        <div class="list_detail" v-for="item in taskList">
          <div class="picture"><img src="../../../../static/images/task_news.png"></div>
          <div class="details">
            <div>{{item.msgContent}}</div>
            <div>{{item.createDate|fmtDateStr}}</div>
          </div>

        </div>
      </div>




    </div>



  </div>
</template>
<script>
  export default {

    name: 'taskNews',

    data(){

      return {

        limit: {},//接口参数

        taskName:'',//任务名称

        taskList:[],//接口获得的数组

        pageSize:10,//一页数量

        pageNum: 1,//接口数据页目录

        moreData: true,//是否还有更多数据

        loading: false


      }
    },

    mounted: function () {


      this.init()

      this.taskName = this.getStorage('taskName')


    },



    methods: {

      //初始化加载
      init:function () {


          /**
           * 接口：获取工资条反馈详情
           * 请求方式：POST
           * 接口：/salary/home/feedbackdetail
           * 入参：salaryDetailId
           **/

          this.$http({

            method: 'post',

            url: process.env.API_ROOT + 'salary/home/feedbackdetail',

            params: {

              salaryDetailId: this.getStorage('salaryDetailId'),
            }



          }).then((res)=>{

            console.log(res.data)

            var list = res.data.data;

            this.setStorage('taskId',res.data.data[0].taskId);

            if (!list) {

              this.taskList= []//反馈消息列表

            }

            else {

              this.taskList= list;//反馈消息列表


            }





          }).catch((res)=>{})



        },


      //查看任务详情
      lookTaskDetailFn:function () {

        this.$router.push('/taskDetail')


      },




    }
  }

</script>
<style lang="less" scoped>

  @import "task_news.less";

</style>
