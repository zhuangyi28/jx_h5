<template>

  <div class="company">

    <div class="company_content">

      <!--工资列表-->
      <div class="company_form" v-for="item in workUnitList" v-bind:data-ent="item.entId" v-bind:data-state="item.state" v-on:click="isJoinEntFn" >

        <div class="list">

          <div class="name">{{item.entName}}</div>

          <div class="join_gray" v-if="item.state==1">
            <span>已加入</span>
          </div>
          <div class="join_orange" v-else>
            <span>待同意</span>
          </div>

        </div>

        <div v-if="item.state==1"class="time">加入时间：<span>{{item.jionEntDate|fmtDateStr('-')}}</span></div>
        <div v-else class="time">邀请时间：<span>{{item.jionEntDate|fmtDateStr('-')}}</span></div>


      </div>
    </div>

    <div class="loadmore" v-show="noData">
      <div class="company_nocompany_img">
        <img src="../../../../static/images/nocompany_img.png">
        <div>暂无发薪企业</div>
      </div>
    </div>

  </div>






</template>

<script>

  export default {
    name: 'company',
    data(){
      return{

        workUnitList: [],//企业

        state:'',//加入企业状态

        entId:'',

        type:'',//是否锁定

        noData: false,//是否显示暂无数据 true为隐藏 false为显示


      }

    },

    mounted:function () {
      /**
       * 接口：查看工作单位
       * 请求方式：GET
       * 接口：/user/workunit/selectworkunit
       * 入参：null
       **/

      this.$http({

        method: 'get',

        url:process.env.API_ROOT+'user/workunit/selectworkunit',

      }).then((res)=>{

          console.log(res.data)

          this.workUnitList= res.data.data

        //没有企业的话显示暂无数据

        if (this.workUnitList.length == 0) {

            this.noData= true

        }




      })

    },
    methods:{

      isJoinEntFn:function (e) {


          this.entId=e.currentTarget.dataset.ent,

          this.state=e.currentTarget.dataset.state,

          this.setStorage('entId',this.entId);


        /**
         * 接口：锁定状态查询
         * 请求方式：POST
         * 接口：/salary/home/selectlockstatus
         * 入参：null
         **/

        this.$http({

          method: 'get',

          url:process.env.API_ROOT+'salary/home/selectlockstatus',

          //url:process.env.API_ROOT+'jx/action/register',


        }).then((res)=>{

            console.log(res.data)

            this.type = res.data.data.type


          if (this.state == '0' && this.type == '1') {

            this.$router.push('/authentication')


          }

          else if (res.data.data.type == '0') {


            this.$router.push('/locked')



          }



        }).catch((res)=>{


        })


      }


    },



  }

</script>

<style lang="less" scoped>

  @import "company.less";

</style>

