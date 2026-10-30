import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";
import puppeteer from "puppeteer";
import { reportText } from "./report-source.mjs";
const output = new URL("../output/", import.meta.url);
await mkdir(output, { recursive: true });
const md = new MarkdownIt({ html: true, linkify: true, typographer: false });
const counts = new Map();
md.renderer.rules.heading_open = (tokens, index) => {
  const raw = tokens[index + 1].content
    .toLowerCase()
    .replace(/[^\p{L}\p{N} _-]/gu, "")
    .replace(/ /g, "-");
  const count = counts.get(raw) ?? 0;
  counts.set(raw, count + 1);
  return (
    "<" + tokens[index].tag + ' id="' + raw + (count ? "-" + count : "") + '">'
  );
};
const css = await readFile(
  new URL("../assets/report.css", import.meta.url),
  "utf8",
);
const linkOpen =
  md.renderer.rules.link_open ??
  ((tokens, index, options, env, self) =>
    self.renderToken(tokens, index, options));
md.renderer.rules.link_open = (tokens, index, options, env, self) => {
  const href = tokens[index].attrGet("href");
  if (href && !/^(https?:|#|mailto:)/.test(href))
    tokens[index].attrSet(
      "href",
      "https://github.com/AI-ToDu/ai-todu-report/blob/fix/tb1-readiness/" +
        href,
    );
  return linkOpen(tokens, index, options, env, self);
};
const content = md.render(await reportText());
const html =
  '<!doctype html><html lang="es-PE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="../"><title>AI-ToDu · TB1 · NRC 7750</title><style>' +
  css +
  "</style></head><body><main>" +
  content +
  "</main></body></html>";
const htmlPath = new URL("report.html", output);
await writeFile(htmlPath, html);
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.MERMAID_CHROME_PATH || undefined,
  args: ["--no-sandbox", "--allow-file-access-from-files"],
});
try {
  const page = await browser.newPage();
  await page.goto(htmlPath.href, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  const broken = await page.evaluate(() =>
    [...document.images]
      .filter((i) => !i.complete || !i.naturalWidth)
      .map((i) => i.src),
  );
  if (broken.length)
    throw new Error("Broken report images: " + broken.join(", "));
  await page.pdf({
    path: fileURLToPath(
      new URL(
        "upc-pre-202620-1asi0729-7750-ia-innovation-report-tb1.pdf",
        output,
      ),
    ),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate:
      '<div style="font-size:8px;color:#526d80;width:100%;margin:0 16mm;font-family:Arial">AI-ToDu · TB1 correction · NRC 7750</div>',
    footerTemplate:
      '<div style="font-size:8px;color:#526d80;width:100%;margin:0 16mm;font-family:Arial;display:flex;justify-content:space-between"><span>IA-INNOVATION · 30/10/2026</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    margin: { top: "16mm", bottom: "17mm", left: "16mm", right: "16mm" },
  });
  console.log(
    "HTML/PDF exported from the canonical report; all embedded images loaded.",
  );
} finally {
  await browser.close();
}
