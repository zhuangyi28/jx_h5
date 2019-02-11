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

        }

      }


        /*console.log('链接='+window.location.href);*/

      var str = window.location.href;


      this.setStorage('lactionReload','1');

      //this.setStorage('taskSquare','0')


      var thisUserCode = str.split('?')[1].split('&')[0].split('=')[1];

      //this.init();

      //获取UnionID

    this.$http({

       method: 'post',

       url: process.env.API_ROOT+'jx/action/togetunionid',

       params: {

       code:thisUserCode

       }

       }).then((res) => {

       console.log(res.data)

       this.init();



       }).catch((res)=>{})


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

        setTimeout(()=> {

          this.$router.push('/workDesk/taskSquare');

        },200)



      }

  }

  }

  </script>
<style lang="less">

  @import "loading.less";

</style>
