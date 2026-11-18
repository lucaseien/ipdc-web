/**
 * Genera dist/_redirects (formato Netlify) al terminar el build:
 * - reglas fijas del sitio anterior → rutas nuevas;
 * - una regla por cada entrada del blog que tenga `legacyUrl` en su frontmatter.
 * Así no hay que mantener la lista de redirecciones del blog a mano.
 */
import type { AstroIntegration } from 'astro';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const STATIC_RULES: [from: string, to: string][] = [
  // Raíz → idioma por defecto (forzado: existe un index.html de respaldo)
  ['/', '/es/ 301!'],

  // Páginas del sitio anterior del IDSP (idsp.com.py)
  ['/consejo-directivo/', '/es/instituto/autoridades/'],
];

function blogRules(root: string): [string, string][] {
  const rules: [string, string][] = [];
  const dir = join(root, 'src/content/blog');
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

export default function netlifyRedirects(): AstroIntegration {
  let root = '';
  return {
    name: 'idsp:netlify-redirects',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = fileURLToPath(config.root);
      },
      'astro:build:done': ({ dir, logger }) => {
        // Las reglas específicas van antes que los comodines (Netlify aplica la primera que coincide).
        const all = [...blogRules(root), ...STATIC_RULES];
        const specific = all.filter(([from]) => !from.includes('*'));
        const wildcard = all.filter(([from]) => from.includes('*'));
        const lines = [...specific, ...wildcard].map(([from, to]) => `${from.padEnd(60)} ${to.includes(' ') ? to : `${to} 301`}`);
        writeFileSync(join(fileURLToPath(dir), '_redirects'), `# Generado en el build por src/integrations/netlify-redirects.ts\n${lines.join('\n')}\n`);
        logger.info(`_redirects: ${lines.length} reglas`);
      },
    },
  };
}
