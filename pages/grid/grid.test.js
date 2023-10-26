// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/grid/grid.vue', () => {
	let page
	beforeAll(async () => {
		try{
			page = await program.switchTab('/pages/grid/grid')
			await page.waitFor('view')
		}catch(err){
			console.log("err: ",err);
		}
	})
	
	it('检测宫格', async () => {
		expect.assertions(1);
		expect((await page.data('gridList')).length).toBe(9)
	})
	
	it('点击宫格', async () => {
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM.startsWith("app")) {
			const perPage = await page.$('.uni-grid-wrap')
			await perPage.callMethod('change')
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			const uniGrid = await page.$('uni-grid')
			await page.waitFor('uni-grid')
			await uniGrid.callMethod('change')
			await page.waitFor(500)
		}
	})
});