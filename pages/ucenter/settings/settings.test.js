// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start

describe('pages/ucenter/settings/settings', () => {
	let page,uniToken;
	beforeAll(async () => {
		try {
			page = await program.navigateTo('/pages/ucenter/settings/settings')
			await page.waitFor('view')
			uniToken = await page.data('uniToken')
			// console.log('uniToken:',uniToken);
		} catch (err) {
			console.log("err: ",err);
		}
	})

	it('settings', async () => {
		if (process.env.UNI_PLATFORM.startsWith("app")) {
			await page.callMethod('clearTmp')
			const pushRes = await page.data('pushIsOn')
			if (pushRes == "wait") {await page.callMethod('pushServer.off')}
		}else{
			const el = await page.$('.content')
			await page.waitFor('view')
			expect.assertions(1);
			expect((await el.$$('.mt10')).length).toBe(2)
		}
		
	})
	it('退出登录', async () => {
		if(uniToken){await page.callMethod('changeLoginState')}
		console.log(await program.currentPage());
	})

});
