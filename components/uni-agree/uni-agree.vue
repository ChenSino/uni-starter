<template>
	<view>
		<uni-popup ref="popup" :maskClick="false" type="center">
			<uni-popup-agree @cancel="cancel" @confirm="confirm"></uni-popup-agree>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"uni-agree",
		mounted() {
			if (uni.getSystemInfoSync().platform == "android") {
				let iKnowAgree = uni.getStorageSync('iKnowAgree') || false;
				if(!iKnowAgree){
					this.$refs.popup.open();
				}
			}
		},
		methods:{
			confirm(){
				this.$refs.popup.close();
				uni.setStorageSync('iKnowAgree', true);
			},
			cancel(){
				plus.runtime.quit();
			}
		}
	}
</script>

<style>

</style>
