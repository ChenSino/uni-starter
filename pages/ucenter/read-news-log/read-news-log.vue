<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :where="udbWhere"
			collection="opendb-news-articles" @load="isLoading == false" @error="isLoading == false"
			field="title,_id" :page-size="10">
			<view v-if="data && data.length">
				<uni-list>
					<uni-list-item v-for="(item, index) in data" :key="index" :clickable="true"
						@click="handleItemClick(item)">
						<view slot="body">
							<text>{{item.title}}</text>
							<uni-dateformat class="article-date" :date="readNewsLog[index].last_time" format="yyyy-MM-dd hh:mm"
								:threshold="[0, 0]" />
						</view>
					</uni-list-item>
				</uni-list>
			</view>
			<view v-else>
				<uni-load-more v-if="!loading" status="noMore"></uni-load-more>
			</view>
			<uni-load-more v-if="data.length>10" :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
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
				},
				readNewsLog:[],
				udbWhere:''
			}
		},
		onLoad() {
			this.readNewsLog = uni.getStorageSync('readNewsLog')||[];
			let readNewsLogIds = this.readNewsLog.map(({article_id})=>article_id)
			console.log(typeof readNewsLogIds,readNewsLogIds);
			this.udbWhere = `"_id" in ${JSON.stringify(readNewsLogIds)}`
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
					url: '/pages/list/detail?id=' + item._id + '&title=' + item.title
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
