<template>
  <div class="loading">
    <div class="bg">
      <img v-bind:src="bgUrl">
      <div class="card"><img v-bind:src="cardUrl"></div>
      <div class="msg"><img v-bind:src="msgUrl"></div>
      <div class="paper"><img v-bind:src="paperUrl"></div>

    </div>
    <div class="font"><img v-bind:src="slogan"></div>
    <div class="bottom"><img v-bind:src="bottomUrl"></div>
  </div>
</template>
 <script>

  export default{

    name: 'loadingPage',

    data(){

      return {

        slogan:'./static/images/jx_loading_title.png',//slogan

        bgUrl:'./static/images/jx_start_page7.png',//背景图

        bottomUrl:'./static/images/jx_start_page8.png',//底部

        cardUrl:'./static/images/jx_start_page1.png',

        msgUrl:'./static/images/jx_start_page2.png',

        paperUrl:'./static/images/jx_start_page3.png',

        channel:'',

      }
    },

    mounted () {


      var anotherCompany = this.getCookie('anotherCompany') || 'orange';


      if(anotherCompany){

        switch (anotherCompany) {

          case 'orange':

            document.title = '嘉薪';

            this.slogan='./static/images/jx_loading_title.png',

            this.bgUrl='./static/images/jx_start_page7.png',//背景图

            this.bottomUrl='./static/images/jx_start_page8.png',//底部

            this.cardUrl='./static/images/jx_start_page1.png',

            this.msgUrl='./static/images/jx_start_page2.png',

            this.paperUrl='./static/images/jx_start_page3.png'

            break;

          case 'blue':

            document.title = '派云众包';

              this.slogan='./static/images/paiyun/jx_loading_title_1.png',

              this.bgUrl='./static/images/paiyun/jx_start_page7.png',//背景图

              this.bottomUrl='./static/images/paiyun/jx_start_page8.png',//底部

              this.cardUrl='./static/images/paiyun/jx_start_page1.png',

              this.msgUrl='./static/images/paiyun/jx_start_page2.png',

              this.paperUrl='./static/images/paiyun/jx_start_page3.png'

            break;

          case 'lexiang':

            document.title = '乐享易保';

            this.slogan='./static/images/lexiangyibao/jx_loading_title_1.png',

              this.bgUrl='./static/images/lexiangyibao/jx_start_page7.png',//背景图

              this.bottomUrl='./static/images/lexiangyibao/jx_start_page8.png',//底部

              this.cardUrl='./static/images/lexiangyibao/jx_start_page1.png',

              this.msgUrl='./static/images/lexiangyibao/jx_start_page2.png',

              this.paperUrl='./static/images/lexiangyibao/jx_start_page3.png'

            break;

          case 'rongyada':

            document.title = '嵘雅达';

            this.slogan='./static/images/rongyada/jx_loading_title_1.png',

              this.bgUrl='./static/images/rongyada/jx_start_page7.png',//背景图

              this.bottomUrl='./static/images/rongyada/jx_start_page8.png',//底部

              this.cardUrl='./static/images/rongyada/jx_start_page1.png',

              this.msgUrl='./static/images/rongyada/jx_start_page2.png',

              this.paperUrl='./static/images/rongyada/jx_start_page3.png'

            break;

          case 'yibangsheng':

            document.title = '亿邦盛';

             this.slogan='./static/images/yibangsheng/jx_loading_title_1.png',

              this.bgUrl='./static/images/yibangsheng/jx_start_page7.png',//背景图

              this.bottomUrl='./static/images/yibangsheng/jx_start_page8.png',//底部

              this.cardUrl='./static/images/yibangsheng/jx_start_page1.png',

              this.msgUrl='./static/images/yibangsheng/jx_start_page2.png',

              this.paperUrl='./static/images/yibangsheng/jx_start_page3.png'

            break;

          case 'xinqidian':

            document.title = '薪企点';

            this.slogan='./static/images/xinqidian/jx_loading_title_1.png',

              this.bgUrl='./static/images/xinqidian/jx_start_page7.png',//背景图

              this.bottomUrl='./static/images/xinqidian/jx_start_page8.png',//底部

              this.cardUrl='./static/images/xinqidian/jx_start_page1.png',

              this.msgUrl='./static/images/xinqidian/jx_start_page2.png',

              this.paperUrl='./static/images/xinqidian/jx_start_page3.png'

            break;

          case 'zuirenli':

          document.title = '最人力企服';

          this.slogan='./static/images/zuirenli/jx_loading_title_1.png',

            this.bgUrl='./static/images/zuirenli/jx_start_page7.png',//背景图

            this.bottomUrl='./static/images/zuirenli/jx_start_page8.png',//底部

            this.cardUrl='./static/images/zuirenli/jx_start_page1.png',

            this.msgUrl='./static/images/zuirenli/jx_start_page2.png',

            this.paperUrl='./static/images/zuirenli/jx_start_page3.png'

          break;

          case 'jianzhile':

            document.title = '兼职乐';

            this.slogan='./static/images/jianzhile/jx_loading_title_1.png',

              this.bgUrl='./static/images/jianzhile/jx_start_page7.png',//背景图

              this.bottomUrl='./static/images/jianzhile/jx_start_page8.png',//底部

              this.cardUrl='./static/images/jianzhile/jx_start_page1.png',

              this.msgUrl='./static/images/jianzhile/jx_start_page2.png',

              this.paperUrl='./static/images/jianzhile/jx_start_page3.png'

            break;

          case 'facaile':

            document.title = '发才乐';

            this.slogan='./static/images/facaile/jx_loading_title_1.png',

              this.bgUrl='./static/images/facaile/jx_start_page7.png',//背景图

              this.bottomUrl='./static/images/facaile/jx_start_page8.png',//底部

              this.cardUrl='./static/images/facaile/jx_start_page1.png',

              this.msgUrl='./static/images/facaile/jx_start_page2.png',

              this.paperUrl='./static/images/facaile/jx_start_page3.png'

            break;

        }

      }


        /*console.log('链接='+window.location.href);*/

      var str = window.location.href;


      this.setStorage('lactionReload','1');

      //this.setStorage('taskSquare','0')


      var thisUserCode = str.split('?')[1].split('&')[0].split('=')[1];

      this.setStorage('thisUserCodeWx',thisUserCode)

      console.log('cookie'+anotherCompany)

      anotherCompany=='orange'?this.channel='jiaxin':this.channel = anotherCompany;

      console.log('传值'+this.channel);

      //this.init();

      console.log('loading页code'+thisUserCode)

      //获取UnionID

    this.$http({

       method: 'post',

       url: process.env.API_ROOT+'platform',

       params: {

         code:thisUserCode,

         channel:this.channel


       }

       }).then((res) => {

       console.log(res.data);

       this.init();



       }).catch((res)=>{

      this.init();

    });


       if(this.getStorage('loadingShow')!=1){

       this.$indicator.open({
       text: '加载中...',
       spinnerType: 'fading-circle'
       });


       }


    },

    destroyed(){

      this.$indicator.close()

    },

    methods: {

      init: function () {


          if(this.getCookie('type')=='jbt'){

            if(!localStorage.getItem('Authorization')){

              this.$router.push('/login');

            }

            else {

              console.log('跳转嘉白条')
              /**
               * 接口：消费场景-嘉白条
               * 请求方式：GET
               * 接口：/open/jbt/redirect
               * 入参：null
               **/
              this.$http({

                method: 'get',

                url: process.env.API_ROOT + 'open/jbt/redirect',

              }).then((res) => {

                console.log(res.data);

                (this.getCookie('type') == 'jbt') && (this.setCookie('type','jx'));

                window.location.href = res.data.data;

              }).catch((res)=>{


                  console.log(res.response.data.code)

                if(res.response.data.code=='3001'){


                  localStorage.clear();

                  delete this.$http.defaults.headers.common['Authorization'];

                  this.$router.push('/login')


                }

              })

            }



          }
          else{

            setTimeout(()=> {

              this.$router.push('/workDesk/taskSquare');

            },200)


          }




      }

  }

  }

  </script>
<style lang="less">

  @import "loading.less";

</style>
