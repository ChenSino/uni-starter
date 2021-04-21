<template>
	<view class="about">
		<view class="box">
			<image class="logoImg" :src="about.logo"></image>
			<text class="tip appName">{{about.appName}}</text>
			<text class="tip">Version {{version}}</text>
			<!--Sansnn-uQRCode组件来源，插件市场：https://ext.dcloud.net.cn/plugin?id=1287 微调后-->
			<Sansnn-uQRCode :text="about.download" :makeOnLoad="true" class="qrcode"></Sansnn-uQRCode>
			<text class="tip">扫描二维码，您的朋友也可以下载{{about.appName}}客户端</text>
		</view>
		<view class="copyright">
			<template v-for="(agreement,index) in about.agreements">
				<text class="agreement" @click="navigateTo(agreement)">《{{agreement.title}}》</text>
				<text class="hint" v-if="about.agreements.length-1>index">和</text>
			</template>
			<text class="hint">Copyright © {{year}}</text>
			<text class="hint">{{about.company}}</text>
		</view>
	</view>
</template>
<script>
import baseappConfig from '@/baseapp.config.js';
import uniShare from 'uni_modules/uni-share/js_sdk/uni-share.js';
	export default {
		onLoad() {
			// #ifdef APP-PLUS
			this.version = plus.runtime.version
			// #endif
		},
		data() {
			return {
				version:"V1.0.0",
				year:"2020",
				about:{}
			};
		},
		created() {
			this.about = baseappConfig.about
			uni.setNavigationBarTitle({
				title:'关于'+this.about.appName
			})
			this.year = (new Date).getFullYear()
		},
		onNavigationBarButtonTap() {
			let {download,appName,slogan,logo} = this.about
			uniShare({
				content: { //公共的分享类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
					type: 0,
					href: download,
					title: appName,
					summary: slogan,
					imageUrl: logo
				},
				menus: [{
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
							"scene": "WXSenceTimeline"
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
				cancelText: "取消分享",
			}, e => { //callback
				console.log(e);
			})
		},
		methods:{
			navigateTo({url,title}){
				uni.navigateTo({
					url: '/pages/common/webview/webview?url='+url+'&title='+title,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
.about {
	width: 750upx;
	flex-direction: column;
}
.box {
	margin-top: 100px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.logoImg{
	margin-bottom: 10upx;
	width:160upx;
	height:160upx;
	border-radius: 15px;
}
.tip{
	font-size:24rpx;
	margin-top: 10px;
}
.appName{
	margin-top: 20px;
	font-size:42rpx;
	font-weight: 500;
}
.qrcode{
	margin-top: 50px;
}
.copyright {
	width: 750upx;
	font-size:32rpx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	bottom:20px;
	left: 0;
	position: fixed;
}
.agreement {
	color:#2285ff;
	font-size:26rpx;
}
.hint {
	color:#999999;
	font-size:26rpx;
}
</style>