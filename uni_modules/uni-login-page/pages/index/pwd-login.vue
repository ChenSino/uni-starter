<template>
	<view class="wrap">
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">手机号密码登录</text>
				<login-ikonw class="login-iknow" :link="link" text="登录即表示同意用户协议和隐私政策"></login-ikonw>
				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<uni-forms ref="form" :value="formData" :rules="rules">
					<uni-forms-item name="phone">
						<uni-easyinput type="number" class="phone-input-box" :inputBorder="false"
							v-model="formData.phone" maxlength="11" placeholder="请输入手机号">
							<template slot="left">
								<!-- 当前仅支持中国大陆手机号 -->
								<!-- <picker mode="selector" :range="phoneArea" @change="selectPhoneArea"> -->
									<text class="phone-area" @click="selectPhoneArea">{{currenPhoneArea}}</text>
								<!-- </picker> -->
							</template>
						</uni-easyinput>
						<uni-easyinput type="number" class="phone-input-box" :inputBorder="false"
							v-model="formData.pwd" placeholder="请输入密码"></uni-easyinput>
					</uni-forms-item>
					<button class="send-btn-box" :disabled="!canLogin" :type="canLogin?'primary':'default'"
						@click="pwdLogin">登录</button>
				</uni-forms>

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
	import mixin from '../../common/loginPage.mixin.js';
	export default {
		mixins:[mixin],
		data() {
			return {
				phoneNumber: '',
				password: '',
				link: [{
					text: '用户协议',
					to: '/pages/ucenter/agree-list/service/service'
				}, {
					text: '隐私政策',
					to: '/pages/ucenter/agree-list/privacy/privacy'
				}],
				phoneArea: ['+86'],
				currenPhoneArea: '+86',
				
				formData: {
					phone: '',
					pwd:''
				},
				rules: {
					phone: {
						rules: [{
								required: true,
								errorMessage: '请输入手机号',
							},
							{
								pattern: /^1\d{10}$/,
								errorMessage: '手机号格式不正确',
							}
						]
					},
					pwd:{
						rules: [{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								pattern: /^.{6,20}$/,
								errorMessage: '密码应为6到20位',
							}
						]
					}
				}
			}
		},
		computed: {
			canLogin() {
				let reg_phone = /^1\d{10}$/;
				let reg_pwd = /^.{6,20}$/;
				let isPhone = reg_phone.test(this.formData.phone);

				let isPwd = reg_pwd.test(this.formData.pwd);
				return isPhone && isPwd;
			}
		},
		methods: {
			/**
			 * 页面跳转，找回密码
			 */
			toRetrievePwd() {
				let reg_phone = /^1\d{10}$/;
				let isPhone = reg_phone.test(this.formData.phone);
				if (!isPhone) return uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});

				uni.navigateTo({
					url: './pwd-retrieve?phoneNumber=' + this.formData.phone + '&phoneArea=' + this.currenPhoneArea
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
				uni.showToast({
					title: '当前仅支持中国大陆手机号',
					icon: 'none'
				});
				// this.currenPhoneArea = this.phoneArea[event.detail.value];
			},
		}
	}
</script>

<style>
	@import url("../../common/loginPage.css");

	.phone-input-box {
		margin-top: 20rpx;
	}

	.auth-box {
		justify-content: flex-start;
		margin-top: 20rpx;
	}

	.login-text-sub {
		color: #8a8f8b;
	}
</style>
