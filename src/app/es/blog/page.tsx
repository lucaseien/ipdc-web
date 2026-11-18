/** Blog, página 1: /es/blog/ (el diseño del listado está en src/components/BlogIndex.tsx) */
import BlogIndex, { blogIndexMeta } from '@/components/BlogIndex';

export const generateMetadata = () => blogIndexMeta(1);

export default function Blog() {
  return <BlogIndex current={1} />;
}
