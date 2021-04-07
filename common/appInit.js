import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
export default function (){
	
	// 初始化appVersion
	initAppVersion();
	
	// 检查更新
	checkUpdate();
	
	keepScreenOn();
}

/**
 * 保持屏幕常亮
 */
function keepScreenOn(){
	//#ifdef APP-PLUS
	// 保持屏幕常亮
	uni.setKeepScreenOn({
	    keepScreenOn: true
	});
	//#endif
}
/**
 * // 初始化appVersion
 */
function initAppVersion(){
	// #ifdef APP-NVUE
	let appid = plus.runtime.appid;
	plus.runtime.getProperty(appid ,(wgtInfo) => {
		 wgtInfo.version 
		 let appVersion = plus.runtime;
		 getApp({allowDefault: true}).appVersion = {
			 appid,
			 version:appVersion,
			 wgtVersion:wgtInfo,
			 finall:appVersion.versionCode > wgtInfo.versionCode ? appVersion : wgtInfo
		 }
	});
	// #endif
}