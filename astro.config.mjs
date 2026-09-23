// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import netlifyRedirects from './src/integrations/netlify-redirects';

export default defineConfig({
  site: 'https://ipdc.org.py',
  trailingSlash: 'always',
  // El CSS va dentro del HTML: evita una petición que bloquea el primer render en celulares.
  build: { inlineStylesheets: 'always' },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/guia-de-estilo/') && new URL(page).pathname !== '/',
      i18n: { defaultLocale: 'es', locales: { es: 'es-PY', en: 'en' } },
    }),
    netlifyRedirects(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        // Aviso inofensivo de MDX + Vite ("use astro:head-inject"); se silencia para no ensuciar el log.
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          warn(warning);
        },
      },
    },
  },
});
