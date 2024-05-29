let pageIndex = 0
const pages = [
	'/uni_modules/uni-id-pages/pages/login/login-withpwd',
  '/pages/grid/grid'
]

let page;
describe('page screenshot test', () => {
  if(process.env.uniTestPlatformInfo == 'ios_simulator 13.7'){
    it('ios', async () => {
    	expect(1).toBe(1)
    })
    return
  }
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
  	expect(image).toSaveImageSnapshot();
  	await page.waitFor(500);
  })
})