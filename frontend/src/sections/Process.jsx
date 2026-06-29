import { useReveal } from '../hooks/useReveal';
import './Process.css';

const steps = [
  {
    n: '01',
    title: 'Tell us your goal',
    text: 'Share how much you want to invest and for how long. No jargon, no commitment.',
  },
  {
    n: '02',
    title: 'Get a matched shortlist',
    text: 'We compare every partner FD and recommend the best rate-to-safety options for you.',
  },
  {
    n: '03',
    title: 'We handle the paperwork',
    text: 'KYC and booking are done digitally with a specialist guiding you at each step.',
  },
  {
    n: '04',
    title: 'Track and grow',
    text: 'Receive your FD receipt and maturity reminders — reinvest in one tap when it matures.',
  },
];

export default function Process() {
  const ref = useReveal({ y: 40, stagger: 0.12 });
  return (
    <section className="process section theme-light" ref={ref}>
      <div className="container">
        <div className="section-head" style={{ margin: '0 auto 60px', textAlign: 'center' }}>
          <span className="eyebrow" data-reveal>
            How it works
          </span>
          <h2 data-reveal>Invest in four simple steps</h2>
        </div>

        <div className="process__line">
          {steps.map((s) => (
            <div className="process__step" key={s.n} data-reveal>
              <span className="process__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
