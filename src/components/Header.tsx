'use client';
/**
 * Encabezado con el menú principal (los ítems están en src/i18n/nav.ts).
 * Escritorio: submenús que se abren con clic y se cierran con Escape o clic afuera.
 * Celular: botón "Menú" que despliega la lista completa.
 */
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Icon from './Icon';
import { mainNav } from '@/i18n/nav';
import { t } from '@/i18n/ui';
import { cx } from '@/lib/cx';

const lang = 'es';

export default function Header() {
  const path = usePathname();
  const items = mainNav[lang];
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const desktopNav = useRef<HTMLUListElement>(null);

  const isCurrent = (href: string) => path === href;
  const isActive = (href: string, children?: { href: string }[]) =>
    isCurrent(href) || path.startsWith(href) || !!children?.some((c) => path.startsWith(c.href));

  // Submenús: cierre con Escape (devolviendo el foco al botón) o con clic afuera.
  useEffect(() => {
    if (openSubmenu === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      desktopNav.current?.querySelector<HTMLButtonElement>(`[aria-controls="submenu-${openSubmenu}"]`)?.focus();
      setOpenSubmenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!desktopNav.current?.contains(e.target as Node)) setOpenSubmenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [openSubmenu]);

  return (
    <header className="sticky top-0 z-40 border-b border-linea bg-papel/95 backdrop-blur supports-[backdrop-filter]:bg-papel/85">
      <div className="flex h-1" aria-hidden="true">
        <span className="flex-1 bg-celeste-600" />
        <span className="flex-1 bg-azul-700" />
      </div>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <a href={`/${lang}/`} className="no-underline">
          <Logo />
          <span className="sr-only">, {t(lang, 'nav.home')}</span>
        </a>

        {/* Escritorio */}
        <nav aria-label={t(lang, 'a11y.mainNav')} className="hidden lg:block">
          <ul ref={desktopNav} className="flex items-center gap-1">
            {items.map((item, i) => (
              <li
                key={item.href}
                className="relative"
                onBlur={(e) => {
                  if (item.children && !e.currentTarget.contains(e.relatedTarget as Node)) setOpenSubmenu((o) => (o === i ? null : o));
                }}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={cx('nav-link inline-flex items-center gap-1', isActive(item.href, item.children) && 'nav-link--active')}
                      aria-expanded={openSubmenu === i}
                      aria-controls={`submenu-${i}`}
                      onClick={() => setOpenSubmenu((o) => (o === i ? null : i))}
                    >
                      {item.label}
                      <Icon name="chevron-down" className={cx('size-4 transition-transform', openSubmenu === i && 'rotate-180')} />
                    </button>
                    <ul
                      id={`submenu-${i}`}
                      className={cx(
                        'absolute top-full left-0 mt-2 min-w-60 rounded-card border border-linea bg-white p-2 shadow-card-hover',
                        openSubmenu !== i && 'hidden',
                      )}
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            className="block rounded px-3 py-2 text-small text-tinta no-underline hover:bg-azul-50 hover:text-azul-800 aria-[current=page]:font-semibold aria-[current=page]:text-azul-700"
                            aria-current={isCurrent(child.href) ? 'page' : undefined}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className={cx('nav-link', isActive(item.href) && 'nav-link--active')}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-card border border-linea bg-white px-3 font-semibold text-azul-900 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <Icon name="menu" className="size-5" />
          <span>{t(lang, mobileOpen ? 'nav.close' : 'nav.menu')}</span>
        </button>
      </div>

      {/* Celular */}
      <nav id="mobile-menu" aria-label={t(lang, 'a11y.mainNav')} className="border-t border-linea bg-papel lg:hidden" hidden={!mobileOpen}>
        <ul className="container-page max-h-[calc(100dvh-5.75rem)] overflow-y-auto py-4">
          {items.map((item) => (
            <li key={item.href} className="border-b border-linea last:border-0">
              {item.children ? (
                <>
                  <p className="label pt-4 pb-1 text-tinta-3">{item.label}</p>
                  <ul className="pb-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className="flex min-h-12 items-center font-serif text-[1.25rem] text-azul-900 no-underline aria-[current=page]:text-celeste-700"
                          aria-current={isCurrent(child.href) ? 'page' : undefined}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a
                  href={item.href}
                  className="flex min-h-14 items-center font-serif text-[1.25rem] text-azul-900 no-underline aria-[current=page]:text-celeste-700"
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
