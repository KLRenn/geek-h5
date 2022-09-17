import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
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
    <>
      <>
        <h1>Geek-h5</h1>
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem',
          }}
        >
          <Link to="/">访问App页面</Link>|<Link to="/home">访问home页面</Link>|
          <Link to="/login">访问login页面</Link>
        </nav>
        <Outlet />
      </>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
