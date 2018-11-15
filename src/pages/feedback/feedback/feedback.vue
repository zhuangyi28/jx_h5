 <template>
  <div class="feedback" >

    <div id="feedbackList">

      <div class="list" v-for="item in feedBackList">

        <div class="people_list" v-bind:class="item.type=='1'? '':'sevice_left'">

          <div class="feedback-time">{{item.sendDate|fmtDateStr}}</div>

          <!-- 用户发起的列表-->
          <div v-if="item.type=='1'" class="tips_box">

            <div><span class="tips">{{item.content}}</span></div>

            <div class="people_img"><img src="../../../../static/images/feedback_mine.png"/></div>

          </div>

          <div v-else-if="item.type=='2'" class="tips_box">

            <div class="people_img"><img src="../../../../static/images/feedback_staff.png"/></div>

            <div><span class="tips">{{item.content}}</span></div>

          </div>



        </div>
      </div>
    </div>


    <div class="feedback_content">
      <div class="input_box"></div>
      <div class="feedback_input">
        <input class="weui-input" v-model="contentTitle"  @focus="focusFn" placeholder="如有疑问，请提交反馈给HR，200字以内" maxlength="200"/>
        <button class="send" v-on:click.stop="sendMsgFn">发送</button>
      </div>

    </div>


  </div>
</template>
<script>
  export default {

    name: 'feedback',

    data(){

      return {

        isIpx: false,//是不是ipx

        fixedInput: false,//输入框input时候获得焦点

        feedBackList: [],//反馈消息列表

        contentTitle: '',//反馈内容

        feedBackId: '',//反馈消息Id

        userFeedBackList: '',

        scrollHeight: '',//scroll-view的高度

        repeatSend: 1,//防止重复提交


      }
    },

    mounted: function () {

      this.init()

      this.scrollBottom()

    },

    updated:function(){

        this.scrollBottom()

    },


    methods: {


      scrollBottom:function () {

          this.$nextTick(() => {

            var container = document.getElementById('feedbackList');

            container.scrollTop = container.scrollHeight;


          })
        },

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

            if (!list) {

                this.feedBackList= []//反馈消息列表


            }

            else {


                this.feedBackList= list;//反馈消息列表




            }





          }).catch((res)=>{})






        },

      sendMsgFn:function () {

         //判断输入内容
         if (!this.contentTitle) {

             this.$toast({

               message: '请输入反馈内容',
               duration: 1500,
               position: 'bottom',


             })



         }


         //控制不重复发送
         else if (this.repeatSend) {

           //控制ajax加载 加载成功之后放开

             this.repeatSend= 0;


           /**
            * 接口：工资条反馈
            * 请求方式：POST
            * 接口：salary/home/feedback
            * 入参：salaryDetailId，salaryId，contentTitle
            *
            **/

           this.$http({

             method: 'post',

             url: process.env.API_ROOT + 'salary/home/feedback',

             params: {

               salaryDetailId: this.getStorage('salaryDetailId'),//工资详情Id

               salaryId: this.getStorage('salaryId'),//工资发放批次Id

               contentTitle: this.contentTitle,//反馈内容

             }
           }).then((res)=>{

               console.log(res.data)

             //成功之后解锁

               this.repeatSend= 1

              if (res.data.code == '0000') {


                this.$toast({

                  message: res.data.msg,
                  duration: 1500,
                  position: 'bottom',


                });



               var userImf = {
                 feedBackDetailId: "1",
                 feedBackId: "123",
                 content: this.contentTitle,
                 type: "1",
                 sendDate: Date.parse(new Date())

               };


               var _list = this.feedBackList;

               _list.push(userImf);

                //消息清空

                 this.contentTitle= '';

                 this.feedBackList=_list;//反馈消息列表


               //平滑到底部

                this.scrollBottom();


             }

             else {


                this.$toast({

                  message:res.data.msg,
                  duration: 1500,
                  position: 'bottom',


                });


             }



           }).catch((res)=>{})



         }


       },

      focusFn:function () {

        this.scrollBottom()
      }

    }
  }

</script>
<style lang="less" scoped>

  @import "feedback.less";

</style>
