import type { Lang } from './ui';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/** Menú principal. Las rutas en inglés se agregan cuando exista la traducción. */
export const mainNav: Record<Lang, NavItem[]> = {
  es: [
    {
      label: 'El Instituto',
      href: '/es/instituto/',
      children: [
        { label: 'Quiénes somos', href: '/es/instituto/' },
        { label: 'Qué hacemos', href: '/es/instituto/que-hacemos/' },
        { label: 'Autoridades', href: '/es/instituto/autoridades/' },
        { label: 'Miembros', href: '/es/instituto/miembros/' },
      ],
    },
    { label: 'Publicaciones', href: '/es/publicaciones/' },
    {
      label: 'Constitución',
      href: '/es/constitucion/',
      children: [
        { label: 'Constitución de 1992', href: '/es/constitucion/' },
        { label: 'Constituciones históricas', href: '/es/constitucion/historicas/' },
      ],
    },
    { label: 'Eventos', href: '/es/eventos/' },
    { label: 'Blog', href: '/es/blog/' },
    { label: 'Contacto', href: '/es/contacto/' },
  ],
  en: [],
};
