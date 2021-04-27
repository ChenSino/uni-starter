<template>
	<view class="warp">
		<!-- 搜索 -->
		<template>
			<!-- #ifdef APP-PLUS -->
			<status-bar />
			<!-- #endif -->
			<uni-search-bar ref="searchBar" style="flex:1;" radius="100" @click.native="searchClick" cancelButton="none"
				disabled />
		</template>
		<!-- banner -->
		<unicloud-db ref="bannerdb" v-slot:default="{data, loading, error, options}" collection="opendb-banner"
			:field="field" @load="load">
			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="data || bannerFormate(data, loading)"
				:current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="changeSwiper" :current="swiperDotIndex">
					<swiper-item v-for="(item, index) in (data || bannerFormate(data, loading))" :key="item._id">
						<view :draggable="false" class="swiper-item" @click="clickBannerItem(item)">
							<image class="swiper-image" :src="item.bannerfile" mode="aspectFill" :draggable="false" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</unicloud-db>
		<!-- 宫格 -->
		<uni-section title="宫格组件" style="margin: 0;" type="line"></uni-section>
		<view class="example-body">
			<uni-grid :column="3" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import statusBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar";
	export default {
		components: { statusBar },
		data() {
			return {
				list: [{
						url: '/static/grid/c1.png',
						text: 'Grid 1',
						badge: '0',
						type: "primary"
					},
					{
						url: '/static/grid/c2.png',
						text: 'Grid 2',
						badge: '1',
						type: "success"
					},
					{
						url: '/static/grid/c3.png',
						text: 'Grid 3',
						badge: '99',
						type: "warning"
					},
					{
						url: '/static/grid/c4.png',
						text: 'Grid 4',
						badge: '2',
						type: "error"
					},
					{
						url: '/static/grid/c5.png',
						text: 'Grid 5'
					},
					{
						url: '/static/grid/c6.png',
						text: 'Grid 6'
					},
					{
						url: '/static/grid/c7.png',
						text: 'Grid 7'
					},
					{
						url: '/static/grid/c8.png',
						text: 'Grid 8'
					},
					{
						url: '/static/grid/c9.png',
						text: 'Grid 9'
					}
				],
				// 查询字段，多个字段用 , 分割
				field: '_id,bannerfile,open_url,title',
				where: 'category_id==grid',
				// info: [],
				dotStyle: [{
						backgroundColor: 'rgba(0, 0, 0, .3)',
						border: '1px rgba(0, 0, 0, .3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
						selectedBorder: '1px rgba(0, 0, 0, .9) solid'
					},
					{
						backgroundColor: 'rgba(255, 90, 95,0.3)',
						border: '1px rgba(255, 90, 95,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
						selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
					},
					{
						backgroundColor: 'rgba(83, 200, 249,0.3)',
						border: '1px rgba(83, 200, 249,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
						selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
					}
				],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'default',
				dotsStyles: {},
				swiperDotIndex: 0,
				
				isLoading:true
			}
		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail
				this.list[index].badge && this.list[index].badge++

				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
			},
			searchClick() {
				uni.hideKeyboard();
				uni.navigateTo({
					url: '/pages/list/search/search',
					animationType: 'fade-in'
				});
			},
			/**
			 * banner加载后触发的回调
			 */
			load(data) {
				
			},
			changeSwiper(e) {
				this.current = e.detail.current
			},
			selectStyle(index) {
				this.dotsStyles = this.dotStyle[index]
				this.styleIndex = index
			},
			selectMode(mode, index) {
				this.mode = mode
				this.modeIndex = index
				this.styleIndex = -1
				this.dotsStyles = this.dotStyle[0]
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			/**
			 * 点击banner的处理
			 */
			clickBannerItem(item) {
				// 有外部链接-跳转url
				if (item.open_url) {
					uni.navigateTo({
						url: '/pages/common/webview/webview?url='+item.open_url+'&title='+item.title,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				// 其余业务处理
			},
			/**
			 * banner数据过滤
			 */
			bannerFormate(bannerList, loading) {
				if (loading) return [];
				if (bannerList.length > 0) return bannerList;
				// 无数据添加默认值
				let list = [{
					"_id": -1,
					"bannerfile": "/static/grid/empty.png",
					"open_url": "https://www.dcloud.io/",
					"title": "内容 A",
				}]
				return list;
			}
		}
	}
</script>

<style>
	@charset "UTF-8";
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	
	/* #ifdef APP-NVUE */
	.warp{
		background-color: #fff;
	}
	/* #endif */

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.image {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.swiper-image {
		width: 750rpx;
		height: 400rpx;
	}

	.swiper-box {
		height: 400rpx;
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
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
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
</style>
