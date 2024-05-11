import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../../context"
import "./styles.css"

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext)
  return (
    <nav className="navbar">
      <h2>
        <NavLink to={"/"}>FoodRecipe</NavLink>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          type="text"
          name="search"
          placeholder="Enter Recipe..."
        ></input>
      </form>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/favorites"}>Favorites</NavLink>
        </li>
      </ul>
    </nav>
  )
}
