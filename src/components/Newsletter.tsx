import { site } from '@/config/site';
import { cx } from '@/lib/cx';
import { t } from '@/i18n/ui';

/** Formulario de Mailchimp. Mientras `site.mailchimpAction` esté vacío, se muestra desactivado. */
export default function Newsletter({ tone = 'light', id = 'newsletter' }: { tone?: 'light' | 'dark'; id?: string }) {
  const action = site.mailchimpAction as string;
  const enabled = action.length > 0;
  // Campo "honeypot" anti-spam que exige el formulario embebido de Mailchimp: b_<u>_<id>
  const honeypot = enabled
    ? (() => {
        const u = new URL(action.replaceAll('&amp;', '&'));
        return `b_${u.searchParams.get('u')}_${u.searchParams.get('id')}`;
      })()
    : '';
  const dark = tone === 'dark';

  return (
    <div className={cx(dark && 'on-dark')}>
      <h2 id={`${id}-title`} className={cx('font-display text-h3 font-semibold text-balance', dark ? 'text-white' : 'text-azul-900')}>
        {t('es', 'newsletter.title')}
      </h2>
      <form
        action={enabled ? action : undefined}
        method="post"
        target="_blank"
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        aria-describedby={enabled ? undefined : `${id}-soon`}
      >
        <div className="flex-1">
          <label htmlFor={`${id}-email`} className={cx('mb-1.5 block text-small font-semibold', dark ? 'text-azul-200' : 'text-tinta-2')}>
            {t('es', 'newsletter.email')}
          </label>
          <input
            id={`${id}-email`}
            type="email"
            name="EMAIL"
            required
            autoComplete="email"
            inputMode="email"
            disabled={!enabled}
            className={cx(
              'min-h-12 w-full rounded-sm border px-5 text-body disabled:cursor-not-allowed disabled:opacity-60',
              dark ? 'border-white/15 bg-white/5 text-white placeholder:text-azul-200' : 'border-tinta-3 bg-white text-tinta',
            )}
          />
        </div>
        {enabled && (
          <div aria-hidden="true" className="absolute -left-[5000px]">
            <input type="text" name={honeypot} tabIndex={-1} defaultValue="" />
          </div>
        )}
        <button
          type="submit"
          disabled={!enabled}
          className={cx(
            'min-h-12 rounded-sm px-7 text-[0.8125rem] uppercase tracking-[0.14em] font-semibold disabled:cursor-not-allowed disabled:opacity-60',
            dark ? 'bg-white text-azul-950 hover:bg-celeste-100' : 'bg-azul-950 text-white hover:bg-azul-700',
          )}
        >
          {t('es', 'newsletter.submit')}
        </button>
      </form>
      {!enabled && (
        <p id={`${id}-soon`} className={cx('mt-2 text-small', dark ? 'text-azul-200' : 'text-tinta-3')}>
          {t('es', 'newsletter.soon')}
        </p>
      )}
    </div>
  );
}
