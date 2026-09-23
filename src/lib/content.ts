import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { Lang } from '@/i18n/ui';

export type Post = CollectionEntry<'blog'>;
export type Evento = CollectionEntry<'eventos'>;

export const categories = {
  opinion: 'Opinión',
  'noticias-y-eventos': 'Noticias y eventos',
} as const;
export type Category = keyof typeof categories;

export const POSTS_PER_PAGE = 10;

/** El id de una entrada es "<idioma>/<slug>". */
export const slugOf = (entry: { id: string }) => entry.id.split('/').slice(1).join('/');
const inLang = (lang: Lang) => (entry: { id: string }) => entry.id.startsWith(`${lang}/`);

export async function getPage(id: string, lang: Lang = 'es') {
  const page = await getEntry('paginas', `${lang}/${id}`);
  if (!page) throw new Error(`Falta el texto src/content/paginas/${lang}/${id}.mdx`);
  return page;
}

/** Entradas publicadas (sin borradores), de la más reciente a la más antigua. */
export async function getPosts(lang: Lang = 'es', category?: Category) {
  const posts = await getCollection('blog', (p) => inLang(lang)(p) && !p.data.draft && (!category || p.data.category === category));
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getEvents(lang: Lang = 'es') {
  const events = await getCollection('eventos', (e) => inLang(lang)(e) && !e.data.draft);
  const now = Date.now();
  const end = (e: Evento) => (e.data.endDate ?? e.data.startDate).valueOf();
  return {
    upcoming: events.filter((e) => end(e) >= now).sort((a, b) => a.data.startDate.valueOf() - b.data.startDate.valueOf()),
    past: events.filter((e) => end(e) < now).sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf()),
  };
}

export const postUrl = (p: Post) => `/${p.id.split('/')[0]}/blog/${slugOf(p)}/`;
export const eventUrl = (e: Evento) => `/${e.id.split('/')[0]}/eventos/${slugOf(e)}/`;

/** Fotos de personas: src/assets/personas/<archivo> */
const personPhotos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/personas/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});
export function personPhoto(file?: string): ImageMetadata | undefined {
  if (!file) return undefined;
  const hit = personPhotos[`/src/assets/personas/${file}`];
  if (!hit) throw new Error(`No existe la foto src/assets/personas/${file} (revisar personas.yaml)`);
  return hit.default;
}

const collator = new Intl.Collator('es', { sensitivity: 'base' });
export const byListName = (a: { data: { listName: string } }, b: { data: { listName: string } }) =>
  collator.compare(a.data.listName, b.data.listName);
