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
	

	it('普通签到', async () => {

		
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM === "mp-weixin") {
			await page.callMethod('signIn')
			await page.waitFor(300)
			const image = await program.screenshot({
				path: "static/screenshot/sign-h5.png" // 默认项目根目录 process.env.UNI_PLATFORM === "h5" || 
			})
			console.log(image, "image--------------------")
		}
		
		
		if (process.env.UNI_PLATFORM === "app-plus") {
			const signInByAdRes = await page.callMethod('signInByAd')
			console.log("signInByAdRes: ",signInByAdRes);
			
			await page.waitFor(300)
			const shareRes = await page.callMethod('share')
			console.log("shareRes: ",shareRes);
			await page.waitFor(300)
			
			const imageApp = await program.screenshot({
				path: "static/screenshot/sign-app.png" // 默认项目根目录 process.env.UNI_PLATFORM === "h5" || 
			})
			console.log(imageApp, "imageApp--------------------")
			
		}
	})

	it('我的积分', async () => {
		// expect.assertions(1);
		await page.waitFor(300)

		const getScoreRes = await page.callMethod('getScore')
		console.log("getScoreRes: ", getScoreRes);
		if (getScoreRes) {
			console.log("今日已签到");
			expect(getScoreRes.score).not.toBeUndefined();
			expect(getScoreRes.balance).toBeGreaterThanOrEqual(getScoreRes.score);
		} else {
			console.log("签到失败");
		}

		// await page.waitFor(500)
	})


})
