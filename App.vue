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

			// #ifdef APP-PLUS
			//一键登录 功能预登录
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
