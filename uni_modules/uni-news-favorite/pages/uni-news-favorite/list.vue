<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" where="user_id == $env.uid"
			orderby="update_date desc" collection="opendb-news-favorite" @load="isLoading == false" @error="isLoading == false">
			<view v-if="data && data.length">
				<uni-list>
					<uni-list-item v-for="(item, index) in data" :key="index" :clickable="true"
						@click="handleItemClick(item)">
						<view slot="body">
							<text>{{item.article_title || item.article_id}}</text>
							<uni-dateformat class="article-date" :date="item.update_date" format="yyyy-MM-dd hh:mm"
								:threshold="[0, 0]" />
						</view>
					</uni-list-item>
				</uni-list>
			</view>
			<uni-nodata v-else :isLoading="isLoading" @retry="refreshData"></uni-nodata>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: true,
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: '',
				}
			}
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			refreshData() {
				this.$refs.udb.loadData({
					clear: true
				}, (res) => {
					console.log(res);
					uni.stopPullDownRefresh()
				})
			},
			handleItemClick(item) {
				uni.navigateTo({
					url: '/pages/list/detail?id=' + item.article_id + '&title=' + (item.article_title || '')
				})
			}
		}
	}
</script>

<style>
	.article-date {
		color: #C8C7CC;
	}
</style>
