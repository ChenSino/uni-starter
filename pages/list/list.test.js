describe('pages/list/list.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.switchTab('/pages/list/list')
		await page.waitFor(500)
	})

	it('检测标题', async () => {
		// expect.assertions(2);
		// const perPage = await page.$('.pages')
		// await page.waitFor(500)
		// const getData = await perPage.data('dataList')
		// console.log("getData: ",getData);
		// expect(getData.title).toBe('阿里小程序IDE官方内嵌uni-app，为开发者提供多端开发服务')
		// expect(getData.length).toBe(1)
		
		const getData = await page.data('dataList')
		console.log("getData: ",getData);
		
		
	})
	
	it('点击搜索跳转', async () => {
		expect.assertions(2);
		const searchTo = await page.callMethod('searchClick')
		await page.waitFor(300)
		expect((await program.currentPage()).path).toBe('pages/list/search/search')
		await page.waitFor(500)
		expect((await program.navigateBack()).path).toBe('pages/list/list')
	})
})