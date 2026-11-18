import Icon from './Icon';
import { cx } from '@/lib/cx';

const styles = {
  primary: 'bg-azul-700 text-white hover:bg-azul-800 hover:text-white px-5 min-h-12 rounded-card',
  secondary: 'border border-azul-700 text-azul-700 bg-transparent hover:bg-azul-50 hover:text-azul-800 px-5 min-h-12 rounded-card',
  inverse: 'bg-white text-azul-900 hover:bg-azul-100 hover:text-azul-900 px-5 min-h-12 rounded-card',
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
      {arrow && <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </a>
  );
}
