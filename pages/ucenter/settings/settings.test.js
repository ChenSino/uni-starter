// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start

// import {mapGetters} from 'vuex';

describe('pages/ucenter/settings/settings', () => {
	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/settings/settings')
		await page.waitFor(500)
	})
	
	it('退出登录', async () => {
		const perPage = await page.$('.content')
		const uList = await perPage.$('.userInfo-class')
		await page.waitFor(300)
		const getTokenRes =  await page.waitFor(async()=>{
			return await page.data('uniToken')
		})
		console.log("getTokenRes: ",getTokenRes);
		await page.callMethod('clickLogout')
		console.log((await program.currentPage()).path);
	})
	
	
});