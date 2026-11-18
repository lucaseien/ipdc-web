import Image from 'next/image';
import type { ImageData } from '@/lib/content';
import { initials } from '@/lib/format';
import { cx } from '@/lib/cx';
import { t } from '@/i18n/ui';

interface Props {
  name: string;
  role?: string;
  /** Foto opcional; sin foto se muestran las iniciales */
  photo?: ImageData;
  memoriam?: boolean;
  size?: 'md' | 'sm';
}

export default function PersonCard({ name, role, photo, memoriam = false, size = 'md' }: Props) {
  return (
    <article className="group">
      <div
        className={cx(
          'relative overflow-hidden rounded-card',
          size === 'md' ? 'aspect-[4/5]' : 'aspect-square',
          photo ? 'bg-azul-100' : 'bg-gradient-to-br from-azul-50 to-azul-100 ring-1 ring-azul-200/60 ring-inset',
        )}
      >
        {photo ? (
          <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 220px, 45vw" className={cx('object-cover', memoriam && 'grayscale')} />
        ) : (
          <span
            aria-hidden="true"
            className={cx(
              'absolute inset-0 flex items-center justify-center font-serif font-medium text-azul-700/80',
              size === 'md' ? 'text-[2.75rem]' : 'text-[1.5rem] sm:text-[2rem]',
            )}
          >
            {initials(name)}
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 flex h-1" aria-hidden="true">
          <span className="flex-1 bg-celeste-600" />
          <span className="flex-1 bg-azul-700" />
        </span>
      </div>
      <h3
        className={cx(
          'mt-3 font-serif leading-snug font-semibold text-azul-900',
          size === 'md' ? 'text-[1.1875rem]' : 'text-[0.9375rem] sm:text-[1.0625rem]',
        )}
      >
        {name}
      </h3>
      {role && <p className="mt-0.5 text-small text-tinta-2">{role}</p>}
      {memoriam && size === 'md' && <p className="label mt-1 text-tinta-3">{t('es', 'person.memoriam')}</p>}
    </article>
  );
}
