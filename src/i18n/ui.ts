export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

/** Textos de interfaz. El contenido editorial vive en src/content/. */
export const ui = {
  es: {
    'site.tagline':
      'Trabajamos para promover el conocimiento y el intercambio de ideas sobre el derecho constitucional como una manera de contribuir al fortalecimiento de la democracia en Paraguay',
    'a11y.skip': 'Saltar al contenido',
    'a11y.mainNav': 'Navegación principal',
    'a11y.breadcrumbs': 'Ruta de navegación',
    'a11y.pagination': 'Paginación',
    'a11y.newTab': '(se abre en una pestaña nueva)',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'nav.home': 'Inicio',
    'lang.switch': 'Idioma',
    'footer.institute': 'El Instituto',
    'footer.resources': 'Recursos',
    'footer.contact': 'Contacto',
    'footer.follow': 'Redes sociales',
    'footer.rights': 'Instituto Paraguayo de Derecho Constitucional. Todos los derechos reservados.',
    'doc.download': 'Descargar',
    'doc.open': 'Abrir',
    'doc.pages': 'págs.',
    'doc.external': 'Enlace externo',
    'doc.unavailable': 'Documento no disponible temporalmente',
    'doc.lang.es': 'Español',
    'doc.lang.gn': 'Guaraní',
    'doc.lang.en': 'Inglés',
    'person.memoriam': 'In memoriam',
    'post.by': 'Por',
    'post.readMore': 'Leer artículo',
    'post.prev': 'Anterior',
    'post.next': 'Siguiente',
    'post.page': 'Página',
    // Texto original del sitio anterior
    'newsletter.title': 'Deje su correo y entérese de las actividades del IPDC',
    'newsletter.email': 'Correo electrónico',
    'newsletter.submit': 'Suscribirme',
    'newsletter.soon': 'La suscripción estará disponible en breve.',
  },
  en: {},
} as const;

export function t(lang: Lang, key: keyof (typeof ui)['es']): string {
  const table = ui[lang] as Partial<Record<string, string>>;
  return table[key] ?? (ui[defaultLang] as Record<string, string>)[key];
}
