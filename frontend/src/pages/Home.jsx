import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../services/catalogService";

const SHOPPING_PROMISES = [
  { icon: "🛡️", title: "Genuine Products", sub: "Verified brands & warranties" },
  { icon: "⚡", title: "Fast Delivery", sub: "Reliable shipping across India" },
  { icon: "🔧", title: "Expert Support", sub: "Help from gadget specialists" },
  { icon: "↩️", title: "Easy Returns", sub: "30-day hassle-free replacement" }
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [trendingGadgets, setTrendingGadgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");
  const [productError, setProductError] = useState("");

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled([getCategories(), getProducts({ sort: "featured" })])
      .then(([categoryResult, productResult]) => {
        if (cancelled) return;

        if (categoryResult.status === "fulfilled") {
          setCategories(categoryResult.value);
        } else {
          setCategoryError("Unable to load categories. Please refresh and try again.");
        }

        if (productResult.status === "fulfilled") {
          setTrendingGadgets(productResult.value);
        } else {
          setProductError("Unable to load products. Please refresh and try again.");
        }

        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      {/* Safety & Promise Bar */}
      <section className="container" style={{ marginTop: '3.5rem' }}>
        <div className="trust-bar anim-fadein-up">
          {SHOPPING_PROMISES.map((promise) => (
            <div key={promise.title} className="trust-item">
              <div className="trust-icon">{promise.icon}</div>
              <div>
                <div className="trust-title">{promise.title}</div>
                <div className="trust-sub">{promise.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by gadget category */}
      <section id="categories" className="section container">
        <div className="section-header">
          <div className="section-eyebrow anim-fadein-up">✦ Discover your next upgrade</div>
          <h2 className="section-title anim-fadein-up delay-1">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="section-subtitle anim-fadein-up delay-2">
            From everyday essentials to powerful upgrades, find tech that fits the way you live and work.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6 anim-fadein-up delay-2">
          {loading && <p className="text-muted">Loading categories...</p>}
          {!loading && categories.map(c => (
            <CategoryCard key={c.slug} category={c} />
          ))}
          {categoryError && <p className="text-muted">{categoryError}</p>}
        </div>
      </section>

      {/* Trending gadgets section */}
      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="section-header flex justify-between items-center" style={{ marginBottom: '2.5rem' }}>
          <div>
            <div className="section-eyebrow anim-fadein-up">✦ Hot gadgets</div>
            <h2 className="section-title anim-fadein-up delay-1" style={{ marginBottom: 0 }}>
              Trending <span className="gradient-text">Tech</span>
            </h2>
          </div>
          <a href="/category/smartphones" className="btn btn-ghost anim-fadein-up">View All Gadgets →</a>
        </div>
        <div className="grid grid-cols-4 gap-6 anim-fadein-up delay-2">
          {loading && <p className="text-muted">Loading trending gadgets...</p>}
          {!loading && trendingGadgets.map(gadget => (
            <ProductCard
              key={gadget.id}
              product={gadget}
            />
          ))}
          {!loading && !productError && trendingGadgets.length === 0 && (
            <p className="text-muted">No featured products are available right now.</p>
          )}
          {productError && <p className="text-muted">{productError}</p>}
        </div>
      </section>

      {/* Special Promo Section */}
      <section className="container" style={{ paddingBottom: '6.5rem' }}>
        <div className="anim-fadein-up" style={{
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          borderRadius: '2rem',
          padding: '4rem',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '150px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.75rem', color: 'white' }}>First Purchase Discount</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '1rem' }}>
              Upgrade Your Everyday<br />with Better Tech
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', marginBottom: '2rem' }}>
              Get <strong>20% off</strong> on your first gadget order. Use code <strong>TECH20</strong> at checkout.
            </p>
            <a href="/signup" className="btn" style={{ background: 'white', color: '#8b5cf6', fontWeight: 700, padding: '0.875rem 2rem' }}>
              Get Coupon Code →
            </a>
          </div>
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <div style={{ fontSize: '6rem', lineHeight: 1, filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.35))' }}>📱</div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container" style={{ paddingBottom: '6.5rem' }}>
        <div className="newsletter-section anim-fadein-up">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>✦ GadgetVerse Club</div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Join the <span className="gradient-text">Tech Club</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              Get early access to new launches, buying guides, product alerts, and members-only deals.
            </p>
            <div className="newsletter-input-group">
              <input type="email" className="form-input" placeholder="Enter your email address..." />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
