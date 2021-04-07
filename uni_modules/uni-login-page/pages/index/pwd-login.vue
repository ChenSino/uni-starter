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
	@import url("../../common/loginPage.css");
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
