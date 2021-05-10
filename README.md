> uni-starter目前还处于内测阶段，内测QQ群号：869926521，欢迎大家加入！内测期间享受有疑问实时解答的福利。

### ps:文档处于完善过程中
### 介绍
`uni-starter`，是一个云端一体的、集成了商用项目开发常见功能的项目模板。
如果说uniCloud admin是管理端项目的基础模板，那么uni-starter则是用户端、尤其是移动端的基础模板。
在HBuilderX新建项目时选择uni-starter项目模板，在这个模板基础之上快速填充自己的业务，即可很快完成一个应用。
地址：[https://codechina.csdn.net/dcloud/uni-starter.git](https://codechina.csdn.net/dcloud/uni-starter.git)

#### 项目背景
我们一直想出一个结合uni-app、uniCloud和openDB以及uni-id和uniCloud admin等，uni全家桶的项目模板；
为了照顾各类应用的开发者，我们取交集最终罗列了如下功能，发现这些就是除业务逻辑外的项目基本功能并把它命名为`uni-starter`。
uni-starter将节省开发者大量的时间，让开发者集中精力在自己的特色业务上。
有了uni-starter，再加上schema2code生成前端页面，一个简单应用就可以快速完成。
uni-starter + uniCloud admin，应用开发从未如此简单快捷！
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

### uni-starter集成的功能包括：
1. 个人中心：登录注册（含用户名密码登录、手机号验证码登录、app一键登陆、微信登录、Apple登录、微信小程序登录）、修改密码、忘记密码、头像更换、昵称修改、积分查看、指纹绑定、退出登陆
2. 设置：App更新（整包升级、wgt升级、强制升级，后台搭配uniCloud admin的升级中心插件管理）、权限引导（app）、推送开关（app）、清除缓存（app）、用户协议、隐私协议（app）、问题与反馈、分享推荐、关于
3. 启动引导：iOS初次启动被用户禁止网络权限后引导开启、Android弹出隐私协议后再申请权限
4. 首页集成banner（后台搭配uniCloud admin的banner插件管理）、搜索、列表、详情、分享，均为云端一体。实际使用中将clientDB的表名更改为自己业务表名即可
5. 首页采用nvue，fast编译模式，加快App端启动速度
6. 内置联网失败的重试页面（不是错误弹框，页面有重试按钮）、更漂亮的分享菜单页面
7. 内置拦截器：
	- 页面路由拦截，配置需强制登陆的页面；打开时检测，如果token无效就自动跳转到登陆页
	- 优雅实现：自动引导打开`选择图片`所需要的权限。当调用`uni.chooseImage`时检测到无权限自动开启引导。并不是在每次调用接口时处理这类问题，你可以参考该例子做更多该类场景的处理。uni-starter也会持续完善
8. h5版在页面顶部引导用户`点击下载App`

#### 应用配置
##### 配置文件
uni-starter提供了uni-starter.config.js，可指定该应用是否强制登录才能进入首页，可配置选择登录注册方式以及不同方式的优先级等。配置项内容如下：
```
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
		//配置需要路由拦截的页面地址，在打开这些页面之前会自动检查（无需联网）uni_id_token的值，如果token无效就自动跳转到登陆页
		"needLogin": [
			"/pages/ucenter/userinfo/userinfo",
			"/uni_modules/uni-news-favorite/pages/uni-news-favorite/list",
			"/pages/ucenter/userinfo/uploadCutImageToUnicloud"
		],
		"login": ["smsCode","univerify", "username", "weixin", "apple"],
		/* 
			这里会根据数组的第0项，决定登陆方式的第一优先级是哪种登陆方式。
			所有你希望拥有的登陆方式这里都需要一一列举，未列举到的或设备环境不支持的登陆方式将被隐藏。
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

##### 模块配置
为了你可以快速体验uni-starter需要配置以下模块
1. Fingerprint 指纹识别
2. push消息推送
3. OAuth登陆模块
	1. 一键登陆univerify
	2. 苹果登陆 Sign in with Apple 
	3. 微信登陆

#### 目录结构
<pre>
uni-starter
├─uniCloud-aliyun	
│	├─cloudfunctions 云函数目录
│	|	├─common 公共模块
│	│	|	├─uni-config-center		uni-starter的服务端配置中心，项目所有云函数的配置在这里填写 <a target="_blank" href="https://ext.dcloud.net.cn/plugin?id=4425">详情</a>
│	│	|	|	├─index.js			config-center入口文件
│	│	|	|	└─uni-id			uni-id模块配置目录
│	│	|	|		├─config.json	uni-id对应的配置数据：微信登陆、一键登录、短信验证码登陆等key都在这里填写<a target="_blank" href="https://ext.dcloud.net.cn/plugin?id=4425">详情</a>
│	│	|	|		└─file.cert		uni-id依赖的配置文件,假如你使用微信发红包功能，需要的证书文件就是放到这里
│	|	|	└───uni-id				uni-id用户体系 <a target="_blank" href="https://uniapp.dcloud.io/uniCloud/uni-id">详情</a>
│	|	├─uni-analyse-searchhot		云端一体搜索模板依赖的云函数 <a target="_blank" href="https://ext.dcloud.net.cn/plugin?id=3851">详情</a>
│	|	└─user-center				用户中心云函数，实现用户注册、修改密码、发送验证码、快捷登录（微信、短信、账户、一键登录）
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
│		├─uni-id-log.schema.json	        	登陆日志表，表结构文件
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
│	│	├─login-page						登陆模块
│	|	|	├─common						登陆模块公共库
│	│	│	│	├─login-page.css			公共样式库
│	│	│	│	├─login-page.mixin.js		公共mixin
│	│	│	│	└─loginSuccess.js			公共登陆成功后操作
│	|	|	├─index							短信验证码登陆，手机号码输入页面
│	|	|	├─phone-code					短信验证码登陆，验证码输入页面
│	|	|	├─pwd-login						账户密码登陆
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
│	│	│	├─uploadCutImageToUnicloud.vue	引用limeClipper的图片裁剪模块，为了方便二开可能会出现兼容`vue`与`nvue`，所以做成了`页面`而不是`组件`
│	│	│	└─userinfo.vue
│	|	└─ucenter.vue						用户中心
│	|
├─static	 						存放应用引用的本地静态资源（如图片、视频等）的目录，<b>注意：</b>静态资源只能存放于此
├─uni_modules						存放[uni_module](/uni_modules)规范的插件。
├─main.js							Vue初始化入口文件
├─App.vue							应用配置，用来配置App全局样式以及监听 <a href="/collocation/frame/lifecycle?id=应用生命周期">应用生命周期</a>
├─baseconfig						uni-starter的前端的配置文件，项目所有模块的配置在这里填写。详见该文件的代码注释。
├─manifest.json	 					配置应用名称、appid、logo、版本等打包信息，<a href="/collocation/manifest">详见</a>
└─pages.json						配置页面路由、导航条、选项卡等页面类信息，<a href="/collocation/pages">详见</a>
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
	+ 分享功能配置参数，随着应用的业务场景决定，在各场景调用的时候配置。参考uni-starter的`/pages/list/detail.vue`的`methods -> shareClick`
	+ 更多`uni-share`的介绍 [详情](https://ext.dcloud.net.cn/plugin?id=4860)
- 升级中心相关
	+ `manifest.json` 基础配置 --> 应用版本名称 和 应用版本号
	+ 更多`uni-upgrade-center`的介绍 [详情](https://uniapp.dcloud.io/uniCloud/upgrade-center)



### 应用启动时序介绍
文件路径： App.vue
```
	import initApp from '@/common/appInit.js';
	export default {
		onLaunch: function() {
			initApp();
		}
	}
```
onLaunch生命周期执行了
1. 全局监听clientDB的err事件，
	- 判断是否为token过期失效等需要重新登陆的问题。自动跳转到登陆页面
	- 检测本地的token是否有效（存在且并未过期）否则跳转到登陆页面
2. 预登陆一键登录功能
3. 执行了initApp()包含以下操作
	1. 读取uni-starter.config并挂载到globalData的config下
	2. 读取应用版本号，并存到globalData下
	3. 检查是否有可更新的应用版本，决定是否启动在线更新版本
	4. 监听设备的网络变化并以uni.showToast APi的方式提醒用户
	5. 使用[拦截器](https://uniapp.dcloud.io/api/interceptor?id=addinterceptor) 实现
		- 页面路由拦截，配置需强制登陆的页面；打开时检测，如果token无效就自动跳转到登陆页
		- 优雅实现：自动引导打开`选择图片`所需要的权限。当调用`uni.chooseImage`时检测到无权限自动开启引导。并不是在每次调用接口时处理这类问题，你可以参考该例子做更多该类场景的处理。uni-starter也会持续完善

## 快速体验部署流程
#### 1. 开通uniCloud
- 开通`uniCloud`：本项目是云端一体的，它的云端代码需要部署在uniCloud云服务空间里，需要开通uniCloud。在[https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/)登录，按云厂商要求进行实名认证。
- 在uniCloud认证通过后，创建一个服务空间给本项目使用。选择阿里云或腾讯云均可。[参考](https://uniapp.dcloud.net.cn/uniCloud/price)
- 使用HBuilderX 3.1以上版本（最好是最新版），把本项目导入到HBuilderX中，在项目根目录uniCloud上点右键菜单，关联服务空间 -> 选择之前创建的服务空间

#### 2. 关联项目与云服务空间
<img class="cloud" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/f3f36e4a-77e6-495c-bb85-5fc6999e29e1.jpg" />
<img class="cloud" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/dd39dfcc-60c8-4f9f-a4d7-6b08f39e737e.jpg" />
<img class="cloud" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e/350f5e46-976e-4c5b-be49-e5c3908b03f4.jpg" />
<div style="clear: both;"></div>
<style>
img.cloud{
	box-shadow:0 0 2px #eeeeee;
	width:400px;
	margin:15px 5vw 0 0;
	float:left
}
</style>

### 注意事项
1. 真机运行需要制作自定义基座，制作后选择运行到自定义基座
2. 苹果登陆的图标，需要满足苹果应用市场的审核规范请勿随便修改；如需修改请先阅读:[Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/overview/buttons/)
3. 应用登陆功能，默认不勾选同意隐私权限是响应安卓应用市场的规范；请勿修改该逻辑。

### FAQ：常见问题
1. 提示“公共模块uni-id缺少配置信息”解决方案：在cloudfunctions右键‘上传所有云函数、公共模块及actions’之后，需要在cloudfunctions--》common--》uni-config-center 目录单独上传一次，右键‘上传公共模块’。
2. 本项目代码可以商用，无需为DCloud付费。但不能把本项目的代码改造用于非uni-app和uniCloud的技术体系。即，不能将后台改成php、java等其他后台，这将违反使用许可协议。

### 第三方插件（感谢插件作者，排名不分前后）：
1. 图片裁剪 [limeClipper](https://ext.dcloud.net.cn/plugin?id=3594) @作者： 陌上华年
2. 二维码生成 [Sansnn-uQRCode](https://ext.dcloud.net.cn/plugin?id=1287) @作者： 3snn
