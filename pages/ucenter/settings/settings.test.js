// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start

describe('pages/ucenter/settings/settings', () => {
	let page
	beforeAll(async () => {
		try {
			page = await program.navigateTo('/pages/ucenter/settings/settings')
			console.log("page: ",page);
			await page.waitFor(500)
		} catch (e) {
			console.log("e: ",e);
		}
		console.log("pageStack: ",await program.pageStack());
		console.log('uniToken:',await page.data('uniToken'));
		
	})


	it('settings', async () => {
		if (process.env.UNI_PLATFORM == "mp-weixin") {
			console.log('mp-weixin');
			await program.screenshot({
				path: "static/screenshot/settings-weixin.png" 
			})
		}
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
		// console.log(await program.currentPage(),"111111111");
		await program.navigateBack()
		
	})

	it('退出登录', async () => {
		const getTokenRes = await page.waitFor(async () => {
			return await page.data('uniToken')
		})
		console.log("getTokenRes: ", getTokenRes);
		
		
		if(getTokenRes){
			await page.callMethod('clickLogout')
		}
	})
	
	

});
