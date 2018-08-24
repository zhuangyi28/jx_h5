<template>
  <div id="app">
    <div class="content">
      <!-- router(路由) 插槽, 其中所有匹配的组件将在这里呈现 -->
      <router-view v-wechat-title="$route.meta.title"></router-view>

    </div>

  </div>
</template>
<script>

  export default {
    name: 'app',
  }
</script>
