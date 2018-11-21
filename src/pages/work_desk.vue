<template>
  <div class="work_desk_all">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
      <Tabs v-if="detailShow"></Tabs>
  </div>
</template>
<script>
  import Tabs from '../components/footer/footNav'

  export default {
    name: 'workDesk',
    components: {
      Tabs,
  },
    data () {
      return {
        detailShow: true
      }
    }

}
</script>

<style lang="less">
  body{

    margin: 0;
    padding: 0;
  }

</style>
