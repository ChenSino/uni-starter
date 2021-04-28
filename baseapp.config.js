//这是应用的配置页面，App.vue挂载到getApp().globalData.config
module.exports = {
	"h5": {
		"url": "https://static-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e.bspapp.com", //	前端网页托管的域名
		 // 在h5端全局悬浮引导用户下载app的功能 更多自定义要求在/common/openApp.js中修改
		"openApp": {
			//点击悬浮下载栏后打开的网页链接
			"openUrl": 'https://sj.qq.com/myapp/detail.htm?apkName=com.tencent.android.qqdownloader&info=6646FD239A6EBA9E2DEE5DFC7E18D867',
			//左侧显示的应用名称
			"appname": 'base-app',
			//应用的图标
			"logo": './static/logo.png',
		}
	},
	"mp": {
		"weixin": {
			//微信小程序原始id，微信小程序分享时
			"id": "gh_33446d7f7a26"
		}
	},
	"router": {
		//配置需要路由拦截的页面地址，在打开这些页面之前会自动检查（不联网）uni_id_token的值是否存在/过期等
		"needLogin": [
			"/pages/ucenter/userinfo/userinfo",
			"/uni_modules/uni-news-favorite/pages/uni-news-favorite/list",
			"/pages/ucenter/userinfo/uploadCutImageToUnicloud"
		],
		"login": [ "smsCode","uniVerify", "username", "weixin", "apple"],
		/*
			根据数组的第0项，决定登陆方式的第一优先级。
			未列举到的，或设备环境不支持的选项，将被隐藏。
			快捷登陆按钮，在任意一页面都存在。
			所以只有三种情况：
			一键登录（uniVerify）、账号（username）、验证码登陆（其他值为第一项都为验证码登陆）
			如果你需要在不同平台有不同的配置，直接用条件编译即可
		*/
	},
	"about": {
		"appName": "base-app",
		"logo": "/static/logo.png",
		"company": "数字天堂（北京）网络技术有限公司",
		"slogan": "为开发而生",
		"agreements": [{
				"title": "用户服务协议",
				"url": "https://ask.dcloud.net.cn/protocol.html"
			},
			{
				"title": "隐私政策",
				"url": "https://ask.dcloud.net.cn/protocol.html"
			}
		],
		"download": "https://m3w.cn/uniapp"
	},
	//用于打开应用市场评分界面
	"marketId":{
		"ios":"id1417078253",
		"android":"123456"
	}
}
