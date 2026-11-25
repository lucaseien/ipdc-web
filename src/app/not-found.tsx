/** Página 404 */
import type { Metadata } from 'next';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'Página no encontrada — IDSP',
  description: 'La página que buscás no existe o cambió de dirección.',
  robots: { index: false, follow: false },
};

const links = [
  { label: 'Quiénes somos', href: '/es/instituto/' },
  { label: 'Qué ofrecemos', href: '/es/instituto/que-hacemos/' },
  { label: 'Ser miembro', href: '/es/instituto/miembros/' },
  { label: 'Contacto', href: '/es/contacto/' },
];

export default function NotFound() {
  return (
    <div className="container-page py-20 sm:py-28">
      <p className="label">Error 404</p>
      <h1 className="mt-3 text-h1 font-medium">Página no encontrada</h1>
      <p className="mt-6 max-w-xl text-lead text-tinta-2">La página que buscás no existe o cambió de dirección con el nuevo sitio.</p>
      <p className="mt-8">
        <Button href="/es/" arrow>
          Ir al inicio
        </Button>
      </p>
      <h2 className="mt-14 font-sans text-small font-semibold text-tinta-2">También te puede interesar</h2>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
