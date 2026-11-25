/**
 * Íconos SVG en línea (sin dependencias). Decorativos por defecto (aria-hidden);
 * si transmiten información, pasar `label`.
 */
import { cx } from '@/lib/cx';

const stroke = (d: string) =>
  `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>`;

const icons = {
  'chevron-down': stroke('m6 9 6 6 6-6'),
  'arrow-right': stroke('M5 12h14m-6-6 6 6-6 6'),
  'arrow-left': stroke('M19 12H5m6 6-6-6 6-6'),
  menu: stroke('M4 7h16M4 12h16M4 17h16'),
  close: stroke('M18 6 6 18M6 6l12 12'),
  external: stroke('M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'),
  download: stroke('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3'),
  mail: stroke('M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm18 2-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'),
  pin: stroke('M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'),
  calendar: stroke('M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm11-2v4M8 2v4m-5 4h18'),
  graduation: stroke('M22 10 12 5 2 10l10 5 10-5Zm-16 2v5c3 2.7 9 2.7 12 0v-5m4-2v6'),
  mic: stroke('M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Zm7 8v2a7 7 0 0 1-14 0v-2m7 9v3'),
  scale: stroke('M12 3v18m-5 0h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7m14 0-3 7a3 3 0 0 0 6 0l-3-7'),
  play: '<path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" fill="currentColor"/>',
  screen: stroke('M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4 17h8m-4-5v5'),
  document: stroke('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6'),
  facebook:
    '<path fill="currentColor" d="M9.1 23.7v-8H6.6V12h2.5v-1.6c0-4 1.9-6 5.9-6l2.6.3v3.3h-1.4c-1.9 0-2.7.8-2.7 2.7V12h3.9l-.7 3.7H13.5v8.2A12 12 0 1 0 9.1 23.7Z"/>',
  instagram: stroke('M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm9 9.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2ZM17.5 6.5h.01'),
  linkedin:
    '<path fill="currentColor" d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1ZM7.1 20.5H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"/>',
  x: '<path fill="currentColor" d="M18.9 1.2h3.7l-8 9.1L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.2H4.3l13.3 17.5Z"/>',
  youtube:
    '<path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.5 15.6V8.4l6.3 3.6-6.3 3.6Z"/>',
} as const;

export type IconName = keyof typeof icons;

export default function Icon({ name, className = 'size-5', label }: { name: IconName; className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cx('shrink-0', className)}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}
