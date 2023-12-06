jest.setTimeout(20000);
describe('pages/ucenter/ucenter.vue', () => {
	let page,uniToken,platform;
	beforeAll(async () => {
		try{
			page = await program.switchTab('/pages/ucenter/ucenter')
			await page.waitFor('view')
			uniToken = await program.callUniMethod('getStorageSync', 'uni_id_token')
			platform = process.env.UNI_PLATFORM
			console.log("uniToken: ",platform,uniToken);
			if(!uniToken){
				console.log("未登录");
				await program.navigateTo('/uni_modules/uni-id-pages/pages/login/login-withpwd')
			}
		}catch(err){
			console.log("err: ",err);
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
		console.log("普通签到");
		// await page.waitFor('uni-sign-in')
		if(!uniToken)return;
		if(platform.startsWith("app")){
			await page.callMethod('signInByAd')
			await page.waitFor(500)
			await page.callMethod('share')
			// await program.screenshot({
			// 	path: "static/screenshot/sign-app.png" 
			// })
		}else if(platform === "h5"){
			await page.callMethod('signIn')
			// await page.waitFor(500)
			// await program.screenshot({
			// 	path: "static/screenshot/sign-h5.png" 
			// })
		}else{
			await page.callMethod('signIn')
			// await page.waitFor(500)
			// await program.screenshot({
			// 	path: "static/screenshot/sign-weixin.png" 
			// })
		}
	})
	it('我的积分', async () => {
		if(!uniToken)return;
		const getScoreRes = await page.callMethod('getScore')
		let scoreInfo = getScoreRes && getScoreRes.result.data[0]
		console.log('scoreInfo: ',scoreInfo);
		await page.waitFor(500)
		if (scoreInfo) {
			expect.assertions(2);
			expect(scoreInfo.score).not.toBeUndefined();
			expect(scoreInfo.balance).toBeGreaterThanOrEqual(scoreInfo.score);
		} else {
			console.log("签到失败");
		}
	})
	it('screenshot',async()=>{
		await program.screenshot({
			path: "static/screenshot/ucenter.png" 
		})
		await page.waitFor(500);
	})
	
})

