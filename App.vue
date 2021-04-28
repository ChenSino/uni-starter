<script>
	import initApp from '@/common/appInit.js';
	import checkIsAgree from '@/uni_modules/uni-agree/utils/uni-agree.js';
	export default {
		globalData: {
			searchText: '',
			appVersion: {},
			config:{}
		},
		onLaunch: function() {
			console.log('App Launch')
			initApp();
			// #ifdef APP-PLUS
			//checkIsAgree(); 暂时先用默认生成的，自定义的等待原生支持后实现。因为启动vue界面时已经，请求了部分权限这并不符合国家的法规
			// #endif

			//#ifdef APP-NVUE || H5
			//预加载设置页面
			uni.preloadPage({
				url: "/pages/ucenter/settings/settings",
				complete: e => {
					// console.log(e);
				}
			});
			//#endif
			// #ifdef APP-PLUS
			//预加载一键登录
			plus.oauth.getServices(oauthServices => {
				// console.log(oauthServices);
				oauthServices.forEach(({
					_id
				}, item) => {
					if (_id == 'provider') {
						uni.preLogin({
							provider: item,
							complete: e => {
								console.log(e);
							}
						})
					}
				})
				uni.preloadPage({
					url: "/pages/ucenter/login-page/index/index"
				});
			}, err => {
				console.error('获取服务供应商失败：' + JSON.stringify(err));
			})
			// #endif

			//clientDB的错误提示
			const db = uniCloud.database()
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
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.border-test {
		/* #ifdef APP-NVUE */
		border-width: 1rpx;
		border-color: #DD524D;
		/* #endif */
		/* #ifndef APP-NVUE */
		border: 1px solid #DD524D;
		box-sizing: border-box;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	view,
	scroll-view,
	text,
	image,
	switch,
	navigator,
	icons {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}
	scroll-view {
		-webkit-overflow-scrolling: touch;
	}
	/* #endif */
</style>
