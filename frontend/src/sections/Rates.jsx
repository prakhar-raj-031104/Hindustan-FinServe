import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFdProducts } from '../lib/api';
import './Rates.css';

gsap.registerPlugin(ScrollTrigger);

const filters = ['All', 'NBFC', 'Bank', 'HFC'];

export default function Rates() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState('All');
  const [error, setError] = useState(null);
  const root = useRef(null);

  useEffect(() => {
    getFdProducts()
      .then((res) => setProducts(res.data))
      .catch((e) => setError(e.message));
  }, []);

  const rows = products.filter((p) => active === 'All' || p.partner_type === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rates__row', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.rates__table', start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, [rows.length, active]);

  return (
    <section className="rates section theme-light" id="rates" ref={root}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Live comparison</span>
          <h2>Compare today's best FD rates</h2>
          <p>
            Interest rates sourced from our partner issuers. Senior citizens earn the higher
            rate shown.
          </p>
        </div>

        <div className="rates__filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`rates__chip ${active === f ? 'is-active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {error && <p className="rates__error">Couldn't load rates: {error}</p>}

        <div className="rates__table">
          <div className="rates__head">
            <span>Issuer</span>
            <span>Type</span>
            <span>Tenure</span>
            <span>Rating</span>
            <span>Regular</span>
            <span>Senior</span>
            <span></span>
          </div>

          {rows.map((p) => (
            <div className={`rates__row ${p.is_featured ? 'is-featured' : ''}`} key={p.id}>
              <span className="rates__issuer">
                {p.partner_name}
                {p.highlight && <em>{p.highlight}</em>}
              </span>
              <span data-label="Type">{p.partner_type}</span>
              <span data-label="Tenure">{p.tenure_months} mo</span>
              <span data-label="Rating">{p.rating}</span>
              <span data-label="Regular" className="rates__rate">
                {Number(p.interest_rate).toFixed(2)}%
              </span>
              <span data-label="Senior" className="rates__rate rates__rate--senior">
                {p.senior_rate ? `${Number(p.senior_rate).toFixed(2)}%` : '—'}
              </span>
              <span>
                <a href="#contact" className="rates__invest">
                  Invest →
                </a>
              </span>
            </div>
          ))}

          {!error && rows.length === 0 && <p className="rates__empty">Loading rates…</p>}
        </div>
      </div>
    </section>
  );
}
