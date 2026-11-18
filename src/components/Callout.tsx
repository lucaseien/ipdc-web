import { cx } from '@/lib/cx';

export default function Callout({
  tone = 'note',
  title,
  className,
  children,
}: {
  tone?: 'note' | 'accent';
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        'rounded-card border-l-4 p-5 text-small sm:p-6',
        tone === 'note' ? 'border-azul-700 bg-azul-50 text-tinta' : 'border-celeste-600 bg-celeste-100/60 text-tinta',
        className,
      )}
    >
      {title && <p className="mb-2 font-semibold text-azul-900">{title}</p>}
      <div className="[&>p+p]:mt-3">{children}</div>
    </div>
  );
}
