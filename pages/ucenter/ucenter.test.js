describe('pages/ucenter/ucenter.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.switchTab('/pages/ucenter/ucenter')
		await page.waitFor(300)
	})

	it('宫格', async () => {
		const getGrid = await page.data('gridList')
		// console.log("getGrid: ",getGrid);
		expect(getGrid.length).toBe(4)
	})

	it('列表', async () => {
		const getUcenterList = await page.data('ucenterList')
		// console.log("getUcenterList: ",getUcenterList);
		expect(getUcenterList.length).toBe(3)
	})

	it('我的积分', async () => {
		// expect.assertions(1);
		await page.waitFor(300)
		const getScoreRes = await page.callMethod('getScore')
		console.log("getScoreRes: ", getScoreRes);
		// await page.waitFor(500)
		// expect(getScoreRes.score).not.toBeUndefined();
	})


})
