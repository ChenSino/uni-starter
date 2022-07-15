// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start

describe('pages/ucenter/settings/settings', () => {
	let page,uniToken;
	beforeAll(async () => {
		try {
			page = await program.navigateTo('/pages/ucenter/settings/settings')
			await page.waitFor(1000)
			console.log("pageStack: ",await program.pageStack());
			uniToken = await page.data('uniToken')
			console.log('uniToken:',uniToken);
		} catch (e) {
			console.log("e: ",e);
		}
	})

	it('settings', async () => {
		if (process.env.UNI_PLATFORM == "app-plus") {
			await page.callMethod('clearTmp')
			// console.log(await page.data('pushIsOn'), "pushIsOn-------------");
			const pushRes = await page.data('pushIsOn')
			if (pushRes == "wait") {
				await page.callMethod('pushServer.off')
			}
		}
		await page.callMethod('deactivate')
		await page.waitFor(300)
		await program.navigateBack()
	})

	it('退出登录', async () => {
		
		if(uniToken){
			await page.callMethod('clickLogout')
		}
		// console.log(await program.currentPage(),"333333");
	})

});
