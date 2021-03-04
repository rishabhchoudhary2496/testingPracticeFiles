const puppeteer = require('puppeteer')
//launching chromium
// ;(async () => {
//   const browser = await puppeteer.launch()
//   console.info(browser)
//   await browser.close()
// })()

//browser contexts
// ;(async () => {
//   const browser = await puppeteer.launch()

//   // A reference for the default browser context
//   const defaultContext = browser.defaultBrowserContext()
//   console.info(defaultContext.isIncognito()) // False

//   // Creates a new browser context in icognito mode
//   const newContext = await browser.createIncognitoBrowserContext()
//   console.info(newContext.isIncognito()) // True

//   // Closes the created browser context
//   await newContext.close()

//   // Closes the browser with the default context
//   await browser.close()
// })()

//headful mode open gui browser
// ;(async () => {
//   // Makes the browser to be launched in a headful way
//   const browser = await puppeteer.launch({ headless: false })
//   console.info(browser)
//   await browser.close()
// })()

//terminate browser ourselves and opening devtools if we want ot debugging
// ;(async () => {
//   const browser = await puppeteer.launch({ devtools: true })

//   // Browser operations

//   // Holds the browser until we terminate the process explicitly
//   await browser.waitForTarget(() => false)

//   await browser.close()
// })()
