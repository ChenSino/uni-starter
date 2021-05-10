<template>
	<view class="root">
		<checkbox-group @change="setAgree" class="checkbox-group">
			<checkbox  style="transform: scale(0.8);" />
			<text>同意</text>
		</checkbox-group>
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
			},
			setAgree(e){
				this.isAgree = !this.isAgree
				this.$emit('setAgree',this.isAgree)
			}
		},
		data() {
			return {
				isAgree:false
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
.checkbox-group{
	display: flex;
	flex-direction: row;
}
.agreement{
	color:#04498c;
}
</style>
