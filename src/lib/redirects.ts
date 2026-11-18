/**
 * Redirecciones 301 (las usa next.config.ts):
 * - la raíz "/" → "/es/";
 * - reglas fijas del sitio anterior → rutas nuevas;
 * - una regla por cada entrada del blog que tenga `legacyUrl` en su frontmatter.
 * Así no hay que mantener la lista de redirecciones del blog a mano.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const STATIC_RULES: [from: string, to: string][] = [
  ['/', '/es/'],
  // Páginas del sitio anterior del IDSP (idsp.com.py)
  ['/consejo-directivo/', '/es/instituto/autoridades/'],
];

function blogRules(): [string, string][] {
  const rules: [string, string][] = [];
  const dir = join(process.cwd(), 'src/content/blog');
  if (!existsSync(dir)) return rules;
  for (const lang of readdirSync(dir)) {
    for (const file of readdirSync(join(dir, lang))) {
      if (!/\.mdx?$/.test(file)) continue;
      const fm = readFileSync(join(dir, lang, file), 'utf8').split(/^---$/m)[1] ?? '';
      const legacy = fm.match(/^legacyUrl:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1];
      const draft = /^draft:\s*true\s*$/m.test(fm);
      if (legacy && !draft) rules.push([legacy, `/${lang}/blog/${file.replace(/\.mdx?$/, '')}/`]);
    }
  }
  return rules;
}

export function legacyRedirects() {
  return [...blogRules(), ...STATIC_RULES].map(([source, destination]) => ({
    // Next compara sin la barra final; se quita para que "/viejo" y "/viejo/" redirijan igual.
    source: source === '/' ? '/' : source.replace(/\/$/, ''),
    destination,
    statusCode: 301 as const,
  }));
}
