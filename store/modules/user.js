// 上次启动时的用户信息
let userHistory = uni.getStorageSync('userInfo') || {};

let state = {
		/* 是否需要强制登录 */
		forcedLogin: false,
		hasLogin: Boolean(userHistory),
		info: userHistory
	},
	getters = {
		info(state) {
			return state.info;
		},
		hasLogin(state){
			return state.hasLogin;
		}
	},
	mutations = {
		login(state, info) {
			let _info = state.info;
			state.info = Object.assign({}, _info, info);
			state.hasLogin = true;
			uni.setStorageSync('userInfo', state.info);
		},
		logout(state) {
			state.info = {};
			state.hasLogin = false;
			uni.setStorageSync('userInfo', {});
			uni.setStorageSync('uni_id_token', '');
		}
	},
	actions = {

	}
export default {
	state,
	getters,
	mutations,
	actions
}
