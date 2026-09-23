import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export interface LocalFileInfo {
  bytes: number;
  pages?: number;
}

const cache = new Map<string, LocalFileInfo>();

/**
 * Peso y cantidad de páginas de un archivo en /public, calculados en el build.
 * `publicPath` es la URL pública, p. ej. "/wp-content/uploads/2021/04/constitucion.pdf".
 */
export function localFileInfo(publicPath: string): LocalFileInfo {
  const hit = cache.get(publicPath);
  if (hit) return hit;
  const abs = join(process.cwd(), 'public', decodeURI(publicPath));
  const { size } = statSync(abs);
  let pages: number | undefined;
  if (abs.toLowerCase().endsWith('.pdf')) pages = countPdfPages(readFileSync(abs).toString('latin1'));
  const info = { bytes: size, pages };
  cache.set(publicPath, info);
  return info;
}

/** Cuenta objetos /Type /Page (sin dependencias). Devuelve undefined si el PDF usa streams comprimidos. */
function countPdfPages(raw: string): number | undefined {
  const n = raw.match(/\/Type\s*\/Page(?![s\w])/g)?.length ?? 0;
  return n > 0 ? n : undefined;
}
