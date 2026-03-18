export default function PageHeader({ eyebrow, title, titleEm, desc }) {
  return (
    <section className="page-header">
      <div className="page-header-inner">
        <div className="page-eyebrow">
          <div className="page-eyebrow-dot"></div>
          {eyebrow}
        </div>
        <h1>{title}{titleEm && <> <em>{titleEm}</em></>}</h1>
        <p>{desc}</p>
      </div>
    </section>
  );
}
