const puppeteer = require('puppeteer');
const { text_list } = require('./texts/tu.js')

const select_texts = (selectCount) => {
    let texts = []
    for (let i = 0; i < selectCount; i++) {
        texts.push(text_list[Math.floor(Math.random() * text_list.length)])
    }
    return texts
}

const some_texts = select_texts(10)

const login = async () => {
    const browser = await puppeteer.launch({
        // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        // headless: false,
        // slowMo: 10,
    })
    const page = await browser.newPage()
    const url = 'https://chatroom-rouge.vercel.app/'
    await page.goto(url, {
        waitUntil: 'networkidle0',
    })
    const title = await page.title()

    console.log("Connection Established")
    console.log("Running bot on: " + url)
    console.log("Page title: " + title)

    // goto login page
    await page.click('.text-blue-600')

    const emailSelector = 'input[placeholder="Email"]'
    const passwordSelector = 'input[placeholder="Password"]'
    const botEmail = 'bot@email.com'
    const botPassword = 'botpassword'

    // input email and password and click login
    await page.type(emailSelector, botEmail)
    await page.type(passwordSelector, botPassword)


    await page.click('button')

    // wait for firebase to login
    await page.waitForTimeout(2000)

    const inputBarSelector = 'input'

    for (text in some_texts) {
        await page.type(inputBarSelector, some_texts[text])
        console.log("Msg Sent: " + some_texts[text])
        await page.keyboard.press('Enter')
        await page.waitForTimeout(1000)
    }

    await browser.close()
}


const signup = async (email, password) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const url = 'https://chatroom-rouge.vercel.app/'
    await page.goto(url, {
        waitUntil: 'networkidle2',
    })
    const title = await page.title()

    console.log("Connection Established")
    console.log("Running bot on: " + url)
    console.log("Page title: " + title)

    // wait for page loaded
    await page.waitForTimeout(300)

    const emailSelector = 'input[placeholder="Email"]'
    const passwordSelector = 'input[placeholder="Password"]'
    const botEmail = email
    const botPassword = password

    await page.type(emailSelector, botEmail)
    await page.type(passwordSelector, botPassword)


    await page.evaluate(() => {
        document.querySelector('button').click()
    })

    // wait for firebase to create user
    await page.waitForTimeout(1000)

    await browser.close()
}

login()
// signup('botr@email.com', 'botrpassword')