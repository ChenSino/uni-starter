import uniImageMenu from 'uni_modules/uni-image-menu/js_sdk/uni-image-menu.js';
let old_menus = [{
		"img": "/static/sharemenu/wechatfriend.png",
		"text": "微信好友",
		"share":{
			"provider":"weixin",
			"scene":"WXSceneSession"
		}
	},
	{
		"img": "/static/sharemenu/wechatmoments.png",
		"text": "微信朋友圈",
		"share":{
			"provider":"weixin",
			"scene":"WXSceneSession"
		}
	},
	{
		"img": "/static/sharemenu/weibo.png",
		"text": "微博",
		"share":{
			"provider":"sinaweibo"
		}
	},
	{
		"img": "/static/sharemenu/qq.png",
		"text": "QQ",
		"share":{
			"provider":"qq"
		}
	},
	{
		"img": "/static/sharemenu/copyurl.png",
		"text": "复制",
		"share":false
	},
	{
		"img": "/static/sharemenu/more.png",
		"text": "更多",
		"share":"more"
	}
]
let menus = []
plus.oauth.getServices(services=>{	//只显示有服务的项目
	let servicesList = services.map(e=>e.id)
	console.log(servicesList);
	old_menus.forEach(item=>{
		console.log(item.share.provider);
		if(servicesList.includes(item.share.provider)){
			menus.push(item)
		}
	})
	
},err=>{
	uni.showModal({
		title: '获取服务供应商失败：' +JSON.stringify(err),
		showCancel: false,
		confirmText: '知道了'
	});
	console.error('获取服务供应商失败：' + JSON.stringify(err));
})

let shareContent = {
	type: 0,
	href: "https://uniapp.dcloud.io/api/plugins/share?id=share",
	title: "主标题",
	summary: "分享内容的摘要",
	imageUrl: "https://uniapp.dcloud.io/api/plugins/share?id=share",
}
export default (callback) => {
	uniImageMenu.show(menus,e=>{
		console.log(e);
		if(e<4){
			uni.share({
				...menus[e].share,
				...shareContent,
				success: function(res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function(err) {
					console.log("fail:" + JSON.stringify(err));
				},
				complete() {
					uniImageMenu.hide()
				}
			})
		}
	})
}
