import { useDispatch } from 'react-redux'
import http from '@utils/request'
import { setTokenInfo, removeTokenInfo } from '@utils/storage'

/**
 * 发送短信验证码
 * @param {string} mobile 手机号码
 * @returns thunk
 */
export const sendValidationCode = (mobile) => {
  return () => {
    http.get(`/sms/codes/${mobile}`)
  }
}

export const saveToken = (payload) => {
  return {
    type: 'login/token',
    payload,
  }
}

/**
 * 登录按钮
 * @param {*} data
 * @returns
 */
export const login = (data) => {
  return async (dispatch) => {
    const res = await http({
      method: 'post',
      url: '/authorizations',
      data,
    })
    console.log(res)
    // 保存 await http(){}返回的token
    dispatch(saveToken(res.data))
    setTokenInfo(res.data)
  }
}
export const Logout = () => {
  const dispatch = useDispatch()

  return () => {
    removeTokenInfo()
  }
}
