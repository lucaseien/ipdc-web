/** Datos institucionales usados en header, footer, SEO y datos estructurados. */
export const site = {
  name: 'Instituto Paraguayo de Derecho Constitucional',
  shortName: 'IPDC',
  url: 'https://ipdc.org.py',
  foundingDate: '1999-05-11',
  email: 'ipdc.py@gmail.com',
  location: { city: 'Asunción', country: 'Paraguay', countryCode: 'PY' },
  social: {
    facebook: 'https://www.facebook.com/InstitutoParaguayoDeDerechoConstitucional/',
    x: 'https://x.com/ipdcpy',
    youtube: 'https://www.youtube.com/channel/UCGSwBb9-8_au04jRklabU9w',
  },
  /**
   * URL del formulario embebido de Mailchimp
   * (Audience → Signup forms → Embedded forms → atributo `action`).
   * Mientras esté vacía, el formulario de newsletter se muestra desactivado.
   */
  mailchimpAction: '',
} as const;
