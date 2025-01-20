import { useState, useEffect } from "react";

import Header from "../components/Header";
import CategoriesList from "../components/CategoriesList";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import { fetchData } from "../http";

const defaultState = {
  category: {
    id: 3,
    description: "Dessert",
  },
  searchQuery: "",
  sortQuery: {
    id: "strMeal",
    value: "Name",
  },
};

const sortOptions = [
  {
    id: "strMeal",
    value: "Name",
  },
  {
    id: "idMeal",
    value: "ID",
  },
];

const sortData = (data, field) => {
  return data.sort((a, b) =>
    a[field] > b[field]
      ? 1
      : b[field] > a[field]
      ? -1
      : 0
  );
};

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filterState, setFilterState] = useState(defaultState);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      setIsFetching(true);
      try {
        const recipesData = await fetchData(
          "filter",
          `c=${filterState.category.description}`
        );
        const sortedRecipes = sortData(recipesData.meals, filterState.sortQuery.id);
        setRecipes(sortedRecipes);
        setIsFetching(false);
      } catch (error) {}
    }
    if (filterState.category.id !== null) {
      fetchRecipes();
    }
  }, [filterState.category, filterState.sortQuery]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const recipesData = await fetchData(
          "search",
          `s=${filterState.searchQuery}`
        );
        setFilterState((prevState) => {
          return {
            ...prevState,
            category: {
              id: null,
              description: null,
            },
          };
        });
        const sortedRecipes = sortData(recipesData.meals, filterState.sortQuery.id); 
        setRecipes(sortedRecipes);
      } catch (error) {}
    }
    const searchTimer = setTimeout(() => {
      if (filterState.searchQuery !== "") {
        fetchRecipes();
      }
    }, 2000);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [filterState.searchQuery, filterState.sortQuery]);

  const handleCategorySelection = (category) => {
    setFilterState((prevState) => {
      return {
        ...prevState,
        searchQuery: "",
        category: {
          id: +category.idCategory,
          description: category.strCategory,
        },
      };
    });
  };

  const handleSearchInput = (value) => {
    setFilterState((prevState) => {
      return {
        ...prevState,
        searchQuery: value,
      };
    });
  };

  const handleSortChange = (sortOption) => {
    setFilterState((prevState) => {
      return {
        ...prevState,
        sortQuery: sortOption,
      };
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <section className="w-full p-8 flex flex-row justify-around">
        <CategoriesList
          selectedCategory={filterState.category}
          onSelect={handleCategorySelection}
        />
        <div className="w-2/3 flex flex-col">
          <div className="w-full flex flex-row justify-between mb-10">
            <SearchBar
              userInput={filterState.searchQuery}
              onChange={(event) => handleSearchInput(event.target.value)}
            />
            <Dropdown
              selectedValue={filterState.sortQuery}
              values={sortOptions}
              onSelectOption={(value) => handleSortChange(value)}
            />
          </div>
          {!isFetching && <RecipeList recipes={recipes} />}
          {isFetching && <p>Cargando...</p>}
        </div>
      </section>
    </div>
  );
};

export default Home;
