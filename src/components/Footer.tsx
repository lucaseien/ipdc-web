import Logo from './Logo';
import Icon from './Icon';
import Newsletter from './Newsletter';
import CurrentYear from './CurrentYear';
import { site, socialLinks } from '@/config/site';
import { mainNav } from '@/i18n/nav';
import { t } from '@/i18n/ui';

const lang = 'es';

export default function Footer() {
  const nav = mainNav[lang];
  const institute = nav.find((i) => i.children && i.href.includes('instituto'))?.children ?? [];
  const resources = nav.flatMap((i) => (i.href.includes('instituto') ? [] : (i.children ?? [i])));

  return (
    <footer className="on-dark bg-azul-950 text-azul-100">
      <div className="flex h-1" aria-hidden="true">
        <span className="flex-1 bg-celeste-600" />
        <span className="flex-1 bg-azul-700" />
      </div>
      <div className="container-page grid gap-12 py-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-5 max-w-sm text-small text-azul-200">{t(lang, 'site.tagline')}.</p>
        </div>

        <nav aria-labelledby="footer-institute" className="lg:col-span-2">
          <h2 id="footer-institute" className="label mb-4 text-azul-200">
            {t(lang, 'footer.institute')}
          </h2>
          <ul className="space-y-2.5 text-small">
            {institute.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-white no-underline hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-resources" className="lg:col-span-2">
          <h2 id="footer-resources" className="label mb-4 text-azul-200">
            {t(lang, 'footer.resources')}
          </h2>
          <ul className="space-y-2.5 text-small">
            {resources.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-white no-underline hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="label mb-4 text-azul-200">{t(lang, 'footer.contact')}</h2>
          <address className="space-y-2.5 text-small not-italic">
            {site.email && (
              <p className="flex items-center gap-2.5">
                <Icon name="mail" className="size-5 text-azul-200" />
                <a href={`mailto:${site.email}`} className="text-white">
                  {site.email}
                </a>
              </p>
            )}
            <p className="flex items-center gap-2.5">
              <Icon name="pin" className="size-5 text-azul-200" />
              <span>
                {site.location.city}, {site.location.country}
              </span>
            </p>
          </address>
          {socialLinks.length > 0 && (
            <>
              <h2 className="sr-only">{t(lang, 'footer.follow')}</h2>
              <ul className="mt-5 flex gap-2">
                {socialLinks.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      className="flex size-11 items-center justify-center rounded-full border border-azul-600 text-white hover:border-white hover:bg-azul-800"
                      rel="me noopener"
                    >
                      <Icon name={s.icon} className="size-5" label={s.name} />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="border-t border-azul-800 pt-10 lg:col-span-12">
          <div className="max-w-2xl">
            <Newsletter tone="dark" id="footer-newsletter" />
          </div>
        </div>
      </div>
      <div className="border-t border-azul-800">
        <p className="container-page py-6 text-label text-azul-200">
          © <CurrentYear /> {t(lang, 'footer.rights')}
        </p>
      </div>
    </footer>
  );
}
