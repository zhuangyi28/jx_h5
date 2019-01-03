<template>
  <div class="country_list">
    <div class="find">
      <div class="input">
        <img src="../../../../static/images/jx_find.png">
        <input type="text" placeholder="请输入国家中文名/英文名" v-on:click="cancelShow = true" v-model="select">
      </div>
      <div class="cancel" v-if="cancelShow" v-on:click="$router.go(-1)">取消</div>
    </div>
    <div class="list" v-for="(countryList,index) in countryLists">
      <div class="list_title">{{index}}</div>
      <div class="all_country">
        <div class="country"
             v-for="country in countryList"
             v-bind:englishName="country.englishName"
             v-if="(country.shortName + country.englishName.toLocaleLowerCase() + country.englishName.toLocaleUpperCase()).indexOf(select) != -1"
             v-on:click="getPlace(country.shortName)"
        >
          <span>{{country.shortName}}</span>
          <span>{{country.englishName}}</span>
        </div>
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

        cancelShow: false,

        select: ''

      }

    },

    mounted () {

      this.getData();

    },

    methods: {

      //点击获取当前地址
      getPlace: function (place) {

        this.$store.state.place = place;

        this.$router.go(-1);

      },

      //获取数据
      getData: function () {

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


    },

    watch: {

      select: function () {

        var parents = document.getElementsByClassName('list');

        setTimeout(function () {

          for(var parent of parents){

            var child = parent.getElementsByClassName('country');

            if(child.length == 0){

              parent.style.display = 'none';

            }else{

              parent.style.display = 'block'

            }

          }

        },10);

      }

    }
  }
</script>
<style lang="less" scoped>
  @import "country_list.less";
</style>
