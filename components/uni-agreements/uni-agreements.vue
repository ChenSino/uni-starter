<template>
	<view class="root">
		<text>登陆即表示同意</text>
		<template v-for="(agreement,index) in agreements">
			<text class="agreement" @click="navigateTo(agreement)">{{agreement.title}}</text>
			<text class="hint" v-if="hasAnd(agreements,index)">和</text>
		</template>
	</view>
</template>

<script>
	export default {
		name:"uni-agreements",
		computed:{
			agreements(){
				return getApp().globalData.config.about.agreements||[]
			}
		},
		methods:{
			navigateTo({url,title}){
				uni.navigateTo({
					url: '/pages/common/webview/webview?url='+url+'&title='+title,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			hasAnd(agreements,index){
				return agreements.length-1>index
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.root{
	flex-direction: row;
	font-size: 28rpx;
	color: #8a8f8b;
}
.agreement{
	color:#04498c;
}
</style>
