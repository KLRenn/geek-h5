在 vscode 中配置 craco react-app-alias 失败，
> Modules can't resolve

webstorm 配置成功，ctrl + 鼠标悬停 可以显示完整路径
### 2022/9/18

路径别名没有解决，vscode和webstorm都显示 can't resolved

**处理登录后的页面跳转**

**token的无感刷新**
这两个功能遇到问题

- 页面跳转并没有携带登录前的地址

- token 无感刷新反而导致无法登录（浏览器开发者工具里网络能拿到 `Authorization` 的 `token` ，但无法登录，页面依旧跳转）