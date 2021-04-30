<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" where="user_id == $env.uid"
			orderby="last_time desc" collection="read-news-log,opendb-news-articles" @load="isLoading == false" @error="isLoading == false"
			field="article_id.title,article_id._id,last_time" :page-size="10">
			<view v-if="data && data.length">
				<uni-list>
					<uni-list-item v-for="(item, index) in data" :key="index" :clickable="true"
						@click="handleItemClick(item)">
						<view slot="body">
							<text>{{item.article_id[0].title}}</text>
							<uni-dateformat class="article-date" :date="item.last_time" format="yyyy-MM-dd hh:mm"
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
					url: '/pages/list/detail?id=' + item.article_id[0]._id + '&title=' + item.article_id[0].title
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
