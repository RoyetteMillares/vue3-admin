/**
 * @author django
 * @description 请求实例
 */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
// import { ElMessage, ElMessageBox } from "element-plus";
import { ElMessage, ElMessageBox } from 'element-plus'
import { Session } from '../utils/storage'
// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 50000,
  // headers: { 'Content-Type': 'application/json; charset=UTF-8' },
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么 token
    if (Session.get('token')) {
      config.headers!['Authorization'] = `Bearer ${Session.get('token')}`
    }
    config.headers!['Content-Type'] = config.headers!['Content-Type'] || 'application/json; charset=UTF-8'
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data
    if (res.code && res.code !== 0) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === 4001) {
        Session.clear() // 清除浏览器全部临时缓存
        window.location.href = '/' // 去登录页
        ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
          .then(() => {})
          .catch(() => {})
      }
      return Promise.reject(service.interceptors.response)
    } else {
      return response.data
    }
  },
  (errorInfo) => {
    const {
      response: {
        data: { error },
      },
    } = errorInfo
    // 对响应错误做点什么
    if (errorInfo.message.indexOf('timeout') != -1) {
      ElMessage.error('网络超时')
    } else if (errorInfo.message == 'Network Error') {
      ElMessage.error('网络连接错误')
    } else {
      if (error) ElMessage.error(error)
    }

    return Promise.reject(errorInfo)
  },
)

// 导出 axios 实例
export default service
