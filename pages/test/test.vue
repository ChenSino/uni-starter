<template>
	<view>
		test
		<button type="default" @click="openMoblie">打开移动网络</button>
<!-- 		<button type="default" @click="fn1">1</button>
		<button type="default" @click="fn2">2</button>
 -->	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			// 设备网络状态变化事件
			uni.onNetworkStatusChange(function (res) {
			    console.log(res.isConnected);
			    console.log(res.networkType);
				if(!res.isConnected){
					uni.showModal({
						content:"你未打开网络连接",
						confirmText:"前往打开",
						complete: (e) => {
							console.log(e);
							if (uni.getSystemInfoSync().platform == "ios") {
								
							}else{
								var main = plus.android.runtimeMainActivity();
								var Intent = plus.android.importClass("android.content.Intent");
								var mIntent = new Intent('android.settings.DATA_ROAMING_SETTINGS');
								main.startActivity(mIntent);
							}
						}
					});
				}
			});
		},
		methods: {
			openWifi(){
				var main = plus.android.runtimeMainActivity();
				var Intent = plus.android.importClass("android.content.Intent");
				var mIntent = new Intent('android.settings.WIFI_SETTINGS');
				main.startActivity(mIntent);
			},
			fn1(){
				let res = this.request('user-center/login_by_').then(e=>{
					console.log('then--1',e);
				})
			},
			fn2(){
				this.request('user-center/login_by_',{},e=>{
					console.log('222',e);
				})
			}
		}
	}
</script>

<style>

</style>
