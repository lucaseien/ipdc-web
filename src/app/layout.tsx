/**
 * Estructura común a todas las páginas: <head>, encabezado, contenido y footer.
 * Cada página define su título y descripción con `export const metadata` o `generateMetadata`.
 */
import type { Metadata, Viewport } from 'next';
import '@/styles/global.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/config/site';
import { t } from '@/i18n/ui';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: { types: { 'application/rss+xml': '/es/blog/rss.xml' } },
};

export const viewport: Viewport = { themeColor: '#00254d' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PY">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 rounded-card bg-azul-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t('es', 'a11y.skip')}
        </a>
        <Header />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
