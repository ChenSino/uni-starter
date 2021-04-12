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
	data(){
		return {
			// 用户协议页面跳转
			link: [{
				text: '用户协议',
				to: '/pages/ucenter/agree-list/service/service'
			}, {
				text: '隐私政策',
				to: '/pages/ucenter/agree-list/privacy/privacy'
			}],
			formData:{
				phone:'',
				code:'',
				pwd:''
			},
			rules: {
				phone:{
					rules:[{
							required: true,
							errorMessage: '请输入手机号',
						},
						{
							pattern: /^1\d{10}$/,
							errorMessage: '手机号格式不正确',
						}
					]
				},
				code: {
					rules: [{
							required: true,
							errorMessage: '请输入验证码',
						},
						{
							pattern: /^.{6}$/,
							errorMessage: '请输入6位验证码',
						}
					]
				},
				pwd:{
					rules: [{
							required: true,
							errorMessage: '请输入密码',
						},
						{
							pattern: /^.{6,20}$/,
							errorMessage: '密码应为6到20位',
						}
					]
				}
			}
		}
	},
	methods:{
		...mapMutations({
			setUserInfo: 'user/login'
		})
	}
}
export default mixin