import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import { Toast } from 'mint-ui'


axios.install = (Vue) => {

    Vue.prototype.$http = axios

}

  axios.defaults.withCredentiantials = true;

  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  Vue.config.productductionTip = false;


// http request 拦截器
  axios.interceptors.request.use(function (config) {

    return config;

  }, function (error) {

    console.log(error);
    // 请求失败的处理
    return Promise.reject(error);
  });


// http response 拦截器
  axios.interceptors.response.use(function (res) {

    return res

  }, function (error) {

    console.log(error);

    if(error.response.data.code=='3001'||error.response.data.code=='3003') {

      Toast({

        message: error.response.data.msg,
        duration: 1500

      })

      localStorage.clear();

      setTimeout(function () {

        router.push('/');

        window.location.reload();

      },1000)

    }


    return Promise.reject(error)

  });



export default axios
