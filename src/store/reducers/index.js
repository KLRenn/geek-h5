import login from './login'
import profile from './profile'

const { combineReducers } = require('redux')

const reducer = combineReducers({
  login,
  profile,
})

export default reducer
