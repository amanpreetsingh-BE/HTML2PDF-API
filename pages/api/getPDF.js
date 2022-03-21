export default async function handler(req, res) {
  if (req.method === "POST" && req.body.token == process.env.TOKEN) {
    try {
      const html = req.body.html;
      const context = req.body.context;

      const hbs = require("handlebars");
      const puppeteer = require("puppeteer-core");
      const chromium = require("chrome-aws-lambda");

      const T = hbs.compile(html);
      const compiledHTML = T(context);
      const browser = await puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
      });
      const page = await browser.newPage();
      await page.setContent(compiledHTML);
      const buffer = await page.pdf({ format: "A4" });
      const base64PDF = buffer.toString("base64");
      await browser.close();
      res.json({ base64PDF: base64PDF });
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
