#!/usr/bin/env node
/**
 * Verifica que cada URL del sitio anterior (migration/old-urls.txt) siga funcionando:
 * o existe tal cual en dist/, o tiene una regla en dist/_redirects cuyo destino existe en dist/.
 * Simula el matching de Netlify (con o sin barra final, comodín `*`).
 * Uso: npm run build && npm run check:redirects
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const urls = readFileSync('migration/old-urls.txt', 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
const rules = readFileSync(join(dist, '_redirects'), 'utf8')
  .split('\n')
  .filter((l) => l.trim() && !l.startsWith('#'))
  .map((l) => {
    const [from, to, status] = l.trim().split(/\s+/);
    return { from, to, status };
  });

const strip = (p) => (p.length > 1 ? p.replace(/\/$/, '') : p);
const matches = (from, url) => {
  if (from.endsWith('*')) return url.startsWith(from.slice(0, -1));
  return strip(from) === strip(url);
};
const existsInDist = (path) => {
  const clean = decodeURI(path.split('#')[0]);
  const f = join(dist, clean);
  return existsSync(clean.endsWith('/') ? join(f, 'index.html') : f) || existsSync(join(f, 'index.html'));
};

let failures = 0;
for (const url of urls) {
  const rule = rules.find((r) => matches(r.from, url));
  const forced = rule?.status?.endsWith('!');
  if (existsInDist(url) && !forced) {
    console.log(`  ok   ${url}  (se sirve tal cual)`);
    continue;
  }
  if (!rule) {
    console.log(`  FALTA ${url}  → sin regla de redirección`);
    failures++;
    continue;
  }
  if (!existsInDist(rule.to)) {
    console.log(`  ROTA  ${url}  → ${rule.to} (el destino no existe en dist/)`);
    failures++;
    continue;
  }
  console.log(`  ok   ${url}  → ${rule.to} ${rule.status}`);
}
console.log(`\n${urls.length - failures}/${urls.length} URLs antiguas resueltas.`);
process.exit(failures ? 1 : 0);
