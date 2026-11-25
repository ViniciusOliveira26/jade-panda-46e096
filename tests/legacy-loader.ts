// Loads the pedagogical content exactly as it was in version 1 (legacy/v1), so tests can
// prove that the content moved to src/content is identical to the original.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const dir = fileURLToPath(new URL("../legacy/v1/", import.meta.url));

export interface LegacyContent {
  units: any[];
  questions: any[][];
  vocab: any[][];
  fills: any[][];
  examExtra: any[][];
  dialogues: string[];
  DLG_SPK: string[];
  LESSONS: any[][];
  READINGS: any[];
  WRITING: any[];
}

export function loadLegacyContent(): LegacyContent {
  const html = readFileSync(dir + "index.html", "utf8");
  const lessons = readFileSync(dir + "lessons.js", "utf8");
  const start = html.indexOf("const units = [");
  const end = html.indexOf("const FLASH_MIN");
  const data = html.slice(start, end); // units … questions.forEach(merge MORE_Q / MORE_VOCAB)
  const line = (prefix: string) => html.split("\n").find((l) => l.startsWith(prefix)) ?? "";
  const ctx = vm.createContext({});
  vm.runInContext(lessons, ctx);
  vm.runInContext(data, ctx);
  vm.runInContext(line("const dialogues=") + "\n" + line("const DLG_SPK="), ctx);
  return vm.runInContext(
    "JSON.parse(JSON.stringify({units,questions,vocab,fills,examExtra,dialogues,DLG_SPK,LESSONS,READINGS,WRITING}))",
    ctx
  );
}
