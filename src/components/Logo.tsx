import Image from 'next/image';
import logo from '@/assets/brand/logo-idsp.png';
import { site } from '@/config/site';
import { cx } from '@/lib/cx';

/**
 * `full`: sello + nombre completo; `mark`: solo el sello.
 * El sello es decorativo: el nombre accesible lo da el enlace o el texto que lo acompaña.
 */
export default function Logo({
  variant = 'full',
  tone = 'light',
  className,
}: {
  variant?: 'full' | 'mark';
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <span className={cx('inline-flex items-center gap-3', className)}>
      <Image src={logo} alt="" width={56} height={56} loading="eager" className="block size-12 shrink-0 sm:size-14" />
      {variant === 'full' && (
        <span className={cx('font-serif leading-[1.1] font-semibold tracking-[-0.005em]', tone === 'light' ? 'text-azul-900' : 'text-white')}>
          <span className="block text-[1.0625rem] sm:hidden">{site.shortName}</span>
          <span className="hidden max-w-[17rem] text-[1.0625rem] sm:block">{site.name}</span>
        </span>
      )}
    </span>
  );
}
