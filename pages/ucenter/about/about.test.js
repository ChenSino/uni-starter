// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
const PAGE_PATH = '/pages/ucenter/about/about'
describe('about', () => {
	let page,isWX;
	beforeAll(async () => {
		isWX = process.env.UNI_PLATFORM === "mp-weixin"
		if(!isWX){
			page = await program.reLaunch(PAGE_PATH)
			await page.waitFor('view')
		}
	})
	it('appName', async () => {
		if(isWX)return
		expect.assertions(1);
		expect((await page.data('about')).appName).toBe('uni-starter')
	})
});
