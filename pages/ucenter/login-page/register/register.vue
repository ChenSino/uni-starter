<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="undertext">
			<uni-forms-item name="username" required>
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="$t('register.usernamePlaceholder')" v-model="formData.username" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="nickname">
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="$t('register.nicknamePlaceholder')" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="password" v-model="formData.password" required>
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="$t('register.passwordDigitsPlaceholder')" type="password" v-model="formData.password" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="pwd2" v-model="formData.pwd2" required>
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="$t('register.passwordAgain')" type="password" v-model="formData.pwd2" trim="both" />
			</uni-forms-item>
			<uni-agreements @setAgree="agree = $event"></uni-agreements>
			<button class="send-btn" type="primary" @click="submit">{{$t('register.registerAndLogin')}}</button>
		</uni-forms>
	</view>
</template>

<script>
import rules from './validator.js';
import mixin from '../common/login-page.mixin.js';
	export default {
		mixins:[mixin],
		data() {
			return {
				formData: {
					"username": "",
					"nickname": "",
					'password':'',
					'pwd2':''
				},
				rules,
				agree:false
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('register.navigationBarTitle')
			})
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				if(!this.agree){
					return uni.showToast({
						title: this.$t('common').noAgree,
						icon: 'none'
					});
				}
				uni.showLoading({
					mask: true
				})
				return this.$refs.form.validate().then(async(res) => {
					console.log("res: ",res);
						let msg = await this.submitForm(res)
						console.log("msg: --------------",msg);
						return msg
					}).catch((errors) => {
						console.log(errors);
						return errors
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			async submitForm(params) {
				return await uniCloud.callFunction({
					name:'uni-id-cf',
					data:{
						action:'register',
						params,
					},
				}).then(({result}) => {
					if(result.code === 0){
						this.loginSuccess(result)
					}else{
						uni.showModal({
							content: result.msg,
							showCancel: false
						});
					}
					console.log(result);
					return result
				})
				// uniCloud.callFunction({
				// 	name:'uni-id-cf',
				// 	data:{
				// 		action:'register',
				// 		params,
				// 	},
				// 	success: ({result}) => {
				// 		console.log(result);
				// 		if(result.code === 0){
				// 			this.loginSuccess(result)
				// 		}else{
				// 			uni.showModal({
				// 				content: result.msg,
				// 				showCancel: false
				// 			});
				// 		}
				// 	}
				// })
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");
	.uni-container {
		padding: 15px;
	}
	.send-btn{
		margin-top: 5px;
	}
</style>
