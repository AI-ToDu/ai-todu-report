import { readFile } from "node:fs/promises";
export const sources = [
  "report-front.md",
  "01-Chapter-1.md",
  "02-Chapter-2.md",
  "03-Chapter-3.md",
  "04-Chapter-4.md",
  "05-Chapter-5.md",
  "report-closing.md",
];
export async function reportText() {
  const content = (
    "<!-- GENERATED: edit report-front.md, chapters and report-closing.md; npm run report -->\n\n" +
    (
      await Promise.all(
        sources.map((x) =>
          readFile(new URL("../" + x, import.meta.url), "utf8"),
        ),
      )
    )
      .map((x) => x.replaceAll("\r\n", "\n").trim())
      .join("\n\n---\n\n") +
    "\n"
  );
  const counts = new Map();
  const toc = [];
  for (const match of content.matchAll(/^(#{1,4}) (.+)$/gm)) {
    const title = match[2];
    const raw = title.toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, "").replace(/ /g, "-");
    const count = counts.get(raw) ?? 0;
    counts.set(raw, count + 1);
    if (title === "Tabla de contenidos") continue;
    toc.push("  ".repeat(match[1].length - 1) + "- [" + title + "](#" + raw + (count ? "-" + count : "") + ")");
  }
  return content.replace("<!-- REPORT_TOC -->", toc.join("\n"));
}
