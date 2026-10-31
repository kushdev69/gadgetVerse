import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

const FAQ = [
  { q: "Are your gadgets genuine and covered by warranty?", a: "Absolutely. We source from verified brands and authorized distributors. Eligible products include a brand warranty, clearly listed on their product page." },
  { q: "What should I do if my gadget arrives damaged?", a: "Contact us with your order number and photos within 48 hours. We will arrange a quick replacement or resolution at no extra cost." },
  { q: "Can I get help choosing the right gadget?", a: "Yes. Our product categories and buying guides make it easy to compare features, and our support team can help you find the right fit." },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { notify } = useStore();
  return (
    <>
      <Navbar />
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.07))', borderBottom: '1px solid var(--color-border)', padding: '6rem 0 4rem' }}>
        <div className="container text-center anim-fadein-up">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>✦ GadgetVerse Care</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
            We're here to <span className="gradient-text">support you.</span>
          </h1>
          <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto', fontSize: '1.1rem' }}>
            Have a question about a gadget, delivery, warranty, or return? Send us a message anytime.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '5rem 0' }}>
        <div className="grid grid-cols-2 gap-8">
          {/* Form */}
          <div className="card anim-fadein-up" style={{ padding: '3rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>Send a Message</h2>
            <form onSubmit={e => { e.preventDefault(); setSent(true); notify("Message sent! We'll be in touch shortly."); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-input" placeholder="Jane" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-input" placeholder="Doe" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="jane@example.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-input" style={{ background: 'var(--color-surface)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>
                  <option>Damaged / Missing Accessories</option>
                  <option>Warranty / Quality Concern</option>
                  <option>Order & Shipping Support</option>
                  <option>General Support</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows="5" placeholder="How can we help with your gadget experience?" required style={{ resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full" style={{ padding: '1rem' }}>
                {sent ? "Message Sent ✓" : "Send Message →"}
              </button>
            </form>
          </div>

          {/* Info & FAQs */}
          <div className="anim-fadein-up delay-2">
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>Contact Info</h3>
              {[['📧', 'Email Support', 'care@gadgetverse.in'], ['📞', 'Tech Helpline', '+91 98765 00000'], ['🕐', 'Working Hours', '9 AM - 9 PM IST']].map(([icon, label, val]) => (
                <div key={label} className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                  <div className="trust-icon" style={{ width: 40, height: 40, fontSize: '1rem' }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    <div style={{ fontWeight: 500 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>Frequently Asked Questions</h3>
              {FAQ.map((f, i) => (
                <details key={i} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--color-text-main)', fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                    {f.q} <span>+</span>
                  </summary>
                  <p className="text-muted" style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
