<template>
	<view class="feedback-body feedback-uploader">
		<view class="uni-uploader">
			<view class="uni-uploader-head" v-if="isChoose">
				<view class="uni-uploader-title">点击预览图片</view>
				<view class="uni-uploader-info">{{ imgs.length }}/5</view>
			</view>
			<view class="uni-uploader-body">
				<view class="uni-uploader__files">
					<block v-for="(image, index) in imgs" :key="index">
						<view class="uni-uploader__file" style="position: relative;">
							<image class="uni-uploader__img" :src="image" @tap="previewImage(index)">
							</image>
							<view class="close-view" v-if="isChoose" @click="close(index)">x</view>
						</view>
					</block>
					<view class="uni-uploader__input-box" v-show="isChoose && imgs.length < 5">
						<view class="uni-uploader__input" @tap="chooseImg"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"feedback-imgs",
		props:{
			imgs:{
				type:Array,
				default:()=>[]
			},
			isChoose:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			/**
			 * 关闭图片
			 * @param {Object} e
			 */
			close(e) {
				this.$emit( 'close', e)
			},
			/**
			 * 选择图片
			 */
			chooseImg() {
				this.$emit('chooseImg');
			},
			/**
			 * 预览图片
			 * @param {Object} index
			 */
			previewImage(index) {
				uni.previewImage({
					urls: this.imgs,
					current: this.imgs[index]
				});
			},
		}
	}
</script>

<style>

	.close-view {
		text-align: center;
		line-height: 14px;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #ff5053;
		color: #ffffff;
		position: absolute;
		top: -6px;
		right: -4px;
		font-size: 12px;
	}

	/* 上传 */
	.uni-uploader {
		flex: 1;
		flex-direction: column;
	}

	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.uni-uploader-info {
		color: #B2B2B2;
	}

	.uni-uploader-body {
		margin-top: 16rpx;
	}

	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.uni-uploader__file {
		margin: 10rpx;
		width: 210rpx;
		height: 210rpx;
	}

	.uni-uploader__img {
		display: block;
		width: 210rpx;
		height: 210rpx;
	}

	.uni-uploader__input-box {
		position: relative;
		margin: 10rpx;
		width: 208rpx;
		height: 208rpx;
		border: 2rpx solid #D9D9D9;
	}

	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}

	.uni-uploader__input-box:before {
		width: 4rpx;
		height: 79rpx;
	}

	.uni-uploader__input-box:after {
		width: 79rpx;
		height: 4rpx;
	}

	.uni-uploader__input-box:active {
		border-color: #999999;
	}

	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}

	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	/*问题反馈*/
	.feedback-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		color: #8f8f94;
		font-size: 28rpx;
	}

	.feedback-star-view.feedback-title {
		justify-content: flex-start;
		margin: 0;
	}

	.feedback-quick {
		position: relative;
		padding-right: 40rpx;
	}

	.feedback-quick:after {
		font-family: uniicons;
		font-size: 40rpx;
		content: '\e581';
		position: absolute;
		right: 0;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.feedback-body {
		background: #fff;
	}

	.feedback-textare {
		height: 200rpx;
		font-size: 34rpx;
		line-height: 50rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx 0;
	}

	.feedback-input {
		font-size: 34rpx;
		height: 50rpx;
		min-height: 50rpx;
		padding: 15rpx 20rpx;
		line-height: 50rpx;
	}

	.feedback-uploader {
		padding: 22rpx 20rpx;
	}

	.feedback-star {
		font-family: uniicons;
		font-size: 40rpx;
		margin-left: 6rpx;
	}

	.feedback-star-view {
		margin-left: 20rpx;
	}

	.feedback-star:after {
		content: '\e408';
	}

	.feedback-star.active {
		color: #FFB400;
	}

	.feedback-star.active:after {
		content: '\e438';
	}

	.feedback-submit {
		background: #007AFF;
		color: #FFFFFF;
		margin: 20rpx;
	}

</style>
