import RecipeItem from "../../components/RecipeItem"
import { useContext } from "react"
import { GlobalContext } from "../../context"

export default function Favorites() {
  const { isLoading, favoritesList } = useContext(GlobalContext)
  return (
    <main>
      {isLoading ? (
        <h1 className="loading">Loading your recipes...</h1>
      ) : favoritesList.length !== 0 ? (
        favoritesList.map((item) => <RecipeItem item={item} />)
      ) : (
        <h1 className="loading">
          Add some recipe in your favorites to look anytime at it.
        </h1>
      )}
    </main>
  )
}
