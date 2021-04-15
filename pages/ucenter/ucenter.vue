<template>
	<view class="center">
		<view class="userInfo" @click="toSettings">
			<image class="logo-img" :src="login ? (userInfo.avatar || avatarUrl) :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">{{login ? userInfo.username||userInfo.mobile : '未登录'}}</text>
				<text class="go-login-navigat-arrow navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
		<uni-grid class="grid" :column="5" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-for="({text,icon},index) in gridList" @click.native="tapGrid(index)">
				<uni-icons class="icon" color="#5d5e64" :type="icon" size="28"></uni-icons>
				<text class="text">{{text}}</text>
			</uni-grid-item>
		</uni-grid>
		<uni-list class="center-list" v-for="(sublist , index) in ucenterList">
			<uni-list-item v-for="item in sublist" :title="item.title" link :rightText="item.rightText"
				:clickable="true" :to="item.to" @click="ucenterListClick(item)">
				<view v-if="item.showBadge" class="item-footer" slot="footer">
					<text class="item-footer-text">{{item.rightText}}</text>
					<view class="item-footer-badge"></view>
				</view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	export default {
		data() {
			return {
				avatarUrl: '/static/uni-center/logo.png',
				gridList: [{
						"text": "文字1",
						"icon": "chat"
					},
					{
						"text": "文字2",
						"icon": "cloud-upload"
					},
					{
						"text": "文字3",
						"icon": "contact"
					},
					{
						"text": "文字4",
						"icon": "download"
					},
					{
						"text": "文字5",
						"icon": "paperplane"
					}
				],
				ucenterList: [
					[{
						title: '阅读过的文章',
						to: ''
					}, {
						title: '我的积分',
						to: ''
					}],
					[
						//#ifdef APP-PLUS
						{
							title: '检查更新',
							rightText: `V${getApp().appVersion.version}_${getApp().appVersion.versionCode}`,
							event: 'checkVersion',
							showBadge: true
						},
						//#endif
						{
							title: '反馈',
							to: '/uni_modules/opendb-feedback/pages/opendb-feedback/list' // /pages/ucenter/uni-feedback/uni-feedback uni_modules/opendb-feedback/pages/opendb-feedback/list
						},{
							title: '关于',
							to: '/pages/ucenter/about/about'
						}
					]
				]
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				login: 'user/hasLogin'
			})
		},
		onReady() {

		},
		methods: {
			...mapMutations({
				logout: 'user/logout'
			}),
			toSettings(){
				uni.navigateTo({
					url:"/pages/ucenter/settings/settings"
				})
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				if (!item.to && item.event) {
					this[item.event]();
				}
			},
			checkVersion() {
				checkUpdate();
			},
			goLogin() {
				if (!this.login) {
					console.log('点击前往登录');
					uni.navigateTo({
						url: '/uni_modules/uni-login-page/pages/index/index'
					});
				} else {
					console.log('点击编辑信息');
					uni.navigateTo({
						url: './edit/edit'
					})
				}
			},
			tapGrid(index) {
				uni.showToast({
					title: '你点击了，第' + index + '个',
					icon: 'none'
				});
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/text-icon.ttf') format('truetype');
	}

	page {
		background-color: #f8f8f8;
	}

	/* #endif*/

	/* 解决头条小程序字体图标不显示问题，因为头条运行时自动插入了span标签，且有全局字体 */
	/* #ifdef MP-TOUTIAO */
	text :not(view) {
		font-family: texticons;
	}

	/* #endif */

	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
	}

	.userInfo {
		width: 750rpx;
		padding: 20rpx;
		padding-top: 50px;
		background-color: #2F85FC;
		flex-direction: column;
		align-items: center;
	}

	/* .logo-hover {
		opacity: 0.8;
	} */

	.logo-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
		border: solid 1px #FFFFFF;
	}

	.logo-title {
		height: 150rpx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20rpx;
	}

	.uer-name {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 38rpx;
		color: #FFFFFF;
	}

	.go-login-navigat-arrow {
		font-size: 38rpx;
		color: #FFFFFF;
	}

	.navigat-arrow {
		height: 90rpx;
		width: 40rpx;
		line-height: 90rpx;
		font-size: 34rpx;
		color: #FFFFFF;
		text-align: right;
		font-family: texticons;
	}

	.center-list {
		margin-bottom: 30rpx;
		background-color: #f9f9f9;
	}

	.center-list-cell {
		width: 750rpx;
		background-color: #007AFF;
		height: 40rpx;
	}

	.grid {
		background-color: #FFFFFF;
		margin: 25rpx 0;
	}

	.uni-grid .text {
		font-size: 26rpx;
		color: #817f82;
	}

	.uni-grid .item /deep/ .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}


	/*修改边线粗细示例*/
	/* #ifndef APP-NVUE */
	.center-list /deep/ .uni-list--border:after,
	.center-list /deep/ .uni-list--border-top,
	.center-list /deep/ .uni-list--border-bottom {
		-webkit-transform: scaleY(0.2);
		transform: scaleY(0.2);
	}

	/* #endif */
	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 24rpx;
		padding-right: 10rpx;
	}

	.item-footer-badge {
		width: 20rpx;
		height: 20rpx;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 10rpx;
		/* #endif */
		background-color: #DD524D;
	}
</style>
