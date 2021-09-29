// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/grid/grid.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.switchTab('/pages/grid/grid')
		await page.waitFor(500)
	})
	
	it('检测宫格', async () => {
		expect.assertions(1);
		const getData = await page.data('gridList')
		console.log("getData: ",getData);
		expect(getData.length).toBe(9)
		
	})
	
	it('点击宫格', async () => {
		// expect.assertions(1);
		const perPage = await page.$('.warp')
		const uGrid = await perPage.$('.uni-grid-box')
		console.log("uGrid-----------: ",uGrid);
		// await uGrid.callMethod('change')
	})
	
	
	
});