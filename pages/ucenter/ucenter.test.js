describe('pages/ucenter/ucenter.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.switchTab('/pages/ucenter/ucenter')
		await page.waitFor(300)
		console.log("page:2 ",page);
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
		// const uniToken = await page.data('uniToken')
		// console.log("uniToken: ",uniToken);
		console.log("process.env.UNI_PLATFORM: ",process.env.UNI_PLATFORM);
		if (process.env.UNI_PLATFORM == "mp-weixin" || process.env.UNI_PLATFORM == "h5"){
			await page.callMethod('signIn')
			await page.waitFor(3000)
			await program.screenshot({
				path: "static/screenshot/sign-weixin-h5.png" 
			})
		}
		if(process.env.UNI_PLATFORM === "app-plus"){
				console.log('app-plus');
				const signInByAdRes = await page.callMethod('signInByAd')
				// await page.waitFor(300)
				const shareRes = await page.callMethod('share')
				// await page.waitFor(300)
				
				await program.screenshot({
					path: "static/screenshot/sign-app.png" 
				})
		}

	})

	it('我的积分', async () => {
		// expect.assertions(1);
		await page.waitFor(300)

		const getScoreRes = await page.callMethod('getScore')
		console.log("getScoreRes: ", getScoreRes);
		if (getScoreRes) {
			console.log("今日已签到");
			// expect(getScoreRes.score).not.toBeUndefined();
			// expect(getScoreRes.balance).toBeGreaterThanOrEqual(getScoreRes.score);
		} else {
			console.log("签到失败");
		}
	})

})
