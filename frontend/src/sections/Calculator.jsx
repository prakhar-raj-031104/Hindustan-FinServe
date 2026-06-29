import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Calculator.css';

gsap.registerPlugin(ScrollTrigger);

const inr = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));

export default function Calculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(3);
  const root = useRef(null);
  const maturityRef = useRef(null);

  // Local compounding calc (quarterly) — mirrors the backend /calculate endpoint
  const { maturity, interest } = useMemo(() => {
    const n = 4;
    const m = principal * Math.pow(1 + rate / 100 / n, n * years);
    return { maturity: m, interest: m - principal };
  }, [principal, rate, years]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.calc__panel', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Animated count-up on maturity change
  useEffect(() => {
    const el = maturityRef.current;
    if (!el) return;
    const obj = { v: Number(el.dataset.prev || 0) };
    gsap.to(obj, {
      v: maturity,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = '₹' + inr(obj.v);
      },
      onComplete: () => {
        el.dataset.prev = maturity;
      },
    });
  }, [maturity]);

  const growthPct = Math.min(100, (interest / maturity) * 100);

  return (
    <section className="calc section" id="calculator" ref={root}>
      <div className="container calc__grid">
        <div className="calc__intro">
          <span className="eyebrow">FD calculator</span>
          <h2>See exactly how much your money grows.</h2>
          <p>
            Adjust the amount, rate and tenure to project your maturity value with quarterly
            compounding — the same logic our specialists use.
          </p>
          <a href="#contact" className="btn btn-primary">
            Lock this in →
          </a>
        </div>

        <div className="calc__panel">
          <div className="calc__field">
            <div className="calc__label">
              <span>Investment amount</span>
              <strong>₹{inr(principal)}</strong>
            </div>
            <input
              type="range"
              min="5000"
              max="2500000"
              step="5000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
            />
          </div>

          <div className="calc__field">
            <div className="calc__label">
              <span>Interest rate (p.a.)</span>
              <strong>{rate.toFixed(2)}%</strong>
            </div>
            <input
              type="range"
              min="5"
              max="9.5"
              step="0.05"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>

          <div className="calc__field">
            <div className="calc__label">
              <span>Tenure</span>
              <strong>
                {years} {years === 1 ? 'year' : 'years'}
              </strong>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>

          <div className="calc__result">
            <div className="calc__bar">
              <span className="calc__bar-invest" style={{ width: `${100 - growthPct}%` }} />
              <span className="calc__bar-growth" style={{ width: `${growthPct}%` }} />
            </div>
            <div className="calc__legend">
              <span>
                <i className="dot dot--invest" /> Invested ₹{inr(principal)}
              </span>
              <span>
                <i className="dot dot--growth" /> Interest ₹{inr(interest)}
              </span>
            </div>

            <div className="calc__maturity">
              <span>Maturity value</span>
              <strong ref={maturityRef}>₹{inr(maturity)}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
