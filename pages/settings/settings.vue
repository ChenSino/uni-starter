<template>
	<view class="content">
		<!-- 功能列表 -->
		<uni-list class="content">
			<uni-list-item v-for="(item,index) in agreeList" :key="index" :title="item.title" :to="item.to"
				:clickable="true" @click="itemClick(item)" :showSwitch="item.showSwitch" :switchChecked="item.isChecked"
				:link="item.to"></uni-list-item>
		</uni-list>
		<!-- 退出按钮 -->
		<button class="bottom-back" @click="clickLogout"><text class="bottom-back-text">退出登录</text></button>
		<!-- 弹窗 -->
		<uni-popup type="center" ref="dialog">
			<uni-popup-dialog type="warning" content="是否退出登录？" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		isOn,
		setting
	} from './dc-push/push.js';
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				agreeList: [{
						title: '个人资料',
						to: ''
					},
					{
						title: '修改密码',
						to: ''
					}, {
						title: '注销用户',
						event: ''
					},
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
						event: ''
					},
					//#endif

				]
			}
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
			checkPush(){
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
							this.agreeList.push(checkAuthModeList.find(mode => mode.name == item));
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
				.then(()=>{
					// 开始认证
					uni.startSoterAuthentication({
						requestAuthModes: [item.name],
						challenge: '123456',	// 微信端挑战因子
						authContent: `请用${item.title}`,
						success(res) {
							if(res.errCode == 0){
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
						fail(err) {
							uni.showToast({
								title: `认证失败:${err.errCode}`,
								icon: 'none'
							});
						}
					})
				})
			},
			checkIsSoterEnrolledInDevice(mode){
				return new Promise((resolve, reject)=>{
					uni.checkIsSoterEnrolledInDevice({
						checkAuthMode:mode.name,
						success: (res) => {
							if(res.isEnrolled){
								return resolve(res);
							}
							uni.showToast({
								title: `设备未开启${item.title}`,
								icon: 'none'
							});
							reject(res);
						},
						fail: (err) => {
							uni.showToast({
								title: `${item.title}失败`,
								icon: 'none'
							});
							reject(err);
						}
					})
				})
			},
			clickLogout() {
				this.$refs.dialog.open();
			},
			confirm(){
				this.logout();
				uni.navigateBack();
			},
			itemClick(item) {
				if (!item.to && item.event) {
					this[item.event](item);
				}
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
	uni-button:after{
		border: none;
		border-radius: 0;
	}
	/* #endif */
	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		height: 100%;
		/* #endif */
		flex-direction: column;
		flex: 1;
	}

	.bottom-back {
		width: 750rpx;
		height: 120rpx;
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
	}

	.bottom-back-text {
		font-size: 40rpx;
		color: #DD524D;
	}
</style>
