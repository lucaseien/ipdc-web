import Icon from './Icon';
import { formatDate } from '@/lib/format';
import { t } from '@/i18n/ui';

interface Props {
  title: string;
  href: string;
  date: Date;
  authors?: string[];
  category?: string;
  excerpt?: string;
  headingLevel?: 'h2' | 'h3';
}

export default function PostCard({ title, href, date, authors = [], category, excerpt, headingLevel: H = 'h3' }: Props) {
  return (
    <article className="group relative flex h-full flex-col border-t-2 border-azul-950 bg-white p-6 shadow-card transition duration-300 hover:border-celeste-600 hover:shadow-card-hover sm:p-8">
      <p className="flex flex-wrap items-center gap-2 text-small">
        {category && <span className="label">{category}</span>}
        <time dateTime={date.toISOString().slice(0, 10)} className="text-tinta-3">
          {formatDate(date)}
        </time>
      </p>
      <H className="mt-5 font-display text-h3 font-medium text-azul-950">
        <a href={href} className="text-azul-950 no-underline after:absolute after:inset-0 hover:text-azul-950">
          {title}
        </a>
      </H>
      {excerpt && <p className="mt-3 mb-6 line-clamp-3 text-tinta-2">{excerpt}</p>}
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-linea pt-5">
        {authors.length > 0 && (
          <p className="text-small text-tinta-2">
            {t('es', 'post.by')} <span className="font-semibold text-tinta">{authors.join(' y ')}</span>
          </p>
        )}
        <span className="ml-auto inline-flex items-center gap-2 text-label font-semibold tracking-[0.14em] text-azul-700 uppercase">
          Leer más
          <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
