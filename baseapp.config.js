module.exports = {
	"h5":{
		"url":"https://static-76ce2c5e-31c7-4d81-8fcf-ed1541ecbc6e.bspapp.com",//	前端网页托管的域名
		"openApp":{	// 在h5端全局悬浮引导用户下载app的功能 更多自定义要求在/common/openApp.js中修改
			"openUrl":'https://sj.qq.com/myapp/detail.htm?apkName=com.tencent.android.qqdownloader&info=6646FD239A6EBA9E2DEE5DFC7E18D867',
			"appname": 'base-app',
			"logo": './static/logo.png',
		}
	},
	"mp":{
		"weixin":{
			"id":"gh_33446d7f7a26"
		}
	},
	"router":{
		"needLogin":[	//配置需要路由拦截的页面地址，在打开这些页面之前会自动检查（不联网）uni_id_token的值是否存在/过期等
			"/uni_modules/uni-id-users/pages/uni-id-users/edit",
			"/uni_modules/uni-news-favorite/pages/uni-news-favorite/list",
			"/pages/ucenter/edit/uploadCutImageToUnicloud"
		],
		"login":["univerify","smsCode","username","weixin","apple"] //默认就是短信验证码登陆
	},
	"about":{
		"appName":"base-app",
		"logo":"/static/logo.png",
		"company":"数字天堂（北京）网络技术有限公司",
		"slogan":"为开发而生",
		"agreements":[
			{
				"title":"用户服务协议",
				"url":"https://ask.dcloud.net.cn/protocol.html"
			},
			{
				"title":"隐私政策",
				"url":"https://ask.dcloud.net.cn/protocol.html"
			}
		],
		"download":"https://m3w.cn/uniapp"
	}
}