// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/ucenter/about/about.vue', () => {
	let page
	beforeAll(async () => {
		try {
			page = await program.reLaunch('/pages/ucenter/about/about')
			await page.waitFor(500)
			console.log("await program.pageStack(): ", await program.pageStack());
		} catch (e) {
			console.log("e: ",e);
		}
		
	})
	
	it('screenshot', async () => {
		// 在微信小程序容易超时
		console.log("process.env.UNI_PLATFORM: ",process.env.UNI_PLATFORM);
		if (process.env.UNI_PLATFORM != "mp-weixin") {
			await program.screenshot({
				path: "static/screenshot/about.png" // 默认项目根目录
			})
		}
		
	})

	it('about', async () => {
		expect.assertions(1);
		const getData = await page.data('about')
		console.log("getData: ",getData);
		expect(getData.appName).toBe('uni-starter')
	})

	it('隐私政策协议-点击跳转', async () => {
		await page.callMethod('navigateTo', {
			url: "https://ask.dcloud.net.cn/protocol.html",
			title: "用户服务条款"
		})
		// await program.navigateBack()
	})

});
