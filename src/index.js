import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import './assets/styles/index.scss'
import './css-vars-patch.css'
import { Link } from 'react-router-dom'
/* C:\front\proj3\proj-backup\node_modules\antd-mobile\bundle\css-vars-patch.css */
/* 统计总阅读时长-埋点-绿盟-自己完成 */
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
