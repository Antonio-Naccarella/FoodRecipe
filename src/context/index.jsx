import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const url = "https://forkify-api.herokuapp.com/api/v2/recipes?search="

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recipeList, setRecipeList] = useState([])
  const [recipeData, setRecipeData] = useState([])
  const [favoritesList, setFavoritesList] = useState([])

  const navigate = useNavigate()

  async function fetchData(param) {
    setIsLoading(true)
    try {
      const response = await fetch(url + param)
      const data = await response.json()
      if (data?.data?.recipes) {
        setRecipeList(data.data.recipes)
        setIsLoading(false)
        setSearchParam("")
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    fetchData(searchParam)
  }

  useEffect(() => {
    fetchData("pasta")
  }, [])

  function handleAddToFavorites(currentItem) {
    console.log(currentItem)
    let newFavoritesList = [...favoritesList]
    const index = newFavoritesList.findIndex(
      (item) => item.id === currentItem.id
    )

    if (index === -1) {
      newFavoritesList.push(currentItem)
    } else {
      newFavoritesList.splice(index)
    }
    setFavoritesList(newFavoritesList)
  }
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        isLoading,
        setIsLoading,
        recipeList,
        recipeData,
        setRecipeData,
        favoritesList,
        handleAddToFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
