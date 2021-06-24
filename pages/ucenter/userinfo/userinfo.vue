<template>
	<view>
		<uni-list>
			<uni-list-item class="item">
				<view slot="body" class="item">
					<text>头像</text>
					<uni-file-picker @click.native="uploadAvatarImg" @delete="removeAvatar" v-model="avatar_file"
						fileMediatype="image" return-type="object" :image-styles="listStyles"
						disabled />
				</view>
			</uni-list-item>
			<uni-list-item class="item" @click="setNickname('')" title="昵称" :rightText="userInfo.nickname||'未设置'" link>
			</uni-list-item>
			<uni-list-item class="item" @click="bindMobile" title="手机号" :rightText="userInfo.mobile||'未绑定'" link>
			</uni-list-item>
		</uni-list>
		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog mode="input" :value="userInfo.nickname" @confirm="setNickname" title="设置昵称"
				placeholder="请输入要设置的昵称">
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
				avatar_file: {
					"extname": "jpg",
					"fileType": "image",
					"name": "707756af-e9a9-4d08-8db9-5d1f34b84ea6.jpg",
					"size": 98513,
					"url": "cloud://tcb-lseqkmkcq0w1wzwcb18f3-be0d77.7463-tcb-lseqkmkcq0w1wzwcb18f3-be0d77-1304530278/1624523618672_0.jpg"
				},
				univerifyStyle: {
					authButton: {
						"title": "本机号码一键绑定", // 授权按钮文案
					},
					otherLoginButton: {
						"title": "其他号码绑定",
					}
				},
				listStyles: {
					"height": 80, // 边框高度
					"width": 80, // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "10px" // 边框圆角，支持百分比
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
		onLoad() {
			this.avatar_file = this.userInfo.avatar_file
			console.log(this.avatar_file);
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
					fail: (res) => { // 预登录失败
						// 不显示一键登录选项（或置灰）
						console.log(res)
						this.bindMobileBySmsCode()
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
						uniCloud.callFunction({
							name: 'uni-id-cf',
							data: {
								action: 'bind_mobile_by_univerify',
								params: e.authResult,
							},
							success: ({
								result
							}) => {
								console.log(result);
								if (result.code === 0) {
									this.setUserInfo({
										"mobile": result.mobile
									})
									uni.closeAuthView()
								} else {
									uni.showModal({
										content: result.msg,
										showCancel: false,
										complete() {
											uni.closeAuthView()
										}
									});
								}
							}
						})
					},
					fail: (err) => {
						console.log(err);
						if (err.code == '30002' || err.code == '30001') {
							this.bindMobileBySmsCode()
						}
					}
				})
			},
			bindMobileBySmsCode() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/bind-mobile/bind-mobile'
				})
			},
			setNickname(nickname) {
				console.log(9527, nickname);
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
			removeAvatar(){
				this.setAvatarFile(null)
			},
			setAvatarFile(avatar_file){
				uni.showLoading({
					title: '设置中',
					mask: true
				});
				// 使用 clientDB 提交数据
				usersTable.where('_id==$env.uid').update({
					avatar_file
				}).then((res) => {
					console.log(res);
					if(avatar_file){
						uni.showToast({
							icon: 'none',
							title: '设置成功'
						})
					}else{
						uni.showToast({
							icon: 'none',
							title: '删除成功'
						})
					}
					this.avatar_file = avatar_file
					this.setUserInfo({
						avatar_file
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
			},
			uploadAvatarImg(res) {
				const crop = {
					quality: 100,
					width: 600,
					height: 600,
					resize: true
				};
				uni.chooseImage({
					count: 1,crop,
					success: async (res) => {
						console.log(res);
						let tempFile = res.tempFiles[0],
						avatar_file = {
							// #ifndef APP-PLUS
							extname:tempFile.name.split('.')[tempFile.name.split('.').length-1],
							// #endif
							// #ifdef APP-PLUS
							extname:tempFile.path.split('.')[tempFile.path.split('.').length-1]
							// #endif
						},
						filePath = res.tempFilePaths[0]
						// #ifndef APP-PLUS
						//非app端用前端组件剪裁头像，app端用内置的原生裁剪
						filePath = await new Promise((callback) => {
							uni.navigateTo({
								url: '/pages/ucenter/userinfo/cropImage?path=' + filePath +
									`&options=${JSON.stringify(crop)}`,
								animationType: "fade-in",
								events: {
									success: url=> {
										callback(url)
									}
								}
							});
						})
						// #endif
						console.log(this.userInfo);
						let cloudPath = this.userInfo._id+''+Date.now()
						avatar_file.name = cloudPath
						uni.showLoading({
							title: '正在上传',
							mask: true
						});
						let {fileID} = await uniCloud.uploadFile({
							filePath,cloudPath,
							fileType:"image"
						});
						// console.log(result)
						avatar_file.url = fileID
						console.log({avatar_file});
						uni.hideLoading()
						
						this.setAvatarFile(avatar_file)
					}
				})
			}
		}
	}
</script>
<style>
	.item {
		width: 750rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.avatarUrl {
		width: 50px;
		height: 50px;
		border-radius: 6px;
	}

	.chooseAvatar {
		border: solid 1px #ddd;
		border-radius: 10px;
		width: 130rpx;
		height: 130rpx;
		line-height: 130rpx;
	}
</style>
