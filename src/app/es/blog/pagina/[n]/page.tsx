/** Blog, páginas 2 en adelante: /es/blog/pagina/<n>/ */
import BlogIndex, { blogIndexMeta, extraPages } from '@/components/BlogIndex';

type Props = { params: Promise<{ n: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => extraPages().map((n) => ({ n }));
export const generateMetadata = async ({ params }: Props) => blogIndexMeta(Number((await params).n));

export default async function BlogPagina({ params }: Props) {
  return <BlogIndex current={Number((await params).n)} />;
}
