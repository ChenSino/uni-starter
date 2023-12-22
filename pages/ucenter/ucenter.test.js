jest.setTimeout(20000);
const PAGE_PATH = '/pages/ucenter/ucenter'
describe('ucenter', () => {
	let page,uniToken,platform;
	beforeAll(async () => {
		try{
			page = await program.switchTab(PAGE_PATH)
			await page.waitFor('view')
			console.log('page: ',page);
			console.log('pageStack: ',await program.pageStack());
			uniToken = await program.callUniMethod('getStorageSync', 'uni_id_token')
			platform = process.env.UNI_PLATFORM
			console.log("uniToken: ",platform,uniToken);
		}catch(err){
			console.log('err: ',err);
		}
	})
	it('宫格', async () => {
		expect.assertions(1);
		const getGrid = await page.data('gridList')
		expect(getGrid.length).toBe(4)
	})
	it('列表', async () => {
		const getUcenterList = await page.data('ucenterList')
		if(platform.startsWith("app") || platform === "h5"){
			expect(getUcenterList.length).toBe(3)
		}else if(platform === "mp-weixin"){
			expect(getUcenterList.length).toBe(2)
		}
	})
	it('普通签到', async () => {
		if(!uniToken)return;
		if(platform.startsWith("app")){
			await page.callMethod('signInByAd')
			await page.waitFor(500)
			await page.callMethod('share')
			// await program.screenshot({
			// 	path: "static/screenshot/sign-app.png" 
			// })
		}else{
			await page.callMethod('signIn')
		}
	})
	it('我的积分', async () => {
		if(!uniToken)return;
		const getScoreRes = await page.callMethod('getScore')
		console.log('getScoreRes: ',getScoreRes);
		await page.waitFor(500)
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
	// 	await page.waitFor(500);
	// })
	
})

