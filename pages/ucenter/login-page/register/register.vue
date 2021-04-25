<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="undertext">
			<uni-forms-item name="username" required>
				<uni-easyinput :inputBorder="false" class="phone-input-box" placeholder="请输入用户名" v-model="formData.username" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="nickname">
				<uni-easyinput :inputBorder="false" class="phone-input-box" placeholder="请输入用户昵称" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="password" v-model="formData.password" required>
				<uni-easyinput :inputBorder="false" class="phone-input-box" placeholder="请输入6-20位密码" type="password" v-model="formData.password" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="pwd2" v-model="formData.pwd2" required>
				<uni-easyinput :inputBorder="false" class="phone-input-box" placeholder="再次输入密码" type="password" v-model="formData.pwd2" trim="both" />
			</uni-forms-item>
			<uni-agreements></uni-agreements>
			<button class="send-btn" type="primary" @click="submit">注册并登陆</button>
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
				rules
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
						this.submitForm(res)
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			submitForm(value) {
				this.request('user-center/register',value,result=>{
					console.log(result);
					if(result.code === 0){
						this.loginSuccess(result)
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../common/loginPage.css");
	.uni-container {
		padding: 15px;
	}
	.send-btn{
		margin-top: 5px;
	}
/* 
	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;

	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.uni-button-group {
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uni-button {
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0;
	} */
</style>
