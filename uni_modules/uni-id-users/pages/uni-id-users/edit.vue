<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="avatar">
				<template>
					<view class="avatar-box">
						<image class="avatar-img" :src="formData.avatar || '/static/uni-center/logo.png'" @click="chooseImg" mode="aspectFill"></image>
					</view>
				</template>
			</uni-forms-item>
			<!-- <uni-forms-item name="gender" label="性别" required>
				<uni-data-checkbox v-model="formData.gender" :localdata="formOptions.gender_localdata" />
			</uni-forms-item> -->
			<uni-forms-item name="mobile" label="手机号码" v-if="formData.mobile">
				<uni-easyinput placeholder="手机号码" :disabled="true" v-model="formData.mobile" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="nickname" label="昵称" required>
				<uni-easyinput placeholder="用户昵称" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">修改</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/uni-id-users.js';
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
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
					"avatar": "",
					"gender": '',
					"mobile": "",
					"nickname": ""
				},
				formOptions: {
					"gender_localdata": [{
							"text": "未知",
							"value": 0
						},{
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
					...getValidator(["avatar", "gender", "nickname"])
				}
			}
		},
		computed:{
			...mapGetters({
				userInfo:'user/info'
			})
		},
		onLoad(e) {
			let id = uni.getStorageSync('uni_id_uid') || this.userInfo._id;
			this.formDataId = id
			this.getDetail(id)
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			...mapMutations({
				setUserInfo:'user/login'
			}),
			// 选择图片
			chooseImg(){
				uni.chooseImage({
					count:1,
					success:(res)=> {
						// 头像剪裁尺寸
						let options = {
							width:600,
							height:600
						}
						// 剪裁并上传头像
						uni.navigateTo({
							url:'/pages/ucenter/edit/uploadCutImageToUnicloud?path=' + res.tempFilePaths[0] + `&options=${JSON.stringify(options)}`,
							animationType:"fade-in",
							events:{
								uploadAvatarAfter:({url})=>{
									this.formData.avatar = url;
									this.submitForm({avatar:url});
								}
							}
						});
					}
				})
			},
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
					console.log(res);
					this.submitForm(res)
				}).catch((errors) => {
					uni.hideLoading()
				})
			},

			submitForm(value) {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					this.setUserInfo(value);
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName).doc(id).field('avatar,gender,mobile,nickname').get().then((res) => {
					const data = res.result.data[0]
					if (data) {
						this.formData = data
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
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
	
	.avatar-box{
		width: 700rpx;
		height: 200rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
	.avatar-img{
		width: 150rpx;
		height: 150rpx;
		border-radius: 75rpx;
		border: #F8F8F8 solid 3px;
	}
</style>
