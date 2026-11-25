'use client';
/**
 * Frases del hero que se alternan cada pocos segundos (inspirado en las portadas de estudios jurídicos).
 * - Es decorativo: el contenido real lo da el <h1>; los lectores de pantalla leen solo la primera frase.
 * - Respeta "reducir movimiento" (queda fija la primera) y se pausa al pasar el mouse o enfocar.
 */
import { useEffect, useState } from 'react';

export interface Tagline {
  before: string;
  accent: string;
  after?: string;
}

export default function RotatingTagline({ items, interval = 5000 }: { items: Tagline[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % items.length), interval);
    return () => window.clearInterval(id);
  }, [paused, items.length, interval]);

  return (
    <p
      className="rotador text-display font-normal text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((t, i) => (
        <span key={i} data-activo={i === active} aria-hidden={i !== 0 ? true : undefined} className="font-display">
          {t.before} <span className="acento text-celeste-300">{t.accent}</span>
          {t.after ? ` ${t.after}` : ''}
        </span>
      ))}
    </p>
  );
}
