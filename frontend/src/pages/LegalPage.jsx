import { useReveal } from '../hooks/useReveal';
import './LegalPage.css';

export default function LegalPage({ title, intro, sections }) {
  const ref = useReveal({ y: 30, stagger: 0.06 });
  return (
    <section className="legal section theme-light" ref={ref}>
      <div className="container legal__wrap">
        <span className="eyebrow" data-reveal>Hindustan FinServe</span>
        <h1 data-reveal>{title}</h1>
        <p className="legal__intro" data-reveal>{intro}</p>

        {sections.map((s, i) => (
          <div className="legal__sec" key={i} data-reveal>
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
