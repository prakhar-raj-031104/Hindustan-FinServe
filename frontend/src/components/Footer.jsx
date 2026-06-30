import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribe } from '../lib/api';
import './Footer.css';

const ROUTES = {
  'About us': '/about',
  'About Hindustan FinServe': '/about',
  Contact: '/#contact',
  'Contact Us': '/#contact',
  'Privacy Policy': '/privacy-policy',
  'Terms & Conditions': '/terms-and-conditions',
  'NBFC fixed deposits': '/investments',
  'Bank fixed deposits': '/investments',
  'Housing finance FDs': '/investments',
  'Senior citizen FDs': '/investments',
  'FD calculator': '/#calculator',
  'Rate comparison': '/#rates',
};
function FLink({ label }) {
  const to = ROUTES[label];
  if (to && to.startsWith('/') && !to.includes('#')) return <Link to={to}>{label}</Link>;
  return <a href={to || '#top'}>{label}</a>;
}

const columns = [
  {
    title: 'Company',
    links: ['About us', 'Our partners', 'Pricing', 'Careers', 'Press & media', 'Trust & safety', 'Help & support'],
  },
  {
    title: 'Products',
    links: ['NBFC fixed deposits', 'Bank fixed deposits', 'Housing finance FDs', 'Senior citizen FDs', 'Corporate FDs', 'Tax-saving FDs', 'Cumulative FDs'],
  },
  {
    title: 'Resources',
    links: ['FD calculator', 'Rate comparison', 'FD vs RD', 'FD taxation guide', 'Credit ratings explained', 'Blog & insights', 'FAQs'],
  },
];

const directory = {
  'Fixed Deposits': [
    'NBFC FD', 'Bank FD', 'Housing Finance FD', 'Senior Citizen FD', 'Corporate FD',
    'Tax-Saving FD', 'Cumulative FD', 'Non-Cumulative FD', 'Bajaj Finance FD',
    'Shriram Finance FD', 'Mahindra Finance FD', 'LIC Housing FD', 'PNB Housing FD',
    'Sundaram Finance FD', 'Unity SFB FD', 'ICICI Home Finance FD',
  ],
  Calculators: [
    'FD Calculator', 'RD Calculator', 'Maturity Calculator', 'Compound Interest Calculator',
    'Goal Planner', 'Tax Saver Calculator', 'SIP Calculator', 'Lumpsum Calculator',
    'Inflation Calculator', 'Retirement Planner',
  ],
  Learn: [
    'What is a Fixed Deposit', 'FD vs RD', 'FD vs Mutual Funds', 'FD Laddering Strategy',
    'How FD Interest is Taxed', 'Understanding Credit Ratings', 'DICGC Insurance Explained',
    'Premature Withdrawal Rules', 'Senior Citizen Benefits', 'Form 15G / 15H Guide',
  ],
  Company: [
    'About Hindustan FinServe', 'Our Partner Issuers', 'Careers', 'Press & Media',
    'Investor Relations', 'Trust & Safety', 'Help Centre', 'Contact Us',
  ],
};

const legal = [
  'RBI Compliance', 'Terms & Conditions', 'Privacy Policy', 'Disclosure',
  'Investor Grievance', 'Download Forms', 'Information Security', 'Sitemap',
];

const socials = [
  { label: 'X', d: 'M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-7-6.2 7H1.6l8.2-9.3L1 2h7l4.9 6.5L18.9 2zm-2.4 18h1.9L7.6 4H5.5l11 16z' },
  { label: 'Instagram', d: 'M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 4.95 4.95.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.15 3.25-1.65 4.8-4.95 4.95-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-3.3-.15-4.8-1.7-4.95-4.95C2.08 15.6 2.07 15.2 2.07 12s0-3.6.07-4.9C2.29 3.85 3.79 2.3 7.1 2.27 8.4 2.21 8.8 2.2 12 2.2zm0 3.05a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zm0 11.13a4.38 4.38 0 110-8.76 4.38 4.38 0 010 8.76zm6.9-11.4a1.58 1.58 0 11-3.15 0 1.58 1.58 0 013.15 0z' },
  { label: 'Facebook', d: 'M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z' },
  { label: 'LinkedIn', d: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z' },
  { label: 'YouTube', d: 'M23.5 6.2a3 3 0 00-2.12-2.12C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.53A3 3 0 00.5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3 3 0 002.12 2.12c1.88.53 9.38.53 9.38.53s7.5 0 9.38-.53a3 3 0 002.12-2.12C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [tab, setTab] = useState('Fixed Deposits');

  const onSubscribe = async (e) => {
    e.preventDefault();
    try {
      await subscribe(email);
    } catch {
      /* keep UX graceful */
    }
    setDone(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Top: brand + link columns */}
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span>HF</span> Hindustan<strong>FinServe</strong>
            </div>
            <address className="footer__addr">
              Miar International Private Limited
              <br />
              Authorised distributor of RBI-compliant deposits
              <br />
              India • +91 797 334 1256
              <br />
              Mon–Sat, 10:00 AM – 6:00 PM
            </address>

            <div className="footer__contact-row">
              <a href="#contact" className="footer__contact">
                Contact us →
              </a>
              <div className="footer__apps">
                <span className="footer__app"> App Store</span>
                <span className="footer__app">▶ Google Play</span>
              </div>
            </div>

            <form className="footer__news" onSubmit={onSubscribe}>
              {done ? (
                <span className="footer__news-done">✓ Subscribed — rate updates incoming!</span>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    placeholder="Email for FD rate alerts"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </>
              )}
            </form>

            <div className="footer__social">
              {socials.map((s) => (
                <a key={s.label} href="#top" aria-label={s.label} className="footer__soc">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="footer__cols">
            {columns.map((c) => (
              <div className="footer__col" key={c.title}>
                <h4>{c.title}</h4>
                <ul>
                  {c.links.map((l) => (
                    <li key={l}>
                      <FLink label={l} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__meta">
          <p>© 2016–{new Date().getFullYear()} Hindustan FinServe (Miar International Pvt. Ltd.). All rights reserved.</p>
          <span className="footer__version">v1.0.0</span>
        </div>

        {/* Tabbed link directory */}
        <div className="footer__directory">
          <div className="footer__tabs">
            {Object.keys(directory).map((t) => (
              <button
                key={t}
                className={`footer__tab ${tab === t ? 'is-active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="footer__dirlinks">
            {directory[tab].map((l) => (
              <a key={l} href="#top">
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Legal row */}
        <div className="footer__legal">
          <span className="footer__legal-label">Others:</span>
          <div className="footer__legal-links">
            {legal.map((l) => (
              <FLink key={l} label={l} />
            ))}
          </div>
        </div>

        <p className="footer__disc">
          Hindustan FinServe (Miar International Private Limited) is an authorised distributor of
          fixed deposits and is not a deposit-taking entity. Investments in deposits are subject to
          the terms, conditions and credit risk of the respective issuers. Interest rates shown are
          indicative and may change without notice. Please read all scheme-related documents
          carefully before investing.
        </p>
      </div>
    </footer>
  );
}
