import { getTokenInfo, hasToken } from '../../utils/'
import { Redirect, Route, useLocation } from 'react-router-dom'

// https://reactrouter.com/web/example/auth-workflow
// https://stackoverflow.com/a/64307442/15443637
/**
 * 鉴权路由组件
 * @param {*} component：Route组件上的 component 属性
 * @param {Array} rest 其他属性
 * */
/**
 * AuthRoute 组件拦截未登录时的页面跳转，并再
 *  */
const AuthRoute = ({ component: Component, ...rest }) => {
  const location = useLocation()
  console.log(location)
  console.log(getTokenInfo())
  return (
    <Route
      {...rest}
      render={() => {
        if (hasToken()) {
          return <Component></Component>
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: location.pathname,
                },
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}

export { AuthRoute }
