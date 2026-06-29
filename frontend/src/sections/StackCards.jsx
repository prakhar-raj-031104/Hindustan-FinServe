import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StackCards.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    k: 'Protect',
    title: 'Capital protection first',
    text: 'We only list deposits from RBI-regulated, highly-rated issuers. Your principal stays safe while it grows at a predictable rate.',
    stat: '100%',
    statLabel: 'Regulated issuers',
    bg: 'linear-gradient(135deg, #053d2c, #0b6e4f)',
  },
  {
    k: 'Compare',
    title: 'Compare every rate in one view',
    text: 'See live interest rates, tenures, ratings and senior-citizen bonuses side by side — no more checking ten different websites.',
    stat: '12+',
    statLabel: 'FD partners',
    bg: 'linear-gradient(135deg, #0b6e4f, #12b886)',
  },
  {
    k: 'Grow',
    title: 'Returns that compound for you',
    text: 'Lock in tenures aligned to your goals and let quarterly compounding do the heavy lifting toward your target corpus.',
    stat: '8.60%',
    statLabel: 'Top rate p.a.',
    bg: 'linear-gradient(135deg, #12b886, #63e6be)',
  },
  {
    k: 'Support',
    title: 'Guided, paperwork-free investing',
    text: 'Our specialists handle selection and documentation end to end, so opening an FD takes minutes, not days.',
    stat: '10–6',
    statLabel: 'Mon–Sat support',
    bg: 'linear-gradient(135deg, #0d1b14, #0b6e4f)',
  },
];

export default function StackCards() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stack__card');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.35,
          filter: 'blur(2px)',
          scrollTrigger: {
            trigger: card,
            start: 'top 14%',
            end: 'bottom 14%',
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stack section" ref={root}>
      <div className="container section-head">
        <span className="eyebrow">How we help you grow</span>
        <h2>Four promises behind every deposit</h2>
        <p>Scroll through the principles that guide how Hindustan FinServe puts your money to work.</p>
      </div>

      <div className="stack__list container">
        {steps.map((s, i) => (
          <article
            className="stack__card"
            key={s.k}
            style={{ background: s.bg, top: `${90 + i * 26}px`, zIndex: i + 1 }}
          >
            <div className="stack__content">
              <span className="stack__k">{s.k}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
            <div className="stack__stat">
              <strong>{s.stat}</strong>
              <span>{s.statLabel}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
