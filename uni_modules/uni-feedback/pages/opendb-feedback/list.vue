<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" collection="opendb-feedback"
			field="content, title" where="is_reply == false" @load="isLoading == false" @error="isLoading == false">
			<view v-if="data && data.length">
				<uni-collapse :accordion="true">
					<uni-collapse-item v-for="(item, index) in data" :key="index" :title="item.title" :show-animation="true">
						<text class="content">{{ item.content }}</text>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</unicloud-db>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoading:true,
			}
		},
		methods: {
			refreshData() {
				this.$refs.udb.loadData({
					clear: true
				}, (res) => {
					console.log(res);
				})
			},
			fabClick() {
				// 打开新增页面
				uni.navigateTo({
					url: './add',
					events: {
						// 监听新增数据成功后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.content{
		padding: 20rpx;
	}
</style>
