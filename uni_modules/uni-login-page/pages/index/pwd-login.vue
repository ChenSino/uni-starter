<template>
	<view class="wrap">
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">手机号密码登录</text>

				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<view class="phone-input-box">
					<picker mode="selector" :range="phoneArea" @change="selectPhoneArea">
						<text class="phone-area">{{currenPhoneArea}}</text>
					</picker>
					<input type="number" class="phone-input" placeholder="请输入手机号" maxlength="11" v-model="phoneNumber" />
				</view>

				<view class="phone-input-box">
					<input type="password" :password="true" class="phone-input pwd-input" placeholder="请输入密码"
						v-model="password" />
				</view>

				<login-ikonw class="login-iknow" :link="link" text="登录即表示同意用户协议和隐私政策"></login-ikonw>

				<!-- 发送按钮 -->
				<view class="send-btn-box" hover-class="hover"
					@click="pwdLogin" :class="canLogin?'send-btn-active':''">
					<text class="send-btn-text">登录</text>
				</view>

				<!-- 忘记密码 -->
				<view class="auth-box">
					<text class="login-text login-text-sub">忘记了?</text>
					<text class="login-text" @click="toRetrievePwd">找回密码</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: '',
				password: '',
				link: [{
					text: '用户协议',
					to: '/baidu.com'
				}, {
					text: '隐私政策',
					to: 'baidu'
				}],
				phoneArea: ['+86', '+87'],
				currenPhoneArea: '+86',
			}
		},
		computed: {
			canLogin() {
				let reg_phone = /^1\d{10}$/;
				let reg_pwd = /^.{6,20}$/;
				let isPhone = reg_phone.test(this.phoneNumber);

				let isPwd = reg_pwd.test(this.password);
				return isPhone && isPwd;
			}
		},
		methods: {
			/**
			 * 页面跳转，找回密码
			 */
			toRetrievePwd() {
				let reg_phone = /^1\d{10}$/;
				let isPhone = reg_phone.test(this.phoneNumber);
				if (!isPhone) return uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});

				uni.navigateTo({
					url: './pwd-retrieve?phoneNumber=' + this.phoneNumber + '&phoneArea=' + this.currenPhoneArea
				})
			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				if (!this.canLogin) return;
				// 下边是可以登录
			},
			selectPhoneArea(event) {
				this.currenPhoneArea = this.phoneArea[event.detail.value];
			},
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
	}

	/* #endif */
	.wrap {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
		width: 750rpx;
		background-color: #fff;
	}

	.wrap-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 630rpx;
		flex-direction: column;
	}

	.content-top-title {
		font-size: 32rpx;
		font-weight: 600;
		padding-top: 50rpx;
	}

	.login-iknow {
		padding-top: 24rpx;
		padding-bottom: 36rpx;
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

	.phone-area {
		padding: 0 20rpx;
		font-size: 30rpx;
	}

	.phone-input {
		flex: 1;
		border-left-width: 1px;
		border-left-color: #d7d9d8;
		padding: 0 20rpx;
		font-size: 30rpx;
	}

	.pwd-input {
		border-left-width: 0px;
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

	.send-btn-text {
		color: #fff;
	}

	.send-btn-active {
		background-color: #007aff;
	}

	.auth-box {
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

	.hover {
		opacity: 0.8;
	}
	
	
	/* 密码登录 */
	.phone-input-box{
		margin-top: 20rpx;
	}
	.auth-box{
		justify-content: flex-start;
	}
	.login-text-sub{
		color: #8a8f8b;
	}
</style>
