import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/investments', label: 'Investments' },
  { hash: '/#rates', label: 'FD Rates' },
  { hash: '/#calculator', label: 'Calculator' },
  { to: '/about', label: 'About Us' },
  { hash: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__logo">HF</span>
          <span className="nav__name">
            Hindustan<strong>FinServe</strong>
          </span>
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.hash} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            )
          )}
          <a href="/#contact" className="btn btn-primary nav__cta" onClick={() => setOpen(false)}>
            Start Investing
          </a>
        </nav>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
