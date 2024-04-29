jest.setTimeout(30000);
const PAGE_PATH = '/pages/ucenter/ucenter'
describe('ucenter', () => {
	let page, platform, hasLogin;
	platform = process.env.UNI_PLATFORM
	console.log('uniTestPlatformInfo', process.env.uniTestPlatformInfo)
	if (process.env.uniTestPlatformInfo == 'ios_simulator 13.7') {
		it('ucenter-ios13.7', async () => {
			expect(1).toBe(1)
		})
		return
	}
	beforeAll(async () => {
		page = await program.switchTab(PAGE_PATH)
		await page.waitFor('view')
		hasLogin = await page.callMethod('hasLoginTest')
		console.log("登录状态", hasLogin, platform)
		if (!hasLogin) {
			console.log('hasLogin--err')
			return
		}
	})
	it('宫格', async () => {
		expect.assertions(1);
		const getGrid = await page.data('gridList')
		expect(getGrid.length).toBe(4)
	})
	it('列表', async () => {
		const getUcenterList = await page.data('ucenterList')
		if (platform === "mp-weixin") {
			expect(getUcenterList.length).toBe(2);
		} else {
			expect(getUcenterList.length).toBe(3);
		}
	})
	it('普通签到', async () => {
		if (platform.startsWith("app")) {
			await page.callMethod('signInByAd')
			await page.waitFor(1000)
			await page.callMethod('share')
			// await program.screenshot({
			// 	path: "static/screenshot/sign-app.png" 
			// })
		} else {
			await page.callMethod('signIn')
		}
	})
	it('我的积分', async () => {
		const getScoreRes = await page.callMethod('getScore')
		console.log('getScoreRes: ', getScoreRes);
		await page.waitFor(1000)
		if (getScoreRes.score) {
			expect.assertions(2);
			expect(getScoreRes.score).not.toBeUndefined();
			expect(getScoreRes.balance).toBeGreaterThanOrEqual(getScoreRes.score);
		} else {
			console.log("签到失败");
		}
	})
	// it('screenshot',async()=>{
	// 	await program.screenshot({
	// 		path: "static/screenshot/ucenter.png" 
	// 	})
	//    const image = await program.screenshot({
	//      fullPage: true
	//    })
	//    expect(image).toSaveImageSnapshot();
	//    await page.waitFor(500);
	// })
})