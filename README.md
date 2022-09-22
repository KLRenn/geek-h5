## 待处理

### 1

在 vscode 中配置 craco react-app-alias 失败，

> Modules can't resolve

webstorm 配置成功，ctrl + 鼠标悬停 可以显示完整路径

###  2 

路径别名没有解决，vscode和webstorm都显示 can't resolved

**处理登录后的页面跳转**（已解决）

> 删除 `localStorage` 中储存的 `token` 后，`AuthRoute` 才会拦截未登录情况下的用户界面访问_（Profile/*）_。

**token的无感刷新**
这两个功能遇到问题

- 页面跳转并没有携带登录前的地址（已解决）
- token 无感刷新反而导致无法登录（浏览器开发者工具里网络能拿到 `Authorization` 的 `token` ，但无法登录，页面依旧跳转）







### 3

