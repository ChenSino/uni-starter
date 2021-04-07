<template>
	<view class="wrap">
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">手机号密码登录</text>
				<login-ikonw class="login-iknow" :text="tipText"></login-ikonw>
				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<view class="phone-input-box">
					<input type="number" :maxlength="6" class="phone-input" placeholder="请输入验证码"
						v-model="phoneCode" />
					<login-short-code @getCode="getCode"></login-short-code>
				</view>

				<view class="phone-input-box">
					<input type="password" :password="true" class="phone-input" placeholder="请输入密码"
						v-model="password" />
				</view>

				<!-- 发送按钮 -->
				<view class="send-btn-box" hover-class="hover"
					@click="submit" :class="canSubmit?'send-btn-active':''">
					<text class="send-btn-text">完成</text>
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
				phoneCode: '',
				password: '',
				currenPhoneArea: '',
			}
		},
		computed: {
			tipText() {
				return `验证码已通过短信发送至${this.currenPhoneArea} ${this.phoneNumber}。密码为6 - 20位`
			},
			canSubmit() {
				let reg_phone = /^1\d{10}$/;
				let reg_pwd = /^.{6,20}$/;
				let reg_code = /^\d{6}$/;
				let isPhone = reg_phone.test(this.phoneNumber);
				let isPwd = reg_pwd.test(this.password);
				let isCode = reg_code.test(this.phoneCode);
				return isPhone && isPwd && isCode;
			}
		},
		onLoad(event) {
			if (event) {
				this.phoneNumber = event.phoneNumber;
				this.currenPhoneArea = '+' + Number(event.phoneArea);
			}
		},
		methods: {
			/**
			 * 获取验证码倒计时
			 * 倒计时期间不会触发该方法
			 */
			getCode(done) {
				if (this.phoneNumber == '') return uni.showToast({
					title: '请填写手机号',
					icon: 'none'
				});
				// 发送成功后开启倒计时
				done();
			},
			/**
			 * 完成并提交
			 */
			submit(){
				
			}
		}
	}
</script>

<style>
	@import url("../../common/loginPage.css");
	.phone-input-box{
		margin-top: 20rpx;
	}
	.phone-input{
		border-left-width: 0;
	}
	.send-btn-box{
		margin-top: 50rpx;
	}
</style>
