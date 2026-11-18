/** Datos institucionales usados en header, footer, SEO y datos estructurados. */
export const site = {
  name: 'Instituto de Derecho de Seguros del Paraguay',
  shortName: 'IDSP',
  url: 'https://idsp.com.py',
  foundingDate: '2005',
  /** PENDIENTE: email de contacto del IDSP. Mientras esté vacío, no se muestra. */
  email: '',
  location: { city: 'Asunción', country: 'Paraguay', countryCode: 'PY' },
  /**
   * Redes sociales. PENDIENTE: completar con las del IDSP.
   * Las que estén vacías no se muestran en el footer ni en Contacto.
   */
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    x: '',
    youtube: '',
  },
  /**
   * PENDIENTE: enlace al formulario de inscripción de miembros (p. ej. Google Forms).
   * Mientras esté vacío, el botón "Quiero ser miembro" lleva a Contacto.
   */
  membershipFormUrl: '',
  /**
   * URL del formulario embebido de Mailchimp
   * (Audience → Signup forms → Embedded forms → atributo `action`).
   * Mientras esté vacía, el formulario de newsletter se muestra desactivado.
   */
  mailchimpAction: '',
} as const;

/** Redes con URL cargada, en el orden en que se muestran. */
export const socialLinks = (
  [
    { name: 'Facebook', href: site.social.facebook, icon: 'facebook' },
    { name: 'Instagram', href: site.social.instagram, icon: 'instagram' },
    { name: 'LinkedIn', href: site.social.linkedin, icon: 'linkedin' },
    { name: 'X (Twitter)', href: site.social.x, icon: 'x' },
    { name: 'YouTube', href: site.social.youtube, icon: 'youtube' },
  ] as const
).filter((s) => s.href);

/** Destino del botón "Quiero ser miembro". */
export const membershipHref = site.membershipFormUrl || '/es/contacto/';

/** Enlaces de interés (portada). */
export const usefulLinks = [
  { name: 'Banco Central del Paraguay', href: 'https://www.bcp.gov.py/' },
  { name: 'Corte Suprema de Justicia', href: 'https://www.pj.gov.py/' },
  { name: 'AIDA – Association Internationale de Droit des Assurances', href: 'https://www.aida.org.uk/' },
];
