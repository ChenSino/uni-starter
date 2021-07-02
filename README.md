#### 看一段视频：
<a target="_blank" href="https://www.bilibili.com/video/BV17p4y1a71x?p=11">
    <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/71d310a5-ef69-4ca5-88c8-9a3abf8fb8e3.png" alt="腾讯课堂uniCloud视频教程" style="width: 70%;margin-bottom:26px;">
</a>

#### 简介
`uni-starter`，是一个集成了大量商用项目常见功能的，云端一体应用快速开发基本项目模版。

APP有很多通用的功能，比如登录注册、头像、设置、拦截器、banner...`uni-starter`将这些功能都已经集成好。

在hbuilderx新建项目选择`uni-starter`模板，即可在此基础上快速开发自己的特色业务。

有了uni-starter，再加上schema2code生成前端页面，一个简单应用就可以快速完成。

如果说uniCloud admin是管理端项目的基础模板，那么uni-starter则是用户端、尤其是移动端的基础项目模板。

uni-starter + uniCloud admin，提供了用户端和管理端的基础模板，应用开发从未如此简单快捷！

##### 扫码体验：h5版演示效果（链接：[https://uni-starter.dcloud.net.cn](https://uni-starter.dcloud.net.cn)）
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/0625ae17-1262-45cb-a713-cdbf02df5c0a.png" style="width: 120px;">

### uni-starter集成的功能包括：
 1. 用户账户：登录注册（含用户名密码登录、手机号验证码登录、app一键登录、微信登录、Apple登录、微信小程序登录）、修改密码、忘记密码、头像更换（集成图片裁剪）、昵称修改、积分查看、退出登录
 2. 设置：App更新（整包升级、wgt升级、强制升级，后台搭配uniCloud admin的升级中心插件管理）、推送开关（app）、指纹解锁（app）、人脸解锁（app）、清除缓存（app）、用户协议、隐私协议、问题与反馈、分享推荐、关于
 3. 启动引导：iOS初次启动被用户禁止网络权限后引导开启、Android弹出隐私协议后再申请权限
 4. 权限引导：应用无访问摄像头/相册权限，引导跳到设置界面
 5. 首页集成banner（后台搭配uniCloud admin的banner插件管理）、搜索、列表、详情、分享，均为云端一体。实际使用中将clientDB的表名更改为自己业务表名即可
 6. 首页采用nvue，fast编译模式，加快App端启动速度
 7. 内置联网失败的重试页面（不是错误弹框，页面有重试按钮）、更漂亮的分享菜单页面
 8. 内置拦截器：
	- 页面路由拦截，配置需强制登录的页面；打开时检测，如果token无效就自动跳转到登录页
	- 优雅实现：自动引导打开`选择图片`所需要的权限。当调用`uni.chooseImage`时检测到无权限自动开启引导。并不是在每次调用接口时处理这类问题，你可以参考该例子做更多该类场景的处理。uni-starter也会持续完善
 9. h5版在页面顶部（全局悬浮）引导用户`点击下载App`
 10. 营销裂变：点击“分销推荐”，生成带用户inviteCode参数的应用下载页（H5），一键分享到微信或微信朋友圈等。被邀请人打开下载页面点击下载，设备剪贴板的内容会被设置为邀请者的inviteCode。被邀请人下载app之后通过任何方式登陆（含：注册并登陆），uni-starter框架会自动获取设备剪切板中的inviteCode提交到服务端绑定关联关系。
 11. 自动完成：
	- 自动重连由网络导致失败的请求。操作注册/登陆操作自动获取客户端设备：push_clientid、imei、oaid、idfa新增/更新到数据表uni-id-device
	- 为迎合苹果App Store的规则，登陆与分享功能项显示之前自动检测是否安装了对应客户端。比如：设备未安装微信则不显示微信快捷登陆和微信分享选项
	- 分析uniCloud.callfunction和clientDB操作的响应体，判断code执行对应的操作如跳转到登陆页，自动续期token

* 更多功能模块会不断更新，请持续关注本插件 

## 快速体验部署流程
#### 1. 开通uniCloud
- 开通`uniCloud`：本项目是云端一体的，它的云端代码需要部署在uniCloud云服务空间里，需要开通uniCloud。在[https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/)登录，按云厂商要求进行实名认证。
- 在uniCloud认证通过后，创建一个服务空间给本项目使用。选择阿里云或腾讯云均可。[参考](https://uniapp.dcloud.net.cn/uniCloud/price)
- 使用HBuilderX 3.1以上版本（最好是最新版），把本项目导入到HBuilderX中，在项目根目录uniCloud上点右键菜单，关联服务空间 -> 选择之前创建的服务空间

#### 2. 关联项目与云服务空间
<img class="cloud" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/f3f36e4a-77e6-495c-bb85-5fc6999e29e1.jpg" />
<img class="cloud" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/dd39dfcc-60c8-4f9f-a4d7-6b08f39e737e.jpg" />
<img class="cloud" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/350f5e46-976e-4c5b-be49-e5c3908b03f4.jpg" />

#### 3.根目录`/uniCloud/database` 右键上传`上传所有DB Schema及扩展校验函数`


### 功能模块介绍
#### 1. 路由控制
传统的路由管理方式是对uni-app框架路由写法的二次封装，自定义的写法不支持ide的代码提示。
另外不同插件作者封装不同的路由管理方式，这样做出来的插件与用户的项目结合时，路由写法不统一的差异需要去磨平。
用拦截器（下文有详细介绍）实现路由管理并不需要改变原来路由的写法。
为此`uni-starter`基于`uni.addInterceptor`(拦截器)实现路由管理。

你只需要在项目根目录的框架配置文件：`uni-starter.config.js`的`router`->`needLogin`和`login`中配置完整的路由名称即可：
```js
"router": {
	//needLogin:配置强制需要登陆的页面，在打开这些页面之前会自动检查（前端校验）uni_id_token的值是否有效,如果无效会自动跳转到登陆页面
	"needLogin": [
		"/pages/ucenter/userinfo/userinfo",
		"/uni_modules/uni-news-favorite/pages/uni-news-favorite/list",
		"/uni_modules/uni-feedback/pages/uni-feedback/add"
	],
	/*
	login:配置登陆类型与优先级
		未列举到的，或设备环境不支持的选项，将被隐藏。如果你需要在不同平台有不同的配置，直接用条件编译即可
		根据数组的第0项，决定登录方式的第一优先级。
		详情下文：2.登录配置详解
	*/
	"login": ["username","smsCode","univerify", "weixin", "apple"],
}
```

#### 2.登录配置详解
- 使用方式：在 `uni-starter.config.js`->`router`->`login`下完全列举你需要的登录方式。这里支持用[条件编译](https://uniapp.dcloud.io/platform?id=%e6%9d%a1%e4%bb%b6%e7%bc%96%e8%af%91)因此你可以配置在不同平台下拥有的登录方式。
- uni-start集成的登录方式有：验证码登录(smsCode)、读取手机SIM卡一键登录(univerify)、账号密码登录(username)、微信登录(weixin)、苹果登录(apple)
- 优先级策略：
	如果:配置内容为：["username","smsCode"]，用户执行如下代码：
	```js
	uni.navigateTo({
		url: "/pages/ucenter/login-page/index/index"
	})
	```
	访问登录页面，会被拦截器自动切换到"配置的第0项(这里是`username`)的登录方式对应的页面”，即`账户登录`方式页面，路径：`/pages/ucenter/login-page/pwd-login/pwd-login`。
- 生效策略：登陆方式有如上5种，你希望有几种登陆方式就在配置中列举几种。有的登陆方式可能因为设备环境问题而不被支持；比如你正确地配置了微信登陆，但是用户的手机并没有安装微信，这样微信登陆功能就无法使用，并且如果出现这种情况你的app会被iOS的App Store拒绝上架。所以在这里，我们的生效策略在检测：你是否有列举到某个配置项为前提的情况下，增加了检测当前环境是否支持，如果不支持会自动隐藏。
- 其他配置：
	+ 服务端：uni-starter服务端使用[uni-config-center](https://ext.dcloud.net.cn/plugin?id=4425)统一管理这些配置，文件路径`/uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json`详情下文[目录结构](#id=catalogue) 和[uni-id配置说明](https://uniapp.dcloud.io/uniCloud/uni-id?id=configjson%e7%9a%84%e8%af%b4%e6%98%8e)
	+ 应用模块：`manifest.json` App模块配置 --> OAuth（登录鉴权）--> 勾选并配置你所需要的模块
- 短信登陆：
	+ 使用本功能需要在[DCloud开发者中心](https://dev.dcloud.net.cn/uniSms)开通并充值
	+ 教程参考[短信服务开通指南](https://ask.dcloud.net.cn/article/37534)
	+ 修改短信注册/登陆发生验证码的模板id，在文件`/uniCloud-aliyun/cloudfunctions/uni-id-cf/index.js` 搜索 `const templateId = '11753'` 替换为自己申请的模板id
- 一键登录：
	+ [开通配置](https://dev.dcloud.net.cn/uniLogin)
	+ [使用指南](https://uniapp.dcloud.io/univerify)
-  [苹果登陆集成指南](https://ask.dcloud.net.cn/article/36651) 
#### 3.h5版在页面顶部引导用户`点击下载App`
- 把h5端用户引流到APP端是一个非常常用的功能，相对于h5，APP端有更高的用户留存和更好的产品体验。
- 这同时也是一个演示开发者如何在h5端做全局悬浮块的例子。你可以在`/common/openApp.js`中修改他的样式等代码等，注意他只支持普通js语法。

#### 4.分享模块
- 应用配置：`manifest.json` App模块配置 --> Share --> 勾选并配置你所需要的模块
- 分享功能配置参数，随着应用的业务场景决定，在各场景调用的时候配置。参考uni-starter的`/pages/list/detail.vue`的`methods -> shareClick`
- 更多`uni-share`的介绍 [详情](https://ext.dcloud.net.cn/plugin?id=4860)

#### 5.升级中心相关
为了解决开发者维护多个 App 升级繁琐，重复逻辑过多，管理不便的问题，升级中心`uni-upgrade-center`应运而生。
提供了简单、易用、统一的 App 管理、App 版本管理、安装包发布管理，升级检测更新管理。
- 升级中心分为两个部分：`uni-upgrade-center` Admin管理后台和`uni-upgrade-center - Admin`前台检测更新。
- `uni-upgrade-center`的介绍 [详情](https://ext.dcloud.net.cn/plugin?id=4542)
- `uni-upgrade-center - Admin`的介绍 [详情](https://ext.dcloud.net.cn/plugin?id=4470)

#### 6.意见反馈
- 客户端[详情](https://ext.dcloud.net.cn/plugin?id=50)
- admin端[详情](https://ext.dcloud.net.cn/plugin?id=4992)

#### 7.指纹识别模块
- `manifest.json` App模块配置 --> `Fingerprint`指纹识别

#### 8.消息推送模块
- `manifest.json` App模块配置 --> `push`消息推送

#### 9.隐私政策弹框
根据工业和信息化部关于开展APP侵害用户权益专项整治要求，App提交到应用市场必须满足以下条件：
- 应用启动运行时需弹出隐私政策协议，说明应用采集用户数据
- 应用不能强制要求用户授予权限，即不能“不给权限不让用”
+ 如不希望应用启动时申请“读写手机存储”和“访问设备信息”权限，请参考：https://ask.dcloud.net.cn/article/36549

配置弹出“隐私协议和政策”打开项目的manifest.json文件，切换到“源码视图”项
在`manifest.json` -> `app-plus` -> `privacy` 节点下添加 prompt节点
```js
"privacy" : {
	"prompt" : "template",
	"template" : {
		"title" : "服务协议和隐私政策",
		"message" : "　　请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了更好的向你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。<br/>　　你可阅读<a href=\"https://ask.dcloud.net.cn/protocol.html\">《服务协议》</a>和<a href=\"https://ask.dcloud.net.cn/protocol.html\">《隐私政策》</a>了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务。",
		"buttonAccept" : "同意",
		"buttonRefuse" : "暂不同意"
	}
}
```
- prompt
  字符串类型，必填，隐私政策提示框配置策略，可取值template、custom、none，默认值为none
  + template
     使用原生提示框模板，可自定义标题、内容已经按钮上的文本
  + custom
     自定义隐私政策提示框，uni-app项目中推荐使用nvue页面进行自定义，5+ APP使用html页面进行自定义
  + none
    不弹出隐私政策提示框
- template
  json格式，可选，模板提示框上显示的内容
	+ title
	  模板提示框上的标题，默认为“服务协议和隐私政策”
	+ message
	  模板提示框上的内容，richtext类型字符串，支持a/font/br等节点，点击a链接会调用内置页面打开其href属性中链接地址。
	  **注意：务必配置此提示内容，或参考上面示例内容并修改《服务协议》和《隐私政策》链接地址**
	+ buttonAccept
	  模板提示框上接受按钮的文本，默认值为“我知道了”
	+ buttonRefuse
	  模板提示框上拒绝按钮的文本，默认不显示此按钮
	+ second
	  HBuilderX3.1.12+版本新增支持隐私提示框二次确认提示，用于配置二次确认提示框显示内容，message属性值不为空时弹出二次确认提示框
		+ title 二次确认提示框上的标题
		+ message 二次确认提示框上的内容，支持richtext类型字符串
		+ buttonAccept 二次确认提示框上接受按钮的文本
		+ buttonRefuse 二次确认提示框上拒绝按钮的文本

> 更多Android平台隐私与政策提示框配置方法，[详情](https://ask.dcloud.net.cn/article/36937)

##### 注意：
1. 最新的华为应用市场要求，隐私政策提示框上接受按钮的文本，必须为“同意”而不能是其他有歧义的文字。
2. 配置后提交云端打包后生效。理论上绝大部分和`manifest.json`生效相关的配置均需要提交云打包后生效

#### 10.拦截器改造后的uniCloud
1. Debug，调试期间开启Debug。接口一旦fail就会弹出真实错误信息。否则将弹出，系统错误请稍后再试！
```js
	if(Debug){
		console.log(e);
		uni.showModal({
			content: JSON.stringify(e),
			showCancel: false
		});
	}
```
2. 断网自动重试，当callFunction为fail时检测是否因断网引起。如果是会提醒用户并且会在恢复网络之后自动重新发起请求
3. 常规的errCoder自动执行对应程序，如token无效/过期自动跳转到登陆页面。
4. token自动续期。

#### 11.举例路由控制原理，深入了解拦截器的使用
比如你希望在打开用户中心等页面之前，都检查一下该用户是否登陆，否则就重定向到登陆页面。使用拦截器你可以用以下写法在应用入口定义全局生效：
	
```js
	//定义各个页面，这里为了演示uni-starter框架是把该定义写在全局配置uni-starter.config.js中
	let needLogin = ["/pages/ucenter/userinfo/userinfo", ... ] 
	
	uni.addInterceptor("navigateTo", {
		invoke(e) { // 调用前拦截
			//获取用户的token
			const token = uni.getStorageSync('uni_id_token')
			//获取当前页面路径（即url去掉"?"和"?"后的参数）
			const url = e.url.split('?')[0]
			//判断要打开的页面是否需要验证登陆
			if (needLogin.includes(url) && token == '') {
				uni.showToast({
					title: '该页面需要登录才能访问，请先登录',
					icon: 'none'
				})
				uni.navigateTo({
					url: "/pages/ucenter/login-page/index/index"
				})
				return false
			}
		},
		fail(err) { // 失败回调拦截 
			console.log(err);
		},
	})
```
- 而路由跳转方法不仅有`uni.navigateTo`还有`uni.redirectTo`,`uni.reLaunch`,`uni.switchTab`；
- 另外我们还希望控制直接跳转至哪种登陆类型
所以在uni-starter框架中我们这样定义：
> uni-starter/common/appInit.js 的第228-280行
```js
	const {"router": {needLogin,login} } = uniStarterConfig //需要登录的页面
	let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
	list.forEach(item => { //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
		uni.addInterceptor(item, {
			invoke(e) { // 调用前拦截
				//获取用户的token
				const token = uni.getStorageSync('uni_id_token')
				//获取当前页面路径（即url去掉"?"和"?"后的参数）
				const url = e.url.split('?')[0]
				//判断要打开的页面是否需要验证登陆
				if (needLogin.includes(url) && token == '') {
					uni.showToast({
						title: '该页面需要登录才能访问，请先登录',
						icon: 'none'
					})
					uni.navigateTo({
						url: "/pages/ucenter/login-page/index/index"
					})
					return false
				}
				//控制登录优先级
				if (url == '/pages/ucenter/login-page/index/index') {
					//一键登录（univerify）、账号（username）、验证码登录（短信smsCode）
					if (login[0] == 'univerify') {
						if(e.url == url) { e.url += '?' } //添加参数之前判断是否带了`？`号如果没有就补上，因为当开发场景本身有参数的情况下是已经带了`？`号
						e.url += "univerify_first=true"
					} else if (login[0] == 'username') {
						e.url = "/pages/ucenter/login-page/pwd-login/pwd-login"
					}
				}
				return true
			},
			fail(err) { // 失败回调拦截 
				console.log(err);
			},
		})
	})
```


### 应用启动时序介绍
文件路径： App.vue
```js
	import initApp from '@/common/appInit.js';
	export default {
		onLaunch: function() {
			initApp();
		}
	}
```
onLaunch生命周期执行了
1. 全局监听clientDB的err事件，
	- 判断是否为token过期失效等需要重新登录的问题。自动跳转到登录页面
	- 检测本地的token是否有效（存在且并未过期）否则跳转到登录页面
2. 预登录一键登录功能
3. 执行了initApp()包含以下操作
	1. 读取uni-starter.config并挂载到globalData的config下
	2. 读取应用版本号，并存到globalData下
	3. 检查是否有可更新的应用版本，决定是否启动在线更新版本
	4. 监听设备的网络变化并以uni.showToast APi的方式提醒用户
	5. 使用[拦截器](https://uniapp.dcloud.io/api/interceptor?id=addinterceptor) 实现
		- 页面路由拦截，配置需强制登录的页面；打开时检测，如果token无效就自动跳转到登录页
		- 优雅实现：自动引导打开`选择图片`所需要的权限。当调用`uni.chooseImage`时检测到无权限自动开启引导。并不是在每次调用接口时处理这类问题，你可以参考该例子做更多该类场景的处理。uni-starter也会持续完善


##### 配置文件
uni-starter提供了uni-starter.config.js，可指定该应用是否强制登录才能进入首页，可配置选择登录注册方式以及不同方式的优先级等。配置项内容如下：
```js
module.exports = {
	"h5": {
		"url": "https://static-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e.bspapp.com", //	前端网页托管的域名
		 // 在h5端全局悬浮引导用户下载app的功能 更多自定义要求在/common/openApp.js中修改
		"openApp": {
			//点击悬浮下载栏后打开的网页链接
			"openUrl": 'https://sj.qq.com/myapp/detail.htm?apkName=com.tencent.android.qqdownloader&info=6646FD239A6EBA9E2DEE5DFC7E18D867',
			//左侧显示的应用名称
			"appname": 'uni-starter',
			//应用的图标
			"logo": './static/logo.png',
		}
	},
	"mp": {
		"weixin": {
			//微信小程序原始id，微信小程序分享时
			"id": "gh_132465798"
		}
	},
	"router": {
		//配置需要路由拦截的页面地址，在打开这些页面之前会自动检查（无需联网）uni_id_token的值，如果token无效就自动跳转到登录页
		"needLogin": [
			"/pages/ucenter/userinfo/userinfo",
			"/uni_modules/uni-news-favorite/pages/uni-news-favorite/list",
		],
		"login": ["smsCode","univerify", "username", "weixin", "apple"],
		/* 
			这里会根据数组的第0项，决定登录方式的第一优先级是哪种登录方式。
			所有你希望拥有的登录方式这里都需要一一列举，未列举到的或设备环境不支持的登录方式将被隐藏。
			如果你需要在不同平台有不同的配置，直接用条件编译即可。
		*/
	},
	//关于应用
	"about": {
		//应用名称
		"appName": "uni-starter",
		//应用logo
		"logo": "/static/logo.png",
		//公司名称
		"company": "数字天堂（北京）网络技术有限公司",
		//口号
		"slogan": "为开发而生",
		//政策协议
		"agreements": [{
				"title": "用户服务协议", //协议名称
				"url": "https://ask.dcloud.net.cn/protocol.html" //对应的网络链接
			},
			{
				"title": "隐私政策",
				"url": "https://ask.dcloud.net.cn/protocol.html"
			}
		],
		//应用的链接，用于分享到第三方平台和生成关于我们页的二维码
		"download": "https://m3w.cn/uniapp"
	},
	//用于打开应用市场评分界面
	"marketId":{
		"ios":"id1417078253",
		"android":"123456"
	}
}
```

#### 目录结构@catalogue
<pre>
uni-starter
├─uniCloud-aliyun	
│	├─cloudfunctions 云函数目录
│	|	├─common 公共模块
│	│	|	├─uni-config-center		uni-starter的服务端配置中心，项目所有云函数的配置在这里填写 <a target="_blank" href="https://ext.dcloud.net.cn/plugin?id=4425">详情</a>
│	│	|	|	├─index.js			config-center入口文件
│	│	|	|	└─uni-id			uni-id模块配置目录
│	│	|	|		├─config.json	uni-id对应的配置数据：微信登录、一键登录、短信验证码登录等key都在这里填写<a target="_blank" href="https://ext.dcloud.net.cn/plugin?id=4425">详情</a>
│	│	|	|		└─file.cert		uni-id依赖的配置文件,假如你使用微信发红包功能，需要的证书文件就是放到这里
│	|	|	└───uni-id				uni-id用户体系 <a target="_blank" href="https://uniapp.dcloud.io/uniCloud/uni-id">详情</a>
│	|	├─uni-analyse-searchhot		云端一体搜索模板依赖的云函数 <a target="_blank" href="https://ext.dcloud.net.cn/plugin?id=3851">详情</a>
│	|	└─uni-id-cf				用户中心云函数，实现用户注册、修改密码、发送验证码、快捷登录（微信、短信、账户、一键登录）
│	└──database						云数据目录
│		├─db_init.json				db_init.json初始化数据库文件，其中不再包含schema <a target="_blank" href="https://uniapp.dcloud.net.cn/uniCloud/hellodb?id=db-init">详情</a>
│		├─opendb-app-versions.schema.json		应用版本，表结构文件
│		├─opendb-banner.schema.json	        	横幅数据表，表结构文件
│		├─opendb-feedback.schema.json	        意见反馈表，表结构文件
│		├─opendb-news-articles.schema.json	    新闻文章表，表结构文件
│		├─opendb-news-categories.schema.json	新闻分类表，表结构文件
│		├─opendb-news-comments.schema.json		新闻评论表，表结构文件
│		├─opendb-news-favorite.schema.json		新闻收藏表，表结构文件
│		├─opendb-search-hot.schema.json			热门搜索表，表结构文件
│		├─opendb-search-log.schema.json			搜索记录表，表结构文件
│		├─opendb-verify-codes.schema.json		验证码表，表结构文件
│		├─uni-id-log.schema.json	        	登录日志表，表结构文件
│		├─uni-id-scores.schema.json	        	用户积分表，表结构文件
│		└─uni-id-users.schema.json	        	用户表，表结构文件
├─pages										业务页面文件存放的目录
│	├─common						
│	│	└─webview							webview目录
│	│		└─webview.vue					webview页面	用于实现跨端的web页面浏览
│	├─grid
│	│	└─grid.vue	 						带宫格和banner的示例页面
│	├─list
│	│	├─list.vue	 						新闻列表
│	│	├─search
│	│	│	└─search						云端一体搜索插件
│	│	└─detail.vue						新闻详情
│	├─ucenter
│	│	├─about								关于我们
│	│	│	└─about
│	│	├─login-page						登录模块
│	|	|	├─common						登录模块公共库
│	│	│	│	├─login-page.css			公共样式库
│	│	│	│	├─login-page.mixin.js		公共mixin
│	│	│	│	└─loginSuccess.js			公共登录成功后操作
│	|	|	├─index							短信验证码登录，手机号码输入页面
│	|	|	├─phone-code					短信验证码登录，验证码输入页面
│	|	|	├─pwd-login						账户密码登录
│	|	|	├─pwd-retrieve					密码重置
│	│	│	└─register						注册账户模块
│	│	│		├─validator.js
│	│	│		└─register.vue
│	│	├─read-news-log						新闻阅读记录
│	│	│	└─read-news-log
│	│	├─settings						
│	│	│	├─dc-push
│	│	│	│	└─push.js					push权限操作SDK
│	│	│	└─settings.vue					app设置
│	│	├─userinfo							用户个人信息
│	│	│	├─bind-mobile
│	│	│	│	└─bind-mobile.vue			绑定手机号码
│	│	│	├─limeClipper					图片裁剪插件,来源[limeClipper](https://ext.dcloud.net.cn/plugin?id=3594) @作者： 陌上华年
│	│	│	│	├─images
│	│	│	│	│	├─photo.svg
│	│	│	│	│	└─rotate.svg
│	│	│	│	├─index.css
│	│	│	│	├─limeClipper.vue
│	│	│	│	├─README.md
│	│	│	│	└─utils.js
│	│	│	├─main.js
│	│	│	├─cropImage.vue	引用limeClipper的图片裁剪模块，为了方便二开可能会出现兼容`vue`与`nvue`，所以做成了`页面`而不是`组件`
│	│	│	└─userinfo.vue
│	|	└─ucenter.vue						用户中心
│	|
├─static	 						存放应用引用的本地静态资源（如图片、视频等）的目录，<b>注意：</b>静态资源只能存放于此
├─uni_modules						存放[uni_module](/uni_modules)规范的插件。
├─uni_modules_tools					uni_modules插件上传辅助脚本 <a href="https://ext.dcloud.net.cn/plugin?id=5256">详情</a>。
├─main.js							Vue初始化入口文件
├─App.vue							应用配置，用来配置App全局样式以及监听 <a href="/collocation/frame/lifecycle?id=应用生命周期">应用生命周期</a>
├─uni-starter.config				uni-starter的前端的配置文件，项目所有模块的配置在这里填写。详见该文件的代码注释。
├─manifest.json	 					配置应用名称、appid、logo、版本等打包信息，<a href="/collocation/manifest">详见</a>
└─pages.json						配置页面路由、导航条、选项卡等页面类信息，<a href="/collocation/pages">详见</a>
</pre>
完整的uni-app目录结构[详情](https://uniapp.dcloud.io/frame?id=%e7%9b%ae%e5%bd%95%e7%bb%93%e6%9e%84)

### 常见API示范
1. 判断当前用户是否拥有某角色`uniIDHasRole` 演示页面：`/pages/grid/grid` [API文档详情：](https://uniapp.dcloud.io/api/global?id=uniidhasrole)
2. 指纹解锁、人脸解锁  演示页面：`/pages/ucenter/settings/settings` [API文档详情：](https://uniapp.dcloud.io/api/system/authentication)


### 注意事项
1. 真机运行需要制作自定义基座，制作后选择运行到自定义基座
2. 苹果登录的图标，需要满足苹果应用市场的审核规范请勿随便修改；如需修改请先阅读:[Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/overview/buttons/)
3. 应用登录功能，默认不勾选同意隐私权限是响应安卓应用市场的规范；请勿修改该逻辑。

### FAQ：常见问题
1. 提示“公共模块uni-id缺少配置信息”解决方案：在cloudfunctions右键‘上传所有云函数、公共模块及actions’之后，需要在cloudfunctions -> common -> uni-config-center 目录单独上传一次，右键‘上传公共模块’。
2. 本项目代码可以商用，无需为DCloud付费。但不能把本项目的代码改造用于非uni-app和uniCloud的技术体系。即，不能将后台改成php、java等其他后台，这将违反使用许可协议。

### 第三方插件（感谢插件作者，排名不分前后）：
1. 图片裁剪 [limeClipper](https://ext.dcloud.net.cn/plugin?id=3594) @作者： 陌上华年
2. 二维码生成 [Sansnn-uQRCode](https://ext.dcloud.net.cn/plugin?id=1287) @作者： 3snn
3. clipboard.js [clipboard](https://clipboardjs.com/)