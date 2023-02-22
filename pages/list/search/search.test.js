// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/list/search/search.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/list/search/search')
		await page.waitFor(500)
		console.log(await program.pageStack());
	})
	it('搜索发现-显示-隐藏', async () => {
		expect.assertions(2);
		// 搜索发现 刷新
		await page.callMethod('searchHotRefresh')
		await page.waitFor(300)
		// 是否隐藏热搜列表  netHotListIsHide：fasle 未隐藏
		const getShow = await page.data('netHotListIsHide')
		expect(getShow).toBeFalsy()
		if(!getShow){
			// 设置netHotListIsHide：true 隐藏
			await page.setData({netHotListIsHide: true})
			expect(await page.data('netHotListIsHide')).toBeTruthy()
		}
	})

	it('搜索内容', async () => {
		
		await page.setData({searchText: '小程序'})
		// console.log(await page.data('searchText'),"searchText--------");
		// 搜索 “小程序”
		await page.callMethod('search', '小程序')
		await page.waitFor(300)
		if (process.env.UNI_PLATFORM != "mp-weixin") {
			expect.assertions(1);
			expect((await program.currentPage()).path).toBe('pages/list/list')
		}
		
	})
});
