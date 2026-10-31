import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminSignin, createAdminProduct } from "../services/adminService";

const emptyProduct = {
  productCode: "",
  category: "",
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  image: "",
  features: "",
  stock: "0",
  badge: "",
  isFeatured: true
};

function Admin() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("gadgetverse-admin-token"));
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [product, setProduct] = useState(emptyProduct);
  const [message, setMessage] = useState(null);

  const update = setter => event => setter(current => ({
    ...current,
    [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
  }));

  async function handleSignin(event) {
    event.preventDefault();
    setMessage(null);
    try {
      const response = await adminSignin(credentials);
      localStorage.setItem("gadgetverse-admin-token", response.data.token);
      setToken(response.data.token);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Admin login failed" });
    }
  }

  async function handleCreate(event) {
    event.preventDefault();
    setMessage(null);
    try {
      await createAdminProduct(product, token);
      setProduct(emptyProduct);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("gadgetverse-admin-token");
        setToken(null);
      }
      setMessage({ type: "error", text: error.response?.data?.message || "Unable to add product" });
    }
  }

  function logout() {
    localStorage.removeItem("gadgetverse-admin-token");
    setToken(null);
  }

  if (!token) {
    return (
      <div className="admin-page">
        <div className="admin-card admin-login-card">
          <Link to="/" className="admin-back-link">← Back to store</Link>
          <p className="section-eyebrow">GadgetVerse</p>
          <h1 className="auth-form-title">Admin login</h1>
          <p className="auth-form-sub">Sign in to manage your product catalog.</p>
          {message && <p className={`admin-message ${message.type}`}>{message.text}</p>}
          <form onSubmit={handleSignin}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input id="username" name="username" className="form-input" value={credentials.username} onChange={update(setCredentials)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className="form-input" value={credentials.password} onChange={update(setCredentials)} required />
            </div>
            <button type="submit" className="btn btn-primary w-full">Sign in →</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card admin-product-card">
        <div className="admin-header">
          <div>
            <p className="section-eyebrow">GadgetVerse</p>
            <h1 className="auth-form-title">Add a product</h1>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={logout}>Log out</button>
        </div>
        <p className="auth-form-sub">New products appear in the storefront after they are saved.</p>
        {message && <p className={`admin-message ${message.type}`}>{message.text}</p>}
        <form onSubmit={handleCreate} className="admin-product-form">
          <div className="admin-form-grid">
            {[
              ["productCode", "Product code", "number"],
              ["category", "Category (e.g. smartphones)", "text"],
              ["name", "Product name", "text"],
              ["price", "Price", "number"],
              ["originalPrice", "Original price", "number"],
              ["stock", "Stock", "number"],
              ["image", "Image URL", "url"],
              ["badge", "Badge (optional)", "text"]
            ].map(([name, label, type]) => (
              <div className="form-group" key={name}>
                <label className="form-label" htmlFor={name}>{label}</label>
                <input id={name} name={name} type={type} className="form-input" value={product[name]} onChange={update(setProduct)} required={!["badge"].includes(name)} />
              </div>
            ))}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea id="description" name="description" className="form-input" rows="3" value={product.description} onChange={update(setProduct)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="features">Features (comma separated)</label>
            <input id="features" name="features" className="form-input" value={product.features} onChange={update(setProduct)} />
          </div>
          <label className="admin-checkbox">
            <input type="checkbox" name="isFeatured" checked={product.isFeatured} onChange={update(setProduct)} />
            Show as featured product
          </label>
          <button type="submit" className="btn btn-primary">Add product →</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
