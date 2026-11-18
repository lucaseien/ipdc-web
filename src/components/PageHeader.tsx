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
        <Image src={image} alt={imageAlt} fill sizes="100vw" preload className="-z-10 object-cover object-right" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-azul-950 via-azul-950/75 to-azul-950/20 lg:bg-gradient-to-r lg:from-azul-950 lg:via-azul-950/70 lg:to-transparent" />
        <div className="container-page pt-10 pb-12 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-24">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} tone="dark" />}
          <div className="mt-16 max-w-3xl sm:mt-24 lg:mt-10">
            {eyebrow && <p className="label mb-4 text-celeste-100">{eyebrow}</p>}
            <h1 className="text-h1 font-medium text-white">{title}</h1>
            <span className="filete mt-6" aria-hidden="true" />
            {lead && <p className="mt-6 max-w-2xl text-lead text-azul-100">{lead}</p>}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-linea bg-papel-2">
      <div className="container-page pt-8 pb-10 sm:pt-12 sm:pb-14">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="mt-8 max-w-3xl">
          {eyebrow && <p className="label mb-3">{eyebrow}</p>}
          <h1 className="text-h1 font-medium">{title}</h1>
          <span className="filete mt-5" aria-hidden="true" />
          {lead && <p className="mt-5 max-w-2xl text-lead text-tinta-2">{lead}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
