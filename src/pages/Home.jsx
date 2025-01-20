import { useState, useEffect } from "react";

import Header from "../components/Header";
import CategoriesList from "../components/CategoriesList";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import { fetchData } from "../http";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 3,
    description: "Dessert",
  });
  const [ filterState, setFilterState ] = useState({
    searchQuery: '',
    sortQuery: {
      value: 'strMeal',
      label: 'Name'
    }
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

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const recipesData = await fetchData(
          'search',
          `s=${ filterState.searchQuery }`
        );
        setRecipes(recipesData.meals);

      } catch(error) {

      }
    }
    const searchTimer = setTimeout(() => {
      if(filterState.searchQuery !== ''){
        fetchRecipes();
      }
    }, 2000);

    return () => {
      clearTimeout(searchTimer);
    }
  }, [filterState.searchQuery]);

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
        <div className="w-2/3 flex flex-col">
          <div className="w-full flex flex-row justify-between mb-10">
            <SearchBar 
              userInput={ filterState.searchQuery }
              onChange={ (event) => {
                setFilterState(prevState => {
                  return {
                    ...prevState,
                    searchQuery: event.target.value,
                  }
                });
              }}
            /> 
            <Dropdown 
              selectedValue={ filterState.sortQuery.label }
            />
          </div>
            {
              !isFetching && <RecipeList recipes={recipes} />
            }
            {
              isFetching && <p>Cargando...</p>
            }
          </div> 
      </section>
    </>
  );
};

export default Home;
