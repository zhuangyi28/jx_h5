<template>

  <div class="homepage" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check="false">

    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <!-- 余额 -->

      <div class="money_detail_month">
        <!-- 工资 -->

        <div class="money_detail_month_one" v-for="item in wagesList">

          <div :class="item.state == '已确认'? '':'already_confirm'" v-on:click="clickSeeList" v-bind:data-detail="item.salaryDetailId">

            <div class="money_detail_content">
              <p class="company"><span>{{item.salaryMonth}}</span><span v-if="item.salaryType!='8'">收入</span></p>
              <p class="money color_text">实发金额：<span v-if="lookWages"><span>{{item.realAmount | thousandBitSeparator}}</span><span>元</span></span><span
                v-else><span class="star">******</span><span>元</span></span>
              </p>
            </div>
            <div class="money_detail_title">
              <div class="title"><span v-if="item.salaryType=='8'">任务名称：</span><span v-else>发薪企业：</span>{{item.entName}}</div>
              <div class="confirm" :class="item.state == '已确认'? 'gray_background':'color_background'">
                <img src="../../../static/images/jx_homepage_icon.png"/>
                <span>{{item.state}}</span>
              </div>
            </div>
          </div>
        </div>




        <div class="loadmore" v-show="!noData">
          <div class="money_detail_nodata_img" v-if="wagesList.length == 0">
            <img src="../../../static/images/nomoney_img.png">
            <div>还未收到工资哦~</div>
          </div>
          <div class="loadmore_tips" v-else><span class="data">{{moreText}}</span></div>
        </div>
        <div class="loadmore" v-show="noData">
          <mt-spinner class="loadmore_icon" type="double-bounce" color="#ababab" :size="16"></mt-spinner>
          <div class="loadmore_tips">正在加载</div>
        </div>


      </div>


    </mt-loadmore>
  </div>
</template>

<script>

  export default {

    name: 'salary',

    data () {

      return {

        firstOptions: '筛选',//默认选项

        wages: '--.--',//获取用户余额信息

        moreText: '没有更多数据啦~',//加载更多数据

        salaryDetailId: '',//发薪企业明细id

        wagesList: [],//发薪企业列表

        thisWagesListLength: 0,//获取当前发薪企业列表的长度

        selectSalaryOptions: [],//获取企业列表

        isAllCom: true,//判断是不是全部企业

        entId: '',//发薪企业id

        pageNum: 1,//初始值为2

        pageSize: 10,//一页的数量

        hasMoreData: true,//是否可以加载更多

        noData: true,//是否显示暂无数据 false为隐藏 true为显示

        userName: '',//姓名

        idNumber: '',//身份证号码

        hasCompany: false,//有没有企业

        lookWages: true,//看不看余额

        type: '',//是否认证锁定

        num: '',//选择全部&单个企业 1为单个企业 2为全部

        needRefresh: true,//刷新的开关 false为不刷新 true为刷新

        totalSalary: '--.--',//工资余额

        moreLoading: false,//上拉加载

        allLoaded: false,//全部企业数据加载完之后才能点击


      }

    },
    mounted(){

      var _this = this



      //重新调用data方法
      Object.assign(_this.$data, _this.$options.data());

   /*   var ajax = this.getStorage('ajaxHomepage')

      if(ajax=='1'){

        _this.onShow();

      }*/

      //var discoveryHref = this.getStorage('discoveryHref')

     // if(discoveryHref=='1'){

       //setTimeout(function () {

          //_this.setStorage('discoveryHref','0');

          //_this.$router.push('/workDesk/homepage')

        //},1)

      //}


      this.onShow();



      //window.addEventListener('scroll', _this.scrollBottom)


    },
    methods: {

      stopEvent:function (e) {

        window.event? window.event.cancelBubble = true : e.stopPropagation();

      },
      destroyed (){
        this.$messagebox.close();
      },

      //页面加载方法
      onShow: function () {


        /**
         * 接口：工资提醒
         * 请求方式：GET
         * 接口：/salary/home/selecttiptype
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'user/account/getsalarystate'

        }).then((res)=>{

          if(res.data.code == '0000'){

            console.log(res.data);

            this.lookWages = res.data.data;
          }

        }).catch((res)=>{

          console.log(res);

        });

        /**
         * 接口：工资提醒
         * 请求方式：GET
         * 接口：/salary/home/selecttiptype
         * 入参：null
         **/


        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'salary/home/selecttiptype',


        }).then((res) => {

          console.log(res.data);

          var _this = this

          var thisType = res.data.data[0].type;

          //console.log('tpye几'+thisType)

         //console.log(thisType==2)

          if(res.data.data[0].entId){
            //存储entId
            this.setStorage('entId', res.data.data[0].entId);

          }

          if(res.data.data[0].salaryDetailId){

            //存储salaryId
            this.setStorage('salaryDetailId', res.data.data[0].salaryDetailId);
          }



          //存储type
          //this.setStorage('thisType', res.data.data[0].type);

          //console.log('发薪'+wx.getStorageSync('salaryDetailId'))


/*          //是否查看工资条
          if (thisType == 1) {


            var thisEnName = res.data.data[0].entName;

            var thisSalaryMonth = res.data.data[0].salaryMonth;

            var thisSalaryDetailId = res.data.data[0].salaryDetailId

            /!*console.log('发薪企业id'+that.data.salaryDetailId);*!/


            setTimeout(function () {


              _this.$messagebox({
                title: '提示',
                message: thisEnName + '邀请您查看' + thisSalaryMonth + '工资',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: '查看',
                cancelButtonText: '暂不查看',
                closeOnClickModal: false,
                cancelButtonClass: 'cancel_btn',
                confirmButtonClass: 'confirm_btn_orange',
              }).then(action => {

                if (action == 'confirm') {

                  lockstatus();

                  function lockstatus() {


                    /!**
                     * 接口：锁定状态查询
                     * 请求方式：GET
                     * 接口：/salary/home/selectlockstatus
                     * 入参：null
                     **!/

                    _this.$http({

                      method: 'get',

                      url: process.env.API_ROOT + 'salary/home/selectlockstatus',


                    }).then((res) => {

                      console.log(res.data);


                      if (res.data.data.type == '1') {


                        _this.$router.push('/authentication')


                      }

                      else if (res.data.data.type == '0') {

                        _this.$router.push('/locked')

                      }


                    }).catch((res) => {})


                  }



                }

                else {

                  console.log('取消');
                  //调用暂不查看工资条

                  noLook();

                  function noLook() {
                    /!**
                     * 接口：暂不查看工资条
                     * 请求方式：POST
                     * 接口：/salary/home/updateselectsalary
                     * 入参：salaryDetailId
                     **!/

                    _this.$http({

                      method: 'post',

                      url: process.env.API_ROOT + 'salary/home/updateselectsalary',


                      params: {

                        salaryDetailId: thisSalaryDetailId

                      }
                    }).then((res) => {

                      console.log(res.data)

                      _this.$toast({

                        message: '必须加入企业才可查看工资条哦~关闭后可在“我的发薪企业”中继续加入',
                        duration: 1500

                      })


                    }).catch((res) => {})
                  }



                }
              }).catch(err => {});


            }, 1000)


          }

          //是否加入企业
          else if (thisType == 2) {


            var thisEnName = res.data.data[0].entName;

            var thisEntId = res.data.data[0].entId

            setTimeout(function () {

              _this.$messagebox({
                title: '提示',
                message: thisEnName + '邀请您加入企业，便捷查看工资和工资条',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: '查看',
                cancelButtonText: '暂不查看',
                closeOnClickModal: false,
                cancelButtonClass: 'cancel_btn',
                confirmButtonClass: 'confirm_btn_orange',
              }).then(action => {

                if (action == 'confirm') {

                  console.log('确定');

                  lockstatus();

                  function lockstatus() {


                    /!**
                     * 接口：锁定状态查询
                     * 请求方式：GET
                     * 接口：/salary/home/selectlockstatus
                     * 入参：null
                     **!/

                    _this.$http({

                      method: 'get',

                      url:process.env.API_ROOT + 'salary/home/selectlockstatus',


                    }).then((res) => {

                      console.log(res.data);

                      if (res.data.data.type == '1') {


                        _this.$router.push('/authentication')


                      }

                      else if (res.data.data.type == '0') {

                        _this.$router.push('/locked')

                      }


                    }).catch((res) => {})

                  }




                }

                else {

                  console.log('取消暂不加入企业');

                  //调用暂不加入企业

                  cancelJoin();


                  function cancelJoin() {


                    /!**
                     * 接口：暂不加入企业
                     * 请求方式：POST
                     * 接口：/salary/home/updatejoinentstatus
                     * 入参：entId
                     **!/

                    _this.$http({

                      method: 'post',

                      url: process.env.API_ROOT + 'salary/home/updatejoinentstatus',

                      params: {

                        entId: thisEntId

                      }
                    }).then((res) => {

                      console.log(res.data)

                      setTimeout(function () {

                        _this.$toast({

                          message: '必须加入企业才可查看工资条哦~关闭后可在“我的工作单位”',
                          duration: 1500

                        })



                      },1000)




                    }).catch((res) => {})

                  }










                }
              }).catch(err => {});


            }, 1000)


          }

          //未收到任何邀请
          else if (thisType == 0) {}*/


        }).catch((res) => {


        })


        //分页
        this.chooseEntId();

        /**
         * 接口：发薪企业
         * 请求方式：GET
         * 接口：/salary/home/getselectent
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'salary/home/getselectent',


        }).then((res) => {

          console.log(res.data)

          var thisEntName = res.data.data;

          this.selectSalaryOptions = thisEntName

          this.allLoaded =  true;


        }).catch((res) => {
        })




        /**
         * 接口：获取用户工资金额状况
         * 请求方式：GET
         * 接口：/user/bank/getsalarystatus
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'user/bank/getsalarystatus',

        }).then((res) => {

          console.log(res.data)

          if (!res.data.data.totalSalary) {


            this.totalSalary = '--.--'


          }

          else {


            this.totalSalary = res.data.data.totalSalary


          }


        }).catch((res) => {

        })

      },
      //工资条发放列表 入参数企业id,分页数，
      salaryInfo: function (thisSalaryEntId, thisPageSize, thisPageNum, fn) {

        //修改入参
        var thisIdData = {};

        if (thisSalaryEntId) {

          thisIdData = {

            entId: thisSalaryEntId,

            pageNum: thisPageNum,

            pageSize: thisPageSize

          }

        }

        else {

          thisIdData = {

            pageNum: thisPageNum,

            pageSize: thisPageSize
          }

        }


        /**
         * 接口：工资条发放列表
         * 请求方式：GET
         * 接口：/salary/home/salaryinfo
         * 入参：entId,pageNum,pageSize
         **/

        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'salary/home/salaryinfo',

          params: thisIdData

        }).then((res) => {

          console.log(res.data)


          //获取现在的list
          var thislist = res.data.data.list;

          var wagesListLength;

          console.log(thislist)

          //var _dataText = res.data.data.hasOwnProperty('list')


          var pickThisList = [];

          //判断有没有列表数据

          if (thislist) {


            //获取现在list的长度
            wagesListLength = thislist.length;

            //上一次获取到的list

            var lastList = this.wagesList;

            //把获取到的list合并成一个数组
            var nowList = lastList.concat(thislist);

            this.thisWagesListLength = wagesListLength;

            this.wagesList = nowList;


            //判空
            if (fn) {
              //数据加载之后使用的方法
              fn();
            }


          }

          else {


            if (this.pageNum == '1') {

                console.log('第一页没有 数据')


              this.moreText = '还未收到工资哦~'//加载更多数据


            }

            else {

              console.log('后面数据')

              this.moreText = '没有更多数据啦~'//加载更多数据


            }

            this.hasMoreData = false;

            this.noData = false;


          }


        }).catch((res) => {


        });


      },


      //点击切换
      mySelect: function (e) {

        if(e.target.dataset.salary){
        //选择的企业名称回显
        this.firstOptions = e.target.dataset.salary;

        //存取企业id
        this.entId = e.target.dataset.id,

          this.num = 2,


          //分页数据初始化
          this.isAllCom = false;//不是全部企业

        this.pageNum = 1;//初始值为2

        this.hasMoreData = true;//是否可以加载更多

        this.noData = true;//是否显示暂无数据 true为隐藏 false为显示

        this.wagesList = [];//发薪企业列表

        //在渲染数据
        //that.salaryInfo(that.data.entId,that.data.pageSize,1);

        this.chooseEntId();

        }

        else {

          window.location.reload();//刷新

        }


      },
      //点击选择全部
      mySelectAll: function () {


        this.firstOptions = '全部';

        this.isAllCom = true;//是全部企业

        this.pageNum = 1;//初始值为2

        this.hasMoreData = true;//是否可以加载更多

        this.noData = true;//是否显示暂无数据 true为隐藏 false为显示

        this.wagesList = [];//发薪企业列表

        this.num = 1;


        this.chooseEntId();


      },
      //时候查看余额
      balanceShowChange: function () {

        /**
         * 接口：设置用户金额显示
         * 请求方式：GET
         * 接口：/user/account/addsalarystate
         * 入参：null
         **/

        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'user/account/addsalarystate',

          params: {

            salaryState: !this.lookWages

          }

        }).then((res)=>{

          console.log(res);

          if(res.data.code == '0000'){

            this.lookWages = !this.lookWages;

          }

        }).catch((res)=>{

          console.log(res);

        })


      },
      //点击选择企业
      dropdown: function () {

          if(this.allLoaded){

            var img = document.getElementsByClassName('dropdown')[0]

            var div = document.getElementsByClassName('dropdown_list')[0]

            if (img.style.transform === '') {

              img.style.transform = 'rotate(180deg)'

              div.style.display = 'block'

            } else {

              img.style.transform = ''

              div.style.display = ''

          }


        }
      },
      //点击查看工资条跳转链接
      clickSeeList: function (e) {

        this.setStorage('salaryDetailId', e.currentTarget.dataset.detail);

        //跳转
        this.$router.push('/payroll')


      },
      //分页方法
      chooseEntId: function () {

        console.log('是否有更多数据'+this.hasMoreData)

        if (this.hasMoreData) {

          this.hasMoreData = false;

          //如果查看全部企业
          if (this.isAllCom) {


            this.salaryInfo('', this.pageSize, this.pageNum, this.addPage);

          }

          //如果看单独企业
          else {

            this.salaryInfo(this.entId, this.pageSize, this.pageNum, this.addPage);

          }


          //this.hasMoreData = true


        }

      },
      //下拉刷新
      loadTop: function () {

        console.log('下拉刷新');
        //重新调用data方法
        Object.assign(this.$data, this.$options.data());
        //重新加载
        this.onShow();
        //固定方法，查询完要调用一次，用于重新定位
        this.$refs.loadmore.onTopLoaded();

      },
      //到底部
      scrollBottom: function () {

          var _this = this


        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;


        //滚动条到底部的条件
        if (scrollTop + windowHeight == scrollHeight) {

            this.moreLoading = true;

            setTimeout(function () {

              _this.loadMore()

              this.moreLoading = false;

            },500)


          //console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
          //console.log('到底')

          //this.chooseEntId()



        }
      },

      //上拉加载
      loadMore:function () {

        console.log('时候要刷新'+this.hasMoreData);

        this.chooseEntId()


      },

      //添加分页
      addPage:function () {

        let _this=this;
        //如果现在列表页的长度小于一页数量
        if (this.thisWagesListLength < this.pageSize) {

            //不加载并且显示没有更多数据

          this.hasMoreData = false;

          this.noData = false


        }

        else {


          //页数加1

          this.pageNum = this.pageNum + 1;

          //可以加载
          setTimeout(function () {

            _this.hasMoreData = true

          }, 500)


        }



      }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "salary.less";

</style>
