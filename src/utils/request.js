/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 接口的基准路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use((config) => {
  // Do something before request is sent
  // config ：本次请求的配置对象
  const { user } = store.state
  if (user && user.token) {
    // config 里面有一个属性：headers
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意：这里无比要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, (e) => {
  // Do something with request error
  return Promise.reject(e)
})

// 响应拦截器

export default request
