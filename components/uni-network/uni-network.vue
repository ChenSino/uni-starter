<template>
	<view class="box" v-if="networkType == 'none'">
		<image class="icon-image" src="../../static/uni-network/disconnection.png" mode="widthFix"></image>
		<text class="tip-text">网络异常</text>
		<view class="btn btn-default" v-if="networkType!='none'" @click="retry">
			<text class="btn-text">重试</text>
		</view>
		<view class="btn btn-default" v-if="networkType=='none'" @click="openSettings">
			<text class="btn-text">前往设置</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uni-network",
		data() {
			return {
				"networkType": ""
			};
		},
		mounted() {
			uni.onNetworkStatusChange(({
				networkType
			}) => {
				if(this.networkType == 'none' && networkType != 'none'){
					this.change()
				}
				this.networkType = networkType;
			});
			uni.getNetworkType({
				success: ({
					networkType
				}) => {
					this.networkType = networkType;
				}
			});
		},
		methods:{
			openSettings(){
				if (uni.getSystemInfoSync().platform == "ios") {
					var UIApplication = plus.ios.import("UIApplication");
					var application2 = UIApplication.sharedApplication();
					var NSURL2 = plus.ios.import("NSURL");
					var setting2 = NSURL2.URLWithString("App-prefs:root=General");
					application2.openURL(setting2);
					plus.ios.deleteObject(setting2);
					plus.ios.deleteObject(NSURL2);
					plus.ios.deleteObject(application2);
				} else {
					var Intent = plus.android.importClass("android.content.Intent");
					var Settings = plus.android.importClass("android.provider.Settings");
					var mainActivity = plus.android.runtimeMainActivity();
					var intent = new Intent(Settings.ACTION_SETTINGS);
					mainActivity.startActivity(intent);
				}
			},
			change(){
				this.$emit('change')
			}
		}
	}
</script>

<style scoped>
	.box{
		margin:100rpx 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.icon-image{
		width: 300rpx;
	}
	.tip-text{
		color: #999999;
		font-size: 32rpx;
		margin-bottom: 30rpx;
	}
	
	.btn {
		padding: 5px 10px;
		width: 128px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.btn-text {
		color: #999999;
		font-size: 15px;
	}

	.btn-default {
		border-color: #999999;
		border-style: solid;
		border-width: 1px;
		border-radius: 3px;
	}
</style>
