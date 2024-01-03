let pageIndex = 0
const pages = [
	'/uni_modules/uni-id-pages/pages/login/login-withpwd'
]

let page;
describe('page screenshot test', () => {
	beforeAll(async () => {
		console.log("page screenshot test start");
	});
	beforeEach(async () => {
		page = await program.reLaunch(pages[pageIndex]);
		await page.waitFor(1000);
	});
	afterEach(() => {
		pageIndex++;
	});
	afterAll(() => {
		console.log("page screenshot test finish");
	});
	test.each(pages)('%s', async () => {
		const image = await program.screenshot();
		expect(image).toMatchImageSnapshot();
		await page.waitFor(500);
	})
})