import { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context"
const url = "https://forkify-api.herokuapp.com/api/v2/recipes/"

export default function Details() {
  const { id } = useParams()
  const {
    recipeData,
    setRecipeData,
    isLoading,
    setIsLoading,
    handleAddToFavorites,
    favoritesList,
  } = useContext(GlobalContext)

  async function fetchData() {
    setIsLoading(true)
    try {
      const response = await fetch(url + id)
      const data = await response.json()
      if (data?.data) {
        setRecipeData(data?.data?.recipe)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])
  return (
    <>
      {isLoading && (
        <h1 className="loading">
          Loading your recipe...
          <br />
          Warm the oven!
        </h1>
      )}
      {recipeData ? (
        <article className="recipeContainer">
          <div className="recipeContainer-img">
            <img src={recipeData.image_url} alt={recipeData.title} />
          </div>
          <div className="ingredients">
            <span>{recipeData?.publisher}</span>
            <h3>{recipeData.title}</h3>
            <button
              onClick={() => handleAddToFavorites(recipeData)}
              className="btn"
            >
              {favoritesList.findIndex((item) => item.id === recipeData.id) !==
              -1
                ? "Remove from Favorites"
                : "Save as favorites"}
            </button>
            <span>Ingredients:</span>
            <ul>
              {recipeData?.ingredients?.map((ingredient) => (
                <li>
                  <span>
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  <span>{ingredient.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ) : (
        <h1>We didn't the recipe details in the old book!</h1>
      )}
    </>
  )
}
