<template>
	<view>
		<uni-list>
			<uni-list-item class="item" link>
				<view @click="setAvatar" slot="body" class="item">
					<text>头像</text>
					<image class="avatarUrl" :src="userInfo.avatar||nullAvatarUrl" mode="widthFix"></image>
				</view>
			</uni-list-item>
			<uni-list-item class="item" @click="setNickname()" title="昵称" :rightText="userInfo.nickname||'未设置'" link></uni-list-item>
			<uni-list-item class="item" @click="bindMobile" title="手机号" :rightText="userInfo.mobile||'未绑定'" link></uni-list-item>
		</uni-list>
		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog mode="input" :value="userInfo.nickname" @confirm="setNickname" title="设置昵称" placeholder="请输入要设置的昵称">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	const db = uniCloud.database();
	const usersTable = db.collection('uni-id-users')
	export default {
		data() {
			return {
				nullAvatarUrl: '/static/uni-center/logo.png',
				univerifyStyle: {
					authButton: {
						"title": "本机号码一键绑定", // 授权按钮文案
					},
					otherLoginButton: {
						"title": "其他号码绑定",
					}
				}
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				login: 'user/hasLogin'
			})
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			bindMobile() {
				// #ifdef APP-PLUS
				uni.preLogin({
					provider: 'univerify',
					success: this.univerify(), //预登录成功
					fail(res) { // 预登录失败
						// 不显示一键登录选项（或置灰）
						console.log(res)
					}
				})
				// #endif
				// #ifndef APP-PLUS
					this.bindMobileBySmsCode()
					//...去用验证码绑定
				// #endif
			},
			univerify() {
				uni.login({
					"provider": 'univerify',
					"univerifyStyle": this.univerifyStyle,
					success: async e => {
						console.log(e.authResult);
						this.request('user-center/bind_mobile_by_univerify',
							e.authResult,
							(data, result) =>
							{
								console.log(result);
								if(result.code===0){
									this.setUserInfo({"mobile":result.mobile})
									uni.closeAuthView()
								}else{
									uni.showModal({
										content: JSON.stringify(result.msg),
										showCancel: false,
										complete() {
											uni.closeAuthView()
										}
									});
								}
							}
						)
					},
					fail: (err) => {
						console.log(err);
						this.bindMobileBySmsCode()
					}
				})
			},
			bindMobileBySmsCode() {
				uni.navigateTo({
					url:'/pages/ucenter/edit/bind-mobile/bind-mobile'
				})
			},
			setNickname(nickname) {
				console.log(nickname);
				if (nickname) {
					usersTable.where('_id==$env.uid').update({
						nickname
					}).then(e => {
						console.log(e);
						if (e.result.updated) {
							uni.showToast({
								title: '更新成功',
								icon: 'none'
							});
							this.setUserInfo({
								nickname
							});
						} else {
							uni.showToast({
								title: '没有变化',
								icon: 'none'
							});
						}
					})
					this.$refs.dialog.close()
				} else {
					this.$refs.dialog.open()
				}
			},
			setAvatar() {
				console.log('点击编辑信息');
				uni.chooseImage({
					count: 1,
					success: (res) => {
						// 头像剪裁尺寸
						let options = {
							width: 600,
							height: 600
						}
						// 剪裁并上传头像
						uni.navigateTo({
							url: '/pages/ucenter/edit/uploadCutImageToUnicloud?path=' +
								res
								.tempFilePaths[0] +
								`&options=${JSON.stringify(options)}`,
							animationType: "fade-in",
							events: {
								uploadAvatarAfter: ({
									url
								}) => {
									console.log(url);
									// 使用 clientDB 提交数据
									usersTable.where('_id==$env.uid').update({
										avatar: url
									}).then((res) => {
										console.log(res);
										uni.showToast({
											icon: 'none',
											title: '修改成功'
										})
										this.setUserInfo({
											avatar: url
										});
									}).catch((err) => {
										uni.showModal({
											content: err.message ||
												'请求服务失败',
											showCancel: false
										})
									}).finally(() => {
										uni.hideLoading()
									})
								}
							}
						});
					}
				})
			},
		}
	}
</script>
<style>
	.item {
		width: 750rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 60px;
	}
	.avatarUrl {
		width: 50px;
		height: 50px;
		border-radius: 6px;
	}
</style>
