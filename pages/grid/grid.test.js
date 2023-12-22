// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
const PAGE_PATH = '/pages/grid/grid'
describe('grid', () => {
	let page
	beforeAll(async () => {
		page = await program.switchTab(PAGE_PATH)
		await page.waitFor('view')
	})
	it('检测宫格', async () => {
		expect.assertions(2);
		expect((await page.data('gridList')).length).toBe(9)
		console.log("hasLogin",await page.data('hasLogin'))
		expect(await page.data('hasLogin')).toBeFalsy()
	})
	it('点击宫格', async () => {
		const perPage = await page.$$('.grid-item-box')
		expect(perPage.length).toBe(3)
		for (var i = 0; i < perPage.length; i++) {
			await perPage[i].tap()
			await page.waitFor(300)
		}
	})
});