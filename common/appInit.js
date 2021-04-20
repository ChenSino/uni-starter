import baseappConfig from '@/baseapp.config.js';
// #ifdef APP-PLUS
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
// #endif
export default function() {

	// 初始化appVersion
	initAppVersion();

	//自定义路由拦截
	const {"router":{needLogin,login}} = baseappConfig //需要登陆的页面
	
	// changeAction(["navigateTo", "redirectTo", "reLaunch", "switchTab"], {
	// 	before_action: e => {
	// 		let token = uni.getStorageSync('uni-id-token')
	// 		let url = e.url.split('?')[0]
	// 		if (needLogin.includes(url) && token == '') {
	// 			console.log('该页面需要登陆，即将跳转到login页面');
	// 			uni.showToast({title:'该页面需要登陆，即将跳转到login页面',icon:'none'})
	// 			uni.navigateTo({
	// 				url:"/uni_modules/uni-login-page/pages/index/index"
	// 			})
	// 			return false
	// 		}
	// 		return true
	// 	}
	// })
	
	//uni.addInterceptor的写法
	
	let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
	list.forEach(item=>{
		uni.addInterceptor(item,{
			invoke(e){// 调用前拦截
				//console.log(e);
				const token = uni.getStorageSync('uni_id_token')
				// console.log(token);
				const url = e.url.split('?')[0]
				//拦截强制登陆页面
				if (needLogin.includes(url) && token == '') {
					console.log('该页面需要登陆，即将跳转到login页面');
					uni.showToast({title:'该页面需要登陆，即将跳转到login页面',icon:'none'})
					uni.navigateTo({
						url:"/uni_modules/uni-login-page/pages/index/index"
					})
					return false
				}
				//控制登陆优先级
				if(url=='/uni_modules/uni-login-page/pages/index/index'){
					//一键登录（univerify）、密码登陆（username）、快捷登录&验证码登陆（!univerify&password）
					if(login[0]=='univerify'){
						// console.log(e.url,url);
						if(e.url==url){ e.url+= '?' }
						e.url += "univerify_first=true"
					}else if(login[0]=='username'){
						e.url = "/uni_modules/uni-login-page/pages/pwd-login/pwd-login"
					}else{
						//默认即是
					}
				}
				return true
			},
			success(){	// 成功回调拦截 
				
			},
			fail(err){		// 失败回调拦截 
				console.log(err);
			},
			complete(e){	// 完成回调拦截 
				//console.log(e);
			},
			returnValue(){// 返回结果拦截 
				
			}
		})// 移除拦截器API removeInterceptor('request')
	})
	
	
	//提示网络变化
	eventListenerNetwork()
	
	
	/*
		当某个权限调用失败
		1.先检测手机的该模块是否打开
		2.检测当前应用是否被授权了该模块对应的权限
		提示，并点击跳转到设置
	*/
   // #ifndef H5
   // changeAction('chooseImage', {
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
			hasNew:false
		}
		// 检查更新小红点
		callCheckVersion().then(res=>{
			console.log('检查是否有可以更新的版本',res);
			if(res.result.code>0){
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


function changeAction(actions, {before_action,after_action}) {
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
			//	console.log(after_action);
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
}