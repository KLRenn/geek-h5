import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom'
/* import { Toast } from 'antd-mobile' */

import './assets/styles/App.scss'
import './assets/styles/index.scss'
/* import Home from './pages/Layout'
import Login from './pages/Login' */

// 懒加载报错
// The above error occurred in the <Router.Provider> component:
// Consider adding an error boundary to your tree to customize error handling behavior.
const Home = lazy(() => import('./pages/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ProfileEdit = lazy(() => import('./pages/Profile/Edit'))
const Chat = lazy(() => import('./pages/Profile/Chat'))

const App = () => {
  return (
    <Router>
      <div className="app">
        <Suspense
          fallback={<div>loading...{/* {Toast.show('loading...', 1)} */}</div>}
        >
          <Link to="/home">首页</Link>
          <Link to="/login">登录</Link>

          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/profile/edit" component={ProfileEdit}></Route>
            <Route path="/profile/chat" component={Chat}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
export default App
