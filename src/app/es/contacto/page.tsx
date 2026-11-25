/** Contacto: /es/contacto/ (email y redes en src/config/site.ts) */
import PageHeader from '@/components/PageHeader';
import Icon from '@/components/Icon';
import { getPage } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { site, socialLinks } from '@/config/site';

export function generateMetadata() {
  const { data } = getPage('contacto');
  return pageMeta({ title: data.title, description: data.description, path: '/es/contacto/' });
}

/** Muestra la URL sin protocolo como referencia: facebook.com/idsp */
const handle = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export default function Contacto() {
  const page = getPage('contacto');
  return (
    <>
      <PageHeader title={page.data.title} breadcrumbs={[{ label: 'Inicio', href: '/es/' }, { label: page.data.title }]} />

      <div className="container-page py-16 sm:py-20">
        <div className="max-w-xl space-y-10">
          {site.email && (
            <section aria-labelledby="escribinos">
              <h2 id="escribinos" className="label mb-3 text-tinta-3">
                Email
              </h2>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 font-display text-h3 break-all">
                <Icon name="mail" className="size-6 text-celeste-600" />
                {site.email}
              </a>
            </section>
          )}
          <section aria-labelledby="ubicacion">
            <h2 id="ubicacion" className="label mb-3 text-tinta-3">
              Ubicación
            </h2>
            <p className="inline-flex items-center gap-3 font-display text-h3 text-azul-900">
              <Icon name="pin" className="size-6 text-celeste-600" />
              {site.location.city}, {site.location.country}
            </p>
          </section>
          {socialLinks.length > 0 && (
            <section aria-labelledby="redes">
              <h2 id="redes" className="label mb-4 text-tinta-3">
                Redes sociales
              </h2>
              <ul className="space-y-3">
                {socialLinks.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      rel="me noopener"
                      className="group flex items-center gap-4 rounded-card border border-linea bg-white p-4 no-underline shadow-card hover:shadow-card-hover"
                    >
                      <span className="flex size-11 items-center justify-center rounded-full bg-azul-700 text-white">
                        <Icon name={s.icon} className="size-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-azul-900 group-hover:underline">{s.name}</span>
                        <span className="block text-small break-all text-tinta-3">{handle(s.href)}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
