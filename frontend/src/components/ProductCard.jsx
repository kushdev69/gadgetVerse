import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const { wishlist, addToCart, toggleWishlist } = useStore();
  const isSaved = wishlist.some(item => item.id === product.id);
  return (
    <div className="product-card">
      {product.badge && (
        <div className="product-card-badge">{product.badge}</div>
      )}
      <div className="product-img-wrapper">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"}
            alt={product.name}
            className="product-img"
          />
        </Link>
        <div className="product-card-actions">
          <button className="product-action-btn" title={isSaved ? "Remove from Wishlist" : "Add to Wishlist"} onClick={() => { toggleWishlist(product); onAddToWishlist?.(product); }}>{isSaved ? "♥" : "♡"}</button>
          <button className="product-action-btn" title="Quick View">👁</button>
        </div>
      </div>
      <div className="product-card-body">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="product-card-name">{product.name}</div>
        </Link>
        <div className="product-card-desc">{product.description}</div>
        <div className="product-card-footer">
          <div className="product-card-price">₹{product.price.toLocaleString('en-IN')}</div>
          <button className="product-add-btn" onClick={() => { addToCart(product); onAddToCart?.(product); }}>+ Cart</button>
        </div>
      </div>
    </div>
  );
}
