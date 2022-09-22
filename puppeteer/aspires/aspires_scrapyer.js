const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const url = 'https://aspires.cc/'
    await page.goto(url, {
        waitUntil: 'networkidle2',
    })
    const title = await page.title()
    await page.screenshot({path: 'aspires-screenshot.png'})

    console.log("Connection Established")
    console.log("Running web scraper on: " + url)
    console.log("Page title: " + title)

    // click all buttons with class infinite-scroll-button to load more posts
    let buttonCnts = 2
    const buttonSelector = '.infinite-scroll-button'
    for (let i = 0; i < buttonCnts; i++) {
        await page.waitForSelector(buttonSelector)
        await page.click(buttonSelector)
        await page.waitForTimeout(300)
    }

    // await page.waitForNavigation({
    //     waitUntil: 'networkidle2',
    // })


    const articles = await page.evaluate(() => {
        // query selector all class feed-title and get the innertext
        const articles = Array.from(document.querySelectorAll('.feed-title'))
        return articles.map(article => article.innerText)
    })

    console.log(articles)

    await browser.close()
})()
