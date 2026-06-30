import './LegalPage.css';

export default function LegalPage({ title, intro, sections }) {
  return (
    <section className="legal section theme-light">
      <div className="container legal__wrap">
        <span className="eyebrow">Hindustan FinServe</span>
        <h1>{title}</h1>
        <p className="legal__intro">{intro}</p>

        {sections.map((s, i) => (
          <div className="legal__sec" key={i}>
            <h2>{s.h}</h2>
            {s.body?.map((b, j) => (
              <p key={j}>{b}</p>
            ))}
            {s.list && (
              <ul>
                {s.list.map((l, j) => (
                  <li key={j}>{l}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
