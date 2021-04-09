// 上次启动时的用户信息
let userHistory = uni.getStorageSync('userInfo') || null;

let state = {
		/**
		 * 是否需要强制登录
		 */
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
			state.info = info;
			state.hasLogin = true;
			uni.setStorageSync('userInfo', info);
		},
		logout(state) {
			state.info = null;
			state.hasLogin = false;
			uni.setStorageSync('userInfo', null);
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
