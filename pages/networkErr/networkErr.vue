<template>
	<view class="box">
		<view class="content">
			<text class="networkErr">网络连接不可用</text>
			<button type="default" @click="toSet">去设置</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight:0
			}
		},
		mounted() {
			uni.onNetworkStatusChange(res=> {
			    console.log(res.isConnected);
			    console.log(res.networkType);
				if(res.networkType!='none'){
					uni.showToast({
						title:'当前网络类型：'+res.networkType,
						icon:'none',
						duration:3000
					})
					uni.navigateBack({
						animationType:'fade-out'
					})
				}
			});
		},
		methods: {
			toSet(){
				if (uni.getSystemInfoSync().platform == "ios") {
					plus.runtime.launchApplication({
						action: 'App-Prefs:root=WIFI'
					}, function(e) {
						console.log(JSON.stringify(e));
					});
				} else {
					var main = plus.android.runtimeMainActivity();
					var Intent = plus.android.importClass("android.content.Intent");
					var mIntent = new Intent('android.settings.DATA_ROAMING_SETTINGS');
					main.startActivity(mIntent);
				}
			}
		},
	}
</script>

<style >
	page {
		background: transparent;
	}
	.box{
		display: flex;
		width: 750rpx;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}
	.content{
		height: 100px;
		width: 400rpx;
		background-color: #DD524D;
	}
</style>
