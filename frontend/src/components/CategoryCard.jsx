import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (

    <Link to={`/category/${category.slug}`} className="category-card">
      <img src={category.image} alt={category.name} className="category-card-img" />
      <div className="category-card-arrow">→</div>
      <div className="category-card-body">
      <div className="category-card-title">{category.name}</div>
      <div className="category-card-sub">{category.count} items</div>
      </div>
    </Link>

  );
}
