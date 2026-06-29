import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

const words = ['Stability.', 'Growth.', 'Trust.'];

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero__eyebrow', { y: 24, opacity: 0, duration: 0.7 })
        .from(
          '.hero__line .reveal-inner',
          { yPercent: 120, duration: 1, stagger: 0.12 },
          '-=0.3'
        )
        .from('.hero__sub', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.hero__actions > *', { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.4')
        .from('.hero__stat', { y: 30, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.4')
        .from(
          '.hero__card',
          { y: 60, opacity: 0, scale: 0.9, duration: 1, stagger: 0.14 },
          '-=0.9'
        );

      // Rotating word
      const rotator = gsap.timeline({ repeat: -1, delay: 1.4 });
      const items = gsap.utils.toArray('.hero__rotate span');
      items.forEach((item, i) => {
        const next = items[(i + 1) % items.length];
        rotator
          .to(item, { yPercent: -110, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=1.4')
          .fromTo(
            next,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            '<'
          );
      });

      // Floating parallax on the card cluster
      gsap.to('.hero__card', {
        y: (i) => (i % 2 ? 16 : -16),
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero theme-light" id="top" ref={root}>
      <div className="hero__bg" aria-hidden />
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="hero__eyebrow eyebrow">RBI-compliant FD partners</span>

          <h1 className="hero__title">
            <span className="hero__line">
              <span className="reveal-inner">Fixed Deposits</span>
            </span>
            <span className="hero__line">
              <span className="reveal-inner">designed for</span>
            </span>
            <span className="hero__line hero__rotate-wrap">
              <span className="reveal-inner hero__rotate">
                {words.map((w, i) => (
                  <span key={w} style={{ opacity: i === 0 ? 1 : 0 }}>
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <p className="hero__sub">
            Compare the best FD rates from India's top NBFCs, banks and housing finance
            companies — then invest with capital protection and guided, paperwork-free
            support.
          </p>

          <div className="hero__actions">
            <a href="#rates" className="btn btn-primary">
              Compare FD Rates →
            </a>
            <a href="#calculator" className="btn btn-ghost">
              Calculate returns
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>8.60%</strong>
              <span>Top interest rate p.a.</span>
            </div>
            <div className="hero__stat">
              <strong>12+</strong>
              <span>Trusted FD partners</span>
            </div>
            <div className="hero__stat">
              <strong>₹5,000</strong>
              <span>Start investing from</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__card hero__card--main">
            <div className="hc__top">
              <span className="hc__badge">Featured</span>
              <span className="hc__rate">8.60%</span>
            </div>
            <p className="hc__name">Unity Small Finance Bank</p>
            <p className="hc__meta">12 months • Senior 9.10%</p>
            <div className="hc__bar">
              <i style={{ '--w': '86%' }} />
            </div>
          </div>

          <div className="hero__card hero__card--mini">
            <span className="hc__label">Maturity value</span>
            <strong className="hc__big">₹1,28,400</strong>
            <span className="hc__delta">+₹28,400 earned</span>
          </div>

          <div className="hero__card hero__card--chip">
            <span className="hc__dot" /> Capital protected
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden>
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
