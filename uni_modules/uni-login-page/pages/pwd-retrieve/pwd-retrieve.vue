<template>
	<view class="wrap">
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">重置密码</text>
				<login-ikonw v-show="isPhone" class="login-iknow" :text="tipText"></login-ikonw>
				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<uni-forms ref="form" :value="formData" :rules="rules">
					<uni-forms-item name="phone">
						<uni-easyinput type="number" class="phone-input-box" :inputBorder="false"
							v-model="formData.phone" maxlength="11" placeholder="请输入手机号"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="code">
						<uni-easyinput type="number" class="phone-input-box" :inputBorder="false"
							v-model="formData.code" maxlength="6" placeholder="请输入验证码">
							<template slot="right">
								<login-short-code ref="shortCode" :phone="formData.phone"></login-short-code>
							</template>
						</uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="pwd">
						<uni-easyinput type="password" class="phone-input-box" :inputBorder="false"
							v-model="formData.pwd" placeholder="请输入新密码"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="pwd2">
						<uni-easyinput type="password" class="phone-input-box" :inputBorder="false"
							v-model="formData.pwd2" placeholder="请确认新密码"></uni-easyinput>
					</uni-forms-item>
					<button class="send-btn-box" :disabled="!canSubmit" :type="canSubmit?'primary':'default'"
						@click="submit">完成</button>
				</uni-forms>
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
				currenPhoneArea: ''
			}
		},
		computed: {
			tipText() {
				return `验证码已通过短信发送至${this.currenPhoneArea} ${this.formData.phone}。密码为6 - 20位`
			},
			canSubmit() {
				return this.isPhone && this.isPwd && this.isCode;
			}
		},
		onLoad(event) {
			if (event && event.phoneNumber) {
				this.formData.phone = event.phoneNumber;
				this.currenPhoneArea = '+' + Number(event.phoneArea);
			}
		},
		onReady() {
			if(this.formData.phone){
				// this.$refs.shortCode.start();
			}
		},
		methods: {
			/**
			 * 完成并提交
			 */
			submit(){
				this.$refs.form.submit()
				.then(res=>{
					this.request('user-center/resetPwdBySmsCode',{
						"mobile":this.formData.phone,
						"code":this.formData.code,
						"password":this.formData.pwd
					},(data,result)=>{
						console.log(result);
						uni.showToast({
							title: result.msg,
							icon: 'none'
						});
						if(result.code === 0){
							uni.navigateBack()
						}
					})
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
