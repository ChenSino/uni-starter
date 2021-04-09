const helpPage = '/pages/ucenter/help';	// 帮助页面

let mixin = {
	// 监听帮助按钮
	onNavigationBarButtonTap(event) {
		uni.navigateTo({
			url:helpPage
		})
	},
}
export default mixin