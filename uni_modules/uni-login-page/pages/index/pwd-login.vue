<template>
	<view class="wrap">
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">手机号密码登录</text>

				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<view class="phone-input-box round flex flex-row flex-nowrap align-center justify-center mt-5">
					<picker mode="selector" :range="phoneArea" @change="selectPhoneArea">
						<text class="px-2 font-30">{{currenPhoneArea}}</text>
					</picker>
					<input type="number" class="flex-1 phone-input px-2 font-30" placeholder="请输入手机号"
						v-model="phoneNumber" />
				</view>

				<view class="phone-input-box round flex flex-row flex-nowrap align-center justify-center mt-2">
					<input type="password" :password="true" class="flex-1 px-2 font-30" placeholder="请输入密码"
						v-model="password" />
				</view>

				<login-ikonw class="lgnin-iknow" :link="link" text="登录即表示同意用户协议和隐私政策"></login-ikonw>

				<!-- 发送按钮 -->
				<view class="send-btn-box flex w-630 justify-center align-center round" hover-class="hover"
					@click="pwdLogin" :class="canLogin?'send-btn-active':''">
					<text class="text-white">登录</text>
				</view>

				<!-- 忘记密码 -->
				<view class="flex flex-row flex-nowrap">
					<text class="font-26 text-sub">忘记了?</text>
					<text class="font-26 login-text" @click="toRetrievePwd">找回密码</text>
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

	.lgnin-iknow {
		padding-top: 24rpx;
		padding-bottom: 36rpx;
	}

	.phone-input-box {
		height: 85rpx;
		background-color: #f9f9f9;
	}

	.phone-input {
		border-left-width: 1px;
		border-left-color: #d7d9d8;
	}

	.tip-text {
		padding-top: 20rpx;
		padding-bottom: 36rpx;
	}

	.send-btn-box {
		height: 85rpx;
		background-color: #d8d8da;
		margin-bottom: 50rpx;
	}

	.send-btn-active {
		background-color: #007aff;
	}

	.login-text {
		color: #1c436e;
	}
</style>
