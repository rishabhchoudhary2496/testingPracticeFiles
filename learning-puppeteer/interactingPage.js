const puppeteer = require('puppeteer')
// ;(async () => {
//   const browser = await puppeteer.launch()

//   //creates a new browser page on default context
//   //page represent a tab in the browser
//   const page = await browser.newPage()
//   console.info(page)

//   await browser.close()
// })()

//navigating to new url in a page
// ;(async () => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()

//   // Instructs the blank page to navigate a URL
//   await page.goto('https://pptr.dev')

//   // Waits until the `title` meta element is rendered
//   await page.waitForSelector('title')

//   // Fetches page's title
//   const title = await page.title()
//   console.info(`The title is: ${title}`)

//   await browser.close()
// })()

//emulating devices
// const iPhoneX = puppeteer.devices['iPhone X']

// ;(async () => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()
//   await page.goto('https://pptr.dev')
//   await page.emulate(iPhoneX)
//   await page.waitFor(3000)
//   await browser.close()
// })()

//handling events
// ;(async () => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()

//   // Emitted when the DOM is parsed and ready (without waiting for resources)
//   page.once('domcontentloaded', () => console.info('✅ DOM is ready'))

//   // Emitted when the page is fully loaded
//   page.once('load', () => console.info('✅ Page is loaded'))

//   // Emitted when a response is received
//   page.on('response', (response) =>
//     console.info(`👉 Response: ${response.url()}`)
//   )

//   // Emitted when a script within the page uses `alert`, `prompt`, `confirm` or `beforeunload`
//   page.on('dialog', async (dialog) => {
//     console.info(`👉 ${dialog.message()}`)
//     await dialog.dismiss()
//   })

//   // Triggers `dialog` event
//   await page.evaluate(() => alert('An alert within the page'))

//   await page.goto('http://google.com')
//   await browser.close()
// })()

//Operating mouse

// ;(async () => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()

//   await page.setViewport({ width: 1920, height: 1080 })
//   await page.goto('https://pptr.dev')

//   // Waits until the API sidebar is rendered
//   await page.waitForSelector('sidebar-component')

//   // Hovers the second link inside the API sidebar
//   await page.mouse.click(40, 150, { delay: 1000 })

//   // Drags the mouse from a point
//   await page.mouse.move(0, 0)
//   await page.mouse.down()

//   // Drops the mouse to another point
//   await page.mouse.move(100, 100)
//   await page.mouse.up()

//   await browser.waitForTarget(() => false)

//   await browser.close()
// })()

//operating keyboard and taking screenshots

// ;(async () => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()

//   await page.setViewport({ width: 1920, height: 1080 })
//   await page.goto('https://google.com')

//   // Waits until the toolbar is rendered
//   //   await page.waitForSelector('toolbar-component')

//   // Focuses the search input
//   await page.focus('[type="text"]')

//   // Types the text into the focused element
//   await page.keyboard.type('Integration testing', { delay: 100 })
//   await page.keyboard.press('Enter')
//   await page.screenshot({ path: 'sample.png' })
//   await browser.close()
// })()

//generating pdf
// ;(async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()

//   // Navigates to the project README file
//   await page.goto(
//     'https://github.com/GoogleChrome/puppeteer/blob/master/README.md'
//   )

//   // Generates a PDF from the page content
//   await page.pdf({ path: 'overview.pdf' })

//   await browser.close()
// })()

;(async () => {
  const browser = await puppeteer.launch({ devtools: true })
  const page = await browser.newPage()

  // Grants permission for changing geolocation
  //   const context = browser.defaultBrowserContext()
  //   await context.overridePermissions('http://pexels.com', ['geolocation'])

  await page.goto('http://pexels.com')
  await page.waitForSelector('img')
  const url = await page.$eval('img', (el) => el.src)

  console.log(url)

  // Changes to the north pole's location
  await page.setGeolocation({ latitude: 90, longitude: 0 })
  await browser.waitForTarget(() => false)
  await browser.close()
})()
