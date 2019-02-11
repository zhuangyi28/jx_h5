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

      url1 && (url = url1.split('=')[1]);

      (url && url1.indexOf('theme') != -1) ? this.setCookie('anotherCompany',url) : (url = this.getCookie('anotherCompany'));

      switch (url) {

        case 'orange':

          return require('!style-loader!css-loader!less-loader!../static/css/orange_css.css');

        case 'blue':

          return require('!style-loader!css-loader!less-loader!../static/css/blue_css.css');

        case 'lexiang':

          return require('!style-loader!css-loader!less-loader!../static/css/lexiangyibao_css.css');

      }

    }
  }
</script>
