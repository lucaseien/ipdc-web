import Icon from './Icon';
import { t } from '@/i18n/ui';

/** `base` es la URL de la página 1; las siguientes son `${base}pagina/<n>/`. */
export default function Pagination({ current, total, base }: { current: number; total: number; base: string }) {
  if (total <= 1) return null;
  const url = (n: number) => (n === 1 ? base : `${base}pagina/${n}/`);
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav aria-label={t('es', 'a11y.pagination')} className="mt-14 flex items-center justify-between gap-4 border-t border-linea pt-6">
      {current > 1 ? (
        <a href={url(current - 1)} className="inline-flex min-h-11 items-center gap-2 font-semibold no-underline" rel="prev">
          <Icon name="arrow-left" className="size-4" /> {t('es', 'post.prev')}
        </a>
      ) : (
        <span />
      )}
      <ol className="hidden gap-1 sm:flex">
        {pages.map((n) => (
          <li key={n}>
            <a
              href={url(n)}
              className="flex size-11 items-center justify-center rounded-card font-semibold no-underline hover:bg-azul-50 aria-[current=page]:bg-azul-700 aria-[current=page]:text-white"
              aria-current={n === current ? 'page' : undefined}
            >
              <span className="sr-only">{t('es', 'post.page')} </span>
              {n}
            </a>
          </li>
        ))}
      </ol>
      {current < total ? (
        <a href={url(current + 1)} className="inline-flex min-h-11 items-center gap-2 font-semibold no-underline" rel="next">
          {t('es', 'post.next')} <Icon name="arrow-right" className="size-4" />
        </a>
      ) : (
        <span />
      )}
    </nav>
  );
}
