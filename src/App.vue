<template>
  <div id="app">
    <div class="content">
      <!-- router(路由) 插槽, 其中所有匹配的组件将在这里呈现 -->
      <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
    <!--<div class="try"></div>-->

  </div>
</template>
<script>

  export default {
    name: 'app',

    mounted () {

      var url1 = location.href.split('?')[1];

      var url;

      url1 && (url = url1.split('=')[1].split('&')[0]);

      (url && url1.indexOf('theme') != -1) ? this.setCookie('anotherCompany',url) : (url = this.getCookie('anotherCompany'));

      switch (url) {

        case 'orange':

          document.title = '嘉薪';

          document.documentElement.style.setProperty('--mainColor', '#ff7a3c');

          document.documentElement.style.setProperty('--lessColor', '#ff6855');

          document.documentElement.style.setProperty('--lightColor', '#fff9f7');

          document.documentElement.style.setProperty('--borderColor', '#ffc0a3');

          break;

        case 'blue':

          document.title = '派云众包';

          document.documentElement.style.setProperty('--mainColor', '#4199f0');

          document.documentElement.style.setProperty('--lessColor', '#4490e8');

          document.documentElement.style.setProperty('--lightColor', '#ecf4fd');

          document.documentElement.style.setProperty('--borderColor', '#89bfff');


          break;

        case 'lexiang':

          document.title = '乐享易保';

          document.documentElement.style.setProperty('--mainColor', '#4199f0');

          document.documentElement.style.setProperty('--lessColor', '#4490e8');

          document.documentElement.style.setProperty('--lightColor', '#ecf4fd');

          document.documentElement.style.setProperty('--borderColor', '#89bfff');

          break;

        case 'rongyada':

          document.title = '嵘雅达';

          document.documentElement.style.setProperty('--mainColor', '#063786');

          document.documentElement.style.setProperty('--lessColor', '#2e5fad');

          document.documentElement.style.setProperty('--lightColor', '#e8f2ff');

          document.documentElement.style.setProperty('--borderColor', '#b6d5ff');


          break;

         case 'yibangsheng':

           document.title = '亿邦盛';

          document.documentElement.style.setProperty('--mainColor', '#ffa200');

          document.documentElement.style.setProperty('--lessColor', '#ffcd72');

          document.documentElement.style.setProperty('--lightColor', '#fffaf0');

          document.documentElement.style.setProperty('--borderColor', '#ffd389');

          break;


        case 'xinqidian':

          document.title = '薪企点';

          document.documentElement.style.setProperty('--mainColor', '#f08200');

          document.documentElement.style.setProperty('--lessColor', '#ffb45b');

          document.documentElement.style.setProperty('--lightColor', '#fffaf0');

          document.documentElement.style.setProperty('--borderColor', '#ffd389');


          break;

        case 'zuirenli':

          document.title = '最人力企服';

          document.documentElement.style.setProperty('--mainColor', '#da6925');

          document.documentElement.style.setProperty('--lessColor', '#d98145');

          document.documentElement.style.setProperty('--lightColor', '#ffe8da');

          document.documentElement.style.setProperty('--borderColor', '#ffc49c');

          break;

        case 'jianzhile':

          document.title = '兼职乐';

          document.documentElement.style.setProperty('--mainColor', '#ffa200');

          document.documentElement.style.setProperty('--lessColor', '#ffcd72');

          document.documentElement.style.setProperty('--lightColor', '#fffaf0');

          document.documentElement.style.setProperty('--borderColor', '#ffd389');

          break;


      }

    }
  }
</script>
