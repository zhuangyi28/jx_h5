<template>
  <div class="task_square">
    <div class="find_input">
      <div class="input_place">
        <img src="../../../../static/images/jx_find.png">
        <input type="text" placeholder="搜索公司职位">
      </div>
    </div>
    <div class="select_btn">
      <div class="select" v-on:click="selectDropDown">
        <span>分类</span>
        <span v-bind:class="selectShow?'up':'down'"></span>
      </div>
      <div class="select">
        <span>截止时间</span>
      </div>
      <div class="select" v-on:click="orderDropDown">
        <span>筛选</span>
        <span v-bind:class="orderShow?'up':'down'"></span>
      </div>
    </div>
    <div class="popup" v-if="orderShow || selectShow">
      <div class="order_bg"></div>
      <div class="order" v-if="orderShow">
        <div class="ability_tags">
          <div class="title">技能标签</div>
          <div class="tags_list">
            <div>不限</div>
            <div>互联网/IT/电子/通信</div>
            <div>广告/传媒/文化/体育</div>
            <div>金融</div>
            <div>教育培训</div>
            <div>交通/物流/贸易/零售</div>
            <div>服务业</div>
            <div>房地产/建筑</div>
            <div>汽车/机械/制造业</div>
            <div>消费品</div>
            <div>其他</div>
          </div>
        </div>
        <div class="money">
          <div class="title">任务金额（元）</div>
          <div class="money_input">
            <span>区间</span>
            <div class="input">
              <input type="number" placeholder="最低价">
              <span></span>
              <input type="number" placeholder="最高价">
            </div>
          </div>
          <div class="money_select">
            <div>1-999</div>
            <div>10k-20k</div>
            <div>20k以上</div>
          </div>
        </div>
        <div class="clickBtn">
          <div class="cancel">重置</div>
          <div class="confirm">确定</div>
        </div>
      </div>
      <div class="select_content" v-else-if="selectShow">
        <div class="select_list">
          <div>全部</div>
          <div>技术服务</div>
          <div>设计服务</div>
          <div>营销/策划服务</div>
          <div>咨询服务</div>
          <div>电商服务</div>
          <div>其他</div>
        </div>
      </div>
    </div>
    <div class="task_list">
      <div class="list_one">
        <div class="task_information">
          <div class="task_title">
            <img src="../../../../static/images/jx_bag.png">
            <span>微信小程序开发</span>
          </div>
          <div class="task_pay">
            <span>20k</span>
          </div>
        </div>
        <div class="task_need">
          <div class="need_person">
            <span>报名人数：<span>3个人已报名</span></span>
          </div>
          <div class="need_time">
            <span>截止时间：2018-10-10</span>
          </div>
        </div>
      </div>
      <div class="list_one">
        <div class="task_information">
          <div class="task_title">
            <img src="../../../../static/images/jx_bag.png">
            <span>微信小程序开发</span>
          </div>
          <div class="task_pay">
            <span>20k</span>
          </div>
        </div>
        <div class="task_need">
          <div class="need_person">
            <span>报名人数：<span>3个人已报名</span></span>
          </div>
          <div class="need_time">
            <span>截止时间：2018-10-10</span>
          </div>
        </div>
      </div>
      <div class="list_one">
        <div class="task_information">
          <div class="task_title">
            <img src="../../../../static/images/jx_bag.png">
            <span>微信小程序开发</span>
          </div>
          <div class="task_pay">
            <span>20k</span>
          </div>
        </div>
        <div class="task_need">
          <div class="need_person">
            <span>报名人数：<span>3个人已报名</span></span>
          </div>
          <div class="need_time">
            <span>截止时间：2018-10-10</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'taskSquare',
    data () {
      return {
        orderShow: false,
        selectShow: false
      }
    },
    methods: {
      selectDropDown: function () {
        this.orderShow = false;
        this.selectShow = !this.selectShow;
      },
      orderDropDown: function () {
        this.selectShow = false;
        this.orderShow = !this.orderShow;
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "task_square.less";
</style>
