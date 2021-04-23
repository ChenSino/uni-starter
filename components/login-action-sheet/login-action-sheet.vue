<template>
	<uni-popup ref="actionSheet" type="bottom">
		<view class="action-sheet-box">
			<view class="auth-wrap auth-item" @click="clickItem(item)"
				hover-class="hover" v-for="(item, index) in providerList" :key="index">
				<image :src="item.image" class="login-logo"></image>
				<text class="auth-text">{{providerName[item.value]}}</text>
			</view>
			<view class="cancel-line"></view>
			<view class="auth-wrap cancel-item" @click="clickItem(item)">
				<text class="auth-text">取消</text>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name: "login-action-sheet",
		data() {
			return {
				providerList: [],
				providerName: {
					apple: '苹果登录',
					weixin: '微信登录',
					qq: 'QQ登录',
					sinaweibo: '微博登录'
				}
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
				this.$refs.actionSheet.close();
				if (item) this.$emit('login', item);
			},
			open() {
				this.$refs.actionSheet.open();
			}
		}
	}
</script>

<style scoped>
	.action-sheet-box {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 750rpx;
		background-color: #fff;
	}

	.login-logo {
		width: 42rpx;
		height: 42rpx;
	}
	
	.auth-wrap{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}
	
	.auth-item {
		border-bottom-width: 1px;
		border-bottom-color: #F1F1F1;
		height: 125rpx;
	}

	.cancel-item {
		height: 125rpx;
	}

	.cancel-line {
		width: 750rpx;
		height: 10rpx;
		background-color: #F1F1F1;
	}
	.auth-text{
		padding: 0 10rpx;
		font-size: 28rpx;
	}
</style>
