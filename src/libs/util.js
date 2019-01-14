import axios from 'axios'
import cookie from 'js-cookie'
import Vue from 'vue'

var instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'} // 非简单请求
  // headers: {'Content-Type':'application/x-www-form-urlencoded' }  // 简单请求
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = cookie.get('token')
  if (token) {
    config.headers.Authorization = token
    // config.headers.common['Authentication-Token'] = token
    
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  if (res.data.Code !== 200) {
    Vue.prototype.$Message.error(res.data.Message)
  }
  return res;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance