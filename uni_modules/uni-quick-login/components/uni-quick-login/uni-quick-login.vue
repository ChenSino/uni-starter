<template>
	<view class="quick-login-box">
		<view class="item" v-for="({id},index) in oauthServices" :key="index" @click="login(id)" v-if="config[id].isChecked">
			<image class="logo" :src="config[id].logo" mode="widthFix"></image>
			<text class="login-title">{{config[id].text}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				config: {
					"weixin": {
						"text": "微信登陆",
						"logo": "../../static/login/img/weixin.png",
						"isChecked":true
					},
					"apple": {
						"text": "苹果登陆",
						"logo": "../../static/login/img/apple.png",
						"isChecked":true
					},
					"univerify": {
						"text": "一键登陆",
						"logo": "../../static/login/img/univerify.png",
						"isChecked":true
					},
					"qq": {
						"text": "QQ登陆",
						"logo": "../../static/login/img/qq.png",
						"isChecked":false //暂未提供该登陆方式的接口示例
					},
					"xiaomi": {
						"text": "小米登陆",
						"logo": "../../static/login/img/qq.png",
						"isChecked":false //暂未提供该登陆方式的接口示例
					},
					"sinaweibo": {
						"text": "微博登录",
						"logo": "../../static/login/img/sinaweibo.png",
						"isChecked":false //暂未提供该登陆方式的接口示例
					}
				},
				providerList: [],
				oauthServices:[],
				univerifyStyle: {
					"fullScreen": true, // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
					"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff  
				}
			}
		},
		mounted() {
			//获取当前环境能用的快捷登陆方式
			// #ifdef APP-PLUS
				plus.oauth.getServices(oauthServices=>{
					this.oauthServices = oauthServices
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
			
			/*
			uni.getProvider({
				"service": "oauth",
				success: res => {
					this.providerList = res.provider.map((name) => {
						return {...this.config[name],name}
					})
					this.login('univerify')
				},
				fail: (err) => {
					console.error('获取服务供应商失败：' + JSON.stringify(err));
				}
			})
			*/
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			login(type) {
				let oauthService = this.oauthServices.find((service) => service.id == type)
				// #ifdef APP-PLUS
				//uni.showLoading({mask: true});
				console.log(type);
				//请勿直接使用前端获取的unionid或openid直接用于登陆，前端的数据都是不可靠的
				if(type=='weixin'){
					oauthService.authorize(({code})=>{
						console.log(code);
						this.quickLogin({code},type)
					},
					err=>{
						uni.hideLoading()
						console.log(err);
					})
				}
				
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
						switch (err.errCode){
							case 30002:
								console.log('在一键登陆界面，点击其他登陆方式');
								break;
							case 30003:
								console.log('关闭了登陆');
								uni.navigateBack()
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
				})
				// #endif
			},
			quickLogin(params,type){//联网验证登陆
				console.log(params,type);
				this.request('user-center/login_by_'+type,params,(data,result)=>{
					console.log(result);
					if(result.code === 0){
						uni.setStorageSync('uni_id_uid', result.uid)
						uni.setStorageSync('uni_id_token', result.token)
						uni.setStorageSync('uni_id_token_expired', result.tokenExpired)
				
						delete result.userInfo.token
						this.setUserInfo(result.userInfo)
						if(type=='univerify'){
							uni.closeAuthView()
						}
						uni.showToast({
							title: '登陆成功',
							icon: 'none'
						});
						uni.hideLoading()
						uni.navigateBack()
					}
				})
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