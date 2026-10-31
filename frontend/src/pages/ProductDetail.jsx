import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useStore } from "../context/StoreContext";
import { getProduct } from "../services/catalogService";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    getProduct(id).then(data => {
      if (!cancelled) setProduct(data);
    }).catch(() => {
      if (!cancelled) setError("Product not found or temporarily unavailable.");
    });
    return () => { cancelled = true; };
  }, [id]);

  if (error) {
    return <><Navbar /><div className="page-wrapper container"><p className="text-muted">{error}</p></div><Footer /></>;
  }
  if (!product) {
    return <><Navbar /><div className="page-wrapper container"><p className="text-muted">Loading product...</p></div><Footer /></>;
  }

  const productId = product.id;
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating) ? "★" : "☆");
  const saved = wishlist.some(item => item.id === productId);

  return (
    <>
      <Navbar />
      <div className="page-wrapper container">
        <div className="product-detail-grid anim-fadein-up">
          <div>
            <img src={product.images[activeImg]} alt={product.name} className="detail-img" />
            <div className="detail-thumbs">
              {product.images.map((img, i) => <img key={img} src={img} alt={`${product.name} view ${i + 1}`} className={`detail-thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)} />)}
            </div>
          </div>
          <div className="anim-fadein-up delay-1">
            <div className="detail-badge">● Genuine Product · Warranty Included</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>{product.name}</h1>
            <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
              <span style={{ color: '#f97316', fontSize: '1rem', letterSpacing: '0.05em' }}>{stars.join('')}</span>
              <span style={{ fontWeight: 700 }}>{product.rating}</span>
              <span className="text-muted" style={{ fontSize: '0.875rem' }}>({product.reviews.toLocaleString()} reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="detail-price">₹{product.price.toLocaleString('en-IN')}</div>
              <span style={{ color: 'var(--color-text-muted)', textDecoration: 'line-through', fontSize: '1rem' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700 }}>{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
            </div>
            <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '2rem' }}>{product.description}</p>
            <div className="flex" style={{ flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>{product.features.map(feature => <span key={feature} className="feature-chip">{feature}</span>)}</div>
            <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(value => Math.max(1, value - 1))}>−</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(value => Math.min(product.stock || 99, value + 1))}>+</button>
              </div>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => addToCart(product, qty)}>Add to Cart</button>
              <button className="btn-icon" title="Wishlist" onClick={() => toggleWishlist(product)}>{saved ? "♥" : "♡"}</button>
            </div>
            <button className="btn btn-ghost w-full" onClick={() => addToCart(product, qty)}>Buy Now — Instant Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
