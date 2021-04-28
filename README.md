base app，是一个云端一体的、集成了商用项目开发常见功能的项目模板。

如果说uniCloud admin是管理端项目的基础模板，那么base app则是用户端、尤其是移动端的基础模板。

在HBuilderX新建项目时选择base app项目模板，在这个模板基础之上快速填充自己的业务，即可很快完成一个应用。

base app集成的功能包括：
1. 个人中心：登录注册（含用户名密码登录、手机号验证码登录、app一键登陆、微信登录、Apple登录、支付宝小程序登录）、修改密码、忘记密码、头像更换、昵称修改、积分查看、指纹绑定、退出
2. 设置：App更新（整包升级、wgt升级、强制升级，后台搭配uniCloud admin的升级中心插件管理）、权限引导（app）、推送开关（app）、清除缓存（app）、用户协议、隐私协议（app）、问题与反馈、分享推荐、关于
3. 启动引导：iOS初次启动被用户禁止网络权限后引导开启、Android弹出隐私协议后再申请权限
4. 首页集成banner（后台搭配uniCloud admin的banner插件管理）、搜索、列表、详情、分享，均为云端一体。实际使用中将clientDB的表名更改为自己业务表名即可
5. 首页采用nvue，fast编译模式，加快App端启动速度
6. 内置联网失败的重试页面（不是错误弹框，页面有重试按钮）、更漂亮的分享菜单页面
7. 内置拦截器：
	- 网络拦截
	- 页面路由拦截，需要登录才能用的，自动跳转到登陆页，登陆后自动继续
	- 权限拦截，定位、拍照、相册涉及隐私权限和设备是否开关
8. h5版支持在页面顶部引导下载App
9. 插屏公告

base app提供了baseapp.config.js，可指定该应用是否强制登录才能进入首页，可配置选择登录注册方式以及不同方式的优先级。

base app将节省开发者大量的时间，让开发者集中精力在自己的特色业务上。

有了base app，再加上schema2code生成前端页面，一个简单应用就可以快速完成。

base app + uniCloud admin，应用开发从未如此简单快捷！

baseapp中的主要功能，插件列表
1. uni-id用户体系 [uni-id](https://uniapp.dcloud.io/uniCloud/uni-id)
2. 分享功能插件 [uni-share](https://ext.dcloud.net.cn/plugin?id=4860)
3. 升级中心	[uni-upgrade-center](https://ext.dcloud.net.cn/plugin?id=4542)
4. 云端一体搜索模板 [uni-search-template](https://ext.dcloud.net.cn/plugin?id=3851)

第三方插件（感谢插件作者，排名不分前后）：
1. [limeClipper](https://ext.dcloud.net.cn/plugin?id=3594) @作者： 陌上华年
2. [Sansnn-uQRCode](https://ext.dcloud.net.cn/plugin?id=1287) @作者： 3snn