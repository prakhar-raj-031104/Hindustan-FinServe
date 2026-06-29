import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

// Dense, full-width masonry of reviews (5 columns) that fill the whole page,
// leaving only the exact centre clear for the headline. Positions are % of viewport.
const cards = [
  // ── far-left column ──
  { q: 'Compared FD rates across five NBFCs in minutes and booked a Bajaj Finance deposit the same evening — zero paperwork.', n: 'Rohan Mehta', r: 'Software Engineer, Pune', s: { top: '6%', left: '1%' }, w: 268 },
  { q: 'Finally a place that shows ratings next to rates. I could pick safety and returns together instead of guessing.', n: 'Amitabh Sharma', r: 'Chartered Accountant', s: { top: '40%', left: '0.5%' }, w: 268 },
  { q: 'I started saving properly because of Hindustan FinServe. The reminders keep me on track.', n: 'Abhinav Sohni', r: 'Product Manager, Noida', s: { bottom: '5%', left: '1%' }, w: 268 },

  // ── inner-left column ──
  { q: 'Your support team is genuinely excellent. Every question answered before I even worried about it.', n: 'Palak Gupta', r: 'Analyst, Gurugram', s: { top: '14%', left: '20%' }, w: 236 },
  { q: 'A practising CA, I recommend this to clients for safe, rated fixed income. They’re always happy.', n: 'Mohit Daga', r: 'Practising CA, Jaipur', s: { top: '46%', left: '19.5%' }, w: 236 },
  { q: 'Every first-time saver should know about this. It made investing easy and personal for me.', n: 'Sahil Bansal', r: 'Developer, Bengaluru', s: { bottom: '13%', left: '20%' }, w: 236 },

  // ── centre column (top & bottom only — headline sits between) ──
  { q: 'First time I felt confident about fixed income. The shortlist was clear and unbiased.', n: 'Shivam Kushwaha', r: 'Teacher, Lucknow', s: { top: '2%', left: '38%' }, w: 248 },
  { q: 'When it comes to money, trust is everything. This platform is transparent and easy to rely on.', n: 'Puneet Gupta', r: 'Sr. Manager, Pune', s: { bottom: '2%', left: '37%' }, w: 248 },

  // ── inner-right column ──
  { q: 'I want to give it 10/10. Clear rates, clear ratings — exactly what I was confused about elsewhere.', n: 'Ankit Puri', r: 'Specialist, Hyderabad', s: { top: '14%', right: '20%' }, w: 236 },
  { q: 'Customer support actually picked up and explained tenures clearly. Reinvested at maturity in one tap.', n: 'Neha Gupta', r: 'Doctor, Delhi', s: { top: '46%', right: '19.5%' }, w: 236 },
  { q: 'The calculator helped me plan my daughter’s tuition fund precisely. Maturity reminders are lovely.', n: 'Priya Nair', r: 'Homemaker, Kochi', s: { bottom: '13%', right: '20%' }, w: 236 },

  // ── far-right column ──
  { q: 'As a retired teacher, the senior-citizen bonus rate made a real difference. Guided through every step.', n: 'Sunita Rao', r: 'Retired, Bengaluru', s: { top: '6%', right: '1%' }, w: 268 },
  { q: 'Transparent, data-driven and genuinely helpful. Made fixed-income investing feel modern.', n: 'Karthik Iyer', r: 'Founder, D2C brand', s: { top: '40%', right: '0.5%' }, w: 268 },
  { q: 'Actually simple to use. Several of my colleagues joined after I recommended it.', n: 'Amit Sharma', r: 'Solutions Architect', s: { bottom: '5%', right: '1%' }, w: 268 },
];

export default function Testimonials() {
  const root = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const countUp = (trigger) => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: 24000,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger, start: 'top 70%' },
          onUpdate: () => {
            if (numRef.current)
              numRef.current.textContent =
                new Intl.NumberFormat('en-IN').format(Math.round(obj.v)) + '+';
          },
        });
      };

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 860;

      if (reduce || isMobile) {
        gsap.from('.tst__card', {
          opacity: 0,
          y: 30,
          stagger: 0.05,
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        });
        countUp(root.current);
        return;
      }

      // PHASE 1 — cards fly in and SETTLE before the sticky engages.
      gsap.from('.tst__card', {
        opacity: 0,
        scale: 0.5,
        y: 50,
        ease: 'back.out(1.5)',
        stagger: { each: 0.05, from: 'edges' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top 85%',
          end: 'top 28%',
          scrub: 0.8,
        },
      });
      gsap.from('.tst__head', {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          end: 'top 33%',
          scrub: 0.8,
        },
      });

      // PHASE 2 — sticky engaged: brief hold, then zoom the field out so the
      // cards fly past, and finish right as the section releases into Contact.
      const zoom = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
      zoom
        .to({}, { duration: 0.16 }) // hold — everything rests on screen
        .to('.tst__field', { scale: 3, ease: 'power1.in', duration: 0.84 }, 0.16)
        .to(
          '.tst__card',
          { opacity: 0, ease: 'none', duration: 0.5, stagger: { each: 0.012, from: 'center' } },
          0.5
        )
        .to('.tst__head', { scale: 1.1, ease: 'none', duration: 0.84 }, 0.16);

      countUp(root.current);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tst theme-light" ref={root}>
      <div className="tst__sticky">
        <div className="tst__field">
          {cards.map((c, i) => (
            <article className="tst__card" key={i} style={{ ...c.s, width: c.w }}>
              <p>“{c.q}”</p>
              <div className="tst__person">
                <span className="tst__avatar">{c.n.charAt(0)}</span>
                <div>
                  <strong>{c.n}</strong>
                  <em>{c.r}</em>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="tst__head">
          <span className="eyebrow">Trusted across India</span>
          <h2>
            Trusted by <span ref={numRef} className="tst__num">24,000+</span>
            <br />
            fixed-income investors
          </h2>
          <p>Real people growing their savings safely with Hindustan FinServe.</p>
        </div>
      </div>
    </section>
  );
}
