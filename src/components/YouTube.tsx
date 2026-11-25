'use client';
/**
 * Video de YouTube con "fachada": muestra una imagen y solo carga el reproductor
 * (y las cookies de YouTube) cuando la persona hace clic. Mejora mucho el rendimiento.
 */
import { useState } from 'react';
import Image from 'next/image';
import Icon from './Icon';

export default function YouTube({ id, title, poster }: { id: string; title: string; poster?: { src: string } }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="m-0">
      <div className="relative aspect-video overflow-hidden rounded-card bg-azul-950">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
            ref={(el) => el?.focus()}
          />
        ) : (
          <>
            {poster ? (
              <Image src={poster.src} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover opacity-80" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                decoding="async"
                width={480}
                height={360}
                className="size-full object-cover opacity-80"
              />
            )}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center text-white"
              aria-label={`Reproducir video: ${title}`}
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-celeste-600 shadow-card-hover transition-transform hover:scale-105">
                <Icon name="play" className="size-7 translate-x-0.5" />
              </span>
            </button>
          </>
        )}
      </div>
      <figcaption className="mt-3 font-display text-[1.125rem] leading-snug font-semibold text-azul-900">{title}</figcaption>
    </figure>
  );
}
