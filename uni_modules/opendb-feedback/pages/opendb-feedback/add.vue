<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
			<!-- <uni-forms-item name="user_id" label="">
				<uni-easyinput placeholder="留言反馈用户ID/回复留言用户ID，参考uni-id-users表" v-model="formData.user_id" />
			</uni-forms-item> -->
			<!-- <uni-forms-item name="create_date" label="">
				<uni-datetime-picker return-type="timestamp" :value="formData.create_date" />
			</uni-forms-item> -->
			<uni-forms-item name="content" label="反馈内容">
				<uni-easyinput placeholder="请输入反馈内容" type="textarea" v-model="formData.content" trim="right" />
			</uni-forms-item>
			<uni-forms-item name="imgs" label="反馈截图">
				<!-- <uni-data-checkbox :multiple="true" v-model="formData.imgs" /> -->
				<feedback-imgs :isChoose="true" :imgs="formData.imgs" @close="close" @chooseImg="chooseImg"></feedback-imgs>
			</uni-forms-item>
			<!-- <uni-forms-item name="is_reply" label="">
				<switch @change="binddata('is_reply', $event.detail.value)" :checked="formData.is_reply" />
			</uni-forms-item> -->
			<!-- <uni-forms-item name="feedback_id" label="">
				<uni-easyinput placeholder="被回复留言ID" v-model="formData.feedback_id" />
			</uni-forms-item> -->
			<uni-forms-item name="contact" label="联系人">
				<uni-easyinput placeholder="请输入联系人" v-model="formData.contact" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="mobile" label="联系方式">
				<uni-easyinput placeholder="请输入手机号/邮箱" v-model="formData.mobile" trim="both" />
			</uni-forms-item>
			<!-- <uni-forms-item name="reply_count" label="">
				<uni-easyinput placeholder="被回复条数" type="number" v-model="formData.reply_count" />
			</uni-forms-item> -->

			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCollectionName = 'opendb-feedback';
	import feedbackImgs from '../../components/feedback-imgs';
	export default {
		components:{feedbackImgs},
		data() {
			return {
				formData: {
					"user_id": (uni.getStorageSync('userInfo') || {
						_id: ''
					})._id,
					"create_date": null,
					"content": "",
					"imgs": [],
					"is_reply": null,
					"feedback_id": "",
					"contact": "",
					"mobile": "",
					"reply_count": null
				},
				formOptions: {},
				rules: {
					content: {
						rules: [{
							required: true,
							errorMessage: '请填写反馈内容',
						}]
					},
					contact:{
						rules:[{
							required: true,
							errorMessage: '请填写联系人',
						}]
					},
					mobile:{
						rules:[{
							required: true,
							errorMessage: '请填写联系方式',
						}]
					}
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
			async submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
					this.uploadImgs(res.imgs)
					.then(imgs=>{
						res.imgs = imgs;
						res.create_date = Date.now();
						this.submitForm(res)
					});
				}).catch((errors) => {
					console.log(errors);
					uni.hideLoading()
				})
			},
			/**
			 * 上传图片
			 */
			async uploadImgs(imgs){
				let cloud_list = [];
				for (let i = 0; i < imgs.length; i++) {
					let img = await uniCloud.uploadFile({
						filePath: imgs[i],
						cloudPath: 'feedback.jpg'
					});
					cloud_list.push(img.fileID);
				}
				return cloud_list;
			},
			submitForm(value) {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '反馈成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '反馈失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			/**
			 * 关闭图片
			 * @param {Object} e
			 */
			close(e) {
				this.formData.imgs.splice(e, 1);
			},
			/**
			 * 选择图片
			 */
			chooseImg() {
				//选择图片
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: 'compressed',
					count: 5 - this.formData.imgs.length,
					success: res => {
						this.formData.imgs = this.formData.imgs.concat(res.tempFilePaths);
					}
				});
			},
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
	}

	.uni-button {
		width: 184px;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0;
	}
	
	.uni-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
</style>
