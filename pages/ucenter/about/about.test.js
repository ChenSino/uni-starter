// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/ucenter/about/about.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/about/about')
		await page.waitFor(500)
	})

	it('检测标题', async () => {
		// expect.assertions(1);
		// const perPage = await page.$('.about')
		// await page.waitFor(500)
		const getData = await page.data('about')
		console.log("getData-----------: ", getData);
		// expect(getData.appName).toBe('uni-starter')
		// expect(getData.slogan).toBe('云端一体应用快速开发模版')
	})

	it('隐私政策协议-点击跳转', async () => {
		// expect.assertions(1);
		const elAgree = await page.$('.agreement')
		// console.log("elAgree: ", elAgree);

		await page.callMethod('navigateTo', {
			url: "https://ask.dcloud.net.cn/protocol.html",
			title: "用户服务条款"
		})
	})

});
