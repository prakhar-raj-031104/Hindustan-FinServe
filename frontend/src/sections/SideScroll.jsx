import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SideScroll.css';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    n: '01',
    tag: 'Corporate FD',
    title: 'NBFC Fixed Deposits',
    text: 'Higher returns than bank FDs from CRISIL AAA-rated NBFCs like Bajaj & Mahindra Finance, with tenures from 12 to 60 months.',
    rate: 'up to 8.10%',
    color: '#00d09c',
    img: '/cards/nbfc.jpg',
  },
  {
    n: '02',
    tag: 'Small Finance Bank',
    title: 'High-Yield Bank FDs',
    text: 'DICGC-insured deposits up to ₹5 lakh with some of the highest interest rates in the market — ideal for short-term parking.',
    rate: 'up to 8.60%',
    color: '#12b886',
    img: '/cards/bank.jpg',
  },
  {
    n: '03',
    tag: 'Housing Finance',
    title: 'HFC Deposits',
    text: 'Stable, long-tenure deposits from LIC Housing & PNB Housing — built for predictable, compounding growth over 3–5 years.',
    rate: 'up to 7.75%',
    color: '#5fe3c0',
    img: '/cards/hfc.jpg',
  },
  {
    n: '04',
    tag: 'For Seniors',
    title: 'Senior Citizen FDs',
    text: 'An additional 0.25–0.50% interest on every partner FD, with simplified documentation and dedicated relationship support.',
    rate: '+0.50% bonus',
    color: '#00b386',
    img: '/cards/senior.jpg',
  },
];

export default function SideScroll() {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.ss__card');
      const trackEl = track.current;

      const getScrollAmount = () => trackEl.scrollWidth - window.innerWidth;

      const tween = gsap.to(trackEl, {
        x: () => -getScrollAmount() + 'px',
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: () => '+=' + getScrollAmount(),
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      // subtle entrance scale as each card enters the viewport center
      panels.forEach((p) => {
        gsap.from(p, {
          scale: 0.92,
          opacity: 0.4,
          scrollTrigger: {
            trigger: p,
            containerAnimation: tween,
            start: 'left 90%',
            end: 'left 50%',
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ss" ref={root} id="products">
      <div className="ss__track" ref={track}>
        <div className="ss__intro">
          <span className="eyebrow">Our products</span>
          <h2>
            One platform.
            <br />
            Every kind of FD.
          </h2>
          <p>Keep scrolling to explore the deposit families we help you compare and invest in.</p>
          <span className="ss__hint">Scroll →</span>
        </div>

        {cards.map((c) => (
          <article className="ss__card" key={c.n} style={{ '--accent': c.color }}>
            <div
              className="ss__media"
              style={{ backgroundImage: `url(${c.img})` }}
              role="img"
              aria-label={c.title}
            />
            <div className="ss__card-top">
              <span className="ss__num">{c.n}</span>
              <span className="ss__tag">{c.tag}</span>
            </div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <div className="ss__card-foot">
              <span className="ss__rate">{c.rate}</span>
              <a href="#rates" className="ss__link">
                View rates →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
