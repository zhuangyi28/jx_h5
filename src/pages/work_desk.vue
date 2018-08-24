<template>
  <div class="work_desk_all">
      <router-view></router-view>
      <Tabs></Tabs>
  </div>
</template>
<script>
  import Tabs from '../components/footer/footNav'

  export default {
    name: 'workDesk',
    components: {
      Tabs,
  },

}
</script>

<style lang="less">
  body{

    margin: 0;
    padding: 0;
  }

</style>
