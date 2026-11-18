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
        { label: 'Qué ofrecemos', href: '/es/instituto/que-hacemos/' },
        { label: 'Consejo Directivo', href: '/es/instituto/autoridades/' },
        { label: 'Ser miembro', href: '/es/instituto/miembros/' },
      ],
    },
    { label: 'Eventos', href: '/es/eventos/' },
    { label: 'Blog', href: '/es/blog/' },
    { label: 'Contacto', href: '/es/contacto/' },
  ],
  en: [],
};
