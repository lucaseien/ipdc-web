import Icon from './Icon';
import { cx } from '@/lib/cx';

const pill = 'px-7 min-h-12 rounded-sm text-[0.8125rem] uppercase tracking-[0.14em] transition-colors';

const styles = {
  primary: `bg-azul-950 text-white hover:bg-azul-700 hover:text-white ${pill}`,
  secondary: `border border-azul-950 bg-transparent text-azul-950 hover:bg-azul-950 hover:text-white ${pill}`,
  inverse: `bg-white text-azul-950 hover:bg-celeste-100 hover:text-azul-950 ${pill}`,
  ghost: `border border-white/25 text-white hover:bg-white/10 hover:text-white ${pill}`,
  link: 'text-azul-700 hover:text-azul-900 underline underline-offset-4 decoration-celeste-600 decoration-2 min-h-11',
};

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: keyof typeof styles;
  arrow?: boolean;
};

export default function Button({ href, variant = 'primary', arrow = false, className, children, ...rest }: Props) {
  return (
    <a
      href={href}
      className={cx('group inline-flex items-center justify-center gap-2 font-semibold', variant !== 'link' && 'no-underline', styles[variant], className)}
      {...rest}
    >
      {children}
      {arrow &&
        (variant === 'link' ? (
          <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
        ) : (
          <Icon name="arrow-right" className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
        ))}
    </a>
  );
}
