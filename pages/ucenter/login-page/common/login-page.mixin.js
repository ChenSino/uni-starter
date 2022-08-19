import {mapMutations} from 'vuex';
import loginSuccess from './loginSuccess.js';
let mixin = {
	methods:{
		...mapMutations({
			resetUserInfo: 'user/resetUserInfo'
		}),
		loginSuccess(result){
			loginSuccess(result)
			delete result.userInfo.token
			if (result.type == "register") {
				result.userInfo._id = result.uid  
			}
			this.resetUserInfo(result.userInfo)
		}
	}
}
export default mixin
