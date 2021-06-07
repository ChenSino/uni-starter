## 1.0.14（2021-06-07）
修改错误的表名称uni-verify为opendb-verify-codes
## 1.0.13（2021-06-04）
新增一键登陆界面的第三方快捷登陆按钮
## 1.0.12（2021-05-28）
修复拦截器在ios app端会报错：Unhandled promise...的问题
## 1.0.10（2021-05-27）
新增callfunction的拦截器废除this.request的写法。为callFunction添加：请求失败是否断网判断并提示、恢复网络自动重新执行、自动处理响应体：token过期自动跳转到登陆页面、token自动续期
## 1.0.9（2021-05-23）
修复变量被重复定义的问题
## 1.0.8（2021-05-22）
宫格页(/pages/grid/grid)，新增根据当前用户是否登陆、是否为管理员的角色来决定是否显示的示范
## 1.0.7（2021-05-22）
删除多余数据
## 1.0.6（2021-05-22）
修复当username（用户名&密码）为第一优先级的登陆方式时。无法切换到smsCode(短信验证码)登陆方式
## 1.0.5（2021-05-20）
改用uni_modules方式处理图片选择api时无权限，引导用户快捷打开系统设置
## 1.0.4（2021-05-19）
为方便部署，添加空的manifest.json uni-config-center下的uni-id配置
## 1.0.3（2021-05-18）
重大调整，原云函数名称：user-center改名叫uni-id-cf
修复，绑定手机号码场景。因手机未插SIM导致的一键登录失败后未直接跳到获取短信验证码方式绑定
## 1.0.2（2021-05-17）
添加 uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json 文件
## 1.0.1（2021-05-17）
manifest.json 在小程序平台增加了一个配置项 betterScopedSlots，启用新的作用域插槽编译，用于支持作用域插槽内使用复杂表达式。
## 1.0.0（2021-05-17）
第一版