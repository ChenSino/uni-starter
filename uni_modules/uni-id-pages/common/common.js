import config from '../config'
const uniIdCo = uniCloud.importObject("uni-id-co")
export default {
	async logout() {
		await uniIdCo.logout()
		uni.removeStorageSync('uni_id_token');
		uni.setStorageSync('uni_id_token_expired', 0)
		uni.redirectTo({
			url: config.isAdmin ? '/uni_modules/uni-id-pages/pages/login/login-withpwd': '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
		});
		uni.$emit('uni-id-pages-logout')
	},
}
