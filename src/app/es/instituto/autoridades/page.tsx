/** Consejo Directivo: /es/instituto/autoridades/ (personas en personas.yaml, cargos en comisiones.yaml) */
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import PersonCard from '@/components/PersonCard';
import { getComisiones, getPage, personPhoto } from '@/lib/content';
import { Markdown } from '@/lib/mdx';
import { pageMeta } from '@/lib/seo';
import foto from '@/assets/fotos/costanera.jpg';

export function generateMetadata() {
  const { data } = getPage('autoridades');
  return pageMeta({ title: data.title, description: data.description, path: '/es/instituto/autoridades/' });
}

export default function Autoridades() {
  const page = getPage('autoridades');
  const comisiones = getComisiones();
  const current = comisiones.find((c) => c.current) ?? comisiones[0];
  const previous = comisiones.filter((c) => c !== current);

  return (
    <>
      <PageHeader
        eyebrow="El Instituto"
        title={page.data.title}
        image={foto}
        imageAlt="Vista aérea de Asunción: la Costanera y el centro histórico junto a la bahía"
        breadcrumbs={[{ label: 'Inicio', href: '/es/' }, { label: 'El Instituto', href: '/es/instituto/' }, { label: page.data.title }]}
      />

      <div className="container-page py-16 sm:py-20">
        <div className="prose-site mb-14">
          <Markdown entry={page} />
        </div>

        <section aria-labelledby="comision-actual">
          <SectionHeading id="comision-actual" title={`Consejo Directivo ${current.period}`} />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {current.members.map((m) => (
              <li key={m.persona.id}>
                <PersonCard name={m.persona.name} role={m.role} photo={personPhoto(m.persona.photo)} memoriam={m.persona.memoriam} />
              </li>
            ))}
          </ul>
        </section>

        {previous.length > 0 && (
          <section aria-labelledby="comisiones-anteriores" className="mt-24">
            <SectionHeading id="comisiones-anteriores" title="Consejos anteriores" />
            <div className="grid gap-12 lg:grid-cols-2">
              {previous.map((c) => (
                <div key={c.id}>
                  <h3 className="font-display text-h3 font-semibold">Consejo Directivo {c.period}</h3>
                  <dl className="mt-4 divide-y divide-linea border-y border-linea">
                    {c.members.map((m) => (
                      <div key={m.persona.id} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3">
                        <dt className="font-semibold text-tinta">
                          {m.persona.name}
                          {m.persona.memoriam && <span className="font-normal text-tinta-3"> (+)</span>}
                        </dt>
                        <dd className="text-small text-tinta-2">{m.role}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
