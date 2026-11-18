/** Datos estructurados schema.org (para buscadores). */
import { site } from '@/config/site';

export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

/** Datos de la organización (se usan en la portada). */
export const organization = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'EducationalOrganization'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: `${site.url}/es/`,
  logo: `${site.url}/logo-idsp.png`,
  email: site.email || undefined,
  foundingDate: site.foundingDate,
  address: { '@type': 'PostalAddress', addressLocality: site.location.city, addressCountry: site.location.countryCode },
  sameAs: Object.values(site.social).filter(Boolean),
};
