// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
const PAGE_PATH = '/pages/ucenter/about/about'
describe('about', () => {
	let page;
	if(process.env.UNI_PLATFORM === "mp-weixin"){
		it('微信平台不支持', async () => {
			expect(1).toBe(1)
		})
		return
	}
  beforeAll(async () => {
  	page = await program.reLaunch(PAGE_PATH)
  	await page.waitFor('view')
  })
  it('appName', async () => {
  	expect.assertions(1);
  	expect((await page.data('about')).appName).toBe('uni-starter')
  })
});
