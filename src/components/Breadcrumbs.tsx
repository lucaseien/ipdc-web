import { cx } from '@/lib/cx';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className={cx('flex flex-wrap items-center gap-x-2 gap-y-1 text-small', tone === 'dark' ? 'text-azul-200' : 'text-tinta-3')}>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href ? (
              <a href={c.href} className={cx('no-underline hover:underline', tone === 'dark' ? 'text-white' : 'text-azul-700')}>
                {c.label}
              </a>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
