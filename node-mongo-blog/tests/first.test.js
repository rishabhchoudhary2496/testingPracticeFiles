let server
describe('login', () => {
  beforeAll(async () => {
    server = require('../app')
    jest.setTimeout(35000)
    await page.goto(URL, { waitUntil: 'domcontentloaded' })
  })

  afterAll(async () => {
    server.close()
  })

  test('should pass if login is success and redirect to home', async (done) => {
    const title = await page.title()
    await page.type('input[type = "email"]', 'morgan@gmail.com')
    await page.type('input[type = "password"]', '12345678')
    await page.click('button')
    //wait until page is loaded
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    const url = await page.url()
    expect(url).toBe('http://localhost:5000/')
    done()
  })
})
