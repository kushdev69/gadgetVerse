import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

export default function Wishlist() {
  const { wishlist } = useStore();
  return (
    <>
      <Navbar />
      <div className="page-wrapper container">
        <div className="anim-fadein-up" style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 800 }}>Saved Gadgets</h1>
          <p className="text-muted">Tech you are considering for your next upgrade</p>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-4 gap-6 anim-fadein-up">
            {wishlist.map(p => (
              <ProductCard
                key={p.id}
                product={p}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state glass-card">
            <div className="empty-state-icon">📱</div>
            <h2 style={{ marginBottom: '0.75rem' }}>Your gadget list is empty</h2>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>Browse the shop to save gadgets here.</p>
            <a href="/category/audio" className="btn btn-primary">Start Browsing →</a>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
