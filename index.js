const { chromium } = require("playwright");
const express = require("express");

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  // Call your function here
  runScript();

  res.send("Script started...");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// Function to run your script
async function runScript() {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("https://www.google.com");

    //search for "playwright"
    await page.fill("#APjFqb", "metaspace innovations ltd");

    //click enter
    await page.press("#APjFqb", "Enter");

    //get the first search result and click on it
    await page.click(
      "#rso > div:nth-child(1) > div > div > div.kb0PBd.cvP2Ce.jGGQ5e > div > div > a"
    );
    //wait for page to load
    await page.waitForTimeout(5000);
    // Scroll down to the bottom of the page
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait for 5 seconds
    await page.waitForTimeout(5000);

    // Scroll back to the top of the page
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });

    // Wait for 5 seconds
    await page.waitForTimeout(5000);
    //click on services
    await page.click("text=Services");
    // Wait for 5 seconds
    await page.waitForTimeout(5000);
    //click on about
    await page.click("text=Contact");
    // Wait for 5 seconds
    await page.waitForTimeout(5000);
    //date
    var date = new Date()
      .toISOString()
      .replace(/[-:.T]/g, "")
      .slice(0, 14);

    // Capture a screenshot and save consecutively
    // await page.screenshot({ path: `screenshots/${date}.png` });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
}
//initial run
runScript();

// Run the script every 2 minutes
setInterval(runScript, 2 * 60 * 1000);
