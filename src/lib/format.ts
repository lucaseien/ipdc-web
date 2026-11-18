import type { Lang } from '@/i18n/ui';

const locales: Record<Lang, string> = { es: 'es-PY', en: 'en-US' };

/** 8575630 → "8,2 MB" */
export function formatBytes(bytes: number, lang: Lang = 'es'): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  const digits = i >= 2 ? 1 : 0;
  return `${new Intl.NumberFormat(locales[lang], { maximumFractionDigits: digits }).format(value)} ${units[i]}`;
}

/** Fecha larga: "10 de agosto de 2025" */
export function formatDate(date: Date, lang: Lang = 'es'): string {
  return new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/** Partes de fecha para bloques de calendario: { day: "24", month: "nov", year: "2021" } */
export function dateParts(date: Date, lang: Lang = 'es') {
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locales[lang], { ...o, timeZone: 'UTC' }).format(date);
  return { day: f({ day: 'numeric' }), month: f({ month: 'short' }).replace('.', ''), year: f({ year: 'numeric' }) };
}

/** "Robert Marcial González" → "RG" */
export function initials(name: string): string {
  const words = name.replace(/\(.*?\)/g, '').trim().split(/\s+/).filter((w) => /^\p{Lu}/u.test(w) && !w.endsWith('.')); // ignora títulos: Dr., Abg.
  const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return picked.map((w) => w[0]).join('').toUpperCase();
}
