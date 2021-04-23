<template>
	<view class="box">
		<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
		<uni-easyinput focus type="number" class="phone-input-box" :inputBorder="false" v-model="formData.phone"
			maxlength="11" placeholder="请输入手机号"></uni-easyinput>
		<uni-easyinput type="number" class="phone-input-box" :inputBorder="false" v-model="formData.code" maxlength="6"
			placeholder="请输入验证码">
			<template slot="right">
				<login-short-code ref="shortCode" :phone="formData.phone"></login-short-code>
			</template>
		</uni-easyinput>
		<button class="send-btn-box" type="primary" @click="submit">提交</button>
	</view>
</template>
<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				currenPhoneArea: '',
				formData: {
					phone:"",
					code:""
				}
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
		},
		onReady() {
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			/**
			 * 完成并提交
			 */
			submit() {
				console.log(this.formData);
				this.request('user-center/bind_mobile_by_sms', {
					"mobile": this.formData.phone,
					"code": this.formData.code
				}, (data, result) => {
					console.log(result);
					this.setUserInfo({"mobile":result.mobile})
					uni.showToast({
						title: result.msg,
						icon: 'none'
					});
					if (result.code === 0) {
						uni.navigateBack()
					}
				})
			}
		}
	}
</script>

<style>
	.box {
		align-items: center;
		justify-content: center;
		padding-top: 10px;
	}

	.box /deep/ .uni-easyinput__content {
		height: 45px;
	}

	.phone-input-box {
		width: 650rpx;
		height: 50px;
		margin-top: 16px;
		background-color: #f9f9f9;
		border-radius: 6rpx;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.send-btn-box {
		width: 650rpx;
		margin-top: 15px;
	}
</style>
