import { writeFile } from "node:fs/promises";
import { reportText } from "./report-source.mjs";
await writeFile(new URL("../README.md", import.meta.url), await reportText());
console.log("README synchronized from canonical chapters.");
