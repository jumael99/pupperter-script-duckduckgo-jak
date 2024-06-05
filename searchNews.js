const puppeteer = require('puppeteer');

async function searchHere(searchedString) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    });
    const page = await browser.newPage();

    await page.goto("https://www.duckduckgo.com/");

    await page.type("#searchbox_input", searchedString);
    await page.keyboard.press("Enter");


    await page.waitForSelector(".At_VJ9MlrHsSjbfCtz2_", {timeout: 60000});

    const searchResults = await page.evaluate(() => {
        const results = [];

        /*This part is an attribute selector*/
        document.querySelectorAll("li[data-layout='organic']").forEach((item) => {
            // Find all links within these elements
            const links = item.querySelectorAll("a");

            for (let link = 0; link < links.length; link+=2) {
                results.push(links[link].href);
            }
        });
        return results;
    });

    /*Just showing the stored links*/
    searchResults.forEach((result, index, array) => {
        console.log(result);
    });

    //press ctrl+c in terminal to kill the process
}

/*Enter your word to search*/
searchHere("Javascript")