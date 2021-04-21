<template>
	<view class="wrap">
		<uni-popup-agree @cancel="cancel" @confirm="confirm"></uni-popup-agree>
	</view>
</template>

<script>
	import uniPopupAgree from '../../components/uni-popup-agree/uni-popup-agree'
	export default {
		components: {
			uniPopupAgree
		},
		methods: {
			confirm() {
				uni.setStorageSync('iKnowAgree', true);
				uni.navigateBack();
			},
			cancel() {
				plus.runtime.quit();
			}
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		background: transparent;
	}
	/* #endif */
	.wrap {
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color:rgba(0,0,0,.65);
	}
</style>
