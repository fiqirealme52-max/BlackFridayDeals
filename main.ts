// DealHawk R3 — entrypoint: copies app/ and screenshots/ into the output
// directory and writes dossier.json with buildDossier from the vendored
// make.fun library. Deterministic: no clock, no random, no network.
// The graded run gets an empty /output; local runs reuse out/.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = dirname(fileURLToPath(import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR || '/output';

/* Empty the output directory WITHOUT deleting it: the grader mounts
   /output as a directory the grading user cannot remove or recreate,
   so removing the directory itself fails the graded run. */
mkdirSync(out, { recursive: true });
for (const entry of readdirSync(out)) rmSync(join(out, entry), { recursive: true, force: true });

cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216
});
writeFileSync(join(out, 'dossier.json'), dossier);
console.log('wrote ' + join(out, 'dossier.json') + ' (' + dossier.length + ' bytes)');
