import { useState, useEffect } from "react";

import Header from "./components/Header";
import CategoriesList from "./components/CategoriesList";
import RecipeList from "./components/RecipeList";
import { fetchData } from "./http";

const App = () => {
  const [ recipes, setRecipes ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState({
    id: 3,
    description: 'Dessert',
  });

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const recipesData = await fetchData('filter', `c=${ selectedCategory.description }`);

        setRecipes(recipesData.meals);
      } catch(error) {

      }
    };
    fetchRecipes();
  }, [ selectedCategory ]);

  const handleCategorySelection = (category) => {
    setSelectedCategory({ 
      id: +category.idCategory,
      description: category.strCategory,
    });
  };

  return (
    <>
      <Header />
      <section className="pt-8 px-8 flex flex-row">
        <CategoriesList 
          selectedCategory={ selectedCategory }
          onSelect={ handleCategorySelection }
        />
        <RecipeList 
          recipes={ recipes }
        />
      </section>
    </>
  );
}

export default App;
