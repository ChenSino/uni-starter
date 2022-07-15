describe('pages/ucenter/ucenter.vue', () => {

	let page,uniToken;
	beforeAll(async () => {
		try{
			page = await program.switchTab('/pages/ucenter/ucenter')
			await page.waitFor(300)
			
			uniToken = await page.data('uniToken')
			console.log("uniToken: ",uniToken);
			
			const pageStack = await program.pageStack()
			console.log("pageStack: ",pageStack);
		}catch(e){
			console.log("e: ",e);
		}
		
	})
	
	it('宫格', async () => {
		const getGrid = await page.data('gridList')
		console.log("getGrid: ",getGrid);
		// expect(getGrid.length).toBe(4)
	})

	it('列表', async () => {
		const getUcenterList = await page.data('ucenterList')
		console.log("getUcenterList: ",getUcenterList);
		// expect(getUcenterList.length).toBe(3)
	})
	

	it('普通签到', async () => {
		console.log(await program.currentPage(),"1-----------");
		console.log("process.env.UNI_PLATFORM: ",process.env.UNI_PLATFORM);
		if(uniToken){
			if(process.env.UNI_PLATFORM === "app-plus"){
					console.log('app-plus----普通签到');
					const signInByAdRes = await page.callMethod('signInByAd')
					console.log("signInByAdRes: ",signInByAdRes);
					await page.waitFor(300)
					
					const shareRes = await page.callMethod('share')
					
					await program.screenshot({
						path: "static/screenshot/sign-app.png" 
					})
			}else{
				console.log('else----普通签到');
				await page.callMethod('signIn')
				// await page.waitFor(1000)
				// await program.screenshot({
				// 	path: "static/screenshot/sign-weixin-h5.png" 
				// })
			}
		}

	})

	it('我的积分', async () => {
		// expect.assertions(1);
		
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
				await program.navigateTo('/pages/ucenter/login-page/pwd-login/pwd-login')
				await page.waitFor(500)
			}catch(e){
				console.log("e: ",e);
			}
		}
	})
})
