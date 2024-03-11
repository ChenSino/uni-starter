// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
const PAGE_PATH = '/pages/grid/grid'
describe('grid', () => {
	let page, hasLogin;
	beforeAll(async () => {
		page = await program.switchTab(PAGE_PATH)
		await page.waitFor('view')
	})
	it('检测宫格', async () => {
		hasLogin = await page.data('hasLogin')
		console.log("hasLogin", hasLogin)
		let gridList = await page.data('gridList')
		console.log("gridList", gridList)
		expect(gridList.length).toBe(9)
	})
	it('点击宫格', async () => {
		const perPage = await page.$$('.grid-item-box')
		console.log("perPage", perPage)
		for (var i = 0; i < perPage.length; i++) {
			await perPage[i].tap()
			await page.waitFor(300)
		}
	})
});