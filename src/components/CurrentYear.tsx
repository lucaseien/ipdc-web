'use client';
/** Año del copyright siempre actual, aunque el sitio no se vuelva a publicar. */
import { useEffect, useState } from 'react';

export default function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span>{year}</span>;
}
