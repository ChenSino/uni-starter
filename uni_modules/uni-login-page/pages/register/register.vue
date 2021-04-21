<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="username" label="用户名" required>
				<uni-easyinput placeholder="请输入用户名" v-model="formData.username" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="gender" label="性别" required>
				<uni-data-checkbox v-model="formData.gender" :localdata="formOptions.gender_localdata" />
			</uni-forms-item>
			<uni-forms-item name="nickname" label="昵称" required>
				<uni-easyinput placeholder="请输入用户昵称" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="pwd" label="密码" v-model="formData.pwd" required>
				<uni-easyinput placeholder="请输入6-20位密码" type="password" v-model="formData.pwd" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="pwd2" label="确认密码" v-model="formData.pwd2" required>
				<uni-easyinput placeholder="再次输入密码" type="password" v-model="formData.pwd2" trim="both" />
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">注册</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/uni-id-users.js';

	const db = uniCloud.database();
	const dbCollectionName = 'uni-id-users';

	function getValidator(fields) {
		let reuslt = {}
		for (let key in validator) {
			if (fields.indexOf(key) > -1) {
				reuslt[key] = validator[key]
			}
		}
		return reuslt
	}

	export default {
		data() {
			return {
				formData: {
					"username": "",
					"gender": 0,
					"nickname": "",
					'pwd':'',
					'pwd2':''
				},
				formOptions: {
					"gender_localdata": [{
							"text": "未知",
							"value": 0
						}, {
							"text": "男",
							"value": 1
						},
						{
							"text": "女",
							"value": 2
						}
					]
				},
				rules: {
					...getValidator(["username", "gender", "nickname", 'pwd', 'pwd2'])
				}
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
				if(this.formData.pwd != this.formData.pwd2)return uni.showToast({
					title: '两次输入密码不一致',
					icon: 'none'
				});
				
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
						console.log(res);
						this.submitForm(res)
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					})
			},

			submitForm(value) {

			}
		}
	}
</script>

<style>
	.uni-container {
		padding: 15px;
	}

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
		width: 184px;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0;
	}

	.avatar-box {
		width: 700rpx;
		height: 200rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}

	.avatar-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 75rpx;
		border: #F8F8F8 solid 3px;
	}
</style>
