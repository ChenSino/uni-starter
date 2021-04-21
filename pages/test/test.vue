<template>
	<view>
		<!-- <button type="default" @click="openSystemSetting('ACTION_BLUETOOTH_SETTINGS')">设置蓝牙</button>
		<button type="default" @click="openSystemSetting('ACTION_LOCALE_SETTINGS')">设置语言</button>
		<button type="default" @click="openSystemSetting('ACTION_LOCATION_SOURCE_SETTINGS')">设置gps</button>
		<button type="default" @click="openSystemSetting('ACTION_WIFI_SETTINGS')">设置wifi</button>
		<button type="default" @click="openSystemSetting('ACTION_DATA_ROAMING_SETTINGS')">数据网络</button>
		<text>应用相关权限</text>
		<button type="default" @click="openAppPermissionSetting">打开</button>
		<button type="default" @click="iosSetting">iosSetting</button> -->
		<button type="default" @click="openCamera">打开相机</button>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
				// 当某个权限调用失败
				// 1.先检测手机的该模块是否打开
				// 2.检测当前应用是否被授权了该模块对应的权限
				// 提示，并点击跳转到设置
		},
		methods: {
			openCamera(){
				uni.chooseImage({
					sourceType: ["camera","album"],
					complete: (e) => {
						console.log(e);
					}
				})
			},
			iosSetting() {
				plus.runtime.launchApplication({
					action: 'App-Prefs:root=WIFI'
				}, function(e) {
					//console.log(JSON.stringify(e));
				}); //WIFI
			},
			openSystemSetting(type) {
				var main = plus.android.runtimeMainActivity(); //获取activity  
				var Intent = plus.android.importClass('android.content.Intent');
				var Settings = plus.android.importClass('android.provider.Settings');
				var intent = new Intent(Settings[type]); //可设置表中所有Action字段  
				main.startActivity(intent);
			},
			openAppPermissionSetting() {
				// 跳转到**应用**的权限页面
				if (uni.getSystemInfoSync().platform == "ios") {
					var UIApplication = plus.ios.import("UIApplication");
					var application2 = UIApplication.sharedApplication();
					var NSURL2 = plus.ios.import("NSURL");
					// var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");		
					var setting2 = NSURL2.URLWithString("app-settings:");
					application2.openURL(setting2);
					plus.ios.deleteObject(setting2);
					plus.ios.deleteObject(NSURL2);
					plus.ios.deleteObject(application2);
				} else {
					// console.log(plus.device.vendor);
					var Intent = plus.android.importClass("android.content.Intent");
					var Settings = plus.android.importClass("android.provider.Settings");
					var Uri = plus.android.importClass("android.net.Uri");
					var mainActivity = plus.android.runtimeMainActivity();
					var intent = new Intent();
					intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
					var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
					intent.setData(uri);
					mainActivity.startActivity(intent);
				}
			},
		}
	}
</script>

<style>

</style>
