import puppeteer from 'puppeteer-core';

export const runPuppeteer = async (req: any, res: any) => {
  console.log('creating...')
  console.log(req.body)

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();

  if (req.body.url) {
    await page.goto(req.body.url)
  } else {
    await page.goto('https://google.com');
  }
  const img: string = await page.screenshot({encoding: "base64"});

  browser.close();
  console.log('created!!!')
  res.send({ img })
};
