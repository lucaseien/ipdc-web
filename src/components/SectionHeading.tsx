export default function SectionHeading({ title, eyebrow, id, as: H = 'h2' }: { title: string; eyebrow?: string; id?: string; as?: 'h2' | 'h3' }) {
  return (
    <div className="mb-8 sm:mb-10">
      {eyebrow && <p className="label mb-2">{eyebrow}</p>}
      <H id={id} className="text-h2 font-medium">
        {title}
      </H>
      <span className="filete mt-4" aria-hidden="true" />
    </div>
  );
}
