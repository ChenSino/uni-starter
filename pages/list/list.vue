<template>
	<view style="overflow: hidden;">
		<!-- 页面主列表 -->
		<news-list ref="newsList" :canSearch="canSearch" :currentText="searchText"></news-list>
		
		<uni-agree></uni-agree>
	</view>
</template>

<script>
	import newsList from './news-list.vue';
	export default {
		components:{
			newsList
		},
		data() {
			return {
				searchText: '',
				canSearch:true
			};
		},
		onShow(options) {
			this.searchText = getApp().globalData.searchText;
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.$refs.newsList.refresh();
		},
		methods: {
			/**
			 * 切换商品列表布局方向（未实现）
			 */
			select() {
				this.formData.waterfall = !this.formData.waterfall;
			},
			/**
			 * 上拉加载回调函数
			 */
			onReachBottom() {
				this.$refs.newsList.loadMore();
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/common/uni-ui.scss';
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
</style>
