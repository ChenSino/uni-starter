const db = uniCloud.database();
const usersTable = db.collection('uni-id-users')
const uniIdCo = uniCloud.importObject("uni-id-co")
export default {
	data() {
		return {
			univerifyStyle: {
				authButton: {
					"title": "本机号码一键绑定", // 授权按钮文案
				},
				otherLoginButton: {
					"title": "其他号码绑定",
				}
			},
			userInfo: {
				mobile: '',
				nickname: ''
			},
			hasLogin: false,
			hasPwd: false
		}
	},
	async onShow() {
		this.univerifyStyle.authButton.title = "本机号码一键绑定"
		this.univerifyStyle.otherLoginButton.title = "其他号码绑定"
	},
	async onLoad() {
		this.getUserInfo()
		//判断当前用户是否有密码，否则就不显示密码修改功能
		let res = await uniIdCo.getAccountInfo()
		this.hasPwd = res.isPasswordSet
	},
	methods: {
		login() {
			uni.navigateTo({
				url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
				complete: (e) => {
					console.log(e);
				}
			})
		},
		async logout() {
			await uniIdCo.logout()
			uni.removeStorageSync('uni_id_token');
			uni.setStorageSync('uni_id_token_expired', 0)
			uni.redirectTo({
				url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
			});
		},
		changePassword() {
			uni.navigateTo({
				url: '/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd',
				complete: (e) => {
					console.log(e);
				}
			})
		},
		getUserInfo(e) {
			uni.showLoading({
				mask: true
			});
			usersTable.where("'_id' == $cloudEnv_uid").field('mobile,nickname').get().then(res => {
				console.log({
					res
				});
				this.userInfo = res.result.data[0]
				console.log('this.userInfo', this.userInfo);
				this.hasLogin = true
			}).catch(e => {
				this.userInfo = {}
				this.hasLogin = false
				console.log(e.message, e.errCode);
			}).finally(e => {
				// console.log(e);
				uni.hideLoading()
			})
		},
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
			// #ifdef MP-WEIXIN
			this.$refs['bind-mobile'].open()
			// #endif
			// #ifdef H5
			//...去用验证码绑定
			this.bindMobileBySmsCode()
			// #endif
		},
		univerify() {
			uni.login({
				"provider": 'univerify',
				"univerifyStyle": this.univerifyStyle,
				success: async e => {
					console.log(e.authResult);
					uniIdCo.bindMobileByUniverify(e.authResult).then(res => {
						console.log(res);
						this.getUserInfo()
					}).catch(e => {
						console.log(e);
					}).finally(e => {
						console.log(e);
						uni.closeAuthView()
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
				url: './bind-mobile/bind-mobile',
				events: {
					getUserInfo: () => {
						this.getUserInfo()
					}
				},
				complete(e) {
					console.log(e);
				}
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
							title: "更新成功",
							icon: 'none'
						});
						this.userInfo.nickname = nickname
					} else {
						uni.showToast({
							title: "没有改变",
							icon: 'none'
						});
					}
				})
				this.$refs.dialog.close()
			} else {
				this.$refs.dialog.open()
			}
		},
		deactivate() {
			uni.navigateTo({
				url: "/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"
			})
		}
	}
}
