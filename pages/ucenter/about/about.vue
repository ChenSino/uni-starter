<template>
	<view class="about">
		<view class="logo">
			<image class="logoImg" src="@/static/logo.png"></image>
			<text class="tip appName">{{about.appName}}</text>
			<text class="tip" style="font-size:24upx;">Version {{version}}</text>
		</view>
		<view class="copyright">
			<template v-for="(agreement,index) in about.agreements">
				<text class="agreement" @click="navigateTo(agreement)">《{{agreement.title}}》</text>
				<text class="hint" v-if="about.agreements.length-1>index">和</text>
			</template>
			<text class="hint">Copyright © {{year}}</text>
			<text class="hint">{{about.company}}</text>
		</view>
	</view>
</template>
<script>
import baseappConfig from '@/baseapp.config.json';
	export default {
		onLoad() {
			// #ifdef APP-PLUS
			this.version = plus.runtime.version
			// #endif
		},
		data() {
			return {
				version:"V1.0.0",
				year:"2020",
				about:{}
			};
		},
		created() {
			this.about = baseappConfig.about
			this.year = (new Date).getFullYear()
		},
		methods:{
			navigateTo({url,title}){
				uni.navigateTo({
					url: '/pages/common/webview/webview?url='+url+'&title='+title,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
.about {
	width: 750upx;
	flex-direction: column;
}
.logo {
	width: 750upx;
	position: fixed;
	left:0;
	top:100px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.logoImg{
	margin-bottom: 10upx;
	width:160upx;
	height:160upx;
	border-radius: 15px;
}
.appName{
	margin-top: 20px;
	margin-bottom:5px;
	font-size:42rpx;
	font-weight: 500;
}
.copyright {
	width: 750upx;
	font-size:32rpx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	bottom:20px;
	left: 0;
	position: fixed;
}
.agreement {
	color:#2285ff;
	font-size:26rpx;
}
.hint {
	color:#999999;
	font-size:26rpx;
}
</style>