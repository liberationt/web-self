import axios from 'axios'
import qs from "qs"
import {Msg} from '@/utils/tools';
// create an axios instance

var allResquest = 0;
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
    withCredentials: true, // 跨域请求时发送 cookies
    // paramsSerializer: params => { // 查询字符串中的数组不使用方括号
	// 		return qs.stringify(params, { indices: false })
	// 	},
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    timeout: 15000 // request timeout
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // config.data = qs.stringify(config.data)
    if(localStorage.getItem('tokenInfo')){
      config.headers['token'] = localStorage.getItem('tokenInfo')
    }
    const contentType = config.headers['Content-Type']
    config.headers['Content-Type'] = contentType ? contentType : 'application/x-www-form-urlencoded'
    config.headers['REQUEST-IP'] = '192.168.31.244'
    config.data = contentType?config.data:qs.stringify(config.data)
    allResquest = allResquest + 1;
    if(!config.mask){
      Msg.loading()
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  allResquest = allResquest - 1;
  if (allResquest === 0) {
    Msg.hideLoading();
  }
  // 对响应数据做点什么
  return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default service
