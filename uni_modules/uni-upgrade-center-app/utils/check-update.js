// 推荐再App.vue中使用
const PACKAGE_INFO_KEY = '__package_info__'

export default function() {
	// #ifdef APP-PLUS
	
	
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		uniCloud.callFunction({
			name: 'check-version',
			data: {
				appid: plus.runtime.appid,
				appVersion: plus.runtime.version,
				wgtVersion: widgetInfo.version
			},
			success: (e) => {
				if (!e.result) return;
				const {
					code,
					message,
					is_silently, // 是否静默更新
					url, // 安装包下载地址
					platform, // 安装包平台
					type // 安装包类型
				} = e.result;
				// 此处逻辑仅为实例，可自行编写
				if (code > 0) {
					// 静默更新，只有wgt有
					if (is_silently) {
						downloadTask = uni.downloadFile({
							url: this.url,
							success: res => {
								if (res.statusCode == 200) {
									// 下载好直接安装，下次启动生效
									plus.runtime.install(res.tempFilePath, {
										force: false
									});
								}
							}
						});
						return;
					}
					
					if (type === 'native_app' && platform.includes('iOS')) {
						// iOS 跳转 AppStore 商店
						plus.runtime.openURL(url);
						return;
					}

					uni.setStorageSync(PACKAGE_INFO_KEY, e.result)

					// 跳转更新页面
					uni.navigateTo({
						url: '/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=' +
							PACKAGE_INFO_KEY,
						fail: (err) => {
							console.error('更新弹框跳转失败', err)
							uni.removeStorageSync(PACKAGE_INFO_KEY)
						}
					})
				} else if (code < 0) {
					// TODO 云函数报错处理
					console.error(message)
				}
			},
			fail: (err) => {
				// TODO 云函数报错处理
				console.error(err.message)
			}
		})
	});
	// #endif
}
