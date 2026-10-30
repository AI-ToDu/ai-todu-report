import { readFile, access, readdir } from "node:fs/promises";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { reportText, sources } from "./report-source.mjs";
const expected = await reportText();
assert.ok(
  (await readFile(new URL("../README.md", import.meta.url), "utf8")).replaceAll(
    "\r\n",
    "\n",
  ) === expected,
  "Run npm run report after editing a chapter.",
);
const files = [
  ...sources,
  "README.md",
  "REVIEW.md",
  "design/architecture.md",
  "design/ddd-review.md",
  "design/database/dictionary.md",
];
let checked = 0;
for (const file of files) {
  const url = new URL("../" + file, import.meta.url);
  const text = await readFile(url, "utf8");
  for (const match of text.matchAll(
    /(?:!\[[^\]]*\]\(([^)]+)\)|<img[^>]+src="([^"]+)")/g,
  )) {
    const target = match[1] ?? match[2];
    if (!/^(https?:|data:)/.test(target)) {
      await access(new URL(target, url));
      checked++;
    }
  }
  for (const match of text.matchAll(/(?<!!)\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (!/^(https?:|#|mailto:)/.test(target))
      await access(new URL(target.split("#")[0], url));
  }
  assert.ok(
    !/fake-id-|URL_Publico_Del_Tablero/.test(text),
    "Unresolved fake evidence URL in " + file,
  );
}
const plans = await readFile(
  new URL("../05-Chapter-5.md", import.meta.url),
  "utf8",
);
for (const match of plans.matchAll(/\| (\d+) h \|/g)) {
  const hours = Number(match[1]);
  assert.ok(hours >= 4 && hours <= 8);
}
assert.equal([...expected.matchAll(/^\| \d+ \| US\d+/gm)].length, 37);
const model = JSON.parse(
  await readFile(
    new URL("../design/database/model.json", import.meta.url),
    "utf8",
  ),
);
assert.equal(Object.keys(model.tables).length, 35);
for (const file of (
  await readdir(new URL("../design/diagrams/", import.meta.url))
).filter((x) => x.endsWith(".mmd")))
  await access(
    new URL(
      "../design/diagrams/rendered/" + file.replace(".mmd", ".svg"),
      import.meta.url,
    ),
  );
console.log(
  "Report synchronized; " +
    checked +
    " local image references, 37 stories, 35 tables, task estimates and diagram outputs checked.",
);

const origin = JSON.parse(
  await readFile(
    new URL("../design/database/provenance.json", import.meta.url),
    "utf8",
  ),
);
for (const [name, expected] of Object.entries(origin.files)) {
  const text = (
    await readFile(
      new URL("../design/database/" + name, import.meta.url),
      "utf8",
    )
  ).replaceAll("\r\n", "\n");
  assert.equal(
    createHash("sha256").update(text).digest("hex"),
    expected,
    "Relational source drift: " + name,
  );
}
