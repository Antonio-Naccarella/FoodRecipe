import { Link } from "react-router-dom"
import "./styles.css"

export default function RecipeItem({ item }) {
  return (
    <section className="recipe">
      <div className="recipe-img">
        <img src={item.image_url} alt={item.title} />
      </div>
      <div className="recipe-details">
        <span>{item.publisher}</span>
        <h2>{item.title}</h2>
        <Link to={`/recipe/${item.id}`}>Recipe Details</Link>
      </div>
    </section>
  )
}
