/**
 * puppeteer-core 逐卡截图为 PNG，并打印每张卡 .body 的溢出量。
 *
 * 注意命名是 shoot.cjs（CommonJS）——package.json 设了 "type":"module"，
 * 若用 .js 会在 ES module 下 require() 报错。生成脚本用 .mjs，截图脚本用 .cjs。
 *
 * 卡数自动按 HTML 里 .card 元素个数决定，无需手改。
 * 截图前等字体加载完（document.fonts.ready + 1.5s），避免网络字体回退。
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

// 找不到浏览器就改这个数组，或设环境变量 PUPPETEER_EXECUTABLE_PATH
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];

function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Chrome not found. Edit CHROME_PATHS or set PUPPETEER_EXECUTABLE_PATH.');
}

const HTML_FILE = 'cards.html';

(async () => {
  const cardsHtml = path.resolve(__dirname, HTML_FILE);
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const executablePath = findChrome();
  console.log('Using browser:', executablePath);

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1440, deviceScaleFactor: 1 });

  console.log('Loading HTML...');
  await page.goto('file:///' + cardsHtml.replace(/\\/g, '/'), {
    waitUntil: 'networkidle0',
    timeout: 60000
  });

  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1500));

  const total = await page.$$eval('.card', els => els.length);
  console.log(`Found ${total} card(s).`);

  for (let i = 1; i <= total; i++) {
    const el = await page.$(`#card-${i}`);
    if (!el) { console.error(`card-${i} not found`); continue; }
    // 量 .body 溢出：>0 内容被裁，=0 正常（留白靠 justify-content 兜底）
    const overflow = await el.evaluate(node => {
      const body = node.querySelector('.body');
      if (!body) return null;
      return body.scrollHeight - body.clientHeight;
    });
    const out = path.join(outDir, `card-${i}.png`);
    await el.screenshot({ path: out, type: 'png' });
    const stat = fs.statSync(out);
    const ovStr = overflow === null ? 'n/a' : (overflow > 0 ? `OVERFLOW ${overflow}px` : 'ok');
    console.log(`  card-${i}.png  ${(stat.size / 1024).toFixed(1)} KB  body:${ovStr}`);
  }

  await browser.close();
  console.log('Done. Output in ./out/');
})();
