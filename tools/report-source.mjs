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
  return (
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
}
