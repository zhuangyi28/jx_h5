<template>

  <div class="footer">
    <div class="void_bottom"></div>
    <div class="tabs">
      <!--命名路由-->
      <ul>
        <!--this inspection reports XML/HTML tags with missing mandatory attrbutes ,you can specify attrbute name that should not  be reported-->
        <router-link :to="{name:'homepage'}" tag="li" router-active-class>
          <div>
            <i class="iconfont icon-bottom-wages1"></i>
          </div>
          <div>任务广场</div>
        </router-link>
        <router-link :to="{name:'discovery'}" tag="li">
          <div>
            <i class="iconfont icon-bottom-find"></i>
          </div>
          <div>发现</div>
        </router-link>
        <router-link :to="{name:'mine'}" tag="li">
          <div>
            <i class="iconfont icon-bottom-main1"></i>
          </div>
          <div>我的</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {

    name: 'footNav',
  }
</script>

<style lang="less">

  @import 'footNav.less';


</style>
