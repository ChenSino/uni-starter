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
		<!-- <button type="default" @click="openCamera">打开相机</button> -->
		<!-- <button type="default" @click="openGridPage">打开一个需要登陆的页面</button> -->
		<button type="default" @click="showShare">打开分享</button>
		<!-- <uni-bottom-menu ref="bottomMenu" @clickItem="clickItem" :list="menus"></uni-bottom-menu> -->
	</view>
</template>

<script>
	// import permision from '@/js_sdk/wa-permission/permission.js';
	import uniShare from 'uni_modules/uni-share/js_sdk/main.js';
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			/*
			
			// uni.addInterceptor('showToast',{
			// 	invoke(e){// 调用前拦截 
			// 		console.log(e)
			// 		e.title = "645"
			// 	},
			// 	success(e){// 成功回调拦截 
			// 		console.log(e)
			// 	},
			// 	fail(e){// 失败回调拦截 
			// 		console.log(e)
			// 	},
			// 	complete(e){
			// 		console.log(e)
			// 	},
			// 	returnValue(e){// 返回结果拦截 
			// 		console.log(e)
			// 	}
			// })
			
			// return 
			// 
			// 	当某个权限调用失败
			// 	1.先检测手机的该模块是否打开
			// 	2.检测当前应用是否被授权了该模块对应的权限
			// 	提示，并点击跳转到设置
			// 
			// this.changeAction('chooseImage', {
			// 	after_action: e => {
			// 		console.log('changeAction', e);
			// 		if(e.errCode === 11){
			// 			uni.showModal({
			// 				content: '无权限',
			// 				confirmText:"前往设置",
			// 				success(e) {
			// 					if(e.confirm){
			// 						permision.gotoAppPermissionSetting()
			// 					}
			// 				}
			// 			});
			// 		}
			// 	}
			// })
			
			// this.changeAction(["navigateTo", "redirectTo", "reLaunch", "switchTab"], {
			// 	before_action: e => {
			// 		let needLoginUrls = ['/pages/grid/grid']//需要登陆的页面
			// 		let token = uni.getStorageSync('uni-id-token')
			// 		if (needLoginUrls.includes(e.url) && token == '') {
			// 			console.log('该页面需要登陆，即将跳转到login页面');
			// 			uni.showToast({title:'该页面需要登陆，即将跳转到login页面',icon:'none'})
			// 			return false
			// 		}
			// 		return true
			// 	}
			// })
			
			*/
		},
		methods: {
			showShare(){
				uniShare()
			},
			clickItem(e){
				console.log(e);
				uni.showToast({
					title: e
				});
			},
			openCamera(){
				uni.chooseImage({
					sourceType: ["camera"],
					complete: (e) => {
						console.log(e);
					}
				})
			},
			openGridPage(){
				uni.redirectTo({
					url:'/pages/grid/grid'
				})
			},
			changeAction(actions, {
				before_action,
				after_action
			}) {
				if(typeof actions == 'string'){
					actions = [actions]
				}
				if (!before_action) {
					before_action = () => true
				}
				actions.forEach(action=>{
					let old_action = uni[action]
					uni[action] = e => {
						if (before_action(e)) {
							console.log(after_action);
							if (after_action) {
								var compose = function(f, g) {
									return function(x) {
										return f(x,g(x));
									};
								};
								e.complete = compose(e.complete,after_action)
							}
							old_action(e)
						}
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
			fn1() {
				let res = this.request('user-center/login_by_').then(e => {
					console.log('then--1', e);
				})
			},
			fn2() {
				this.request('user-center/login_by_', {}, e => {
					console.log('222', e);
				})
			}
		}
	}
</script>

<style>

</style>
