/**
 * Colecciones de contenido del sitio.
 * Cada colección valida sus campos: si falta algo obligatorio o tiene un formato inválido,
 * `npm run build` falla indicando el archivo y el campo.
 */
import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Entradas del blog: src/content/blog/<idioma>/<slug>.md */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Resumen para buscadores y tarjetas (~150-160 caracteres) */
      description: z.string().max(200),
      date: z.coerce.date(),
      category: z.enum(['opinion', 'noticias-y-eventos']),
      authors: z.array(z.string()).default([]),
      /** Foto del autor (opcional), relativa al archivo .md */
      authorPhoto: image().optional(),
      /** Imagen destacada (opcional), relativa al archivo .md */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** URL en el sitio anterior; genera la redirección 301 */
      legacyUrl: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

/** Eventos: src/content/eventos/<idioma>/<slug>.mdx */
const eventos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/eventos' }),
  schema: ({ image }) =>
    z.object({
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
      videos: z
        .array(z.object({ youtubeId: z.string(), title: z.string(), poster: image().optional() }))
        .default([]),
      partners: z
        .array(
          z.object({
            group: z.string(),
            name: z.string(),
            logo: image(),
            url: z.url().optional(),
          }),
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

/** Textos institucionales: src/content/paginas/<idioma>/<id>.mdx */
const paginas = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/paginas' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    /** Bajada que se muestra debajo del título (opcional) */
    lead: z.string().optional(),
  }),
});

/**
 * Personas (autoridades y miembros): src/content/personas.yaml
 * La foto es el nombre de un archivo en src/assets/personas/.
 */
const personas = defineCollection({
  loader: file('src/content/personas.yaml'),
  schema: z.object({
    name: z.string(),
    /** Como figura en el listado: "Apellido, Nombre". Define el orden alfabético. */
    listName: z.string(),
    photo: z.string().optional(),
    member: z.boolean().default(true),
    memoriam: z.boolean().default(false),
  }),
});

/** Consejos Directivos: src/content/comisiones.yaml */
const comisiones = defineCollection({
  loader: file('src/content/comisiones.yaml'),
  schema: z.object({
    period: z.string(),
    current: z.boolean().default(false),
    members: z.array(z.object({ persona: reference('personas'), role: z.string() })),
  }),
});

export const collections = { blog, eventos, paginas, personas, comisiones };
