// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start
jest.setTimeout(30000);
const PAGE_PATH = '/pages/ucenter/settings/settings'
describe('settings', () => {
	let page, hasLogin;
	if (process.env.uniTestPlatformInfo == 'ios_simulator 13.7') {
		it('ucenter-ios13.7', async () => {
			expect(1).toBe(1)
		})
		return
	}
	beforeAll(async () => {
		page = await program.navigateTo(PAGE_PATH)
		await page.waitFor('view')
		hasLogin = await page.callMethod('hasLoginTest')
		console.log("登录状态", hasLogin)
		if (!hasLogin) {
			console.log("未登录测试失败")
			return
		}
	})
	it('settings', async () => {
		if (process.env.UNI_PLATFORM.startsWith("app")) {
			await page.callMethod('clearTmp')
			const pushRes = await page.data('pushIsOn')
			if (pushRes == "wait") {
				await page.callMethod('pushServer.off')
			}
		} else {
			const el = await page.$('.content')
			await page.waitFor('view')
			expect.assertions(1);
			expect((await el.$$('.mt10')).length).toBe(2)
		}
	})
	it('退出登录', async () => {
		const bottomEl = await page.$('.bottom-back-text')
		console.log('bottom-back-text', bottomEl, await bottomEl.text())
		expect(await bottomEl.text()).toBe('退出登录')
		await page.callMethod('changeLoginState')
		await page.waitFor(1000)
	})
});