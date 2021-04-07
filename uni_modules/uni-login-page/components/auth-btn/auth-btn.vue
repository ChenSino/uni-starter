<template>
	<view class="flex flex-row justify-center align-center flex-wrap auth-box">
		<!-- <image :src="item.image" v-for="(item, index) in providerList" :key="item.value" @click="clickItem" class="auth-logo hidden"></image> -->
		<image ref="logo" :src="item.image" v-for="(item, index) in providerList" :key="item.value" @click="clickItem"
			class="auth-logo auth-logo-shadow hidden"></image>
		<view ref="more" class="flex justify-center align-center auth-more" @click="startAnimation">
			<text class="font-bolder font-50">···</text>
		</view>
	</view>
</template>

<script>
	const animation = uni.requireNativePlugin('animation')
	export default {
		name: "auth-btn",
		data() {
			return {
				providerList: [],
			};
		},
		created() {
			this.initProvider();
			this.testInit();
		},
		methods: {
			/**
			 * 测试方法
			 */
			testInit() {
				const filters = ['apple', 'weixin', 'qq', 'sinaweibo'];
				this.providerList = [];
				filters.forEach(curProvider => {
					this.providerList.push({
						value: curProvider,
						image: '../../static/login/img/' + curProvider + '.png'
					});
				})

			},
			/**
			 * 初始化第三方登录
			 */
			initProvider() {
				return
				const filters = ['apple', 'weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							if (res.provider.indexOf('apple') !== -1) {
								this.hasAppleLogin = true;
							}
							for (let i = 0; i < res.provider.length; i++) {
								const curProvider = res.provider[i];
								if (~filters.indexOf(curProvider)) {
									this.providerList.push({
										value: curProvider,
										image: '/components/auth-btn/img/' + curProvider + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			clickItem(item) {
				this.$emit('login', item)
			},
			// 开始动画
			startAnimation() {
				let more = this.$refs.more;
				animation.transition(more, {
					styles: {
						opacity: '0'
					},
					duration: 100, //ms
					timingFunction: 'linear',
					delay: 0 //ms
				}, () => {});
				let logo = this.$refs.logo;
				
				let logo_w = uni.upx2px(parseInt(logo[0].style.width));
				let logo_m = logo_w/6;
				let logo_l = logo.length;
				let logo_c = (logo_l - 1)/2;
				logo.forEach((item, index)=>{
					let translateX = (logo_w + logo_m) * (index - logo_c);
					animation.transition(item, {
						styles: {
							opacity: '1',
							transform:`translateX(${translateX}px)`
						},
						duration: 200, //ms
						timingFunction: 'linear',
						delay: 100 //ms
					}, () => {});
				})
			}
		}
	}
</script>

<style>
	@import url("../../common/myStyle.css");
	.auth-logo {
		width: 84rpx;
		height: 84rpx;
	}

	.hidden {
		opacity: 0;
	}

	.auth-box {
		position: relative;
		height: 84rpx;
		width: 750rpx;
	}

	.auth-logo-shadow {
		position: absolute;
	}

	.auth-more {
		position: absolute;
		width: 84rpx;
		height: 84rpx;
		border-radius: 45rpx;
		border-width: 2rpx;
		border-color: #000000;
	}
</style>
