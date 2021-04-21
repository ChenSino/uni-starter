<template>
	<view class="quick-login-box">
		<view class="item" v-for="({id,logo,text,path},index) in servicesList" :key="index" @click="path?to(path):login(id,false)">
			<image class="logo" :src="logo" mode="widthFix"></image>
			<text class="login-title">{{text}}</text>
		</view>
	</view>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex';
	//前一个窗口的页面地址。控制点击切换快捷登陆方式是创建还是返回
	export default {
		data() {
			return {
				config: {
					"weixin": {
						"text": "微信登陆",
						"logo": "../../static/login/weixin.png",
						"isChecked":true
					},
					"apple": {
						"text": "苹果登陆",
						"logo": "../../static/login/apple.png",
						"isChecked":true
					},
					"univerify": {
						"text": "一键登陆",
						"logo": "../../static/login/univerify.png",
						"isChecked":true
					},
					"qq": {
						"text": "QQ登陆",
						"logo": "../../static/login/qq.png",
						"isChecked":false //暂未提供该登陆方式的接口示例
					},
					"xiaomi": {
						"text": "小米登陆",
						"logo": "../../static/login/qq.png",
						"isChecked":false //暂未提供该登陆方式的接口示例
					},
					"sinaweibo": {
						"text": "微博登录",
						"logo": "../../static/login/weibo.png",
						"isChecked":false //暂未提供该登陆方式的接口示例
					}
				},
				servicesList:[
					{
						"text": "账号登陆",
						"logo": "../../static/login/db.png",
						"path":"/uni_modules/uni-login-page/pages/pwd-login/pwd-login"
					},
					{
						"text": "短信登陆",
						"logo": "../../static/login/smsCode.png",
						"path":"/uni_modules/uni-login-page/pages/index/index"
					}
				],
				univerifyStyle: { //一键登陆弹出窗的样式配置参数
					"fullScreen": true, // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
					"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff  
				}
			}
		},
		created() {
			let servicesList = this.servicesList
			//去掉当前页面对应的登陆选项
			for (var i = 0; i < servicesList.length; i++) {
				if(servicesList[i].path == this.getRoute(1)){
					servicesList.splice(i,1)
				}
			}
		},
		mounted() {
			//获取当前环境能用的快捷登陆方式
			// #ifdef APP-PLUS
				plus.oauth.getServices(oauthServices=>{
					this.oauthServices = oauthServices
					oauthServices.forEach(({id})=>{
						if(this.config[id].isChecked){
							this.servicesList.push({...this.config[id],id})
						}
					})
					// console.log(oauthServices);
				},err=>{
					uni.hideLoading()
					uni.showModal({
						title: '获取服务供应商失败：' +JSON.stringify(err),
						showCancel: false,
						confirmText: '知道了'
					});
					console.error('获取服务供应商失败：' + JSON.stringify(err));
				})
			// #endif
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			getRoute(n=0){
				let pages = getCurrentPages();
				console.log('route-pages-length',pages.length);
				if(n>pages.length){ return '' }
				return '/'+pages[pages.length - n].route
			},
			to(path){
				console.log('比较',this.getRoute(2),path)
				if(this.getRoute(2)==path){ // 控制路由是重新打开还是返回，避免重复打开页面
					uni.navigateBack();
				}else{
					uni.navigateTo({url:path})
				}
			},
			login(type,navigateBack=true) {
				console.log(arguments);
				console.log('services',services);
				let oauthService = this.oauthServices.find((service) => service.id == type)
				console.log(type);
				
				// #ifdef APP-PLUS
				//请勿直接使用前端获取的unionid或openid直接用于登陆，前端的数据都是不可靠的
				if(type=='weixin'){
					return	oauthService.authorize(({code})=>{
						console.log(code);
						this.quickLogin({code},type)
					},
					err=>{
						uni.hideLoading()
						console.log(err);
					})
				}
				// #endif
				
				uni.login({
					"provider": type,
					"univerifyStyle":this.univerifyStyle,
					success:async e => {
						console.log(e);
						if(type=='apple'){
							let res = await this.getUserInfo({provider:"apple"})
							Object.assign(e.authResult,res.userInfo)
						}
						this.quickLogin(e.authResult,type)
					},
					fail: (err) => {
						uni.hideLoading()
						console.log(err);
						
						if(type=='univerify'){
							if(err.metadata.error_data){
								uni.showToast({
									title: "一键登陆:"+err.metadata.error_data,
									icon: 'none'
								});
							}
							switch (err.errCode){
								case 30002:
									console.log('在一键登陆界面，点击其他登陆方式');
									break;
								case 30003:
									console.log('关闭了登陆');
									if(navigateBack){ uni.navigateBack() }
									break;
								case 30006:
									uni.showModal({
										title: "登陆服务初始化错误",
										content:err.metadata.error_data,
										showCancel: false,
										confirmText: '知道了',
									});
									break;
								default:
									break;
							}
						}
					}
				})
			},
			quickLogin(params,type){//联网验证登陆
				console.log(params,type);
				this.request('user-center/login_by_'+type,params,(data,result)=>{
					console.log(result);
					if(result.code === 0){
						if(type=='univerify'){
							uni.closeAuthView()
						}
						uni.hideLoading()
						this.loginSuccess(result)
					}
				},{showLoading:true})
			},
			async getUserInfo(e){
				return new Promise((resolve, reject)=>{
					uni.getUserInfo({
						...e,
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							uni.showModal({
								content: JSON.stringify(err),
								showCancel: false
							});
							reject(err);
						}
					})
				})
			}
		}
	}
</script>

<style scoped>
	.quick-login-box {
		flex-direction: row;
		width: 750rpx;
		justify-content: space-around;
	}
	.item {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200rpx;
	}

	.logo {
		width: 60rpx;
		height: 60rpx;
	}

	.login-title {
		font-size: 26rpx;
	}
</style>