> base app目前还处于内测阶段，内测QQ群号：869926521，欢迎大家加入！内测期间享受有疑问实时解答的福利。

### 介绍
`base app`，是一个云端一体的、集成了商用项目开发常见功能的项目模板。
如果说uniCloud admin是管理端项目的基础模板，那么base app则是用户端、尤其是移动端的基础模板。
在HBuilderX新建项目时选择base app项目模板，在这个模板基础之上快速填充自己的业务，即可很快完成一个应用。
地址：[https://gitee.com/dcloud/base-app](https://gitee.com/dcloud/base-app)

#### 项目背景
我们一直想出一个结合uni-app、uniCloud和openDB以及uni-id和uniCloud admin等，uni全家桶的项目模板；
为了照顾各类应用的开发者，我们取交最终集罗列了如下功能，发现这些就是除业务逻辑外的项目基本功能并把它命名为`base app`。

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
<pre>
cloudfunctions
└─────common 公共模块
│		└─uni-config-center			// baseapp的服务端配置中心，项目所有云函数的配置在这里填写
│			├─index.js				// config-center入口文件
│			└─uni-id				// 插件uni-id对应的目录
│				├─config.json		// uni-id对应的配置文件
│				└─file.cert			// uni-id依赖的其他文件,假如你使用微信发红包功能，需要的证书文件就是放到这里
├─ baseconfig						// baseapp的前端的配置文件，项目所有模块的配置在这里填写。详见该文件的代码注释。
└─ manifest.json					// 配置应用名称、appid、logo、版本等打包信息，[详情](https://uniapp.dcloud.io/collocation/manifest)
</pre>
完整的uni-app目录结构[详情](https://uniapp.dcloud.io/frame?id=%e7%9b%ae%e5%bd%95%e7%bb%93%e6%9e%84)
#### 1. manifest.json配置

完成如下配置：
- App模块配置 --> OAuth（登录鉴权）--> 勾选微信登录 --> 填写`appid`、`appsecret`、`ios平台通用链接`
- App模块配置 --> OAuth（登录鉴权）勾选`苹果登录`，[IOS苹果授权登录参考文档](https://ask.dcloud.net.cn/article/36651)。如不发布到Appstore，不需要配置此项
- App模块配置 --> Share（分享）--> 微信分享 --> 填写`appid`、`ios平台通用链接`
- App常用其他设置  --> 填写关联域Associated Domains  [参考教程](https://ask.dcloud.net.cn/article/36393)。如不发布到Appstore，不需要配置此项

#### 2. uni-id配置

在项目目录`uniCloud`--> `cloudfunctions`--> `common`--> `uni-config-center`--> `uni-id`--> `config.json`文件里：

- 微信登录填写`appid` 、`appsecret`,在微信开放平台查看，[微信开放平台](https://open.weixin.qq.com/)
- 苹果登录需要配置，`app-plus`-->  `oauth`-->  `apple`，填写包名`bundleId`

### 界面如下：

## 项目构成
#### baseapp中的主要模块介绍
1. uni-id用户体系 [uni-id](https://uniapp.dcloud.io/uniCloud/uni-id)
2. uniCloud 配置中心 [uni-config-center](https://ext.dcloud.net.cn/plugin?id=4425)
2. 分享功能插件 [uni-share](https://ext.dcloud.net.cn/plugin?id=4860)
3. 升级中心	[uni-upgrade-center](https://ext.dcloud.net.cn/plugin?id=4542)
4. 云端一体搜索模板 [uni-search-template](https://ext.dcloud.net.cn/plugin?id=3851)

#### 第三方插件（感谢插件作者，排名不分前后）：
1. [limeClipper](https://ext.dcloud.net.cn/plugin?id=3594) @作者： 陌上华年
2. [Sansnn-uQRCode](https://ext.dcloud.net.cn/plugin?id=1287) @作者： 3snn

#### 时序介绍
	初始化应用执行appInit
		读取baseapp.config并挂载到globalData的config下
		读取应用版本号，检查是否有可更新的版本。并存到globalData下
		使用[拦截器](https://uniapp.dcloud.io/api/interceptor?id=addinterceptor)
			实现了，1、路由拦截。2、摄像头/相册权限，引导跳到设置界面
		监听网络的变化与toast方式提醒
	预登陆一键登录功能
	全局监听clientDB的err事件，判断是否为token过期失效等需要重新登陆的问题。自动跳转到登陆页面
	判断入口页是否为强制登陆页面，Y.检测本地的token是否有效（存在且并未过期）否则跳转到登陆页面

## 真机体验快速部署流程

#### 1. 开通uniCloud

- 开通`uniCloud`：本项目是云端一体的，它的云端代码需要部署在uniCloud云服务空间里，需要开通uniCloud。在[https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/)登录，按云厂商要求进行实名认证。
- 在uniCloud认证通过后，创建一个服务空间给本项目使用。选择阿里云或腾讯云均可。[参考](https://uniapp.dcloud.net.cn/uniCloud/price)
- 使用HBuilderX 3.1以上版本（最好是最新版），把本项目导入到HBuilderX中，在项目根目录uniCloud上点右键菜单，关联服务空间 -> 选择之前创建的服务空间

#### 2. 开通App一键登陆

一键登陆是运营商提供的、比短信验证码更方便、更安全、更便宜的方案。[详见](https://uniapp.dcloud.net.cn/univerify)。

- manifest.json -> App模块配置 -> OAuth（登录鉴权）-> 一键登录，点击后面的`开通配置`
- 在随后打开的web界面中，同意协议，并点击充值按钮充值。如只是测试，可以只充值1元钱。
- 如果你已经确定包名，则可以在web界面点击“添加应用”，提交审核。这个是正式打包必须的。真机运行可以跳过此环节。
- 记住页面上展示的`apiKey`和`apiSecret`，下一步需要用到。


#### 3. uni-id里配置一键登录

打开文件 `uniCloud` --> `cloudfunctions` --> `common` --> `uni-config-center`--> `uni-id` --> `config.json`，

找到如下节点：`service` --> `univerify`，填写`appid`、`apiKey`和 `apiSecret`。`appid`就是`manifest`里的`DCloudAppId`。`apiKey`和`apiSecret`则是从上一步的web界面得来的。

#### 4. 上传云函数

在`uniCloud` -> `cloudfunctions`目录右键，选择 “上传所有云函数、公共模块及actions”。

注意：cloudfunctions--》common--》uni-config-center 目录需要单独上传一次，右键‘上传公共模块’。


#### 5. 初始化数据库
 
方式一：
- 在项目`uniCloud`目录-->`database`-->`db_init.json`文件，右键选择 “初始化云数据库”。
- 在`database`目录，右键选择 “上传所有数据集合Schema及扩展校验函数”。

方式二：
- 在项目`uniCloud`目录右键，选择“运行云服务空间初始化向导”，点击“下一步”，点击“开始部署”。



#### 6. 跨域配置

如运行在iOS上，需解决本地页面跨域问题。

在uniCloud web 控制台跨域配置里添加：localhost:13131

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/a60dd5c0-614e-11eb-8d54-21c4ca4ce5d7.jpg)


#### 7. 真机运行

到此为止，就可以真机运行跑起来了。这里运行的广告，是测试广告位，不会产生真实收益。

如果你要商用，还得申请各种资质。具体见下一章文档。

注意：真机运行需要制作自定义基座，制作后选择运行到自定义基座.


### 准备工作

首先确定App的应用名称、包名、证书，后续在各个三方服务申请时，都需要包名和证书摘要。并且注意在HBuilderX中打包时，必须使用相同的包名和证书。应用名称在`manifest`里设置。
- 上架应用市场需要有域名已经获得ICP备案的官网，你可以提前做好备案工作。另外网站你可以直接部署到uniCloud前端网页托管
- 申请软件著作权：加入DCloud软著优惠加急申请QQ专用群：893532138
- 申请一键登录：在 manifest.json -> App模块配置 -> OAuth（登录鉴权）-> 一键登录，点击后面的`开通配置`，在打开的web页面添加应用，充值。
- 申请微信登录：在微信开放平台申请移动应用，获得的appid和appsecret，用于微信登录、微信分享。[微信开放平台](https://open.weixin.qq.com/)

以上业务都有审核周期，请提前处理。

#### 7. APP云打包
IOS和Android云打包，配置正确的包名，打包。
注意：打包安卓或者苹果时，需要在开发者中心后台一键登录中配置相应平台的Android 包名或IOS BundleId 。


## 二次开发

## 其他说明

### 上架说明
上架应用市场需要有域名已经获得ICP备案的官网，你可以提前做好备案工作。另外网站你可以直接部署到uniCloud前端网页托管

先上架苹果的App Store，和腾讯应用宝。然后在上架其他应用市场的时候说明，本应用在腾讯应用宝和苹果App Store均已上架成功，可以大大地提升审核通过率。

## FAQ：常见问题
1. 提示“公共模块uni-id缺少配置信息”解决方案：在cloudfunctions右键‘上传所有云函数、公共模块及actions’之后，需要在cloudfunctions--》common--》uni-config-center 目录单独上传一次，右键‘上传公共模块’。
2. 本项目代码可以商用，无需为DCloud付费。但不能把本项目的代码改造用于非uni-app和uniCloud的技术体系。即，不能将后台改成php、java等其他后台，这将违反使用许可协议。