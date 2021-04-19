module.exports = {
	"router":{
		"needLogin":[	//配置需要路由拦截的页面地址，在打开这些页面之前会自动检查（不联网）uni_id_token的值是否存在/过期等
			"/pages/ucenter/edit/edit",
			"/pages/ucenter/settings/settings",
			"/uni_modules/uni-login-page/pages/index/pwd-retrieve"
		],
		"login":["univerify","password","weixin","apple","code"]
	},
	"about":{
		"appName":"base-app",
		"company":"数字天堂（北京）网络技术有限公司",
		"slogan":"为开发而生",
		"agreements":[
			{
				"title":"用户服务协议",
				"url":"https://uniapp.dcloud.io/"
			},
			{
				"title":"隐私政策",
				"url":"https://uniapp.dcloud.io/"
			}
		],
		"下载地址":""
	}
}