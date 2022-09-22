import http from '../../utils/request'
import { removeTokenInfo } from '../../utils/storage'
import { SAVE_PROFILE, SAVE_USER, CLEAR_LOGIN } from '../action_types/profile'

/**
 * 保存个人基本信息
 * @param {*} user
 * @returns
 */
export const saveUser = (payload) => {
  return {
    type: SAVE_USER,
    payload,
  }
}

/**
 * 获取用户基本信息
 * @returns thunk
 */
export const getUserData = () => {
  return async (dispatch) => {
    const res = await http.get('/user')
    /* console.log('store/actions/profile获取个人中心user数据={...res.data}')
    console.log(res) */
    dispatch(saveUser(res.data))
  }
}

export const saveProfile = (payload) => {
  return {
    type: SAVE_PROFILE,
    payload,
  }
}

export const getProfile = () => {
  return async (dispatch) => {
    const res = await http.get('/user/profile')

    console.log('getProfile', res)
    dispatch(saveProfile(res.data))
  }
}

export const updateProfile = (type, value) => {
  return async (dispatch) => {
    // 调用接口将数据更新到后端
    const res = await http.patch('/user/profile', { [type]: value })
    console.log('{[type]:value}', type, value, res)

    // 如果后端更新成功，则再更新 Redux 中的数据
    if (res.message === 'OK') {
      dispatch(getProfile())
    }
  }
}

export const updateAvatar = (formData) => {
  return async (dispatch) => {
    // 调用接口进行上传
    const res = await http.patch('/user/photo', formData)

    // 如果后端更新成功，则再更新 Redux 中的数据
    if (res.message === 'OK') {
      dispatch(getProfile())
    }
  }
}

export const clearToken = () => {
  return {
    type: CLEAR_LOGIN,
  }
}

/**
 * 登出
 * @returns thunk
 */
export const logout = () => {
  return (dispatch) => {
    // 删除 LocalStorage 中的 Token 信息
    removeTokenInfo()

    // 删除 Redux 中的 Token 信息
    dispatch(clearToken())
  }
}
