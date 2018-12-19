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

      var url = location.href.split('?')[1];

      url && (url = url.split('=')[1]);

      url && localStorage.setItem('anotherCompany',url);

      url || (url = localStorage.getItem('anotherCompany'));

      switch (url) {

        case 'orange':

          return require('!style-loader!css-loader!less-loader!../static/css/orange_css.css');

        case 'green':

          return require('!style-loader!css-loader!less-loader!../static/css/greed_css.css');

      }

    }
  }
</script>
