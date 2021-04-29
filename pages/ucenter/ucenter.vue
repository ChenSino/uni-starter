<template>
	<view class="center">
		<view class="userInfo" @click="toUserInfo">
			<image class="logo-img" :src="userInfo.avatar||avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">{{userInfo.nickname||userInfo.username||userInfo.mobile||'未登录'}}</text>
				<uni-icons class="icon" color="#FFFFFF" type="arrowright" v-if="!login" size="16"></uni-icons>
			</view>
		</view>
		<uni-grid class="grid" :column="5" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-for="(item,index) in gridList" @click.native="tapGrid(index)" :key="index">
				<uni-icons class="icon" color="#5d5e64" :type="item.icon" size="28"></uni-icons>
				<text class="text">{{item.text}}</text>
			</uni-grid-item>
		</uni-grid>
		<uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index">
			<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :rightText="item.rightText" :key="i"
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
	import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';

	const db = uniCloud.database();
	const dbCollectionName = 'uni-id-scores';
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
					[
						// #ifdef APP-PLUS
						{
							title: '去评分',
							event: 'gotoMarket'
						},
						//#endif
						{
							title: '阅读过的文章',
							to: '/uni_modules/uni-news-favorite/pages/uni-news-favorite/list',
						},
						{
							title: '我的积分',
							to: '',
							event: 'getScore'
						}
					],
					[{
						title: '问题与反馈',
						to: '/uni_modules/uni-feedback/pages/opendb-feedback/list' // /pages/ucenter/uni-feedback/uni-feedback uni_modules/uni-feedback/pages/opendb-feedback/list
					}, {
						title: '设置',
						to: '/pages/ucenter/settings/settings'
					}],
					[{
						title: '关于',
						to: '/pages/ucenter/about/about'
					}]
				]
			}
		},
		onLoad() {
			//#ifdef APP-PLUS
			this.ucenterList[this.ucenterList.length - 2].unshift({
				title: '检查更新',
				rightText: this.appVersion.version + '-' + this.appVersion.versionCode,
				event: 'checkVersion',
				showBadge: this.appVersion.hasNew
			})
			//#endif
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				login: 'user/hasLogin'
			})
			// #ifdef APP-PLUS
			,
			appVersion() {
				return getApp().appVersion
			}
			// #endif
			,
			appConfig() {
				return getApp().globalData.config
			}
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			toSettings() {
				uni.navigateTo({
					url: "/pages/ucenter/settings/settings"
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
			async checkVersion() {
				let res = await callCheckVersion()
				console.log(res);
				if (res.result.code > 0) {
					checkUpdate()
				} else {
					uni.showToast({
						title: res.result.message,
						icon: 'none'
					});
				}
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				})
			},
			tapGrid(index) {
				uni.showToast({
					title: '你点击了，第' + (index + 1) + '个',
					icon: 'none'
				});
			},
			/**
			 * 去应用市场评分
			 */
			gotoMarket() {
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					// 这里填写appstore应用id
					let appstoreid = this.appConfig.marketId.ios; // 'id1417078253';
					plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app/wechat/' + appstoreid + '?mt=8');
				}
				if (uni.getSystemInfoSync().platform == "android") {
					var Uri = plus.android.importClass("android.net.Uri");
					var uri = Uri.parse("market://details?id=" + this.appConfig.marketId.android);
					var Intent = plus.android.importClass('android.content.Intent');
					var intent = new Intent(Intent.ACTION_VIEW, uri);
					var main = plus.android.runtimeMainActivity();
					main.startActivity(intent);
				}
				// #endif
			},
			/**
			 * 获取积分信息
			 */
			getScore() {
				if (!this.userInfo) return uni.showToast({
					title: '请登录后查看积分',
					icon: 'none'
				});
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName).where('user_id == $env.uid').field('score,balance').get().then((res) => {
					const data = res.result.data[0];
					let msg = '';
					msg = data ? ('当前积分为' + data.balance) : '当前无积分';
					uni.showToast({
						title: msg,
						icon: 'none'
					});
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	page {
		background-color: #f8f8f8;
	}

	/* #endif*/

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
	}

	.uer-name {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 38rpx;
		color: #FFFFFF;
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
