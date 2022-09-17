import React, { lazy, Suspense } from 'react'
import { Switch, useHistory, useLocation, Route } from 'react-router-dom'
import Icon from '../../components/Icon/index'
import styles from './index.module.scss'
import classNames from 'classnames'
/* import Home from '../Home'
import Question from '../Question'
import Video from '../Video'
import Profile from '../Profile' */
const Home = lazy(() => import('../Home'))
const Question = lazy(() => import('../Question'))
const Video = lazy(() => import('../Video'))
const Profile = lazy(() => import('../Profile'))
const tabBar = [
  /* tabBar里4个元素都需要注册点击事件并添加类名和修改path路径，所以使用数组存储4个元素，
  并使用.map方法批量操作path和className */
  { id: 1, title: '首页', path: '/home/index', icon: 'iconbtn_home' },
  { id: 2, title: '问答', path: '/home/question', icon: 'iconbtn_qa' },
  { id: 3, title: '视频', path: '/home/video', icon: 'iconbtn_video' },
  { id: 4, title: '我的', path: '/home/profile', icon: 'iconbtn_mine' },
]
const Layout = () => {
  /* 获得路由跳转函数history.push(),当前路由地址信息 */
  const history = useHistory()
  const location = useLocation()
  return (
    <>
      <div className={styles.root}>
        {/* 区域一：点击按钮切换显示内容的区域 */}
        <div className="tab-content">
          {/* 配置二级路由 */}
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route path="/home/index" exact component={Home} />
              <Route path="/home/question" exact component={Question} />
              <Route path="/home/video" exact component={Video} />
              <Route path="/home/profile" exact component={Profile} />
            </Switch>
          </Suspense>
        </div>
        {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
        <div className="tabbar">
          {tabBar.map((item) => (
            <div
              className={classNames(
                'tabbar-item',
                /* 当前路由地址信息等于tab元素路径是，当前tab元素高亮 */
                location.pathname === item.path ? 'tabbar-item-active' : ''
              )}
              key={item.title}
              onClick={
                () => history.push(item.path)
                /* 跳转到指定tab的路径 */
              }
            >
              <Icon
                type={
                  /* 当前路由地址信息等于tab元素路径是，当前tab元素icon高亮 */

                  location.pathname === item.path
                    ? item.icon + '_sel'
                    : item.icon
                }
              />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Layout
