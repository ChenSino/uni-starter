// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start
const PAGE_PATH = '/pages/ucenter/settings/settings'
describe('settings', () => {
	let page,uniToken;
	beforeAll(async () => {
		try {
			page = await program.navigateTo(PAGE_PATH)
			await page.waitFor('view')
			uniToken = await program.callUniMethod('getStorageSync', 'uni_id_token')
			console.log("uniToken: ",uniToken);
		} catch (err) {
			console.log("err: ",err);
		}
	})
	it('settings', async () => {
		if(!uniToken)return;
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
		if(!uniToken)return;
		const bottomEl = await page.$('.bottom-back-text')
		expect(await bottomEl.text()).toBe('退出登录')
		await page.callMethod('changeLoginState')
		await page.waitFor(500)
		console.log(await program.currentPage());
	})

});
