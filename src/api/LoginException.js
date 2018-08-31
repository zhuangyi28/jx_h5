import Vue from 'vue'
import router from '../router'
import axios from 'axios'

Vue.prototype.$http = axios;

axios.defaults.withCredentials=true;

Vue.config.productionTip = false;

Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


//请求及返回拦截器
axios.interceptors.response.use(function (res) {

  return res

}, function (error) {

  console.log(error);


  if(error.response.data.code=='3003'){

    this.$toast({

      message: error.response.data.msg,
      duration: 1500

    });


    setTimeout(function () {

      this.router.push('/');

      window.location.reload();//刷新

    },300)

    return false
  }

  else if (error.response.data.code=='3001') {

    this.$toast({

      message: error.response.data.msg,

      duration: 1500

    });

    setTimeout(function () {

      router.push('/');

      window.location.reload();//刷新

    },300)



    return false

  }

  return Promise.reject(error)

})
