<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">登录后即可展示自己</text>
		<uni-agreements @setAgree="agree = $event"></uni-agreements>
		<!-- 登录框 -->
		<input type="number" class="input-box" :inputBorder="false" v-model="phone" maxlength="11"
			placeholder="请输入手机号" />
		<button class="get-code" :class="{isPhone}" :disabled="!isPhone" :type="isPhone?'primary':'default'"
			@click="sendShortMsg">获取短信验证码</button>
		<text class="tip">未注册的手机号验证通过后将自动注册</text>
		<!-- 登录按钮弹窗 -->
		<uni-quick-login :univerifyStyle="univerifyStyle" :agree="agree" ref="uniQuickLogin"></uni-quick-login>
	</view>
</template>

<script>
	var univerify_first, currentWebview; //是否一键登录优先
	export default {
		data() {
			return {
				phone: "",
				agree: false,
				univerifyStyle: {
					"fullScreen": true, // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
					"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff
					"buttons": { // 自定义登陆按钮
						"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
						"list": []
					},
					"privacyTerms": {
						"defaultCheckBoxState": "true", // 条款勾选框初始状态 默认值： true   
						"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
						"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
						"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
						"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
						"privacyItems": []
					}
				}
			}
		},
		computed: {
			isPhone() {
				return /^1\d{10}$/.test(this.phone);
			},
			agreements() {
				return getApp().globalData.config.about.agreements || []
			}
		},
		onLoad(e) {
			uni.getProvider({
				service: 'oauth',
				success: res => {
					if (~res.provider.indexOf('weixin')&&plus.runtime.isApplicationExist({
							pname: 'com.tencent.mm',
							action: 'weixin://'
						})) {
						this.univerifyStyle.buttons.list.push({
							"iconPath": "/static/uni-quick-login/wechat.png"
						})
					}
					if (~res.provider.indexOf('apple')) {
						this.univerifyStyle.buttons.list.push({
							"iconPath": "/static/uni-quick-login/apple.png"
						})
					}
				}
			});


			//是否优先启动一键登录。即：页面一加载就启动一键登录
			univerify_first = e.univerify_first
			//#ifdef APP-PLUS
			if (univerify_first) {
				this.univerifyStyle.privacyTerms.privacyItems = this.agreements
				const pages = getCurrentPages();
				currentWebview = pages[pages.length - 1].$getAppWebview();
				currentWebview.setStyle({
					"top": "2000px" //隐藏当前页面窗体
				})
			}
			//#endif
		},
		onReady() {
			//#ifdef APP-PLUS
			if (univerify_first) {
				// console.log('开始一键登录');
				this.agree = true
				setTimeout(() => {
					this.$refs.uniQuickLogin.login_before('univerify')
				}, 100)
				setTimeout(() => {
					currentWebview.setStyle({
						titleNView: {
							autoBackButton: true,
							backgroundColor: "#FFFFFF"
						}
					})
					currentWebview.setStyle({
						"top": "0"
					})
				}, 1500);
			}
			//#endif
		},
		methods: {
			sendShortMsg() {
				if (!this.agree) {
					return uni.showToast({
						title: '你未同意隐私政策协议',
						icon: 'none'
					});
				}
				// 发送验证吗
				uni.showLoading();
				uni.navigateTo({
					url: '/pages/ucenter/login-page/phone-code/phone-code?phoneNumber=' + this.phone,
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			//去密码登录页
			toPwdLogin() {
				uni.navigateTo({
					url: '../pwd-login/pwd-login'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url("../common/login-page.css");
</style>
