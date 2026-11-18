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
    <article className="group relative flex h-full flex-col border-t-2 border-azul-900 pt-5">
      <p className="label flex items-center gap-2">
        {category && <span>{category}</span>}
        {category && (
          <span aria-hidden="true" className="text-linea">
            |
          </span>
        )}
        <time dateTime={date.toISOString().slice(0, 10)} className="text-tinta-3">
          {formatDate(date)}
        </time>
      </p>
      <H className="mt-3 font-serif text-h3 font-semibold text-azul-900">
        <a href={href} className="no-underline after:absolute after:inset-0 group-hover:underline">
          {title}
        </a>
      </H>
      {excerpt && <p className="mt-3 line-clamp-3 text-tinta-2">{excerpt}</p>}
      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
        {authors.length > 0 && (
          <p className="text-small text-tinta-2">
            {t('es', 'post.by')} <span className="font-semibold text-tinta">{authors.join(' y ')}</span>
          </p>
        )}
        <Icon name="arrow-right" className="ml-auto size-5 text-celeste-600 transition-transform group-hover:translate-x-1" />
      </div>
    </article>
  );
}
