import axios from 'axios'
import { object } from 'yup'
import { Toast } from 'antd-mobile'
import { getTokenInfo } from './storage'

// 创建新的 axios 实例
const http = axios.create({
  timeout: 10000,
  baseURL: 'http://geek.itheima.net/v1_0',
})

// 设置请求拦截器和响应拦截器
http.interceptors.request.use(
  // 在 axios 请求拦截器中，读取保存在 Redux 或 localStorage 中的 Token 信息，并添加到请求头上
  (config) => {
    //获取 token
    const token = getTokenInfo().token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token //Bearer 和 Token 中间有空格
      // 在发送请求时在请求头中携带上 Token 信息，以便在请求需要鉴权的后端接口时可以顺利调用
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 待补充，需要用响应拦截代替 Login/indes try/catch
http.interceptors.response.use(
  (response) => {
    //响应处理
    /* Toast.show(response.data) */
    return response.data
  },

  async (error) => {
    console.log('error', error)
    if (error.response.status === 401) {
      const tokeninfo = getTokenInfo()
      console(tokeninfo)
    }

    return Promise.reject(error)
  }
)

// 导出该 axios 实例
export default http
