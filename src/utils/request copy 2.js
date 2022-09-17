import axios from 'axios'
import { object } from 'yup'
import { Toast } from 'antd-mobile'
import { getTokenInfo, removeTokenInfo, setTokenInfo } from './storage'
import store from '../store'
import { saveToken } from '../store/actions/login'
import { clearToken } from '../store/actions/profile'
import { history } from './history'

// 创建新的 axios 实例
const http = axios.create({
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
    console.log(response)
    return response
  },

  async (error) => {
    // 可以选择解构赋值获取错误信息中包含的请求配置信息和响应数据
    // const{config,response}=error
    console.log('error', error.response)
    // 判断 HTTP 状态码是否为 401，即是否存在 token 不正确造成的授权问题
    if (error.response.status === 401) {
      const tokeninfo = getTokenInfo()
      console(tokeninfo)
      //如果存在 没有Token或Refresh Token 的情况
      if (!token || !refresh_token) {
        // 跳转到登录页，并携带上当前正在访问的页面，等登录成功后再跳回该页面
        history.replace('/login', {
          from: history.location.pathname || '/home',
        })
        return Promise.reject(error)
      }
      try {
        // 自动刷新 token
        // 通过 Refresh Token 换取新 Token
        // 此时，不能使用新建的 http 实例去请求，要用默认实例 axios 去请求
        // 否则会因 http 实例的请求拦截器的作用，携带上老的 token 而不是 refresh_token
        const res = await http.put('/authorizations', null, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${refresh_token}`,
          },
        })
        // 将新换到的 Token 信息保存到 Redux 和 LocalStorage 中
        const tokenInfo = {
          token: res.data.token,
          refresh_token,
        }
        setTokenInfo(tokenInfo)
        store.dispatch(saveToken(tokenInfo))

        // 重新发送之前因 Token 无效而失败的请求
        return http(config)
      } catch (error) {
        // 如果 Token 换取失败
        // 清除 Redux 和 LocalStorage 中 Token 信息
        removeTokenInfo()
        store.dispatch(clearToken())

        // 跳转到登录页，并携带上当前正在访问的页面，等登录成功后再跳回到该页面
        history.push('/login', {
          from: history.location.pathname || '/home',
        })
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)

    /* if (error.response) {
      Toast.show('无法读取AxiosError对象内部属性' + 'err.responce.data.message')
    } else {
      Toast.show('验证码错误')
    } */
  }
)

// 导出该 axios 实例
export default http
