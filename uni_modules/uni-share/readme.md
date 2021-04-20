# uni-share
例子
import uniShare from 'uni_modules/uni-share/js_sdk/uni-share.js';
uniShare({
	menus:[
		{
			"img": "/static/sharemenu/wechatfriend.png",
			"text": "微信好友",
			"share": {
				"provider": "weixin",
				"scene": "WXSceneSession"
			}
		},
		{
			"img": "/static/sharemenu/wechatmoments.png",
			"text": "微信朋友圈",
			"share": {
				"provider": "weixin",
				"scene": "WXSceneSession"
			}
		},
		{
			"img": "/static/sharemenu/weibo.png",
			"text": "微博",
			"share": {
				"provider": "sinaweibo"
			}
		},
		{
			"img": "/static/sharemenu/qq.png",
			"text": "QQ",
			"share": {
				"provider": "qq"
			}
		},
		{
			"img": "/static/sharemenu/copyurl.png",
			"text": "复制",
			"share": "copyurl"
		},
		{
			"img": "/static/sharemenu/more.png",
			"text": "更多",
			"share": "shareSystem"
		}
	],
	cancelText:"取消分享",
	content:{
		type: 0,
		href: "https://uniapp.dcloud.io/api/plugins/share?id=share",
		title: "主标题",
		summary: "分享内容的摘要",
		imageUrl: "https://uniapp.dcloud.io/api/plugins/share?id=share",
	}
},e=>{	//callback
	console.log(e);
})