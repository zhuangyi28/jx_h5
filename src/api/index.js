/**
 * Created by ZHUANGYI on 2018/8/15.
 */
//const root = process.env.API_ROOT;




exports.install = function (Vue, options) {


  /**
   * @description 存变量进入缓存区
   *
   * @param {string} key 缓存键
   * @param {string} value 键值

   */
  Vue.prototype.setStorage = function (key,value){

    if(key){

      window.localStorage.setItem(key.toString(),value.toString());

    }



  };
  /**
   * @description 从缓存区取变量
   *
   * @param {string} key 缓存键

   */

  Vue.prototype.getStorage = function (key){

    return window.localStorage.getItem(key.toString())

  };

  /**
   * @description 从本地缓存中同步移除指定 key
   *
   * @param {string} key 缓存键

   */
  Vue.prototype.removeStorage = function (key){

    window.localStorage.removeItem(key.toString());

  };

  /**
   * @description 清理本地数据缓存
   *
   * @param {string} key 缓存键

   */
  Vue.prototype.clearStorage = function (){

    window.localStorage.clear();

  };

  Vue.prototype.setAutoBack = function (num){

    //记录需要退回的页面
    localStorage.setItem('thisBackRouter',this.$router.history.current.path);

    localStorage.setItem('backNum',num);

    //console.log(this.$router)

  };

  Vue.prototype.setCookie = function(key,val,time){//设置cookie方法

    console.log(key)

    console.log(val)

             var date=new Date(); //获取当前时间

             var expiresDays=time;  //将date设置为n天以后的时间

            date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间

             document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie

            console.log(document.cookie)



         };

  Vue.prototype.getCookie = function (cname) {
    var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;

  };

};





