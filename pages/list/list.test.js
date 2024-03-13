const PAGE_PATH = '/pages/list/list'
describe('list', () => {
	let page,containsVite,isApp;
	containsVite  = process.env.UNI_CLI_PATH.includes('uniapp-cli-vite')
	isApp  = process.env.UNI_PLATFORM.includes('app')
	if(containsVite && isApp){
		it('vue3', async () => {
			expect(1).toBe(1)
		})
	}else{
		beforeAll(async () => {
			page = await program.switchTab(PAGE_PATH)
			await page.waitFor('view')
			await page.setData({'isTest':true})
		})
		it('检测标题', async () => {
			expect.assertions(1);
			await page.waitFor(3000)
			const getTitle = await page.data('dataList')
			console.log('getTitle: ',getTitle);
			expect(getTitle.title).toBe('阿里小程序IDE官方内嵌uni-app，为开发者提供多端开发服务')
		})
		it('点击搜索跳转', async () => {
			await page.callMethod('searchClick')
			await page.waitFor(300)
		})
	}
	
})