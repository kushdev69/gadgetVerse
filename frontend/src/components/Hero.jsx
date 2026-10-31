import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      {/* Background Orbs */}
      <div className="hero-bg">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="hero-orb orb-3"></div>
      </div>

      <div className="hero-content container">
        <div className="hero-grid">
          {/* Left: Content */}
          <div className="animate-fade-in-up">
            <div className="hero-eyebrow">
              <span>⚡</span>
              Discover, Connect & Upgrade
            </div>
            <h1 className="hero-title">
              Where Great Tech <br />
              <span className="gradient-text">Meets Everyday Life.</span>
            </h1>
            <p className="hero-subtitle">
              Explore premium smartphones, laptops, audio gear, and wearables selected to make work, play, and connection better.
            </p>
            <div className="hero-cta">
              <Link to="#categories" className="btn btn-primary btn-lg">
                Explore Gadgets
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/category/laptops" className="btn btn-ghost btn-lg">
                Shop Best Sellers
              </Link>
            </div>
            
            <div className="hero-stats">
              <div>
                <div className="stat-number">10K+</div>
                <div className="stat-label">Curated Gadgets</div>
              </div>
              <div>
                <div className="stat-number">100%</div>
                <div className="stat-label">Authentic Tech</div>
              </div>
              <div>
                <div className="stat-number">4.9★</div>
                <div className="stat-label">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hero-visual">
            <div className="hero-img-container anim-float">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80"
                alt="Premium electronic gadgets"
                className="hero-img"
              />
              
             { /* Floating Badge 1 */}
              <div className="hero-floating-card hero-floating-card-1">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'1.1rem' }}>⚙️</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Smart Choice</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Tech Expert Pick</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="hero-floating-card hero-floating-card-2">
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🏆</div>
                <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>Top Brands</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>Warranty Included</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
