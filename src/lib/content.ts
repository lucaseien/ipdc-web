/**
 * Lectura y validación del contenido de src/content/.
 * Cada tipo de contenido valida sus campos: si falta algo obligatorio o tiene un formato inválido,
 * la página falla indicando el archivo y el campo.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { imageSize } from 'image-size';
import { parse as parseYaml } from 'yaml';
import { z } from 'zod';
import type { Lang } from '@/i18n/ui';

const CONTENT = join(process.cwd(), 'src/content');
const PUBLIC = join(process.cwd(), 'public');

// ───────────────────────── Imágenes ─────────────────────────

/** Imagen de public/ con sus medidas (lo que necesita <Image> de Next). */
export interface ImageData {
  src: string;
  width: number;
  height: number;
}

function readImage(src: string, where: string): ImageData {
  const file = join(PUBLIC, src);
  if (!src.startsWith('/') || !existsSync(file)) throw new Error(`No existe la imagen public${src} (revisar ${where})`);
  const { width, height } = imageSize(readFileSync(file));
  return { src, width, height };
}

/** Campo de imagen en el frontmatter: ruta dentro de public/, p. ej. "/imagenes/blog/foto.jpg" */
const image = () => z.string().transform((src) => readImage(src, 'el frontmatter'));

// ───────────────────────── Esquemas ─────────────────────────

/** Entradas del blog: src/content/blog/<idioma>/<slug>.md */
const blogSchema = z.object({
  title: z.string(),
  /** Resumen para buscadores y tarjetas (~150-160 caracteres) */
  description: z.string().max(200),
  date: z.coerce.date(),
  category: z.enum(['opinion', 'noticias-y-eventos']),
  authors: z.array(z.string()).default([]),
  /** Foto del autor (opcional) */
  authorPhoto: image().optional(),
  /** Imagen destacada (opcional) */
  cover: image().optional(),
  coverAlt: z.string().optional(),
  /** URL en el sitio anterior; genera la redirección 301 */
  legacyUrl: z.string().optional(),
  draft: z.boolean().default(false),
});

/** Eventos: src/content/eventos/<idioma>/<slug>.mdx */
const eventSchema = z.object({
  title: z.string(),
  description: z.string().max(200),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  modality: z.string().optional(),
  cover: image().optional(),
  coverAlt: z.string().optional(),
  registrationUrl: z.url().optional(),
  videos: z.array(z.object({ youtubeId: z.string(), title: z.string(), poster: image().optional() })).default([]),
  partners: z.array(z.object({ group: z.string(), name: z.string(), logo: image(), url: z.url().optional() })).default([]),
  draft: z.boolean().default(false),
});

/** Textos institucionales: src/content/paginas/<idioma>/<id>.mdx */
const pageSchema = z.object({
  title: z.string(),
  description: z.string().max(200),
  /** Bajada que se muestra debajo del título (opcional) */
  lead: z.string().optional(),
});

/** Personas (autoridades y miembros): src/content/personas.yaml */
const personSchema = z.object({
  id: z.string(),
  name: z.string(),
  /** Como figura en el listado: "Apellido, Nombre". Define el orden alfabético. */
  listName: z.string(),
  /** Nombre de un archivo en public/personas/ */
  photo: z.string().optional(),
  member: z.boolean().default(true),
  memoriam: z.boolean().default(false),
});

/** Consejos Directivos: src/content/comisiones.yaml */
const comisionSchema = z.object({
  id: z.string(),
  period: z.string(),
  current: z.boolean().default(false),
  members: z.array(z.object({ persona: z.string(), role: z.string() })),
});

// ───────────────────────── Lectura ─────────────────────────

export interface Entry<T> {
  /** "<idioma>/<slug>" */
  id: string;
  lang: Lang;
  slug: string;
  data: T;
  /** Texto Markdown/MDX, sin el frontmatter */
  body: string;
  format: 'md' | 'mdx';
}

function validate<S extends z.ZodType>(schema: S, data: unknown, file: string): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) throw new Error(`Contenido inválido en ${file}:\n${z.prettifyError(result.error)}`);
  return result.data;
}

/** Lee src/content/<dir>/<idioma>/*.md(x) */
function readFolder<S extends z.ZodType>(dir: string, schema: S): Entry<z.output<S>>[] {
  const base = join(CONTENT, dir);
  if (!existsSync(base)) return [];
  return readdirSync(base).flatMap((lang) =>
    readdirSync(join(base, lang))
      .filter((f) => /\.mdx?$/.test(f))
      .map((f) => {
        const rel = `src/content/${dir}/${lang}/${f}`;
        const raw = readFileSync(join(base, lang, f), 'utf8');
        const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
        const slug = f.replace(/\.mdx?$/, '');
        return {
          id: `${lang}/${slug}`,
          lang: lang as Lang,
          slug,
          data: validate(schema, m ? parseYaml(m[1]) : {}, rel),
          body: m ? m[2] : raw,
          format: f.endsWith('.mdx') ? ('mdx' as const) : ('md' as const),
        };
      }),
  );
}

function readYaml<S extends z.ZodType>(file: string, schema: S): z.output<S>[] {
  const list = parseYaml(readFileSync(join(CONTENT, file), 'utf8')) ?? [];
  return (list as unknown[]).map((item) => validate(schema, item, `src/content/${file}`));
}

export type Post = Entry<z.output<typeof blogSchema>>;
export type Evento = Entry<z.output<typeof eventSchema>>;
export type Pagina = Entry<z.output<typeof pageSchema>>;
export type Persona = z.output<typeof personSchema>;

// ───────────────────────── Consultas ─────────────────────────

export const categories = {
  opinion: 'Opinión',
  'noticias-y-eventos': 'Noticias y eventos',
} as const;
export type Category = keyof typeof categories;
export const isCategory = (c: string): c is Category => c in categories;

export const POSTS_PER_PAGE = 10;

export function getPage(id: string, lang: Lang = 'es'): Pagina {
  const page = readFolder('paginas', pageSchema).find((p) => p.id === `${lang}/${id}`);
  if (!page) throw new Error(`Falta el texto src/content/paginas/${lang}/${id}.mdx`);
  return page;
}

/** Entradas publicadas (sin borradores), de la más reciente a la más antigua. */
export function getPosts(lang: Lang = 'es', category?: Category): Post[] {
  return readFolder('blog', blogSchema)
    .filter((p) => p.lang === lang && !p.data.draft && (!category || p.data.category === category))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getEvents(lang: Lang = 'es') {
  const events = readFolder('eventos', eventSchema).filter((e) => e.lang === lang && !e.data.draft);
  const now = Date.now();
  const end = (e: Evento) => (e.data.endDate ?? e.data.startDate).valueOf();
  return {
    upcoming: events.filter((e) => end(e) >= now).sort((a, b) => a.data.startDate.valueOf() - b.data.startDate.valueOf()),
    past: events.filter((e) => end(e) < now).sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf()),
  };
}

export const postUrl = (p: Post) => `/${p.lang}/blog/${p.slug}/`;
export const eventUrl = (e: Evento) => `/${e.lang}/eventos/${e.slug}/`;

/** Cantidad de páginas de un listado paginado (mínimo 1). */
export const pageCount = (items: unknown[]) => Math.max(1, Math.ceil(items.length / POSTS_PER_PAGE));
export const pageSlice = <T,>(items: T[], n: number) => items.slice((n - 1) * POSTS_PER_PAGE, n * POSTS_PER_PAGE);

export function getPersonas(): Persona[] {
  return readYaml('personas.yaml', personSchema);
}

/** Consejos Directivos con cada persona resuelta, del más reciente al más antiguo. */
export function getComisiones() {
  const personas = new Map(getPersonas().map((p) => [p.id, p]));
  return readYaml('comisiones.yaml', comisionSchema)
    .sort((a, b) => b.period.localeCompare(a.period))
    .map((c) => ({
      ...c,
      members: c.members.map((m) => {
        const persona = personas.get(m.persona);
        if (!persona) throw new Error(`comisiones.yaml (${c.period}): no existe la persona "${m.persona}" en personas.yaml`);
        return { role: m.role, persona };
      }),
    }));
}

/** Fotos de personas: public/personas/<archivo> */
export function personPhoto(file?: string): ImageData | undefined {
  return file ? readImage(`/personas/${file}`, 'personas.yaml') : undefined;
}

const collator = new Intl.Collator('es', { sensitivity: 'base' });
export const byListName = (a: { listName: string }, b: { listName: string }) => collator.compare(a.listName, b.listName);
