jest.setTimeout(20000);
const PAGE_PATH = '/pages/ucenter/ucenter'
describe('ucenter', () => {
	let page,uniToken,platform;
	platform = process.env.UNI_PLATFORM
	beforeAll(async () => {
		try{
			page = await program.switchTab(PAGE_PATH)
			await page.waitFor('view')
			uniToken = await program.callUniMethod('getStorageSync', 'uni_id_token')
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
		if(platform === "mp-weixin"){
			expect(getUcenterList).toHaveLength(2);
		}else{
			expect(getUcenterList).toHaveLength(3);
		}
	})
	if(uniToken){
		it('普通签到', async () => {
			if(platform.startsWith("app")){
				await page.callMethod('signInByAd')
				await page.waitFor(1000)
				await page.callMethod('share')
				// await program.screenshot({
				// 	path: "static/screenshot/sign-app.png" 
				// })
			}else{
				await page.callMethod('signIn')
			}
		})
		it('我的积分', async () => {
			const getScoreRes = await page.callMethod('getScore')
			console.log('getScoreRes: ',getScoreRes);
			await page.waitFor(1000)
			if (getScoreRes.score) {
				expect.assertions(2);
				expect(getScoreRes.score).not.toBeUndefined();
				expect(getScoreRes.balance).toBeGreaterThanOrEqual(getScoreRes.score);
			} else {
				console.log("签到失败");
			}
		})
	}
	// it('screenshot',async()=>{
	// 	await program.screenshot({
	// 		path: "static/screenshot/ucenter.png" 
	// 	})
	// 	await page.waitFor(500);
	// })
	
})

