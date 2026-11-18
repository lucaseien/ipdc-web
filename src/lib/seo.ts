import type { Metadata } from 'next';
import { site } from '@/config/site';

interface PageMeta {
  title: string;
  description: string;
  /** Ruta de la página, p. ej. "/es/contacto/" (para la URL canónica). */
  path: string;
  /** Imagen para redes (ruta absoluta o URL). */
  image?: string;
  /** Fecha de publicación: marca la página como artículo. */
  publishedTime?: Date;
  noindex?: boolean;
}

/** Título, descripción, URL canónica, Open Graph y Twitter Card de una página. */
export function pageMeta({ title, description, path, image = '/og-default.jpg', publishedTime, noindex = false }: PageMeta): Metadata {
  const fullTitle = title === site.name ? title : `${title} — ${site.shortName}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: publishedTime ? 'article' : 'website',
      publishedTime: publishedTime?.toISOString().slice(0, 10),
      siteName: site.name,
      locale: 'es_PY',
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: 'summary_large_image' },
  };
}
