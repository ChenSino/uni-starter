const helpPage = '/pages/ucenter/help/help';	// 帮助页面
import {
		mapGetters,
		mapMutations
	} from 'vuex';
let mixin = {
	// 监听帮助按钮
	onNavigationBarButtonTap(event) {
		uni.navigateTo({
			url:helpPage
		})
	},
	methods:{
		...mapMutations({
			setUserInfo: 'user/login'
		})
	}
}
export default mixin