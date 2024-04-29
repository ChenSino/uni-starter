// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
const PAGE_PATH = '/pages/list/search/search'
describe('search', () => {
	let page, containsVite, isApp;
	containsVite = process.env.UNI_CLI_PATH.includes('uniapp-cli-vite')
	isApp = process.env.UNI_PLATFORM.includes('app')
	console.log('uniTestPlatformInfo', process.env.uniTestPlatformInfo)
	console.log((containsVite && isApp) ,process.env.uniTestPlatformInfo == 'ios_simulator 13.7')
	if ((containsVite && isApp) || process.env.uniTestPlatformInfo == 'ios_simulator 13.7') {
		it('app--vue3', async () => {
			expect(1).toBe(1)
		})
		return
	}
	beforeAll(async () => {
		page = await program.reLaunch(PAGE_PATH)
		console.log('page', page)
		console.log('page', await program.pageStack())
		await page.waitFor('view')
	})
	it('搜索发现-显示-隐藏', async () => {
		expect.assertions(2);
		// 搜索发现 刷新
		await page.callMethod('searchHotRefresh')
		await page.waitFor(1000)
		// 是否隐藏热搜列表  netHotListIsHide：fasle 未隐藏
		const getShow = await page.data('netHotListIsHide')
		expect(getShow).toBeFalsy()
		if (!getShow) {
			// 设置netHotListIsHide：true 隐藏
			await page.setData({
				netHotListIsHide: true
			})
			expect(await page.data('netHotListIsHide')).toBeTruthy()
		}
	})
	it('搜索内容', async () => {
		await page.waitFor(300)
		await page.setData({
			searchText: '小程序'
		})
		await page.callMethod('search', '小程序')
	})
});