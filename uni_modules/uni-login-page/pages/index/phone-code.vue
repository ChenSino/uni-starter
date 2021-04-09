<template>
	<view class="wrap">
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">请输入验证码</text>
				<login-ikonw class="login-iknow" :text="tipText"></login-ikonw>
				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<uni-forms ref="form" :value="formData" :rules="rules">
					<uni-forms-item name="phone">
						<uni-easyinput type="number" class="phone-input-box" :inputBorder="false"
							v-model="formData.code" maxlength="6" placeholder="请输入验证码">
							<template slot="right">
								<login-short-code ref="shortCode" @getCode="getCode"></login-short-code>
							</template>
						</uni-easyinput>
					</uni-forms-item>
					<button class="send-btn-box" :disabled="!canSubmit" :type="canSubmit?'primary':'default'"
						@click="submit">登录</button>
				</uni-forms>
			</view>
		</view>
		<uni-quick-login></uni-quick-login>
	</view>
</template>

<script>
	import mixin from '../../common/loginPage.mixin.js';
	export default {
		mixins:[mixin],
		data() {
			return {
				phoneNumber: '',
				phoneCode: '',
				currenPhoneArea: '',
				formData:{
					code:''
				},
				rules: {
					code: {
						rules: [{
								required: true,
								errorMessage: '请输入验证码',
							},
							{
								legn: /^.{6}$/,
								errorMessage: '请输入6位验证码',
							}
						]
					}
				}
			}
		},
		computed: {
			tipText() {
				return `验证码已通过短信发送至${this.currenPhoneArea} ${this.phoneNumber}。`;
			},
			canSubmit() {
				let reg_phone = /^1\d{10}$/;
				let reg_code = /^\d{6}$/;
				let isPhone = reg_phone.test(this.phoneNumber);
				let isCode = reg_code.test(this.formData.code);
				return isPhone && isCode;
			}
		},
		onLoad({phoneNumber,phoneArea}) {
			this.phoneNumber = phoneNumber;
			this.currenPhoneArea = '+' + Number(phoneArea);
		},
		onReady() {
			this.$refs.shortCode.start();
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
				uniCloud.callFunction({
					"name": "user-center",
					"data": {
						"action": "sendSmsCode",
						"params": {
							"mobile": this.phoneNumber,
							"type": "login"
						}
					},
					success: (e) => {
						console.log(e);
						// uni.showToast({
						// 	title: JSON.stringify(e.result),
						// 	icon: 'none'
						// });
						uni.showModal({
							content: JSON.stringify(e.result),
							showCancel: false,
							confirmText: '知道了'
						});
						// 发送成功后开启倒计时
						done();
					},
					fail: (err) => {
						console.log(err);
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			/**
			 * 完成并提交
			 */
			submit(){
				uniCloud.callFunction({//联网验证登陆
					"name": "user-center",
					"data": {
						"action": "loginBySms",
						"params":{
							"mobile":this.phoneNumber,
							"code":this.formData.code
						}
					},
					success:async (e) => {
						uni.hideLoading()
						console.log(e.result);
						if(e.result.code === 0){
							uni.setStorageSync('uni_id_uid', e.result.uid)
							uni.setStorageSync('uni_id_token', e.result.token)
							uni.setStorageSync('uni_id_token_expired', e.result.tokenExpired)
							// console.log('66666=',e.result.uid,e.result.token,e.result.tokenExpired);
							delete e.result.userInfo.token
							this.setUserInfo(e.result.userInfo)
							uni.showToast({
								title: '登陆成功',
								icon: 'none'
							});
							uni.switchTab({
								url:"/pages/list/list"
							})
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
			}
		}
	}
</script>

<style>
	@import url("../../common/loginPage.css");
	.phone-input-box{
		margin-top: 20rpx;
	}
</style>
