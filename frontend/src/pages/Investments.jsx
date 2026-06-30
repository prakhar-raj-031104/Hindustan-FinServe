import { useEffect, useMemo, useState } from 'react';
import { getFdProducts } from '../lib/api';
import { useReveal } from '../hooks/useReveal';
import './Investments.css';

const TENURES = [12, 18, 24, 36, 48, 60];
const inr = (n) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

export default function Investments() {
  const ref = useReveal({ y: 40, stagger: 0.08 });
  const [products, setProducts] = useState([]);
  const [gender, setGender] = useState('male');
  const [senior, setSenior] = useState(false);
  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(24);

  useEffect(() => {
    getFdProducts().then((r) => setProducts(r.data)).catch(() => {});
  }, []);

  const results = useMemo(() => {
    let list = products.filter((p) => p.tenure_months === tenure);
    if (!list.length) list = products;
    const years = tenure / 12;
    const n = 4;
    return list
      .map((p) => {
        const rate = senior && p.senior_rate ? Number(p.senior_rate) : Number(p.interest_rate);
        const maturity = amount * Math.pow(1 + rate / 100 / n, n * years);
        return { ...p, rate, maturity: Math.round(maturity), interest: Math.round(maturity - amount) };
      })
      .sort((a, b) => b.rate - a.rate);
  }, [products, tenure, senior, amount]);

  return (
    <section className="inv section theme-light" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Investments</span>
          <h2>Compare Fixed Deposit interest rates</h2>
          <p>Customise your profile and instantly compare projected returns across our partner issuers.</p>
        </div>

        <div className="inv__grid">
          {/* Form */}
          <form className="inv__form" data-reveal onSubmit={(e) => e.preventDefault()}>
            <div className="inv__field">
              <label>Applicant</label>
              <div className="inv__seg">
                <button type="button" className={gender === 'male' ? 'on' : ''} onClick={() => setGender('male')}>Male</button>
                <button type="button" className={gender === 'female' ? 'on' : ''} onClick={() => setGender('female')}>Female</button>
              </div>
            </div>

            <div className="inv__field">
              <label>Citizen type</label>
              <div className="inv__seg">
                <button type="button" className={!senior ? 'on' : ''} onClick={() => setSenior(false)}>Regular</button>
                <button type="button" className={senior ? 'on' : ''} onClick={() => setSenior(true)}>Senior (60+)</button>
              </div>
            </div>

            <div className="inv__field">
              <label>Investment amount</label>
              <div className="inv__amount">
                <span>₹</span>
                <input type="number" min="5000" step="5000" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} />
              </div>
            </div>

            <div className="inv__field">
              <label>Tenure</label>
              <div className="inv__tenures">
                {TENURES.map((t) => (
                  <button key={t} type="button" className={tenure === t ? 'on' : ''} onClick={() => setTenure(t)}>
                    {t} mo
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary inv__go">Compare Now →</button>
          </form>

          {/* Results */}
          <div className="inv__results" data-reveal>
            <div className="inv__rhead">
              <span>Issuer</span>
              <span>Rating</span>
              <span>Rate p.a.</span>
              <span>Maturity</span>
            </div>
            {results.map((p, i) => (
              <div className={`inv__row ${i === 0 ? 'is-top' : ''}`} key={p.id}>
                <span className="inv__issuer">
                  {p.partner_name}
                  {i === 0 && <em>Best return</em>}
                </span>
                <span data-l="Rating">{p.rating}</span>
                <span data-l="Rate" className="inv__rate">{p.rate.toFixed(2)}%</span>
                <span data-l="Maturity" className="inv__mat">₹{inr(p.maturity)}</span>
              </div>
            ))}
            {!results.length && <p className="inv__empty">Loading rates…</p>}
            <p className="inv__note">
              Projected on quarterly compounding for {tenure} months{senior ? ', senior-citizen rate applied' : ''}. Indicative only — final rate is set by the issuer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
