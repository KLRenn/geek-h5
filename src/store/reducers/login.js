const initValue = {
  token: '',
  refresh_token: '',
}

const reducer = (state = initValue, action) => {
  const { type, payload } = action
  if (type === 'login/token') {
    return payload
  }
  return state
}
export default reducer
/* export default function reducer(state = initValue, action) {
  return state
} */
