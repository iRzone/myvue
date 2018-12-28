import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'} // 非简单请求
  // headers: {'Content-Type':'application/x-www-form-urlencoded' }  // 简单请求
})

export default instance