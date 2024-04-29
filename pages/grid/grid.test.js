// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
const PAGE_PATH = '/pages/grid/grid'
jest.setTimeout(15000)
describe('grid', () => {
	let page, hasLogin;
	beforeAll(async () => {
		page = await program.switchTab(PAGE_PATH)
    console.log('page',page)
		await page.waitFor('view')
	})
	it('检测宫格', async () => {
    await page.waitFor(2000)
		hasLogin = await page.data('hasLogin')
		let gridList = await page.data('gridList')
		console.log("gridList", hasLogin,gridList.length)
		expect(gridList.length).toBe(9)
	})
	it('点击宫格', async () => {
		const perPage = await page.$$('.grid-item-box')
		console.log("perPage", perPage.length)
		for (var i = 0; i < perPage.length; i++) {
			await perPage[i].tap()
			await page.waitFor(300)
		}
	})
});