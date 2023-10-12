// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start

describe('pages/ucenter/settings/settings', () => {
	let page,uniToken;
	beforeAll(async () => {
		try {
			page = await program.navigateTo('/pages/ucenter/settings/settings')
			await page.waitFor(1000)
			// console.log(await program.pageStack());
			uniToken = await page.data('uniToken')
			console.log('uniToken:',uniToken);
		} catch (err) {
			console.log("err: ",err);
		}
	})

	it('settings', async () => {
		if (process.env.UNI_PLATFORM.startsWith("app")) {
			await page.callMethod('clearTmp')
			// console.log(await page.data('pushIsOn'), "pushIsOn-------------");
			const pushRes = await page.data('pushIsOn')
			if (pushRes == "wait") {
				await page.callMethod('pushServer.off')
			}
		}else{
			const el = await page.$('.content')
			const elList = await el.$$('.mt10')
			console.log("elList: ",elList.length);
			expect.assertions(1);
			expect(elList.length).toBe(2)
		}
		await page.waitFor(300)
		
	})

	// it('退出登录', async () => {
		
	// 	if(uniToken){
	// 		await page.callMethod('clickLogout')
	// 	}
	// 	console.log(await program.currentPage(),"333333");
	// })

});
