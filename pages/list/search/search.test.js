// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/list/search/search.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/list/search/search')
		await page.waitFor(500)
	})
	it('搜索发现-显示-影藏', async () => {
		// expect.assertions(2);
		await page.callMethod('searchHotRefresh')
		await page.waitFor(300)
		const getShow = await page.data('netHotListIsHide')
		expect(getShow).toBeFalsy()
		if(!getShow){
			await page.setData({netHotListIsHide: true})
			expect(await page.data('netHotListIsHide')).toBeTruthy()
		}
	})

	it('搜索内容', async () => {
		// expect.assertions(1);
		const setSearchTest = await page.setData({
			searchText: '小程序',
		})
		console.log(await page.data('searchText'));
		await page.callMethod('search', '小程序')
		await page.waitFor(300)
		console.log(await program.currentPage(),"-----------------------");
		expect((await program.currentPage()).path).toBe('pages/list/list')
	})
});
