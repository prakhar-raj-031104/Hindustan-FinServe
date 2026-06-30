import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { submitContact } from '../lib/api';
import './Contact.css';

const initial = { name: '', email: '', phone: '', company: '', location: '', amount: '', message: '' };

export default function Contact() {
  const ref = useReveal({ y: 36, stagger: 0.08 });
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company || undefined,
        location: form.location || undefined,
        amount: form.amount ? Number(form.amount) : undefined,
        message: form.message || undefined,
      });
      setStatus('success');
      setForm(initial);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <section className="contact section" id="contact" ref={ref}>
      <div className="container contact__grid">
        <div className="contact__info">
          <span className="eyebrow" data-reveal>
            Start investing
          </span>
          <h2 data-reveal>Let's build your fixed-income plan.</h2>
          <p data-reveal>
            Share a few details and a specialist will call you back with a personalised FD
            shortlist. No pressure, no spam.
          </p>

          <ul className="contact__list">
            <li data-reveal>
              <span className="contact__ic">📞</span>
              <div>
                <em>Call us</em>
                <a href="tel:+917973341256">+91 797 334 1256</a>
              </div>
            </li>
            <li data-reveal>
              <span className="contact__ic">🕑</span>
              <div>
                <em>Working hours</em>
                <strong>Mon – Sat, 10:00 AM – 6:00 PM</strong>
              </div>
            </li>
            <li data-reveal>
              <span className="contact__ic">🏛️</span>
              <div>
                <em>Compliance</em>
                <strong>RBI-compliant partner issuers</strong>
              </div>
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={onSubmit} data-reveal>
          {status === 'success' ? (
            <div className="contact__success">
              <span className="contact__check">✓</span>
              <h3>Thank you!</h3>
              <p>Your request is in. A specialist will reach out within one business day.</p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setStatus('idle')}
              >
                Send another request
              </button>
            </div>
          ) : (
            <>
              <div className="contact__field">
                <label>Full name</label>
                <input
                  type="text"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                />
              </div>
              <div className="contact__row">
                <div className="contact__field">
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@email.com"
                  />
                </div>
                <div className="contact__field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+91 …"
                  />
                </div>
              </div>
              <div className="contact__row">
                <div className="contact__field">
                  <label>Company (optional)</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={update('company')}
                    placeholder="Company name"
                  />
                </div>
                <div className="contact__field">
                  <label>Location (optional)</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={update('location')}
                    placeholder="City / state"
                  />
                </div>
              </div>
              <div className="contact__field">
                <label>Amount to invest (optional)</label>
                <input
                  type="number"
                  min="5000"
                  value={form.amount}
                  onChange={update('amount')}
                  placeholder="₹ 1,00,000"
                />
              </div>
              <div className="contact__field">
                <label>Message (optional)</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell us about your goal…"
                />
              </div>

              {status === 'error' && <p className="contact__err">⚠️ {errorMsg}</p>}

              <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Request a callback →'}
              </button>
              <p className="contact__fine">
                By submitting, you agree to be contacted about FD products. Fixed deposits are
                subject to issuer terms.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
