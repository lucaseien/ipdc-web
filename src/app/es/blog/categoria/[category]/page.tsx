/** Blog por categoría, página 1: /es/blog/categoria/<categoria>/ */
import { notFound } from 'next/navigation';
import BlogIndex, { blogIndexMeta } from '@/components/BlogIndex';
import { categories, isCategory } from '@/lib/content';

type Props = { params: Promise<{ category: string }> };

const getCategory = async (params: Props['params']) => {
  const { category } = await params;
  return isCategory(category) ? category : notFound();
};

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(categories).map((category) => ({ category }));
export const generateMetadata = async ({ params }: Props) => blogIndexMeta(1, await getCategory(params));

export default async function BlogCategoria({ params }: Props) {
  return <BlogIndex current={1} category={await getCategory(params)} />;
}
