import { useState, useEffect } from "react";

import Header from "../components/Header";
import CategoriesList from "../components/CategoriesList";
import RecipeList from "../components/RecipeList";
import { fetchData } from "../http";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 3,
    description: "Dessert",
  });
  const [ isFetching, setIsFetching ] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      setIsFetching(true);
      try {
        const recipesData = await fetchData(
          "filter",
          `c=${selectedCategory.description}`
        );

        setRecipes(recipesData.meals);
        setIsFetching(false);
      } catch (error) {

      }
    }
    fetchRecipes();
  }, [selectedCategory]);

  const handleCategorySelection = (category) => {
    setSelectedCategory({
      id: +category.idCategory,
      description: category.strCategory,
    });
  };

  return (
    <>
      <Header />
      <section className="pt-8 px-8 flex flex-row justify-between">
        <CategoriesList
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelection}
        />
        {
          !isFetching && <RecipeList recipes={recipes} />
        }
        {
          isFetching && <p>Cargando...</p>
        }
      </section>
    </>
  );
};

export default Home;
