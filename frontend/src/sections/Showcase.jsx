import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Showcase.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    eyebrow: 'Rate intelligence',
    title: 'Track FD rate trends like a pro',
    text: 'Watch how partner interest rates move over time on a live, customisable chart — and lock in the moment a rate peaks.',
    cta: 'Explore rates',
  },
  {
    eyebrow: 'One-tap booking',
    title: 'Compare and book in a single tap',
    text: 'Sort every issuer by rate, tenure and safety rating, then open your deposit instantly — fully digital, paperwork-free.',
    cta: 'Compare now',
  },
  {
    eyebrow: 'Portfolio view',
    title: 'See every deposit and payout in one place',
    text: 'Your invested amount, interest earned and maturity calendar — tracked together in a single, real-time dashboard.',
    cta: 'View dashboard',
  },
];

// Deterministic candlestick data (0–100 price scale), slight uptrend
function genCandles(n = 26) {
  const arr = [];
  let price = 38;
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < n; i++) {
    const open = price;
    const change = (rnd() - 0.4) * 7;
    const close = Math.max(10, Math.min(94, open + change));
    const high = Math.min(98, Math.max(open, close) + rnd() * 5);
    const low = Math.max(4, Math.min(open, close) - rnd() * 5);
    arr.push({ open, close, high, low, up: close >= open });
    price = close;
  }
  return arr;
}

export default function Showcase() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const candles = useMemo(() => genCandles(26), []);

  const linePoints = useMemo(() => {
    const n = candles.length;
    return candles.map((c, i) => `${(i / (n - 1)) * 100},${100 - c.close}`).join(' ');
  }, [candles]);
  const areaPoints = `0,100 ${linePoints} 100,100`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.show__panel');
      const screens = gsap.utils.toArray('.dash__screen');
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 36 });
      gsap.set(screens.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            setActive(idx);
          },
        },
      });

      for (let i = 1; i < steps.length; i++) {
        tl.to(panels[i - 1], { autoAlpha: 0, y: -36, duration: 0.5 })
          .to(screens[i - 1], { autoAlpha: 0, scale: 1.02, duration: 0.5 }, '<')
          .fromTo(panels[i], { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.12')
          .fromTo(
            screens[i],
            { autoAlpha: 0, scale: 0.97 },
            { autoAlpha: 1, scale: 1, duration: 0.6 },
            '<'
          )
          .to({}, { duration: 0.5 });
      }

      // Candlestick entrance + line draw
      gsap.from('.cs__candle', {
        scaleY: 0,
        transformOrigin: 'bottom',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.025,
        scrollTrigger: { trigger: '.show__dash', start: 'top 75%' },
      });
      const path = root.current.querySelector('.cs__path');
      if (path && path.getTotalLength) {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: '.show__dash', start: 'top 75%' },
          }
        );
      }

      // Pointer parallax tilt
      const stage = root.current.querySelector('.show__stage');
      const onMove = (e) => {
        const rx = (e.clientX / window.innerWidth - 0.5) * 6;
        const ry = (e.clientY / window.innerHeight - 0.5) * -6;
        gsap.to(stage, { rotateY: rx, rotateX: ry, duration: 0.6, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="show" ref={root}>
      <div className="show__sticky">
        {/* per-step colour wash — green → amber → blue, crossfaded */}
        <div className="show__tints" aria-hidden>
          <span className="show__tint tint--green" style={{ opacity: active === 0 ? 1 : 0 }} />
          <span className="show__tint tint--amber" style={{ opacity: active === 1 ? 1 : 0 }} />
          <span className="show__tint tint--blue" style={{ opacity: active === 2 ? 1 : 0 }} />
        </div>

        <div className="container show__grid">
          {/* LEFT — swapping text */}
          <div className="show__copy">
            <div className="show__panels">
              {steps.map((s) => (
                <div className="show__panel" key={s.title}>
                  <span className="eyebrow eyebrow--dark">{s.eyebrow}</span>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                  <a href="#rates" className="btn btn-primary">
                    {s.cta} →
                  </a>
                </div>
              ))}
            </div>
            <div className="show__dots">
              {steps.map((s, i) => (
                <span key={i} className={`show__dot ${active === i ? 'is-active' : ''}`}>
                  <i />
                  {String(i + 1).padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — dashboard whose screen swaps per step */}
          <div className="show__visual">
            <div className="show__stage">
              <div className="show__dash">
                {/* constant ticker bar */}
                <div className="dash__bar">
                  {[
                    ['1Y FD', '8.10%', true],
                    ['3Y FD', '7.95%', true],
                    ['5Y FD', '7.75%', false],
                    ['Senior', '+0.50%', true],
                  ].map(([k, v, up]) => (
                    <span className="dash__idx" key={k}>
                      <em>{k}</em>
                      <b>{v}</b>
                      <i className={up ? 'up' : 'down'}>{up ? '▲' : '▼'}</i>
                    </span>
                  ))}
                </div>

                <div className="dash__stage">
                  {/* SCREEN 1 — Rate trend chart */}
                  <div className="dash__screen">
                    <div className="dash__screen-head">
                      <span>NBFC FD · Rate Trend</span>
                      <strong className="dash__price">
                        8.10% <i className="up">+0.05</i>
                      </strong>
                    </div>
                    <div className="cs">
                      <svg className="cs__overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(0,208,156,0.35)" />
                            <stop offset="100%" stopColor="rgba(0,208,156,0)" />
                          </linearGradient>
                        </defs>
                        <polygon points={areaPoints} fill="url(#areaFill)" />
                        <polyline
                          className="cs__path"
                          points={linePoints}
                          fill="none"
                          stroke="var(--green-300)"
                          strokeWidth="0.8"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                      <div className="cs__candles">
                        {candles.map((c, i) => (
                          <span className="cs__candle" key={i}>
                            <i
                              className="cs__wick"
                              style={{ top: `${100 - c.high}%`, height: `${c.high - c.low}%` }}
                            />
                            <i
                              className={`cs__body ${c.up ? 'up' : 'down'}`}
                              style={{
                                top: `${100 - Math.max(c.open, c.close)}%`,
                                height: `${Math.max(1.5, Math.abs(c.open - c.close))}%`,
                              }}
                            />
                          </span>
                        ))}
                      </div>
                      <div className="cs__axis">
                        <span>8.6</span>
                        <span>8.0</span>
                        <span>7.4</span>
                        <span>6.8</span>
                      </div>
                    </div>
                    <div className="dash__range">
                      {['1M', '6M', '1Y', '3Y', '5Y'].map((r, i) => (
                        <span key={r} className={i === 2 ? 'is-active' : ''}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SCREEN 2 — Compare & book */}
                  <div className="dash__screen">
                    <div className="dash__screen-head">
                      <span>Compare FD Rates</span>
                      <em className="dash__chip">NBFC · 12 mo</em>
                    </div>
                    <div className="cmp">
                      {[
                        ['Unity SFB', 'AA', '8.60%', true],
                        ['Bajaj Finance', 'AAA', '8.10%', false],
                        ['Mahindra Finance', 'AAA', '8.05%', false],
                        ['Shriram Finance', 'AA+', '7.85%', false],
                      ].map(([name, rt, rate, best]) => (
                        <div className={`cmp__row ${best ? 'is-best' : ''}`} key={name}>
                          <span className="cmp__name">{name}</span>
                          <span className="cmp__rating">{rt}</span>
                          <span className="cmp__rate">{rate}</span>
                          <span className="cmp__book">Book →</span>
                          {best && <em className="cmp__flag">Best</em>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SCREEN 3 — Portfolio */}
                  <div className="dash__screen">
                    <div className="dash__bal">
                      <span>Total invested</span>
                      <strong>₹4,28,400</strong>
                      <em className="up">+₹38,260 interest earned</em>
                    </div>
                    <div className="dash__side">
                      {[
                        ['Bajaj Finance', '8.10%', '+₹12,400'],
                        ['Shriram Finance', '7.85%', '+₹8,900'],
                        ['LIC Housing', '7.75%', '+₹10,100'],
                        ['Unity SFB', '8.60%', '+₹6,860'],
                      ].map((r) => (
                        <div className="dash__pos" key={r[0]}>
                          <span className="dash__pos-name">{r[0]}</span>
                          <span className="dash__pos-rate">{r[1]}</span>
                          <span className="dash__pos-pnl up">{r[2]}</span>
                        </div>
                      ))}
                    </div>
                    <button className="dash__cta">Book new FD →</button>
                  </div>
                </div>
              </div>

              {/* overlapping phone */}
              <div className="show__phone">
                <div className="ph__head">
                  <span>Maturity tracker</span>
                  <em className="up">▲ 2.1%</em>
                </div>
                <strong className="ph__val">₹1,46,930</strong>
                <span className="ph__sub">matures in 18 months</span>
                <svg className="ph__spark" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <polyline
                    points="0,32 12,28 24,30 36,22 48,24 60,16 72,18 84,8 100,4"
                    fill="none"
                    stroke="var(--green-500)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div className="ph__btns">
                  <span className="ph__buy">Reinvest</span>
                  <span className="ph__sell">Withdraw</span>
                </div>
              </div>
            </div>

            <div className="show__glow" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
