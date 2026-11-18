/** Blog por categoría, páginas 2 en adelante: /es/blog/categoria/<categoria>/pagina/<n>/ */
import { notFound } from 'next/navigation';
import BlogIndex, { blogIndexMeta, extraPages } from '@/components/BlogIndex';
import { categories, isCategory, type Category } from '@/lib/content';

type Props = { params: Promise<{ category: string; n: string }> };

const getParams = async (params: Props['params']) => {
  const { category, n } = await params;
  return isCategory(category) ? { category, n: Number(n) } : notFound();
};

export const dynamicParams = false;
export const generateStaticParams = () =>
  (Object.keys(categories) as Category[]).flatMap((category) => extraPages(category).map((n) => ({ category, n })));
export const generateMetadata = async ({ params }: Props) => {
  const { category, n } = await getParams(params);
  return blogIndexMeta(n, category);
};

export default async function BlogCategoriaPagina({ params }: Props) {
  const { category, n } = await getParams(params);
  return <BlogIndex current={n} category={category} />;
}
