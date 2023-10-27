describe('pages/list/list.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.switchTab('/pages/list/list')
		await page.waitFor('view')
	})

	it('检测标题', async () => {
		// expect.assertions(1);
		const getTitle = await page.data('dataList')
		console.log('getTitle: ',getTitle);
		// expect((await page.data('dataList')).title).toBe('阿里小程序IDE官方内嵌uni-app，为开发者提供多端开发服务')
	})
	
	it('点击搜索跳转', async () => {
		await page.callMethod('searchClick')
		await page.waitFor(300)
	})
})