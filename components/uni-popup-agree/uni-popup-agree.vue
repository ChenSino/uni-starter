<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-title">
			<text class="uni-dialog-title-text" :class="['uni-popup__'+dialogType]">{{title}}</text>
		</view>
		<view class="uni-dialog-content">
			<login-ikonw class="login-iknow" :link="link" :text="content"></login-ikonw>
		</view>
		<view class="uni-dialog-button-group">
			<view class="uni-dialog-button" @click="close">
				<text class="uni-dialog-button-text">不同意</text>
			</view>
			<view class="uni-dialog-button uni-border-left" @click="onOk">
				<text class="uni-dialog-button-text uni-button-color">同意</text>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		name: "uniPopupAgree",
		props: {
			/**
			 * 对话框主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'error'
			},
			/**
			 * 对话框标题
			 */
			title: {
				type: String,
				default: '使用须知'
			},
			/**
			 * 对话框内容
			 */
			content: {
				type: String,
				default: 'DCloud（以下简称我们）尊重并保护所有使用服务用户的个人权益。为了给您提供更准确、更有个性化的服务，我们会按照本隐私政策和服务协议的规定使用和披露您的个人信息。但我们将以高度的勤勉、审慎义务对待这些信息。除本隐私政策和服务协议另有规定外，在未征得您事先许可的情况下，我们不会将这些信息对外披露或向第三方提供。'
			},
		},
		data() {
			return {
				dialogType: 'error',
				val: "",
				link: [{
					text: '服务协议',
					to: '/pages/ucenter/agree-list/service/service'
				}, {
					text: '隐私政策',
					to: '/pages/ucenter/agree-list/privacy/privacy'
				}],
			}
		},
		watch: {
			type(val) {
				this.dialogType = val
			}
		},
		created() {
			this.dialogType = this.type
		},
		methods: {
			/**
			 * 点击确认按钮
			 */
			onOk() {
				this.$emit('confirm');
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				this.$emit('cancel');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-popup-dialog {
		width: 300px;
		border-radius: 5px;
		background-color: #fff;
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}

	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
	}

	.uni-dialog-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}

	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.uni-dialog-button-text {
		font-size: 14px;
	}

	.uni-button-color {
		color: $uni-color-primary;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
	}

	.uni-popup__success {
		color: $uni-color-success;
	}

	.uni-popup__warn {
		color: $uni-color-warning;
	}

	.uni-popup__error {
		color: $uni-color-error;
	}

	.uni-popup__info {
		color: #909399;
	}

	.uni-popup-dialog__close {
		/* #ifndef APP-NVUE */
		display: block;
		cursor: pointer;
		/* #endif */
		position: absolute;
		top: 9px;
		right: 17px;
	}

	.uni-popup-dialog__close-icon {
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
		width: 13px;
		height: 1px;
		background: #909399;
		transform: rotate(45deg);
	}

	.uni-popup-dialog__close-icon::after {
		/* #ifndef APP-NVUE */
		content: '';
		display: block;
		/* #endif */
		width: 13px;
		height: 1px;
		background: #909399;
		transform: rotate(-90deg);
	}
</style>
