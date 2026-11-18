import Icon from './Icon';
import { dateParts, formatDate } from '@/lib/format';
import { cx } from '@/lib/cx';

interface Props {
  title: string;
  href: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  modality?: string;
  headingLevel?: 'h2' | 'h3';
}

export default function EventCard({ title, href, startDate, endDate, location, modality, headingLevel: H = 'h3' }: Props) {
  const start = dateParts(startDate);
  const end = endDate ? dateParts(endDate) : undefined;
  const sameMonth = !!end && end.month === start.month && end.year === start.year;
  const range = !endDate
    ? formatDate(startDate)
    : sameMonth
      ? `${start.day} – ${formatDate(endDate)}`
      : `${formatDate(startDate)} – ${formatDate(endDate)}`;

  return (
    <article className="group relative flex gap-5 rounded-card border border-linea bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-card bg-azul-900 py-3 text-white" aria-hidden="true">
        <span className={cx('font-serif leading-none font-semibold whitespace-nowrap', sameMonth ? 'text-[1.375rem]' : 'text-[1.75rem]')}>
          {start.day}
          {sameMonth && `–${end!.day}`}
        </span>
        <span className="label mt-1 text-azul-200">{start.month}</span>
        <span className="text-label text-azul-200">{start.year}</span>
      </div>
      <div className="min-w-0">
        <H className="font-serif text-h3 font-semibold text-azul-900">
          <a href={href} className="no-underline after:absolute after:inset-0 group-hover:underline">
            {title}
          </a>
        </H>
        <p className="mt-2 flex items-center gap-2 text-small text-tinta-2">
          <Icon name="calendar" className="size-4 text-celeste-600" />
          <span>{range}</span>
        </p>
        {location && (
          <p className="mt-1 flex items-center gap-2 text-small text-tinta-2">
            <Icon name="pin" className="size-4 text-celeste-600" />
            <span>
              {location}
              {modality && ` · ${modality}`}
            </span>
          </p>
        )}
      </div>
    </article>
  );
}
