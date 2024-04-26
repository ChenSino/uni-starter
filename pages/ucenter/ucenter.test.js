jest.setTimeout(20000);
const PAGE_PATH = '/pages/ucenter/ucenter'
describe('ucenter', () => {
	let page,platform,hasLogin;
	platform = process.env.UNI_PLATFORM
	beforeAll(async () => {
		try{
			page = await program.switchTab(PAGE_PATH)
			await page.waitFor('view')
      hasLogin = await page.callMethod('hasLoginTest')
      console.log("登录状态",hasLogin,platform)
		}catch(err){
			console.log('err: ',err);
		}
	})
	it('宫格', async () => {
		expect.assertions(1);
		const getGrid = await page.data('gridList')
    console.log('getGrid',getGrid.length)
		expect(getGrid.length).toBe(4)
	})
	it('列表', async () => {
		const getUcenterList = await page.data('ucenterList')
    console.log('getUcenterList',getUcenterList.length)
		if(platform === "mp-weixin"){
			expect(getUcenterList.length).toBe(2);
		}else{
			expect(getUcenterList.length).toBe(3);
		}
	})
	if(hasLogin){
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
	it('screenshot',async()=>{
		await program.screenshot({
			path: "static/screenshot/ucenter.png" 
		})
		await page.waitFor(500);
	})
})

