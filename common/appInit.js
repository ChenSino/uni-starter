//应用初始化页
import baseappConfig from '@/baseapp.config.js';
// #ifdef APP-PLUS
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
// #endif
export default function() {
	// 初始化appVersion（仅app生效）
	initAppVersion();

	// baseappConfig挂载到getApp().
	getApp({allowDefault: true}).globalData.config = baseappConfig;
	
	/*
		这里应用拦截器实现了，路由拦截。当应用无访问摄像头/相册权限，引导跳到设置界面
		1.添加拦截器说明如下：
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
			})
		2.移除拦截器API removeInterceptor('request')
	*/
	//自定义路由拦截
	const {
		"router": {
			needLogin,
			login
		}
	} = baseappConfig //需要登陆的页面
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
						url: "/pages/ucenter/login-page/index/index"
					})
					return false
				}
				//控制登陆优先级
				if (url == '/pages/ucenter/login-page/index/index') {
					//一键登录（uniVerify）、账号（username）、验证码登陆（短信smsCode）
					if (login[0] == 'uniVerify') {
						// console.log(e.url,url);
						if (e.url == url) {
							e.url += '?'
						}
						e.url += "univerify_first=true"
					} else if (login[0] == 'username') {
						e.url = "/pages/ucenter/login-page/pwd-login/pwd-login"
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
				e.errCode === 11 && uni.getSystemInfoSync().platform == "android" ||
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
			showNetworkErrPage()
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