<template>
	<view class="wrap">
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">用户名密码登录</text>
				<login-ikonw class="login-iknow" :link="link" text="登录即表示同意用户协议和隐私政策"></login-ikonw>
				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<uni-forms ref="form" :value="formData" :rules="rules">
					<uni-forms-item name="phone">
						<uni-easyinput type="number" class="phone-input-box" :inputBorder="false"
							v-model="formData.phone" maxlength="11" placeholder="请输入手机号/用户名">
							<template slot="left">
								<!-- 当前仅支持中国大陆手机号 -->
								<!-- <picker mode="selector" :range="phoneArea" @change="selectPhoneArea"> -->
									<text class="phone-area" @click="selectPhoneArea">{{currenPhoneArea}}</text>
								<!-- </picker> -->
							</template>
						</uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="pwd">
						<uni-easyinput type="password" class="phone-input-box" :inputBorder="false"
							v-model="formData.pwd" placeholder="请输入密码"></uni-easyinput>
					</uni-forms-item>
					<button class="send-btn-box" type="primary" @click="pwdLogin">登录</button>
				</uni-forms>
				<!-- 忘记密码 -->
				<view class="auth-box">
					<text class="login-text" @click="toRetrievePwd">忘记密码</text>
					<text class="login-text" @click="toRetrievePwd">注册账号</text>
				</view>
				<!-- <button type="primary" plain class="toRegister" @click="toRegister">注册账号</button> -->
			</view>
		</view>
		<uni-quick-login ref="uniQuickLogin"></uni-quick-login>
	</view>
</template>

<script>
	import mixin from '../../common/loginPage.mixin.js';
	export default {
		mixins:[mixin],
		data() {
			return {
				phoneArea: ['+86'],
				currenPhoneArea: '+86',
			}
		},
		computed: {
			canLogin() {
				return this.isPhone && this.isPwd;
			}
		},
		methods: {
			/**
			 * 页面跳转，找回密码
			 */
			toRetrievePwd() {
				if (!this.isPhone) return uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				uni.navigateTo({
					url: '../pwd-retrieve/pwd-retrieve?phoneNumber=' + this.formData.phone + '&phoneArea=' + this.currenPhoneArea
				})
			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				// 下边是可以登录
				uniCloud.callFunction({
					name:"user-center",
					"data":{
						"action":"login",
						"params":{
							"username":this.formData.phone,
							"password":this.formData.pwd
						}
					},
					success:async (e) => {
						uni.hideLoading()
						console.log(e.result);
						if(e.result.code === 0){
							this.loginSuccess(e.result)
						}else{
							uni.showModal({
								title: '错误',
								content: e.result.msg,
								showCancel: false,
								confirmText: '知道了',
							});
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showModal({
							title: '错误',
							content: JSON.stringify(err),
							showCancel: false,
							confirmText: '知道了',
						});
						if(err.errCode===30002){
							
						}
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			selectPhoneArea(event) {
				uni.showToast({
					title: '当前仅支持中国大陆手机号',
					icon: 'none'
				});
				// this.currenPhoneArea = this.phoneArea[event.detail.value];
			},
			/* 前往注册 */
			toRegister(e){
				console.log(e);
				uni.navigateTo({
					url:'/uni_modules/uni-login-page/pages/register/register'
				})
			}
		}
	}
</script>

<style>
	@import url("../../common/loginPage.css");
	.phone-input-box {
		margin-top: 20rpx;
	}
	.auth-box {
		justify-content: space-between;
		margin-top: 20px;
	}
	.login-text-sub {
		color: #8a8f8b;
	}
	.toRegister{
		margin-top: 80px;
		width: 600rpx;
	}
</style>
