const puppeteer = require('puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 })
  // A reference for the default browser context
  const page = await browser.newPage()
  // Emulates an iPhone X
  await page.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
  )
  await page.setViewport({ width: 375, height: 812 })
  await page.goto('http://google.com')
  const title = await p1.title()
  console.log('title', title)
  // console.info(defaultContext.isIncognito()) // False
  await browser.waitForTarget(() => false)
  await browser.close()
})()
