import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
export default function() {

	// 初始化appVersion
	initAppVersion();

	// 检查更新
	checkUpdate();

	//自定义路由拦截
	setRouter()
	
	//提示网络变化
	eventListenerNetwork()
	
}
/**
 * // 初始化appVersion
 */
function initAppVersion() {
	// #ifdef APP-PLUS
	let appid = plus.runtime.appid;
	plus.runtime.getProperty(appid, (wgtInfo) => {
		wgtInfo.version
		let appVersion = plus.runtime;
		getApp({
			allowDefault: true
		}).appVersion = {
			appid,
			version: appVersion,
			wgtVersion: wgtInfo,
			finall: appVersion.versionCode > wgtInfo.versionCode ? appVersion : wgtInfo
		}
	});
	// #endif
}

//用于拦截路由
const baseappConfig = require('@/baseapp.config.json')
const {"router":{needLogin}} = baseappConfig //需要登陆的页面
function setRouter() {
	let before_action = e => {
		let res = true
		let token = uni.getStorageSync('uni-id-token')
		if (needLogin.includes(e.url) && token == '') {
			res = false
			console.log('该页面需要登陆，即将跳转到login页面');
		}
		return res
	}
	
	let before_after = e => {
		console.log('跳转之后');
	}

	let actions = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
	actions.forEach(action => {
		let old_action = uni[action]
		uni[action] = e => {
			//console.log(e);
			if (before_action(e)) {
				old_action(e)
				before_after(e)
			}
		}
	})
	uni.reLaunch({
		url: '/pages/grid/grid'
	})
}

// 设备网络状态变化事件
function eventListenerNetwork () {
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