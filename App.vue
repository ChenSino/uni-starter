<script>
	import initApp from '@/common/appInit.js';
	export default {
		globalData: {
			searchText: '',
			appVersion:{}
		},
		onLaunch: function() {
			console.log('App Launch')
			// initApp();
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
</style>
