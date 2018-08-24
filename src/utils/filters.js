/**
 * Created by ZHUANGYI on 2018/8/24.
 * 自定义过滤器
 */
import Vue from 'vue'

/**
 * 千分位逗号分隔
 * 例如：2000，为2,000.00
 */
Vue.filter('thousandBitSeparator',num =>{

  let decimal = String(num).split('.')[1] || '';//小数部分

  let tempArr = [];

  let revNumArr = String(num).split('.')[0].split("").reverse();//倒序

  let i;

  for (i in revNumArr){

    tempArr.push(revNumArr[i]);

    if((i+1)%3 === 0 && i != revNumArr.length-1){

      tempArr.push(',');

    }
  }
  let zs = tempArr.reverse().join('');//整数部分

  return decimal?zs+'.'+decimal:zs;


})

/**
 * 手机号码，身份证，银行卡，隐藏部分数字变‘*’号
 * plusXing(前面保留位数，后面保留位数）
 */
Vue.filter('plusXing', (str, frontLen, endLen) => {

  let len = str.length - frontLen - endLen;

  let xing = '';

  for (let i = 0; i < len; i++) {

    xing += '*';
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);

});

/**
 * 时间过滤
 * date:'yyyy-MM-dd'
 */
Vue.filter('fmtDateStr', (date) => {

  if(!date) return '';

  let temp = date.split(" ")[0].split("-");

  return temp.join("/");

});
Vue.filter('fmtDateStr2', (date) => {

  if(!date) return '';

  let temp = date.split(" ")[0].split("-");

  return temp[0] + "年" + temp[1] + "月" + temp[2] + "日";

});
Vue.filter('fmtTimeStr', (date) => {

  if(!date) return '';

  let temp = date.split(" ")[0].split("-");

  return temp.join("/") + " " + date.split(" ")[1];

});

Vue.filter('fmtTimeStr2', (date) => {

  if(!date) return '';

  let temp = date.split(" ")[0].split("-");

  return temp[0] + "年" + temp[1] + "月" + temp[2] + "日" + " " + date.split(" ")[1];

});

