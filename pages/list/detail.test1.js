// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/list/detail.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/list/detail?id=614343e09ee65f000158ac93&title=阿里小程序IDE官方内嵌uni-app，为开发者提供多端开发服务')
		await page.waitFor(500)
	})
	it('检测内容', async () => {
		expect.assertions(1);
		const page = await program.currentPage()
		await program.pageScrollTo(100)
		console.log(await page.scrollTop(),"scrollTop")
		expect(await page.scrollTop()).toBe(100)
	})

});
