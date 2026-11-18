/** Qué ofrecemos: /es/instituto/que-hacemos/ */
import PageHeader from '@/components/PageHeader';
import { getPage } from '@/lib/content';
import { Markdown } from '@/lib/mdx';
import { pageMeta } from '@/lib/seo';
import foto from '@/assets/fotos/puerto.jpg';

export function generateMetadata() {
  const { data } = getPage('que-hacemos');
  return pageMeta({ title: data.title, description: data.description, path: '/es/instituto/que-hacemos/' });
}

export default function QueHacemos() {
  const page = getPage('que-hacemos');
  return (
    <>
      <PageHeader
        eyebrow="El Instituto"
        title={page.data.title}
        lead={page.data.lead}
        image={foto}
        imageAlt="Puerto de Asunción al atardecer, con remolcadores sobre el río Paraguay"
        breadcrumbs={[{ label: 'Inicio', href: '/es/' }, { label: 'El Instituto', href: '/es/instituto/' }, { label: page.data.title }]}
      />
      <div className="container-page py-16 sm:py-20">
        <div className="prose-site">
          <Markdown entry={page} />
        </div>
      </div>
    </>
  );
}
