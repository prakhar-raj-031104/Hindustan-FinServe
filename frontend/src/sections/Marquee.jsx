import './Marquee.css';

const items = [
  'Capital Protection',
  'RBI-Compliant Partners',
  'Up to 8.60% p.a.',
  'Senior Citizen Bonus',
  'Paperwork-Free',
  'Flexible Tenures',
  'Guided Investing',
  'AAA-Rated Issuers',
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {row.map((t, i) => (
          <span className="marquee__item" key={i}>
            {t}
            <i className="marquee__star">✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
