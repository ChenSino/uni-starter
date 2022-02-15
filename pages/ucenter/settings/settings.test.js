// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start

describe('pages/ucenter/settings/settings', () => {
	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/settings/settings')
		await page.waitFor(500)
	})


	it('清理缓存', async () => {
		
		if (process.env.UNI_PLATFORM === "app-plus") {
			//清理缓存
			await page.callMethod('clearTmp')
			console.log(await page.data('pushIsOn'), "pushIsOn-------------");
			const pushRes = await page.data('pushIsOn')
			if (pushRes == "wait") {
				await page.callMethod('pushServer.off')
			}
		}
	})


	/* it('退出登录', async () => {
		const getTokenRes = await page.waitFor(async () => {
			return await page.data('uniToken')
		})
		console.log("getTokenRes: ", getTokenRes);
		
		console.log(await page.data('uniToken'), 'uniToken-------------------------');
		if(getTokenRes){
			await page.callMethod('clickLogout')
		}
	}) */


});
