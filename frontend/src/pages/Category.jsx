import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../services/catalogService";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" }
];

export default function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [gadgets, setGadgets] = useState([]);
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      getCategories(),
      getProducts({ category: id, sort })
    ]).then(([categories, products]) => {
      if (cancelled) return;
      setCategory(categories.find(item => item.slug === id) || null);
      setGadgets(products);
    }).catch(() => {
      if (!cancelled) setError("Unable to load this category. Please try again.");
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [id, sort]);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(236, 72, 153, 0.08))', borderBottom: '1px solid var(--color-border)', padding: '3.5rem 0', marginBottom: '3rem' }}>
          <div className="container">
            <p className="section-eyebrow anim-fadein-up" style={{ marginBottom: '0.5rem' }}>✦ Gadget category</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.75rem', fontWeight: 800 }} className="anim-fadein-up delay-1">{category?.name || "Gadgets"}</h1>
            <p className="text-muted anim-fadein-up delay-2" style={{ marginTop: '0.5rem' }}>{category?.description || "Explore our latest electronics."}</p>
          </div>
        </div>
        <div className="container">
          <div className="flex justify-between items-center" style={{ marginBottom: '2.5rem' }}>
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>{loading ? "Loading products..." : `${gadgets.length} products found`}</div>
            <div className="flex items-center gap-3">
              <span className="text-muted" style={{ fontSize: '0.875rem' }}>Sort by:</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="form-input" style={{ width: 'auto', padding: '0.5rem 1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-main)' }}>
                {SORT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
          </div>
          {error && <p className="text-muted">{error}</p>}
          {!loading && !error && gadgets.length === 0 && <p className="text-muted">No products are available in this category.</p>}
          <div className="grid grid-cols-4 gap-6 anim-fadein-up">
            {gadgets.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
