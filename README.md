## 问题

### 1 路径别名问题[已解决]



在 vscode 中配置 craco react-app-alias 失败，

> Modules can't resolve

webstorm 配置成功，ctrl + 鼠标悬停 可以显示完整路径

###  2 登录后的页面跳转（已解决）



删除 `localStorage` 中储存的 `token` 后，`AuthRoute` 才会拦截未登录情况下的用户界面访问_（Profile/*）_。

并在跳转时记录

```jsx
<Redirect to={
              {
                pathname: '/login',
                state: {
                  from: props.location.pathname
                }
              }
            } />
```



### 3 token的无感刷新


这两个功能遇到问题

- 页面跳转并没有携带登录前的地址（已解决）

  ```
  state: {
                    from: props.location.pathname
                  }
  ```

  记录跳转前的 `pathname`

- token 无感刷新反而导致无法登录（浏览器开发者工具里网络能拿到 `Authorization` 的 `token` ，但无法登录，页面依旧跳转）



### 4 导入Router失败

取消导入 `BrowserRouter` ，但 `history.location.pathname` 读取失败，无点击事件时，`pathname` 正常，有点击事件，`history` 变化时，

```jsx
/* App.js */
<Router history={history}></Router>
```



```
location:
{
	action:'push',
	locaion:{}
}
```

即使读取 `history.location.location.pathname` 仍无法读取 `pathname` 。

### bottom


