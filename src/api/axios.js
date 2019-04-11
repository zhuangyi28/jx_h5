import Vue from 'vue'
import router from '../router'
import Axios from 'axios'
import { Toast } from 'mint-ui'

var axios = Axios.create();

var _axios = Axios.create();


axios.install = (Vue) => {

    Vue.prototype.$http = axios;

    Vue.prototype._http = _axios;

}

  axios.defaults.withCredentiantials = true;

  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



  localStorage.getItem('Authorization') && (axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization'));

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

    if(!!res.headers.authorization){

      axios.defaults.headers.common['Authorization'] = res.headers.authorization;

      localStorage.setItem('Authorization',res.headers.authorization);

    }


    return res

  }, function (error) {

    console.log(error);

    if((error.response.data.code=='3001'||error.response.data.code=='3003') && !location.href.includes('loadingPage')) {

      localStorage.setItem('loadingShow',1);

  /*    Toast({

        message: error.response.data.msg,
        duration: 500

      })*/

      localStorage.clear();

/*
      Toast({
        message: error.response.data.msg,
        position: 'middle',
        duration: 1000
      });
*/

      setTimeout(function () {

        router.push('/');

        window.location.reload();

      },1000);

    }
    else if(error.response.data.code=='3004'){


    }

    return Promise.reject(error)

  });



export default axios
