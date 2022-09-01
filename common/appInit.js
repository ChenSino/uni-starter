import uniStarterConfig from '@/uni-starter.config.js';
//应用初始化页
// #ifdef APP-PLUS
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';

// 实现，路由拦截。当应用无访问摄像头/相册权限，引导跳到设置界面
import interceptorChooseImage from '@/uni_modules/json-interceptor-chooseImage/js_sdk/main.js';
interceptorChooseImage()

// #endif
const db = uniCloud.database()
export default async function() {
	const debug = uniStarterConfig.debug;

	// uniStarterConfig挂载到getApp().globalData.config
	setTimeout(() => {
		getApp({
			allowDefault: true
		}).globalData.config = uniStarterConfig;
	}, 1)


	// 初始化appVersion（仅app生效）
	initAppVersion();

	//clientDB的错误提示
	function onDBError({
		code, // 错误码详见https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=returnvalue
		message
	}) {
		console.log('onDBError', {
			code,
			message
		});
		// 处理错误
		console.error(code, message);
	}
	// 绑定clientDB错误事件
	db.on('error', onDBError)


	//拦截云对象请求
	uniCloud.interceptObject({
		async invoke({
			objectName, // 云对象名称
			methodName, // 云对象的方法名称
			params // 参数列表
		}) {
			console.log('interceptObject',{
				objectName, // 云对象名称
				methodName, // 云对象的方法名称
				params // 参数列表
			});
			if(objectName == "uni-id-co" && (methodName.includes('loginBy') ||  ['login','registerUser'].includes(methodName) )){
				console.log('执行登录相关云对象');
				params[0].inviteCode = await new Promise((callBack) => {
					uni.getClipboardData({
						success: function(res) {
							console.log('剪切板内容：'+res.data);
							if (res.data.slice(0, 18) == 'uniInvitationCode:') {
								let uniInvitationCode = res.data.slice(18, 38)
								console.log('当前用户是其他用户推荐下载的,推荐者的code是：' +
									uniInvitationCode);
								// uni.showModal({
								// 	content: '当前用户是其他用户推荐下载的,推荐者的code是：'+uniInvitationCode,
								// 	showCancel: false
								// });
								callBack(uniInvitationCode)
								//当前用户是其他用户推荐下载的。这里登记他的推荐者id 为当前用户的myInviteCode。判断如果是注册
							} else {
								callBack(false)
							}
						},
						fail() {
							console.log('error--');
							callBack(false)
						},
						complete() {
							// #ifdef MP-WEIXIN
							uni.hideToast()
							// #endif
						}
					});
				})
				console.log(7897897897899,params);
			}
			console.log(params);
		},
		success(e) {
			console.log(e);
		},
		complete() {

		},
		fail(e){
			if (debug) {
				uni.showModal({
					content: JSON.stringify(e),
					showCancel: false
				});
				console.error(e);
			}
		}
	})


	// #ifdef APP-PLUS
	// 监听并提示设备网络状态变化
	uni.onNetworkStatusChange(res => {
		console.log(res.isConnected);
		console.log(res.networkType);
		if (res.networkType != 'none') {
			uni.showToast({
				title: '当前网络类型：' + res.networkType,
				icon: 'none',
				duration: 3000
			})
		} else {
			uni.showToast({
				title: '网络类型：' + res.networkType,
				icon: 'none',
				duration: 3000
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
	// #endif
}

async function getDeviceInfo() {
	let deviceInfo = {
		"uuid": '',
		"vendor": '',
		"push_clientid": '',
		"imei": '',
		"oaid": '',
		"idfa": '',
		"model": '',
		"platform": '',
	}
	const {
		model,
		platform,
	} = uni.getSystemInfoSync();
	Object.assign(deviceInfo, {
		model,
		platform
	});

	// #ifdef APP-PLUS
	const oaid = await new Promise((callBack, fail) => {
			if (deviceInfo.platform == "android") {
				plus.device.getOAID({
					success: function(e) {
						callBack(e.oaid)
						// console.log('getOAID success: '+JSON.stringify(e));
					},
					fail: function(e) {
						callBack()
						console.log('getOAID failed: ' + JSON.stringify(e));
					}
				});
			} else {
				callBack()
			}
		}),
		{
			imei,
			uuid
		} = await new Promise((callBack, fail) => {
			plus.device.getInfo({
				success: function(e) {
					callBack(e)
					// console.log('getOAID success: '+JSON.stringify(e));
				},
				fail: function(e) {
					callBack()
					console.log('getOAID failed: ' + JSON.stringify(e));
				}
			});
		}),
		idfa = plus.storage.getItem('idfa') || '', //idfa有需要的用户在应用首次启动时自己获取存储到storage中
		vendor = plus.device.vendor;
	try {
		deviceInfo.push_clientid = plus.push.getClientInfo().clientid
	} catch (e) {
		uni.showModal({
			content: '获取推送标识失败。如果你的应用不需要推送功能，请注释掉本代码块',
			showCancel: false,
			confirmText: "好的"
		});
		console.log(e)
	}
	Object.assign(deviceInfo, {
		imei,
		uuid,
		idfa,
		vendor
	});
	// #endif
	return deviceInfo
}
