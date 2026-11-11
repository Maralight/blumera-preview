import playwright from "playwright";
import fs from "node:fs/promises";

const { chromium } = playwright;

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
const outputDir = process.env.PREVIEW_DIR || "tests/artifacts";
const viewports = [
  ["phone-320", 320, 720],
  ["phone-360", 360, 800],
  ["phone-390", 390, 844],
  ["phone-430", 430, 932],
  ["tablet-768", 768, 1024],
  ["tablet-1024", 1024, 768],
  ["desktop-1440", 1440, 1000],
];

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});
const results = [];

for (const [name, width, height] of viewports) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", error => errors.push(`pageerror: ${error.message}`));
  page.on("console", msg => { if (msg.type() === "error") errors.push(`console: ${msg.text()}`); });
  await page.goto(`${baseURL}/index.html`, { waitUntil: "networkidle" });

  const state = await page.evaluate(() => ({
    title: document.title,
    horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    heroVisible: Boolean(document.querySelector(".hero-title")?.getBoundingClientRect().height),
    logoLoaded: Boolean(document.querySelector(".brand img")?.complete),
    brokenImages: [...document.images].filter(img => img.loading !== "lazy" && (!img.complete || img.naturalWidth === 0)).map(img => img.src),
    targetSizes: [...document.querySelectorAll("a,button")].filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && (rect.width < 40 || rect.height < 40);
    }).length,
  }));

  if (width <= 760) {
    await page.locator("[data-menu-toggle]").click();
    const expanded = await page.locator("[data-menu-toggle]").getAttribute("aria-expanded");
    const menuOpen = await page.locator("[data-menu]").evaluate(el => el.classList.contains("is-open"));
    if (expanded !== "true" || !menuOpen) errors.push("mobile menu did not open correctly");
    await page.keyboard.press("Escape");
  }

  if (name === "phone-390") {
    await page.screenshot({ path: `${outputDir}/Blumera_Mobile_Preview.png`, fullPage: true });
  }
  if (name === "desktop-1440") {
    await page.screenshot({ path: `${outputDir}/Blumera_Desktop_Preview.png`, fullPage: true });
  }

  results.push({ name, ...state, errors });
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`${baseURL}/request-quote.html`, { waitUntil: "networkidle" });
await page.locator("button[type=submit]").click();
const validationCount = await page.locator("[aria-invalid=true]").count();
await page.locator("#name").fill("Test User");
await page.locator("#company").fill("Test Company");
await page.locator("#email").fill("test@example.com");
await page.locator("#phone").fill("08000000000");
await page.locator("#category").selectOption({ label: "Heavy-Duty Vehicles" });
await page.locator("#equipment").fill("Tipper truck");
await page.locator("#quantity").fill("1");
await page.locator("#delivery-location").fill("Lagos");
await page.locator("input[name=consent]").check();
await page.locator("button[type=submit]").click();
const endpointNotice = await page.locator("[data-form-notice]").textContent();
const formOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
results.push({ name: "rfq-form", validationCount, endpointNotice: endpointNotice?.trim(), horizontalOverflow: formOverflow });

for (const path of ["/index.html", "/request-quote.html", "/privacy.html", "/404.html", "/site.webmanifest", "/robots.txt", "/sitemap.xml"]) {
  const response = await page.request.get(`${baseURL}${path}`);
  results.push({ name: `route:${path}`, status: response.status() });
}

await browser.close();
await fs.writeFile(`${outputDir}/qa-results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));

const failed = results.some(item =>
  item.status && item.status !== 200 ||
  item.horizontalOverflow > 1 ||
  item.brokenImages?.length ||
  item.errors?.length ||
  item.heroVisible === false ||
  item.logoLoaded === false
);
if (failed) process.exitCode = 1;
