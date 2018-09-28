<template>
  <div class="payroll">
    <div class="company_and_money">
      <div class="money">
        <div>{{salaryMonth}}工资（元）</div>
        <div class="wages">{{realAmount|thousandBitSeparator}}</div>
        <div>{{entName}}</div>
      </div>
    </div>

    <div class="money_detail_project_all" >

      <div class="money_detail_project" v-show="salaryType=='6'?false:true">
        <div class="money_detail_project_one special"><span>应发金额</span><span>{{payableAmount|thousandBitSeparator}}</span></div>
      </div>
      <!-- 实发金额 -->
      <div class="money_detail_project">
        <div class="money_detail_project_one special"><span>实发金额</span><span>{{realAmount|thousandBitSeparator}}</span></div>
      </div>

      <!-- 基本信息 -->
      <div class="money_detail_project" v-for="item in salaryDetails">
        <div class="money_detail_project_one"><span>{{item.name}}</span><span>{{item.record|thousandBitSeparator}}</span></div>
      </div>

      </div>

<!--    <div class="money_detail_project_all" >
      &lt;!&ndash; 扣除信息 &ndash;&gt;
      <div class="money_detail_project" v-for="item in subtractAmount">
        <div class="money_detail_project_one"><span>{{item.name}}</span><span>{{item.record|thousandBitSeparator}}</span></div>
      </div>
      &lt;!&ndash; 应发金额 &ndash;&gt;
      <div class="money_detail_project">
        <div class="money_detail_project_one special"><span>实发金额</span><span>{{realAmount|thousandBitSeparator}}</span></div>
      </div>
    </div>-->

    <div class="money_confirm_btn" v-show="isHiddenBtn">


      <div v-if="comfrimBtn==0">


        <div class="button_all">
          <!--需要确认-->

          <orangeBtn :name="btnName1" :class="className" v-on:clickEvent="confirmFn"></orangeBtn>

          <button class="button_left" v-on:click="$router.push('/feedback')">反馈</button>

          <div v-show="hiddenDot" class="dot"></div>


        </div>

        <!--提示-->
        <div class="payroll_prompt">7天后将自动确认以上信息</div>


      </div>



      <div v-else-if="comfrimBtn==1">


        <div class="button_all">
          <!--确认中-->

          <orangeBtn :name="btnName2" :class="className"></orangeBtn>

          <button class=" button_left" v-on:click="$router.push('/feedback')">反馈</button>

          <div v-show="hiddenDot" class="dot"></div>

        </div>


      </div>


      <div v-else>


        <div class="button_all">
          <!--已确认-->

          <orangeBtn :name="btnName3" class="disabled_btn" :class="className">已确认</orangeBtn>

          <button class="button_left" v-on:click="$router.push('/feedback')">反馈</button>

          <div v-show="hiddenDot" class="dot"></div>

        </div>

      </div>

    </div>

  </div>
</template>
<script>

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'payroll',

    components: {

      orangeBtn: orangeBtn,

    },

    data(){

    return{

      //addAmount: [],//应发明细

      //subtractAmount: [],//代扣明细

      salaryDetails:[],//发放明细

      payableAmount: '',//应发金额

      realAmount:'',//实发金额

      salaryDetailId: '',//发薪企业

      salaryMonth: '',//发薪企业年月

      entName:'',//企业名称

      comfrimBtn:0,//其中0是待确认、1是确认中、其他为已确认

      isHiddenBtn:false,//是否显示确认按钮

      state:'',//工资确认状态 1是已确认 0是未确认n

      hiddenDot:false,//默认不显示有新消息 true为显示 false为不显示

      btnName1:'确认工资条',//按钮名称

      btnName2:'确认中',//按钮名称

      btnName3:'已确认',//按钮名称

      className:'middle_btn',

      salaryType:''//默认不显示有新消息 true为不显示 false为显示


    }

  },
    mounted(){

      var thisSalaryDetailId = this.getStorage('salaryDetailId');

      /**
       * 接口：工资发放明细
       * 请求方式：GET
       * 接口：/salary/home/salarydetail
       * 入参： salaryDetailId
       **/

      this.$http({

        method: 'get',

        url:process.env.API_ROOT+'salary/home/salarydetailALL',

        //url:process.env.API_ROOT+'jx/action/register',

        params: {

          salaryDetailId: thisSalaryDetailId,

        }
      }).then((res)=>{

        console.log(res.data);

        //console.log(res.data.data.salaryDetails)

        //缓存salaryId - 反馈页面
       this.setStorage('salaryId',res.data.data.salaryId);

        var _state = res.data.data.state;


        var ishasNewMsg = res.data.data.isHaveNewMsg;

        this.salaryType = res.data.data.salaryType

        var _salaryDetails = JSON.parse(res.data.data.salaryDetails)

        var _salaryDetailsArray = [], x

        for(x in _salaryDetails){

          /*添加数组*/
          _salaryDetailsArray.push({

            name: x,

            record: _salaryDetails[x]

          })

        }



        //将给的数据转成字符串
//        var _addAmount = JSON.parse(res.data.data[0].addAmount);
//
//
//        var _addAmountArray = [], x;
//
//        /*遍历json，产生可以渲染的data*/
//
//        for (x in _addAmount) {
//
//          /*添加数组*/
//          _addAmountArray.push({
//
//            name: x,
//
//            record: _addAmount[x]
//
//          })
//
//        }
//
//        //将给的数据转成字符串
//        var _subtractAmount = JSON.parse(res.data.data[0].subtractAmount);
//
//        var _subtractAmountArray = [], y;
//
//
//        for (y in _subtractAmount) {
//
//          /*添加数组*/
//          _subtractAmountArray.push({
//
//            name: y,
//
//            record: _subtractAmount[y]
//
//          })
//
//
//        }


        //获取entName数据

          this.entName= res.data.data.entName,//企业名称

            this.salaryDetails =_salaryDetailsArray,//工资

          //this.addAmount= _addAmountArray,//基本工资

          this.salaryMonth= res.data.data.salaryMonth,//发薪企业年月

          this.payableAmount= res.data.data.payableAmount,//实发金额

          //this.subtractAmount= _subtractAmountArray,//代扣明细

          this.realAmount= res.data.data.realAmount//实发金额


        //判断是否有新消息

        if (ishasNewMsg == '1') {


            this.hiddenDot= true


        }

        else {


            this.hiddenDot = false


        }


        if (_state == '1') {


            this.comfrimBtn= 2

            this.isHiddenBtn= true



        }

        else if (_state == '0') {


            this.comfrimBtn= 0,

            this.isHiddenBtn= true



        }






      }).catch((res)=>{


      });

    },
    methods:{

      confirmFn:function () {


          var thisSalaryDetailId = this.getStorage('salaryDetailId');

          this.comfrimBtn=1

        var _this = this



        /**
         * 接口：确认工资
         * 请求方式：POST
         * 接口：/salary/home/confirmsalary
         * 入参：salaryDetailId
         **/

        this.$http({

          method: 'post',

          url:process.env.API_ROOT+'salary/home/confirmsalary',

          params: {

            salaryDetailId: thisSalaryDetailId,

          }
        }).then((res)=>{

            console.log(res.data)


          var thisCode = res.data.code;

          if (thisCode == '0000') {

              this.comfrimBtn = 2

          }

          setTimeout(function () {

            //console.log('返回上个页面');

            _this.$router.go(-1)

          }, 1000)



        }).catch((res)=>{


        });





      },

    }
  }

</script>
<style lang="less" scoped>
  @import "payroll.less";

</style>
