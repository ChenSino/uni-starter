<script>
	import initApp from '@/common/appInit.js';
	export default {
		globalData: {
			searchText: '',
			appVersion:{}
		},
		onLaunch: function() {
			console.log('App Launch')
			initApp();
			//预加载设置页面
			uni.preloadPage({
				url: "/pages/ucenter/settings/settings",
				complete:e=>{
					console.log(e);
				}
			});
			uni.preloadPage({
				url: "uni_modules/uni-login-page/pages/index/index",
				complete:e=>{
					console.log(e);
				}
			});
			// #ifdef APP-PLUS
			//预加载一键登录
				plus.oauth.getServices(oauthServices=>{
					console.log(oauthServices);
					oauthServices.forEach(({_id},item)=>{
						if(_id=='provider'){
							uni.preLogin({
								provider:item,
								complete:e=>{
									console.log(e);
								}
							})
						}
					})
					uni.preloadPage({url: "/uni_modules/uni-login-page/pages/index/index"});
				},err=>{
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
	.border-test{
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
	view,scroll-view,text,
	image,switch,navigator,icons {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}
	scroll-view{
		-webkit-overflow-scrolling: touch;
	}
	/* #endif */
</style>
