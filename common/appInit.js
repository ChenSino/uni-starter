import baseappConfig from '@/baseapp.config.js';
// #ifdef APP-PLUS
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
// #endif
export default function() {
	// 初始化appVersion（仅app生效）
	initAppVersion();

	//自定义路由拦截
	const {
		"router": {
			needLogin,
			login
		}
	} = baseappConfig //需要登陆的页面
	//uni.addInterceptor的写法
	let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
	list.forEach(item => {
		uni.addInterceptor(item, {
			invoke(e) { // 调用前拦截
				//console.log(e);
				const token = uni.getStorageSync('uni_id_token')
				// console.log(token);
				const url = e.url.split('?')[0]
				//拦截强制登陆页面
				if (needLogin.includes(url) && token == '') {
					console.log('该页面需要登陆，即将跳转到login页面');
					uni.showToast({
						title: '该页面需要登陆，即将跳转到login页面',
						icon: 'none'
					})
					uni.navigateTo({
						url: "/uni_modules/uni-login-page/pages/index/index"
					})
					return false
				}
				//控制登陆优先级
				if (url == '/uni_modules/uni-login-page/pages/index/index') {
					//一键登录（univerify）、密码登陆（username）、快捷登录&验证码登陆（!univerify&password）
					if (login[0] == 'univerify') {
						// console.log(e.url,url);
						if (e.url == url) {
							e.url += '?'
						}
						e.url += "univerify_first=true"
					} else if (login[0] == 'username') {
						e.url = "/uni_modules/uni-login-page/pages/pwd-login/pwd-login"
					} else {
						//默认即是
					}
				}
				return true
			},
			fail(err) { // 失败回调拦截 
				console.log(err);
			},
		})
	})

	//当应用无访问摄像头/相册权限，引导跳到设置界面
	uni.addInterceptor('chooseImage', {
		fail(e) { // 失败回调拦截 
			console.log(e);
			if (
				e.errCode === 11 && uni.getSystemInfoSync().platform == "android"	||
				e.errCode === 2 && uni.getSystemInfoSync().platform == "ios"
			){
				uni.showModal({
					title:"无法访问摄像头",
					content: "当前无摄像头访问权限，建议前往设置",
					confirmText: "前往设置",
					success(e) {
						if (e.confirm) {
							openAppPermissionSetting()
						}
					}
				});
			}
			if(e.errCode === 12 && uni.getSystemInfoSync().platform == "android"){
				uni.showModal({
					title:"无法访问相册",
					content: "当前无系统相册访问权限，建议前往设置",
					confirmText: "前往设置",
					success(e) {
						if (e.confirm) {
							openAppPermissionSetting()
						}
					}
				});
			}
		}
	})
}
/**
 * // 初始化appVersion
 */
function initAppVersion() {
	// #ifdef APP-PLUS
	let appid = plus.runtime.appid;
	plus.runtime.getProperty(appid, (wgtInfo) => {
		let appVersion = plus.runtime;
		let currentVersion = appVersion.versionCode > wgtInfo.versionCode ? appVersion : wgtInfo;
		getApp({
			allowDefault: true
		}).appVersion = {
			...currentVersion,
			appid,
			hasNew: false
		}
		// 检查更新小红点
		callCheckVersion().then(res => {
			console.log('检查是否有可以更新的版本', res);
			if (res.result.code > 0) {
				// 有新版本
				getApp({
					allowDefault: true
				}).appVersion.hasNew = true;
			}
		})
	});
	// 检查更新
	checkUpdate();
	// #endif
}

// 设备网络状态变化事件
function eventListenerNetwork() {
	uni.onNetworkStatusChange(function(res) {
		console.log(res.isConnected);
		console.log(res.networkType);
		if (!res.isConnected) {
			uni.showModal({
				content: "你未打开网络连接",
				confirmText: "前往打开",
				complete: (e) => {
					console.log(e);
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
			});
		}
	});
}

function openAppPermissionSetting(){
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
}
/*
	uni.addInterceptor(item, {
		invoke(e) { // 调用前拦截
		},
		success() { // 成功回调拦截 
		},
		fail(err) { // 失败回调拦截 
			console.log(err);
		},
		complete(e) { // 完成回调拦截 
			//console.log(e);
		},
		returnValue() { // 返回结果拦截 
		}
	}) // 移除拦截器API removeInterceptor('request')
*/