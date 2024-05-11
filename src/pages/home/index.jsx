import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/RecipeItem"

export default function Home() {
  const { isLoading, recipeList } = useContext(GlobalContext)
  return (
    <main>
      {isLoading ? (
        <h1 className="loading">Loading your recipes...</h1>
      ) : (
        recipeList.map((item) => <RecipeItem item={item} />)
      )}
    </main>
  )
}
