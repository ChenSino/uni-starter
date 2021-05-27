import uniStarterConfig from '@/uni-starter.config.js';
import store from '@/store'
//应用初始化页
// #ifdef APP-PLUS
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
import interceptorChooseImage from '@/uni_modules/json-interceptor-chooseImage/js_sdk/main.js';
// #endif
const db = uniCloud.database()
export default function() {
	
	setTimeout(()=>{
		// uniStarterConfig挂载到getApp().
		const app = getApp({allowDefault: true})
		app.globalData.config = uniStarterConfig;
	},30)
	
	// 初始化appVersion（仅app生效）
	initAppVersion();
	
	// #ifdef APP-PLUS
	// 实现，路由拦截。当应用无访问摄像头/相册权限，引导跳到设置界面
	interceptorChooseImage()
	// #endif


	//clientDB的错误提示
	function onDBError({
		code, // 错误码详见https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=returnvalue
		message
	}) {
		// 处理错误
		console.log(code,message);
		if([
			'TOKEN_INVALID_INVALID_CLIENTID',
			'TOKEN_INVALID',
			'TOKEN_INVALID_TOKEN_EXPIRED',
			'TOKEN_INVALID_WRONG_TOKEN',
			'TOKEN_INVALID_ANONYMOUS_USER',
		].includes(code)){
			uni.navigateTo({
				url:'/pages/ucenter/login-page/index/index'
			})
		}
	}
	// 绑定clientDB错误事件
	db.on('error', onDBError)
	
	// 解绑clientDB错误事件
	//db.off('error', onDBError)

	db.on('refreshToken', function({
		token,
		tokenExpired
	}) {
		console.log('监听到clientDB的refreshToken',{token,tokenExpired});
		store.commit('user/login', {
			token,
			tokenExpired
		})
	})


	const Debug = true;
	//拦截器封装callFunction
	let callFunctionOption;
	uniCloud.addInterceptor('callFunction',{
		invoke(e){
			console.log(JSON.stringify(e));
			callFunctionOption = e
		},
		complete(e){
			// console.log(JSON.stringify(e));
		},
		fail(e) { // 失败回调拦截
			if(Debug){
				console.log(e);
				uni.showModal({
					content: JSON.stringify(e),
					showCancel: false
				});
			}else{
				uni.showModal({
					content: "系统错误请稍后再试！",
					showCancel: false,
					confirmText:"知道了"
				});
			}
			//如果执行错误，检查是否断网
			uni.getNetworkType({
				complete:res => {
					console.log(res);
					if (res.networkType == 'none') {
						uni.showToast({
							title: '手机网络异常',
							icon: 'none'
						});
						console.log('手机网络异常');
						let callBack = res=>{
							console.log(res);
							if (res.isConnected) {
								uni.showToast({
									title: '恢复联网自动重新执行',
									icon: 'none'
								});
								console.log(res.networkType,"恢复联网自动重新执行");
								uni.offNetworkStatusChange(e=>{
									console.log("移除监听成功",e);
								})
								//恢复联网自动重新执行
								uniCloud.callFunction(callFunctionOption)
								uni.offNetworkStatusChange(callBack);
							}
						}
						uni.onNetworkStatusChange(callBack);
					}
				}
			});
		},
		success:(e)=>{
			console.log(e);
			const {token,tokenExpired} = e.result
			if (token && tokenExpired) {
				store.commit('user/login', {
					token,
					tokenExpired
				})
			}
			
			console.log(e.result.code);
			switch (e.result.code){
				case 403:
					uni.showModal({
						content: '未登陆，跳登陆',
						showCancel: false
					});
					break;
				case 50101:
					uni.showToast({
						title: e.result.msg,
						icon: 'none',
						duration:2000
					});
					break;
				default:
					console.log('code的值是：'+e.result.code,'可以在这里插入，自动处理响应体');
					break;
			}
		}
	})

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
				let pages = getCurrentPages();
				if (
					url == '/pages/ucenter/login-page/index/index'
					&&
					pages[pages.length - 1].route.split('/')[2]!='login-page'
				) {
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