describe('pages/ucenter/ucenter.vue', () => {

	let page,uniToken;
	beforeAll(async () => {
		try{
			page = await program.switchTab('/pages/ucenter/ucenter')
			await page.waitFor(300)
			
			uniToken = await page.data('uniToken')
			console.log("uniToken: ",uniToken);
			console.log(await program.pageStack());
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
		console.log("getUcenterList: ",getUcenterList);
		if(process.env.UNI_PLATFORM === "app-plus"){
			expect(getUcenterList.length).toBe(3)
		}
		
	})
	

	it('普通签到', async () => {
		
		if(uniToken){
			if(process.env.UNI_PLATFORM === "app-plus"){
					console.log('app-plus----普通签到');
					const signInByAdRes = await page.callMethod('signInByAd')
					console.log("signInByAdRes: ",signInByAdRes);
					await page.waitFor(300)
					
					await page.callMethod('share')
					
					await program.screenshot({
						path: "static/screenshot/sign-app.png" 
					})
			}else if(process.env.UNI_PLATFORM === "h5"){
				console.log('else----普通签到');
				await page.callMethod('signIn')
				await program.screenshot({
					path: "static/screenshot/sign-h5.png" 
				})

			}else{
				await page.callMethod('signIn')
				await page.waitFor(1000)
				await program.screenshot({
					path: "static/screenshot/sign-weixin.png" 
				})
			}
		}

	})

	it('我的积分', async () => {
		if(uniToken){
			const getScoreRes = await page.callMethod('getScore')
			console.log("getScoreRes: ", getScoreRes);
			if (getScoreRes && getScoreRes.score) {
				console.log("已登录--今日已签到");
				expect.assertions(2);
				expect(getScoreRes.score).not.toBeUndefined();
				expect(getScoreRes.balance).toBeGreaterThanOrEqual(getScoreRes.score);
			} else {
				console.log("签到失败");
			}
		}else{
			console.log("getScoreRes: 未登录");
			try{
				await program.navigateTo('/uni_modules/uni-id-pages/pages/login/login-withpwd')
				await page.waitFor(500)
			}catch(e){
				console.log("e: ",e);
			}
		}
	})
})
