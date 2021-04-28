<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">登陆后即可展示自己</text>
		<uni-agreements></uni-agreements>
		<!-- 登录框 -->
		<input type="number" class="input-box" :inputBorder="false" v-model="phone" maxlength="11" placeholder="请输入手机号"/>
		<button class="get-code" :class="{isPhone}" :disabled="!isPhone" :type="isPhone?'primary':'default'"
			@click="sendShortMsg">获取短信验证码</button>
		<text class="tip">未注册的手机号验证通过后将自动注册</text>			
		<!-- 登录按钮弹窗 -->
		<uni-quick-login ref="uniQuickLogin"></uni-quick-login>
	</view>
</template>

<script>	
var univerify_first,currentWebview;//是否一键登陆优先
	export default {
		data() {
			return {
				phone:""
			}
		},
		computed: {
			isPhone(){
				return /^1\d{10}$/.test(this.phone);
			}
		},
		onLoad(e) {
			//是否优先启动一键登陆。即：页面一加载就启动一键登录
			univerify_first = e.univerify_first
			//#ifdef APP-PLUS
			if(univerify_first){
				const pages = getCurrentPages();
				currentWebview = pages[pages.length - 1].$getAppWebview();
				currentWebview.setStyle({
					"top":"2000px"		//隐藏当前页面窗体
				})
			}
			//#endif
		},
		onReady() {
			//#ifdef APP-PLUS
			if(univerify_first){
				console.log('开始一键登陆');
				setTimeout(()=>{
					this.$refs.uniQuickLogin.login('univerify')
				},100)
				setTimeout(() => {
					currentWebview.setStyle({
						titleNView:{
							autoBackButton:true,
							backgroundColor:"#FFFFFF"
						}
					})
					currentWebview.setStyle({
						"top":"0"
					})
				}, 1500);
			}
			//#endif
		},
		methods: {
			sendShortMsg() {
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
