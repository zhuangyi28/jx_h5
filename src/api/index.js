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

    window.localStorage.setItem(key.toString(),value.toString());

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
  Vue.prototype.removeStorage = function (){

    window.localStorage.clear();

  };


};





