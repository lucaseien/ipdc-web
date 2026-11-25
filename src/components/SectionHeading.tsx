/** Título de sección: rótulo opcional + título con filete debajo (alineado a la izquierda o centrado). */
import { cx } from '@/lib/cx';

export default function SectionHeading({
  title,
  eyebrow,
  id,
  as: H = 'h2',
  align = 'left',
  tone = 'light',
}: {
  title: React.ReactNode;
  eyebrow?: string;
  id?: string;
  as?: 'h2' | 'h3';
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
}) {
  return (
    <div className={cx('mb-10 sm:mb-14', align === 'center' && 'text-center')}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <H id={id} className={cx('titulo-filete text-h2', align === 'center' && 'titulo-filete--centro', tone === 'dark' && 'text-white')}>
        {title}
      </H>
    </div>
  );
}
