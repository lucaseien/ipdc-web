import type { NextConfig } from 'next';
import { legacyRedirects } from './src/lib/redirects';

const nextConfig: NextConfig = {
  // Todas las URLs terminan en "/" (igual que el sitio anterior y los enlaces ya publicados).
  trailingSlash: true,
  // Sin el indicador flotante de Next.js en modo desarrollo.
  devIndicators: false,
  // Formatos modernos para las imágenes optimizadas.
  images: { formats: ['image/avif', 'image/webp'] },
  // Redirecciones 301 del sitio anterior y de la raíz → /es/ (ver src/lib/redirects.ts).
  redirects: async () => legacyRedirects(),
};

export default nextConfig;
