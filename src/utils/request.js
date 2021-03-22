/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// JSON.parse()
// JSON.stringify()

// 可以处理数据中超出 JacaScript 安全整数范围的问题
// JSONBig.parse() // 把 JSON 格式的字符串转为 JavaScript 对象
// JSONBig.stringify() // 把 JavaScript 格式的字符串转为 JSON 对象

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径

  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]
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
request.interceptors.response.use((config) => {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // 注意：这里无比要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, (e) => {
  // Do something with request error
  return Promise.reject(e)
})

export default request
