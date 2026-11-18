/** Acordeón accesible con <details>/<summary> nativos: funciona sin JavaScript. */
export default function Accordion({
  title,
  open = false,
  headingLevel: H = 'h3',
  children,
}: {
  title: string;
  open?: boolean;
  headingLevel?: 'h2' | 'h3';
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-linea" open={open}>
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
        <H className="font-serif text-[1.25rem] leading-snug font-semibold text-azul-900 group-hover:text-azul-700">{title}</H>
        <span className="relative size-6 shrink-0 rounded-full border border-azul-700 text-azul-700" aria-hidden="true">
          <span className="absolute top-1/2 left-1/2 h-px w-2.5 -translate-1/2 bg-current" />
          <span className="absolute top-1/2 left-1/2 h-2.5 w-px -translate-1/2 bg-current transition-transform group-open:scale-y-0" />
        </span>
      </summary>
      <div className="prose-site pb-6">{children}</div>
    </details>
  );
}
