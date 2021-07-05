<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">登录后即可展示自己</text>
		<!-- 登录框 -->
		<input v-if="first_type=='smsCode'" type="number" class="input-box" :inputBorder="false" v-model="phone" maxlength="11"
			placeholder="请输入手机号" />
		<image @click="quickLogin" :src="imgSrc" mode="widthFix" class="quickLoginBtn"></image>
		<uni-agreements @setAgree="agree = $event"></uni-agreements>
		<button v-if="first_type=='smsCode'" class="get-code" :disabled="!isPhone" :type="isPhone?'primary':'default'"
			@click="sendShortMsg">获取短信验证码</button>
		<text v-if="first_type=='smsCode'" class="tip">未注册的手机号验证通过后将自动注册</text>
		<!-- 登录按钮弹窗 -->
		<uni-quick-login :agree="agree" ref="uniQuickLogin"></uni-quick-login>
	</view>
</template>

<script>
	let currentWebview; //是否一键登录优先
	export default {
		data() {
			return {
				first_type:"",
				phone: "",
				agree: false
			}
		},
		computed: {
			isPhone() {
				return /^1\d{10}$/.test(this.phone);
			},
			imgSrc(){
				return '/static/login-index/'+this.first_type+'.jpg'
			}
		},
		onLoad(e) {
			this.first_type = e.first_type
			//是否优先启动一键登录。即：页面一加载就启动一键登录
			//#ifdef APP-PLUS
			if (this.first_type == "univerify") {
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
			quickLogin(){
				this.$refs.uniQuickLogin.login_before(this.first_type)
			},
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
	.quickLoginBtn{
		width: 500rpx;
		margin: 100rpx;
	}
</style>
