<template>
	<view class="content">
		<!-- 功能列表 -->
		<uni-list :border="false" class="mb10" v-for="(sublist,index) in agreeList">
			<uni-list-item :border="false" class="mb1" v-for="(item,index) in sublist" :key="index" :title="item.title"
				:clickable="true" @click="itemClick(item)" :showSwitch="item.showSwitch" :switchChecked="item.isChecked"
				:link="!item.showSwitch"></uni-list-item>
		</uni-list>
		<!-- 退出按钮 -->
		<view class="bottom-back" @click="clickLogout">
			<text class="bottom-back-text" v-if="userInfo">退出登录</text>
			<text class="bottom-back-text" v-else>登录</text>
		</view>
	</view>
</template>

<script>
	import {
		isOn,
		setting
	} from './dc-push/push.js';
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				agreeList: [
					[{
							title: '个人资料',
							event: 'toEdit'
						},
						{
							title: '修改密码',
							event: 'changePwd'
						}
					],
					[
						//#ifdef APP-PLUS
						{
							title: '推送功能',
							name: 'push',
							event: 'openSetting',
							isChecked: false,
							showSwitch: true
						},
						{
							title: '清理缓存',
							event: 'clearTmp'
						},
						//#endif
					]
				]
			}
		},
		computed: {
			...mapGetters({
				'userInfo': 'user/info'
			})
		},
		onLoad() {
			this.initSoterAuthentication();
		},
		onShow() {
			this.checkPush();
		},
		methods: {
			...mapMutations({
				logout: 'user/logout'
			}),
			toEdit() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-users/pages/uni-id-users/edit'
				});
			},
			changePwd() {
				uni.navigateTo({
					url: '/uni_modules/uni-login-page/pages/pwd-retrieve/pwd-retrieve?phoneNumber=' + (this
						.userInfo && this.userInfo.phone ? this.userInfo.phone : '') + '&phoneArea=+86',
					fail: err => {
						console.log(err);
					}
				});
			},
			checkPush() {
				// 手机端获取推送是否开启
				//#ifdef APP-PLUS
				let pushIsOn = isOn();
				this.agreeList.forEach(item => {
					item.name == 'push' ? (item.isChecked = pushIsOn) : '';
				})
				//#endif
			},
			/**
			 * 添加生物认证选项
			 */
			initSoterAuthentication() {
				// #ifdef APP-PLUS || MP-WEIXIN

				let checkAuthModeList = [{
					title: '指纹解锁',
					name: 'fingerPrint',
					event: 'startSoterAuthentication'
				}, {
					title: '人脸解锁',
					name: 'facial',
					event: 'startSoterAuthentication'
				}];
				uni.checkIsSupportSoterAuthentication({
					success: (res) => {
						res.supportMode.forEach(item => {
							this.agreeList.push([checkAuthModeList.find(mode => mode.name == item)]);
						})
					},
					fail: (err) => {
						reject(err);
					}
				})
				// #endif
			},
			/**
			 * 开始生物认证
			 */
			startSoterAuthentication(item) {
				// 检查是否开启认证
				this.checkIsSoterEnrolledInDevice(item)
					.then(() => {
						// 开始认证
						uni.startSoterAuthentication({
							requestAuthModes: [item.name],
							challenge: '123456', // 微信端挑战因子
							authContent: `请用${item.title}`,
							success: (res) => {
								if (res.errCode == 0) {
									/**
									 * 验证成功后开启自己的业务逻辑
									 * 
									 * app端以此为依据 验证成功
									 * 
									 * 微信小程序需要再次通过后台验证resultJSON与resultJSONSignature获取最终结果
									 */
									return uni.showToast({
										title: `${item.title}成功`,
										icon: 'none'
									});
								}
								uni.showToast({
									title: '认证失败请重试',
									icon: 'none'
								});
							},
							fail: (err) => {
								console.log(`认证失败:${err.errCode}`);
								uni.showToast({
									title: `认证失败`,
									icon: 'none'
								});
							}
						})
					})
			},
			checkIsSoterEnrolledInDevice(mode) {
				return new Promise((resolve, reject) => {
					uni.checkIsSoterEnrolledInDevice({
						checkAuthMode: mode.name,
						success: (res) => {
							if (res.isEnrolled) {
								return resolve(res);
							}
							uni.showToast({
								title: `设备未开启${mode.title}`,
								icon: 'none'
							});
							reject(res);
						},
						fail: (err) => {
							uni.showToast({
								title: `${mode.title}失败`,
								icon: 'none'
							});
							reject(err);
						}
					})
				})
			},
			clickLogout() {
				if (this.userInfo) {
					uni.showModal({
						title: '提示',
						content: '是否退出登录',
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								this.logout();
								uni.navigateBack();
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.navigateTo({
						url: '/uni_modules/uni-login-page/pages/index/index'
					});
				}
			},
			itemClick(item) {
				console.log(item);
				if (item.event) {
					this[item.event](item);
				}
			},
			clearTmp() {
				uni.showLoading({
					title: '清除中',
					mask: true
				});
				uni.getSavedFileList({
					success:res=>{
						if (res.fileList.length > 0) {
							uni.removeSavedFile({
								filePath: res.fileList[0].filePath,
								complete:res=>{
									console.log(res);
									uni.hideLoading()
								}
							});
						}else{
							uni.hideLoading()
						}
					},
					complete:e=>{
						console.log(e);
					}
				});
			},
			/**
			 * 打开设置页面
			 */
			openSetting() {
				setting();
			}
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		flex: 1;
		width: 100%;
		height: 100%;
	}

	uni-button:after {
		border: none;
		border-radius: 0;
	}

	/* #endif */
	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 750rpx;
		height: 100vh;
		/* #endif */
		flex-direction: column;
		flex: 1;
		background-color: #F9F9F9;
	}

	.bottom-back {
		margin-top: 10px;
		width: 750rpx;
		height: 44px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* #ifndef APP-NVUE */
		border: none;
		/* #endif */
		border-width: 0;
		border-radius: 0;
		background-color: #FFFFFF;
	}

	.bottom-back-text {
		font-size: 33rpx;
	}

	.mb10 {
		margin-bottom: 10px;
	}

	.content /deep/ .uni-list {
		background-color: #F9F9F9;
	}

	.mb1 {
		margin-bottom: 1px;
	}
</style>
