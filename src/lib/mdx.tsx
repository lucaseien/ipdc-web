/**
 * Convierte el texto Markdown/MDX de un archivo de src/content/ en HTML.
 * Uso: <Markdown entry={page} />
 */
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Accordion from '@/components/Accordion';
import Callout from '@/components/Callout';
import YouTube from '@/components/YouTube';

/** Componentes que se pueden usar dentro de los archivos .mdx */
const components = { Accordion, Callout, YouTube };

export async function Markdown({ entry }: { entry: { body: string; format: 'md' | 'mdx' } }) {
  const { default: Content } = await evaluate(entry.body, {
    ...(runtime as Parameters<typeof evaluate>[1]),
    format: entry.format,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
    remarkRehypeOptions: { footnoteLabel: 'Notas', footnoteBackLabel: 'Volver al texto' },
  });
  return <Content components={components} />;
}
