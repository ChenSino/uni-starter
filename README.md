> base app目前还处于内测阶段，内测QQ群号：869926521，欢迎大家加入！内测期间享受有疑问实时解答的福利。

### 介绍
`base app`，是一个云端一体的、集成了商用项目开发常见功能的项目模板。
如果说uniCloud admin是管理端项目的基础模板，那么base app则是用户端、尤其是移动端的基础模板。
在HBuilderX新建项目时选择base app项目模板，在这个模板基础之上快速填充自己的业务，即可很快完成一个应用。
地址：[https://gitee.com/dcloud/base-app](https://gitee.com/dcloud/base-app)

#### 项目背景
我们一直想出一个结合uni-app、uniCloud和openDB以及uni-id和uniCloud admin等，uni全家桶的项目模板；
为了照顾各类应用的开发者，我们取交集最终罗列了如下功能，发现这些就是除业务逻辑外的项目基本功能并把它命名为`base app`。

### 界面效果
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/c2362519-8131-4071-b08a-8175e11b9341.jpg" />
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/61e0f3d3-d726-4973-865c-e6ee0bdd0870.jpg" />
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/644bab3c-1f90-46ba-a920-f464b52d0e36.jpg" />
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/97db3e92-c3b3-4e32-bfb8-c348f9c9cd61.jpg" />
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/a1d53005-5d45-45d1-b048-a7260a478edf.jpg" />
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/d41b871f-d47f-4e86-b2f1-2b1a74a8a4bd.jpg" />
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/b0d7f5e7-2e16-4b3e-a123-6e9cd97582d7.jpg" />
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/e03ad65d-11bb-4697-81b2-d13af42f0441.jpg" />
<div style="clear: both;"></div>
<style>
img{
	box-shadow:0 0 2px #eeeeee;
	width:200px;
	margin:15px 5vw 0 0;
	float:left
}
</style>

### base app集成的功能包括：
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

base app提供了baseapp.config.js，可指定该应用是否强制登录才能进入首页，可配置选择登录注册方式以及不同方式的优先级。
base app将节省开发者大量的时间，让开发者集中精力在自己的特色业务上。
有了base app，再加上schema2code生成前端页面，一个简单应用就可以快速完成。
base app + uniCloud admin，应用开发从未如此简单快捷！

### 应用配置
#### 目录结构
<pre>
cloudfunctions
├─────common 公共模块
│		└─uni-config-center			// baseapp的服务端配置中心，项目所有云函数的配置在这里填写
│			├─index.js				// config-center入口文件
│			└─uni-id				// 插件uni-id对应的目录
│				├─config.json		// uni-id对应的配置文件
│				└─file.cert			// uni-id依赖的其他文件,假如你使用微信发红包功能，需要的证书文件就是放到这里
├─ baseconfig						// baseapp的前端的配置文件，项目所有模块的配置在这里填写。详见该文件的代码注释。
└─ manifest.json					// 配置应用名称、appid、logo、版本等打包信息，[详情](https://uniapp.dcloud.io/collocation/manifest)
</pre>
完整的uni-app目录结构[详情](https://uniapp.dcloud.io/frame?id=%e7%9b%ae%e5%bd%95%e7%bb%93%e6%9e%84)
#### 按功能模块
- 登陆模块
	+ `manifest.json` App模块配置 --> OAuth（登录鉴权）--> 勾选并配置你所需要的模块
	+ 登陆方式的优先级和登陆项（支持多平台条件编译）详情配置文件：`baseconfig`的`router -> login`
	+ 服务端配置详情：`/uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json`
	+ 更多`uni-config-center`的介绍 [详情](https://ext.dcloud.net.cn/plugin?id=4425)
- 分享模块
	+ `manifest.json` App模块配置 --> Share（分享）--> 勾选并配置你所需要的模块
	+ 分享功能配置参数，随着应用的业务场景决定，在各场景调用的时候配置。参考base app的`/pages/list/detail.vue`的`methods -> shareClick`
	+ 更多`uni-share`的介绍 [详情](https://ext.dcloud.net.cn/plugin?id=4860)
- 升级中心相关
	+ `manifest.json` 基础配置 --> 应用版本名称 和 应用版本号
	+ 更多`uni-upgrade-center`的介绍 [详情](https://uniapp.dcloud.io/uniCloud/upgrade-center)

### 应用启动时序介绍
1. 初始化应用执行appInit
	1. 读取baseapp.config并挂载到globalData的config下
	2. 读取应用版本号，并存到globalData下。
	3. 检查是否有可更新的应用版本。
	4. 使用[拦截器](https://uniapp.dcloud.io/api/interceptor?id=addinterceptor) 实现了，
	 - 强制登陆路由拦截。
	 - 摄像头/相册权限，引导跳到设置界面
2. 全局监听
	1. 网络的变化与toast方式提醒
	2. clientDB的err事件，
		- 判断是否为token过期失效等需要重新登陆的问题。自动跳转到登陆页面
		- 检测本地的token是否有效（存在且并未过期）否则跳转到登陆页面
3. 预登陆一键登录功能
## 快速体验部署流程
#### 1. 开通uniCloud
- 开通`uniCloud`：本项目是云端一体的，它的云端代码需要部署在uniCloud云服务空间里，需要开通uniCloud。在[https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/)登录，按云厂商要求进行实名认证。
- 在uniCloud认证通过后，创建一个服务空间给本项目使用。选择阿里云或腾讯云均可。[参考](https://uniapp.dcloud.net.cn/uniCloud/price)
- 使用HBuilderX 3.1以上版本（最好是最新版），把本项目导入到HBuilderX中，在项目根目录uniCloud上点右键菜单，关联服务空间 -> 选择之前创建的服务空间

#### 2. 关联项目与云服务空间
<img style="width:50vw" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/f3f36e4a-77e6-495c-bb85-5fc6999e29e1.jpg" />
<img style="width:50vw" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/dd39dfcc-60c8-4f9f-a4d7-6b08f39e737e.jpg" />
<img style="width:50vw" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/350f5e46-976e-4c5b-be49-e5c3908b03f4.jpg" />



#### 5. 真机运行
注意：真机运行需要制作自定义基座，制作后选择运行到自定义基座.

### FAQ：常见问题
1. 提示“公共模块uni-id缺少配置信息”解决方案：在cloudfunctions右键‘上传所有云函数、公共模块及actions’之后，需要在cloudfunctions--》common--》uni-config-center 目录单独上传一次，右键‘上传公共模块’。
2. 本项目代码可以商用，无需为DCloud付费。但不能把本项目的代码改造用于非uni-app和uniCloud的技术体系。即，不能将后台改成php、java等其他后台，这将违反使用许可协议。

### 第三方插件（感谢插件作者，排名不分前后）：
1. 图片裁剪 [limeClipper](https://ext.dcloud.net.cn/plugin?id=3594) @作者： 陌上华年
2. 二维码生成 [Sansnn-uQRCode](https://ext.dcloud.net.cn/plugin?id=1287) @作者： 3snn