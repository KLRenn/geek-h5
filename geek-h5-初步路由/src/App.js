import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom'
import './assets/styles/App.scss'
import './assets/styles/index.scss'

import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Link to="/home">首页</Link>
        <Link to="/login">登录</Link>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-shoutao"></use>
        </svg>
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </div>
    </Router>
  )
}
export default App
