/** Cabecera de las páginas internas: migas de pan, título y bajada; con foto de fondo si se pasa `image`. */
import Image, { type StaticImageData } from 'next/image';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';

interface Props {
  title: string;
  eyebrow?: string;
  lead?: string;
  image?: StaticImageData;
  imageAlt?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}

export default function PageHeader({ title, eyebrow, lead, image, imageAlt = '', breadcrumbs, children }: Props) {
  if (image) {
    return (
      <header className="on-dark relative isolate overflow-hidden bg-azul-950 text-white">
          <Image src={image} alt={imageAlt} fill sizes="100vw" preload className="-z-20 object-cover object-right" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-azul-950 via-azul-950/80 to-azul-950/30 lg:bg-gradient-to-r lg:from-azul-950 lg:via-azul-950/75 lg:to-azul-950/10" />
          <div className="container-page pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} tone="dark" />}
            <div className="mt-24 max-w-3xl animate-aparecer sm:mt-32 lg:mt-28">
              {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
              <h1 className="titulo-filete text-h1 text-white">{title}</h1>
              {lead && <p className="mt-6 max-w-2xl text-lead text-azul-100">{lead}</p>}
            </div>
          </div>
      </header>
    );
  }

  return (
    <header className="relative isolate overflow-hidden border-b border-linea bg-white">
      <div className="container-page pt-10 pb-12 sm:pt-14 sm:pb-16">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="mt-12 max-w-3xl animate-aparecer sm:mt-16">
          {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
          <h1 className="titulo-filete text-h1">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lead text-tinta-2">{lead}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
