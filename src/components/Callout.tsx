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
        'rounded-card border p-6 text-small sm:p-8',
        tone === 'note' ? 'border-linea bg-white text-tinta-2' : 'border-celeste-600/30 bg-celeste-100/60 text-tinta-2',
        className,
      )}
    >
      {title && <p className="mb-2 font-semibold text-azul-950">{title}</p>}
      <div className="[&>p+p]:mt-3">{children}</div>
    </div>
  );
}
