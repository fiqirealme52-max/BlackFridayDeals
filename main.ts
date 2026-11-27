import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = dirname(fileURLToPath(import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(out, { recursive: true });

const appSrc = join(here, "app");
if (existsSync(appSrc)) {
  cpSync(appSrc, join(out, "app"), { recursive: true });
}

const shotsSrc = join(here, "screenshots");
if (existsSync(shotsSrc)) {
  cpSync(shotsSrc, join(out, "screenshots"), { recursive: true });
}

const dossier = await buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});

/* buildDossier returns the dossier bytes (a Uint8Array); persist them
   verbatim as dossier.json. (Stringifying the byte array would produce a
   useless {"0": 123, ...} object instead of the real dossier.) */
if (dossier instanceof Uint8Array) {
  writeFileSync(join(out, "dossier.json"), dossier);
} else if (typeof dossier === "string") {
  writeFileSync(join(out, "dossier.json"), dossier);
} else if (dossier !== undefined && dossier !== null) {
  writeFileSync(join(out, "dossier.json"), JSON.stringify(dossier, null, 2) + "\n");
}
