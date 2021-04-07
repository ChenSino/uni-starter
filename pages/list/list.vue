<template>
	<view style="overflow: hidden;">
		<!-- 搜索栏 -->
		<news-search-title></news-search-title>
		<!-- 页面主列表 -->
		<news-list ref="newsList" :searchText="searchText"></news-list>
	</view>
</template>

<script>
	import newsList from './news-list.vue';
	import newsSearchTitle from './news-search-title.vue';
	export default {
		components:{
			newsList,
			newsSearchTitle
		},
		data() {
			return {
				searchText: '',
				formData: {
					waterfall: false, // 布局方向切换
					status: 'loading', // 加载状态
				},
			};
		},
		onShow(options) {
			this.searchText = getApp().globalData.searchText;
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			console.log('refresh');
			this.$refs.newsList.refresh();
		},
		methods: {
			/**
			 * 切换商品列表布局方向
			 */
			select() {
				this.formData.waterfall = !this.formData.waterfall;
			},
			/**
			 * 上拉加载回调函数
			 */
			onReachBottom() {
				console.log('load_more');
				this.$refs.newsList.loadMore();
			}
		},
		watch: {
			searchText(value) {
				this.search(value);
			}
		},
		computed: {
			listTitle() {
				if (this.searchText) return '搜索结果';
				return '';
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

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.shop {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.shop-picture {
		width: 110px;
		height: 110px;
	}

	.shop-picture-column {
		width: 100%;
		height: 170px;
		margin-bottom: 10px;
	}
	
	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.uni-note{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}

	// 默认加入 scoped ，所以外面加一层提升权重
	.list {
		// margin-top: 52px;

		.uni-list--waterfall {

			/* #ifndef H5 || APP-VUE */
			// 小程序 编译后会多一层标签，而其他平台没有，所以需要特殊处理一下
			/deep/ .uni-list {
				/* #endif */
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 5px;
				box-sizing: border-box;

				/* #ifdef H5 || APP-VUE */
				// h5 和 app-vue 使用深度选择器，因为默认使用了 scoped ，所以样式会无法穿透
				/deep/
				/* #endif */
				.uni-list-item--waterfall {
					width: 50%;
					box-sizing: border-box;

					.uni-list-item__container {
						padding: 5px;
						flex-direction: column;
					}
				}

				/* #ifndef H5 || APP-VUE */
			}

			/* #endif */
		}
	}

	.search-icons {
		padding: 16rpx;
	}

	.search-container-bar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		// position: fixed;
		// left: 0;
		// right: 0;
		// z-index: 10;
		background-color: #fff;
	}

	/* #ifndef APP-NVUE */
	/deep/
	/* #endif */
	.uni-searchbar__box {
		border-width: 0;
	}

	/* #ifndef APP-NVUE */
	/deep/
	/* #endif */
	.uni-input-placeholder {
		font-size: 28rpx;
	}

	.list-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #808080;
		margin-top: 20rpx;
	}
</style>
