import uniStarterConfig from '@/uni-starter.config.js';
//应用初始化页
// #ifdef APP-PLUS
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
// #endif
export default function() {
	
	setTimeout(()=>{
		// uniStarterConfig挂载到getApp().
		const app = getApp({allowDefault: true})
		app.globalData.config = uniStarterConfig;
	},30)
	
	// 初始化appVersion（仅app生效）
	initAppVersion();
	/*
		这里应用了[拦截器](https://uniapp.dcloud.io/api/interceptor?id=addinterceptor)实现了，路由拦截。当应用无访问摄像头/相册权限，引导跳到设置界面
	*/
	//自定义路由拦截
	const {"router": {needLogin,login} } = uniStarterConfig //需要登录的页面
	let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
	list.forEach(item => { //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
		uni.addInterceptor(item, {
			invoke(e) { // 调用前拦截
				//获取用户的token
				const token = uni.getStorageSync('uni_id_token')
				//获取当前页面路径（即url去掉"?"和"?"后的参数）
				const url = e.url.split('?')[0]
				//控制登录优先级
				if (url == '/pages/ucenter/login-page/index/index') {
					//一键登录（univerify）、账号（username）、验证码登录（短信smsCode）
					if (login[0] == 'univerify') {
						if(e.url == url) { e.url += '?' } //添加参数之前判断是否带了`？`号如果没有就补上，因为当开发场景本身有参数的情况下是已经带了`？`号
						e.url += "univerify_first=true"
					} else if (login[0] == 'username') {
						e.url = "/pages/ucenter/login-page/pwd-login/pwd-login"
					}
				}else{
					//拦截强制登录页面
					if (needLogin.includes(url) && token == '') {
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
						return uni.navigateTo({
							url: "/pages/ucenter/login-page/index/index"
						})
					}
				}
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
			if(uni.getSystemInfoSync().platform == "android" && e.errMsg == 'chooseImage:fail No Permission'){
				if(e.code === 11){
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
				}else{
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
		}
	})
	
// #ifdef APP-PLUS
// 监听并提示设备网络状态变化
	uni.onNetworkStatusChange(res=> {
	    console.log(res.isConnected);
	    console.log(res.networkType);
		if(res.networkType!='none'){
			uni.showToast({
				title:'当前网络类型：'+res.networkType,
				icon:'none',
				duration:3000
			})
		}else{
			uni.showToast({
				title:'网络类型：'+res.networkType,
				icon:'none',
				duration:3000
			})
		}
	});
// #endif

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
			// console.log('检查是否有可以更新的版本', res);
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