<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad({url,title}) {
			if(url.substring(0, 4) != 'http'){
				return uni.showModal({
					title:"错误",
					content: '不是一个有效的网站链接,'+'"'+url+'"',
					showCancel: false,
					confirmText:"知道了",
					complete: () => {
						uni.navigateBack()
					}
				});
				
			}
			console.log(url,title);
			this.url = url;
			if(title){
				uni.setNavigationBarTitle({title});
			}
		},
		data() {
			return {
				url:null
			};
		}
	}
</script>

<style lang="scss">

</style>
