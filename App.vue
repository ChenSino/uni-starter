<script>
	export default {
		globalData: {
			searchText: ''
		},
		onLaunch: function() {
			//#ifdef APP-PLUS
			// 保持屏幕常亮
			uni.setKeepScreenOn({
			    keepScreenOn: true
			});
			//#endif
			console.log('App Launch')
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
</style>
