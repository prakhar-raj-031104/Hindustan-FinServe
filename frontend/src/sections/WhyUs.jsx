import { useReveal } from '../hooks/useReveal';
import './WhyUs.css';

const features = [
  {
    icon: '🛡️',
    title: 'Capital protection approach',
    text: 'Every partner is RBI-regulated and credit-rated. We prioritise the safety of your principal above chasing the last basis point.',
  },
  {
    icon: '📈',
    title: 'Attractive interest rates',
    text: 'Our partnerships unlock preferential FD rates — often higher than what you would get walking into a branch yourself.',
  },
  {
    icon: '🗓️',
    title: 'Flexible tenure options',
    text: 'From 12 to 60 months, choose a tenure that lines up with your goals — an emergency buffer, a down payment, or retirement.',
  },
  {
    icon: '🤝',
    title: 'Simple & guided process',
    text: 'A dedicated specialist assists you through selection and documentation, so the whole journey is genuinely paperwork-free.',
  },
];

export default function WhyUs() {
  const ref = useReveal({ y: 50, stagger: 0.1 });

  return (
    <section className="why section theme-light" id="why" ref={ref}>
      <div className="container why__grid">
        <aside className="why__aside">
          <span className="eyebrow" data-reveal>
            Why Hindustan FinServe
          </span>
          <h2 data-reveal>
            A smarter, safer way to build your fixed-income portfolio.
          </h2>
          <p data-reveal>
            We are an authorised distributor working with India's most trusted deposit
            issuers. You get expert, unbiased guidance — and we handle the rest.
          </p>
          <a href="#contact" className="btn btn-primary" data-reveal>
            Talk to a specialist →
          </a>
        </aside>

        <div className="why__cards">
          {features.map((f) => (
            <article className="why__card" key={f.title} data-reveal>
              <span className="why__icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
