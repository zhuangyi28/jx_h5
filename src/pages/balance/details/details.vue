<template>

  <div class="details" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">

    <div class="cell" v-for="item in balanceList">

      <div>
        <p v-if="item.transType==1">工资发放</p>
        <p v-else-if="item.transType==8">余额提现</p>
        <p v-else-if="item.transType==5||item.transType==6||item.transType==11">退款</p>
        <p v-else-if="item.transType==3">转账-转入</p>
        <p v-else-if="item.transType==2">转账-转出</p>
        <p v-else-if="item.transType==4">消费</p>
        <p v-else-if="item.transType==10">充值</p>
        <p>{{item.clearingDate|fmtDateStr}}</p>
      </div>

      <div v-bind:class="item.transType==5||item.transType==6||item.transType==11||item.transType==3?'orange':''">{{item.transAmt}}</div>

    </div>

    <div class="loadmore" v-show="!noData">
      <div class="loadmore_tips"><span class="data">{{moreText}}</span></div>
    </div>
    <div class="loadmore" v-show="noData">
      <mt-spinner class="loadmore_icon" type="double-bounce" color="#ababab" :size="16"></mt-spinner>
      <div class="loadmore_tips">正在加载</div>
    </div>



  </div>



</template>
<script>

  export default{

    name: 'detailBill',


    data(){

      return {

        balanceList: [],//工资明细

        pageNum:1,//第几页

        pageSize:10,//一页几个

        moreText: '没有更多数据啦~',//无数据显示暂无数据

        noData: true,//是否显示暂无数据 false为隐藏 true为显示

        moreLoading: false,//上拉加载


      }
    },

    mounted () {

      this.init();

    },
    methods: {

      init: function () {

        this.loadList();

      },

      loadList:function () {


        if(this.noData) {//如果数据没有见底

          /**
           * 接口：
           * 请求方式：GET
           * 接口：user/account/clearing
           * 入参：userClearId
           **/

          this.$http({

            method: 'get',

            url: process.env.API_ROOT + 'user/account/clearing',

            params:{

              pageNum: this.pageNum,

              pageSize: this.pageSize

            }


          }).then((res)=>{

            console.log(res.data)


            var _balanceList = res.data.data.list;


            //转换数据
            function addDList() {

              function comma(num) {

                var source = String(num).split(".");//按小数点分成2部分

                source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");//只将整数部分进行都好分割

                return source.join(".");//再将小数部分合并进来

              }

              for (var j = 0; j < _balanceList.length; j++) {

                _balanceList[j].orderAmount = comma(_balanceList[j].orderAmount)

              }

            }

            //console.log(res.data.data.list)
            //如果没有数据
            if (!this.noData) {


            }

            else if (!res.data.data.list || res.data.data.list.length == 0) {//这一组为空

              if(this.pageNum == '1'){

                this.moreText='暂无数据',//无数据显示暂无数据

                  this.noData= false

              }

              else {


                this.noData= false,

                  this.moreText='没有更多数据啦~'//无数据显示暂无数据

              }



            }


            else if (res.data.data.list.length < 10) {//这一组小于十个


              addDList()

              //增加数组内容

              this.noData= false

              this.balanceList= this.balanceList.concat(_balanceList)



            }
            else {

              console.log('添加1页')

              addDList()
              //增加数组内容

              this.balanceList = this.balanceList.concat(_balanceList),

                this.pageNum = this.pageNum + 1//加一页

            }



          }).catch((res)=>{})



        }

      },

      //上拉加载
      loadMore:function () {

        this.loadList()


      },

    }

  }

</script>

<style lang="less">

  @import "details.less";

</style>
