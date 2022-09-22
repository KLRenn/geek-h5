import React, { lazy, Suspense } from 'react'
import { AuthRoute } from './components/AuthRoute'
import { history } from './utils'
import { KeepAlive } from './components/KeepAlive'
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import { Button } from 'antd-mobile'
/* import { Toast } from 'antd-mobile' */

import './assets/styles/App.scss'
import './assets/styles/index.scss'
import Home from './pages/Layout'
import Login from './pages/Login'
import ProfileEdit from './pages/Profile/Edit'
import Chat from './pages/Profile/Chat'
/* import Search from './pages/Search'
import Article from './pages/Article' */
import SearchResult from './pages/Search/Result'
import ProfileFeedback from './pages/Profile/Feedback'
import NotFound from './pages/NotFound'

// 懒加载报错
// The above error occurred in the <Router.Provider> component:
// Consider adding an error boundary to your tree to customize error handling behavior.
/* const Home = lazy(() => import('./pages/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ProfileEdit = lazy(() => import('./pages/Profile/Edit'))
const Chat = lazy(() => import('./pages/Profile/Chat'))
const Search = lazy(() => import('./pages/Search'))
const Article = lazy(() => import('./pages/Article'))
const SearchResult = lazy(() => import('./pages/Search/Result'))
const ProfileFeedback = lazy(() => import('./pages/Profile/Feedback')) */

const App = () => {
  return (
    <Router history={history}>
      {/* 注意：与 Switch 不兼容 */}
      <KeepAlive alivePath="/home" path="/home" exact component={Home} />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home/index" />} />
        <Route
          exact
          path="/home"
          render={() => <Redirect to="/home/index" />}
        />

        <Route path="/login" component={Login} />
        {/* <Route path="/search" component={Search} /> */}
        {/* <Route path="/article/:id" component={Article} /> */}
        <Route path="/search/result" component={SearchResult} />

        <AuthRoute path="/profile/edit" component={ProfileEdit} />
        <AuthRoute path="/profile/feedback" component={ProfileFeedback} />
        <AuthRoute path="/profile/chat" component={Chat} />

        {/* <Route path="*" component={NotFound} /> */}
        {/* 注意：因为 /home 不在 Switch 内部，所以，需要手动处理 /home 开头的路由，否则，会被当做 404 处理 */}
        <Route
          path="*"
          render={(props) => {
            if (props.location.pathname.startsWith('/home')) {
              return null
            }
            return <NotFound {...props} />
          }}
        />
      </Switch>
    </Router>
  )
}
export default App
