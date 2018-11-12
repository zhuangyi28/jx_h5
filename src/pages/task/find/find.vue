<template>
  <div class="find">
    <div class="find_input">
      <div class="input_place">
        <img src="../../../../static/images/jx_find.png" v-on:click="submit">
        <input type="text" placeholder="请输入任务名称或者任务编号" v-on:keyup.enter="submit" v-model="findWord">
      </div>
      <div class="cancel" v-on:click="$router.replace('/workDesk/taskSquare')">取消</div>
    </div>
    <div class="find_history">
      <div class="title">
        <span>搜索历史</span>
        <img src="../../../../static/images/jx_delete.png" v-on:click="deleteAllHistory">
      </div>
      <div class="history">
        <div v-for="findWords in findHistory">
          <span v-on:click="findThisWord">{{findWords}}</span>
          <span class="delete_btn" v-on:click="deleteFindWord"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'find',

    data () {

      return {

        findHistory: [],

        findWord: '',

        userMobile: ''

      }

    },

    mounted () {

      this.userMobile = localStorage.getItem('mobile');


      if(localStorage.getItem(this.userMobile + 'findHistory')){

        this.findHistory = localStorage.getItem(this.userMobile+'findHistory').split(',');

      }

    },

    methods: {

      submit: function () {

        if(this.findHistory.indexOf(this.findWord) == -1){

          this.findHistory.push(this.findWord);

          localStorage.setItem(this.userMobile+'findHistory',this.findHistory);

        }

        localStorage.setItem(this.userMobile + 'findWord',this.findWord);

        this.$router.push('/workDesk/taskSquare');

      },




      deleteFindWord: function () {

        var thisFindWord = event.currentTarget.parentElement.innerText;

        this.findHistory.splice(this.findHistory.indexOf(thisFindWord),1);

        localStorage.setItem(this.userMobile+'findHistory',this.findHistory);

      },




      deleteAllHistory: function () {

        this.findHistory = [];

        localStorage.removeItem(this.userMobile+'findHistory');

      },




      findThisWord: function () {

        var findWord = event.currentTarget.innerText;

        localStorage.setItem(this.userMobile+'findWord',findWord);

        this.$router.push('/workDesk/taskSquare');

      }

    }
  }
</script>
<style lang="less" scoped>
  @import "find.less";
</style>
