<template>
	<!--
	本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2651
	uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	uni-clientDB 组件文档：https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component
	DB Schema 规范：https://uniapp.dcloud.net.cn/uniCloud/schema
	 -->
	<view style="overflow: hidden;">
		<view class="search-box">
			<!-- #ifdef APP-PLUS -->
			<status-bar class="status-bar"></status-bar>
			<!-- #endif -->
			<view class="search-container-bar">
				<uni-search-bar ref="searchBar" style="flex:1;" radius="100" v-model="searchText" @click.native="searchClick" cancelButton="none" disabled />
			</view>
		</view>
		<view class="list">
			<!-- #ifdef APP-PLUS -->
			<status-bar></status-bar>
			<!-- #endif -->
			<!-- 刷新页面后的顶部提示框 -->
			<!-- 当前弹出内容没有实际逻辑 ，可根据当前业务修改弹出提示 -->
			<view class="tips" :class="{ 'tips-ani': tipShow }">为您更新了10条内容</view>
			<!-- 页面分类标题 -->
			<uni-section style="margin:0;" v-if="searchText" :title="listTitle" type="line"></uni-section>
			<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="formData"
				:collection="collection" :field="field" :foreignKey="foreignKey" :where="where" @load="load" @error="isLoading = false">
				<text v-if="error" class="list-info">{{error.message}}</text>
				<!-- 基于 uni-list 的页面布局 -->
				<uni-list :class="{ 'uni-list--waterfall': options.waterfall }">
					<!-- 通过 uni-list--waterfall 类决定页面布局方向 -->
					<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
					<uni-list-item :border="!options.waterfall" :to="'./detail?id='+item._id+'&title='+item.title" class="uni-list-item--waterfall" title="自定义列表"
						v-for="item in data" :key="item._id">
						<!-- 通过header插槽定义列表左侧图片 -->
						<template v-slot:header>
							<view class="uni-thumb shop-picture" :class="{ 'shop-picture-column': options.waterfall }">
								<image :src="item.avatar" mode="aspectFill"></image>
							</view>
						</template>
						<!-- 通过body插槽定义布局 -->
						<view slot="body" class="shop">
							<view>
								<view class="uni-title">
									<text class="uni-ellipsis-2">{{ item.title }}</text>
								</view>
							</view>
							<view>
								<view class="uni-note ellipsis">
									<text class="uni-ellipsis-1">{{ item.author[0].username }}</text>
									<text>{{ item.comment_count }}评论</text>
									<uni-dateformat :date="item.last_modify_date" format="yyyy-MM-dd" :threshold="[60000, 2592000000]"/>
								</view>
							</view>
						</view>
					</uni-list-item>
				</uni-list>
				<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
				<uni-load-more v-if="!error && (loading || options.status === 'noMore') " :status="options.status" />
				<uni-nodata v-if="data.length == 0" :isLoading="isLoading" @retry="refresh"></uni-nodata>
			</unicloud-db>
		</view>
	</view>
</template>

<script>
	import statusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue';
	export default {
		components:{
			statusBar
		},
		props:{
			currentText:{
				type:String,
				default:''
			},
			canSearch:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				searchText: this.currentText || '',
				formData: {
					waterfall: false, // 布局方向切换
					status: 'loading', // 加载状态
				},
				where: '',
				// 数据表名
				collection: 'opendb-news-articles,uni-id-users',
				// 查询字段，多个字段用 , 分割
				foreignKey: '',
				field: 'author{username, _id}, _id,avatar,title,excerpt,last_modify_date, comment_count, like_count',
				tipShow: false ,// 是否显示顶部提示框
				isLoading:true
			};
		},
		/**
		 * 作为页面出现时的生命周期
		 */
		onShow(options) {
			this.searchText = getApp().globalData.searchText;
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.refresh();
		},
		onReachBottom() {
			this.loadMore();
		},
		methods: {
			/**
			 * 切换列表布局方向
			 */
			select() {
				this.formData.waterfall = !this.formData.waterfall;
			},
			/**
			 * 下拉刷新回调函数
			 */
			refresh() {
				this.tipShow = true
				this.formData.status = 'more'
				this.isLoading = true
				this.$refs.udb.loadData({
					clear: true
				}, () => {
					this.tipShow = false
					this.isLoading = false
					uni.stopPullDownRefresh()
				})
			},
			/**
			 * 上拉加载回调函数
			 */
			loadMore() {
				this.$refs.udb.loadMore()
			},
			load(data, ended) {
				this.isLoading = false
				if (ended) {
					this.formData.status = 'noMore'
				}
			},
			searchClick() {
				uni.hideKeyboard();
				
				
				if(this.canSearch){
					uni.navigateTo({
						url: '/pages/list/search/search',
						animationType: 'fade-in'
					});
				}else {
					uni.navigateBack();
				}
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
		margin-top: 52px;

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
	
	.search-box{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}

	.search-container-bar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 750rpx;
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
