<template>
	<view class="wrap" v-show="isShow">
		<uni-nav-bar @clickLeft="back" left-icon="back" right-text="帮助" :statusBar="true" :border="false"></uni-nav-bar>
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">登陆后即可展示自己</text>
				<login-ikonw class="lgnin-iknow" :link="link" text="登录即表示同意用户协议和隐私政策"></login-ikonw>

				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<view class="phone-input-box">
					<picker mode="selector" :range="phoneArea" @change="selectPhoneArea">
						<text class="phone-area">{{currenPhoneArea}}</text>
					</picker>
					<input type="number" class="phone-input" placeholder="请输入手机号"
						v-model="phoneNumber" />
				</view>

				<!-- tip -->
				<text class="tip-text">未注册的手机号验证通过后蒋自动注册</text>

				<!-- 发送按钮 -->
				<view class="send-btn-box" hover-class="hover"
					@click="sendShortMsg" :class="canGetShortMsg?'send-btn-active':''">
					<text class="send-btn-text">获取短信验证码</text>
				</view>

				<!-- 其他登录方式 -->
				<view class="auth-box">
					<text class="login-text" hover-class="hover" @click="toPwdLogin">密码登录</text>
					<text class="login-text" hover-class="hover" @click="openLoginList">其他登录方式</text>
				</view>
			</view>
		</view>
		<!-- 登录按钮弹窗 -->
		<login-action-sheet ref="loginActionSheet"></login-action-sheet>
		<uni-quick-login></uni-quick-login>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				link: [{
					text: '用户协议',
					to: '/baidu.com'
				}, {
					text: '隐私政策',
					to: 'baidu'
				}],
				phoneArea: ['+86', '+87'],
				currenPhoneArea: '+86',
				phoneNumber: ''
			}
		},
		onReady() {
			setTimeout(()=>{
				this.isShow = true
			},1500);
		},
		computed: {
			canGetShortMsg() {
				let reg = /^1\d{10}$/;
				return reg.test(this.phoneNumber);
			}
		},
		methods: {
			selectPhoneArea(event) {
				this.currenPhoneArea = this.phoneArea[event.detail.value];
			},
			sendShortMsg() {
				if (!this.canGetShortMsg) return;
				/**
				 * 发送验证吗
				 */
			},
			/**
			 * 去密码登录页
			 */
			toPwdLogin() {
				uni.navigateTo({
					url: './pwd-login'
				})
			},
			openLoginList() {
				this.$refs.loginActionSheet.open();
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	page {
		background: transparent;
	}
	/* #ifndef APP-NVUE */
	page{
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
	}
	/* #endif */
	.wrap{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex:1;
		width: 750rpx;
		background-color: #fff;
	}
	.wrap-content{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	.content{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 630rpx;
		flex-direction: column;
	}
	.content-top-title{
		font-size: 32rpx;
		font-weight: 600;
		padding-top: 50rpx;
	}
	@import url("../../common/myStyle.css");

	.lgnin-iknow {
		padding-top: 24rpx;
		padding-bottom: 48rpx;
	}

	.phone-input-box {
		height: 85rpx;
		background-color: #f9f9f9;
		border-radius: 6rpx;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}
	.phone-area{
		padding: 0 20rpx;
		font-size: 30rpx;
	}

	.phone-input {
		border-left-width: 1px;
		border-left-color: #d7d9d8;
		padding: 0 20rpx;
		font-size: 30rpx;
	}

	.tip-text {
		padding-top: 20rpx;
		padding-bottom: 36rpx;
		color: #8a8f8b;
		font-size: 26rpx;
	}

	.send-btn-box {
		height: 85rpx;
		background-color: #d8d8da;
		margin-bottom: 50rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		width: 630rpx;
		justify-content: center;
		align-items: center;
		border-radius: 6rpx;
	}
	.send-btn-text{
		color: #fff;
	}

	.send-btn-active {
		background-color: #007aff;
	}
	
	.auth-box{
		width: 630rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.login-text {
		color: #1c436e;
		font-size: 26rpx;
	}
</style>