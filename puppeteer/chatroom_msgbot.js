const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const url = 'https://chatroom-rouge.vercel.app/'
    await page.goto(url, {
        waitUntil: 'networkidle2',
    })
    const title = await page.title()
    // await page.screenshot({path: 'chatroom.png'})

    console.log("Connection Established")
    console.log("Running bot on: " + url)
    console.log("Page title: " + title)

    await page.click('.text-blue-600')
    await page.waitForTimeout(300)

    const emailSelector = 'input[placeholder="Email"]'
    const passwordSelector = 'input[placeholder="Password"]'
    const loginButtonSelector = 'button'
    const botEmail = 'bot@email.com'
    const botPassword = 'botPassword'

    // input email and password and click login
    await page.type(emailSelector, botEmail)
    await page.type(passwordSelector, botPassword)
    await page.click('.bg-blue-600')

    await page.waitForTimeout(300)


    // const inputBarSelector = 'input'
    // await page.type(inputBarSelector, 'Hello World! from @Bot')

    await page.screenshot({path: 'chatroom-login.png'})

    await browser.close()
})()
