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
						<!-- <uni-easyinput type="number" class="phone-input-box" :inputBorder="false"
							v-model="formData.phone" maxlength="11" placeholder="请输入手机号码">
						</uni-easyinput> -->
						<uni-easyinput type="number" class="phone-input-box" :inputBorder="false"
							v-model="formData.code" maxlength="6" placeholder="请输入验证码">
							<template slot="right">
								<login-short-code :phone="formData.phone" ref="shortCode"></login-short-code>
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
	import mixin from '../common/loginPage.mixin.js';
	export default {
		mixins:[mixin],
		data() {
			return {
				currenPhoneArea: '',
			}
		},
		computed: {
			tipText() {
				return `验证码已通过短信发送至${this.currenPhoneArea} ${this.formData.phone}。`;
			},
			canSubmit() {
				return this.isPhone && this.isCode;
			}
		},
		onLoad({phoneNumber,phoneArea}) {
			this.formData.phone = phoneNumber;
			this.currenPhoneArea = '+' + Number(phoneArea);
		},
		onReady() {
			this.$refs.shortCode.start();
		},
		methods: {
			/**
			 * 完成并提交
			 */
			submit(){
				uniCloud.callFunction({//联网验证登陆
					"name": "user-center",
					"data": {
						"action": "loginBySms",
						"params":{
							"mobile":this.formData.phone,
							"code":this.formData.code
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
			}
		}
	}
</script>

<style>
	@import url("../common/loginPage.css");
	.phone-input-box{
		margin-top: 10px;
	}
</style>
