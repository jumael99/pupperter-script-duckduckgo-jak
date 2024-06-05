const puppeteer = require('puppeteer');

async function searchHere(searchedString) {
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport: false
    });
    const page = await browser.newPage();

    await page.goto("https://www.google.com/");

    await page.type(".gLFyf", searchedString);
    await page.keyboard.press("Enter");

    await page.waitForSelector(".g h3", { timeout: 60000 });

    const searchResults = await page.evaluate(() => {
        const results = [];
        document.querySelectorAll("h3").forEach((link) => {
            const parent = link.closest("a");
            if (parent) {
                results.push({
                    title: link.textContent,
                    url: parent.href,
                });
            }
        });
        return results;
    });

    searchResults.forEach((result, index) => {
        console.log(`${result.url}`);
    });

    //press ctrl+c in terminal to kill the process
}

searchHere("Javascript")