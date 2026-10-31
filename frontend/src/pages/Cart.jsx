import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useStore } from "../context/StoreContext";

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, notify } = useStore();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal === 0 || subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <>
      <Navbar />
      <div className="page-wrapper container">
        <div className="anim-fadein-up" style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 800 }}>Your Tech Cart</h1>
          <p className="text-muted">{cart.reduce((sum, item) => sum + item.qty, 0)} gadget{cart.length === 1 ? "" : "s"} ready for checkout</p>
        </div>
        {cart.length === 0 ? (
          <div className="empty-state glass-card">
            <div className="empty-state-icon">🛒</div>
            <h2 style={{ marginBottom: '0.75rem' }}>Your cart is empty</h2>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>Browse our gadgets and add something you love.</p>
            <a href="/category/smartphones" className="btn btn-primary">Start Shopping →</a>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="flex flex-col gap-4 anim-fadein-up">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div style={{ flex: 1 }}>
                    <div className="cart-item-name">{item.name}</div>
                    <div className="flex items-center gap-3" style={{ margin: '0.6rem 0' }}>
                      <button className="qty-btn" onClick={() => updateCartQuantity(item.id, item.qty - 1)}>−</button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateCartQuantity(item.id, item.qty + 1)}>+</button>
                    </div>
                    <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }} onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="anim-fadein-up delay-2">
              <div className="order-summary">
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Order Summary</h2>
                <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="summary-row"><span>Standard Shipping</span><span style={{ color: shipping === 0 ? '#10b981' : 'inherit' }}>{shipping === 0 ? 'Free ✓' : `₹${shipping}`}</span></div>
                <div className="summary-row"><span>Tax (18% GST)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
                <div className="divider"></div>
                <div className="summary-total"><span>Total</span><span className="summary-total-price">₹{total.toLocaleString('en-IN')}</span></div>
                <div style={{ padding: '1.25rem 0', marginBottom: '1rem' }}><div className="flex gap-2"><input type="text" className="form-input" placeholder="Promo code" /><button className="btn btn-ghost" onClick={() => notify("Promo code will be applied at checkout")}>Apply</button></div></div>
                <button className="btn btn-primary w-full btn-lg" onClick={() => notify("Checkout is ready to connect to your payment provider")}>Proceed to Checkout →</button>
                <p className="text-muted text-center" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>🔒 Secure 256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
