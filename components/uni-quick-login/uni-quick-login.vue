<template>
	<view class="quick-login-box">
		<view class="item" v-for="(item,index) in servicesList" :key="index"
			@click="item.path?to(item.path):login_before(item.id,false)">
			<image class="logo" :src="item.logo" mode="widthFix"></image>
			<text class="login-title">{{item.text}}</text>
		</view>
	</view>
</template>
<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	//前一个窗口的页面地址。控制点击切换快捷登录方式是创建还是返回
	import loginSuccess from '@/pages/ucenter/login-page/common/loginSuccess.js';
	export default {
		computed: {
			loginConfig() {
				return getApp().globalData.config.router.login
			}
		},
		data() {
			return {
				servicesList: [{
						"id": "username",
						"text": "账号登录",
						"logo": "/static/uni-quick-login/user.png",
						"path": "/pages/ucenter/login-page/pwd-login/pwd-login"
					},
					{
						"id": "smsCode",
						"text": "短信验证码",
						"logo": "/static/uni-quick-login/sms.png",
						"path": "/pages/ucenter/login-page/index/index"
					}
				],
				oauthServices: []
			}
		},
		props: {
			agree:{
				type:Boolean,
				default(){
					return false
				}
			},
			config: {
				type: Object,
				default () {
					return {
						"weixin": {
							"text": "微信登录",
							"logo": "/static/uni-quick-login/wechat.png",
							"isChecked": true
						},
						"apple": {
							"text": "苹果登录",
							"logo": "/static/uni-quick-login/apple.png",
							"isChecked": true
						},
						"univerify": {
							"text": "一键登录",
							"logo": "/static/uni-quick-login/univerify.png",
							"isChecked": true
						},
						"qq": {
							"text": "QQ登录",
							"logo": "/static/uni-quick-login/univerify.png",
							"isChecked": false //暂未提供该登录方式的接口示例
						},
						"xiaomi": {
							"text": "小米登录",
							"logo": "/static/uni-quick-login/univerify.png",
							"isChecked": false //暂未提供该登录方式的接口示例
						},
						"sinaweibo": {
							"text": "微博登录",
							"logo": "/static/uni-quick-login/univerify.png",
							"isChecked": false //暂未提供该登录方式的接口示例
						}
					}
				}
			},
			univerifyStyle: {
				type: Object,
				default () {
					return { //一键登录弹出窗的样式配置参数
						"fullScreen": true, // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
						"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff  
					}
				}
			},
		},
		created() {
			console.log('loginConfig', this.loginConfig);
			console.log('this.getRoute(1)', this.getRoute(1));
			let servicesList = this.servicesList
			//去掉当前页面对应的登录选项
			for (var i = 0; i < servicesList.length; i++) {
				if (servicesList[i].path == this.getRoute(1)) {
					servicesList.splice(i, 1)
				}
			}
			//去掉配置项中不存在的项
			for (var i = 0; i < servicesList.length; i++) {
				if (!this.loginConfig.includes(servicesList[i].id)) {
					console.log('去掉配置项中不存在的项',servicesList[i].id);
					servicesList.splice(i, 1)
				}
			}
			console.log('servicesList', servicesList);
		},
		mounted() {
			//获取当前环境能用的快捷登录方式
			// #ifdef APP-PLUS
			plus.oauth.getServices(oauthServices => {
				this.oauthServices = oauthServices
				oauthServices.forEach(({
					id
				}) => {
					console.log(9527,id);
					if (this.config[id].isChecked&&this.loginConfig.includes(id)) {
						this.servicesList.push({
							...this.config[id],
							id
						})
					}
				})
				// console.log(oauthServices);
			}, err => {
				uni.hideLoading()
				uni.showModal({
					title: '获取服务供应商失败：' + JSON.stringify(err),
					showCancel: false,
					confirmText: '知道了'
				});
				console.error('获取服务供应商失败：' + JSON.stringify(err));
			})
			// #endif
			// #ifdef MP-WEIXIN
			let id = 'weixin'
			if (this.loginConfig.includes(id)) {
				this.servicesList.push({
					...this.config[id],
					id
				})
			}
			// #endif
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			getRoute(n = 0) {
				let pages = getCurrentPages();
				// console.log('route-pages-length', pages.length);
				if (n > pages.length) {
					return ''
				}
				return '/' + pages[pages.length - n].route
			},
			to(path) {
				console.log('比较', this.getRoute(2), path)
				if (this.getRoute(2) == path) { // 控制路由是重新打开还是返回，避免重复打开页面
					uni.navigateBack();
				} else {
					uni.navigateTo({
						url: path
					})
				}
			},
			login_before(type, navigateBack = true) {
				if(!this.agree){
					return uni.showToast({
						title: '你未同意隐私政策协议',
						icon: 'none'
					});
				}
				uni.showLoading({mask:true})
				// console.log(arguments);
				let oauthService = this.oauthServices.find((service) => service.id == type)
				// console.log(type);

				// #ifdef APP-PLUS
				//请勿直接使用前端获取的unionid或openid直接用于登录，前端的数据都是不可靠的
				if (type == 'weixin') {
					return oauthService.authorize(({
							code
						}) => {
							console.log(code);
							this.login({
								code
							}, type)
						},
						err => {
							uni.hideLoading()
							console.log(err);
						})
				}
				// #endif

				uni.login({
					"provider": type,
					"univerifyStyle": this.univerifyStyle,
					complete: (e) => {
						console.log(9527, e);
					},
					success: async e => {
						console.log(e);
						if (type == 'apple') {
							let res = await this.getUserInfo({
								provider: "apple"
							})
							uni.hideLoading()
							Object.assign(e.authResult, res.userInfo)
						}
						// #ifdef MP-WEIXIN
						if (type == 'weixin') {
							return this.login({
								code: e.code
							}, type)
						}
						// #endif
						this.login(e.authResult, type)
					},
					fail: (err) => {
						uni.hideLoading()
						console.log(err);

						if (type == 'univerify') {
							if (err.metadata.error_data) {
								uni.showToast({
									title: "一键登录:" + err.metadata.error_data,
									icon: 'none'
								});
							}
							switch (err.errCode) {
								case 30002:
									console.log('在一键登录界面，点击其他登录方式');
									break;
								case 30003:
									console.log('关闭了登录');
									if (navigateBack) {
										uni.navigateBack()
									}
									break;
								case 30006:
									uni.showModal({
										title: "登录服务初始化错误",
										content: err.metadata.error_data,
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
			login(params, type) { //联网验证登录
				console.log({
					params,
					type
				});
				this.request('uni-id-cf/login_by_' + type, params, result => {
					console.log(result);
					if (result.code === 0) {
						if (type == 'univerify') {
							uni.closeAuthView()
						}
						uni.hideLoading()
						loginSuccess(result)
						delete result.userInfo.token
						this.setUserInfo(result.userInfo)
					}
				})
			},
			async getUserInfo(e) {
				return new Promise((resolve, reject) => {
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
		position: fixed;
		bottom: 10rpx;
		left: 0;
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
		margin-top: 4px;
		font-size: 26rpx;
	}
</style>
