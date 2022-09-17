import { SAVE_PROFILE, SAVE_USER } from '../action_types/profile'

// 初始状态
const initialState = {
  // 基本信息
  user: {},
}

// 操作用户个人信息状态的 reducer 函数
const profile = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SAVE_USER:
      return {
        ...state,
        user: payload,
      }

    // 设置基本信息
    case SAVE_PROFILE:
      return {
        ...state,
        profile: payload,
      }

    // 默认
    default:
      return state
  }
}

export default profile
