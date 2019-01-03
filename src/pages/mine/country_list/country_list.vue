<template>
  <div class="country_list">
    <div class="find">
      <div class="input">
        <img src="../../../../static/images/jx_find.png">
        <input type="text" placeholder="请输入国家中文名/英文名" v-on:click="cancelShow = true">
      </div>
      <div class="cancel" v-if="cancelShow" v-on:click="$router.go(-1)">取消</div>
    </div>
    <div class="list" v-for="(countryList,index) in countryLists">
      <div class="list_title">{{index}}</div>
      <div class="country" v-for="country in countryList" v-bind:englishName="country.englishName">
        <span>{{country.shortName}}</span>
        <span>{{country.englishName}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'countryList',

    data () {

      return {

        countryLists: '',

        cancelShow: false

      }

    },

    mounted () {

      /*
        * 接口： 国籍查询
        * 访问方式： POST
        * 接口： /user/country/getcountry
        * 传参： null
        * */
      this.$http({
        method: 'post',
        url: process.env.API_ROOT+ 'user/country/getcountry',
        headers:{
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }).then(function (res) {

        console.log(res.data.data);

        var getCountry = res.data.data;

        delete getCountry.firstLetter;//去掉首字母列

        getCountry = JSON.parse(JSON.stringify(getCountry).replace(/hotCountry/g,'热门城市'));//将列表中hotCountry改成热门城市

        this.countryLists = getCountry;

      }.bind(this));

    }
  }
</script>
<style lang="less" scoped>
  @import "country_list.less";
</style>
