import { createContext, useState, useEffect } from "react";

import { fetchData } from "../http";

export const RecipesContext = createContext({
    recipes: [],
    loadingFetch: undefined,
    categorySelected: undefined,
    searchQuery: '',
    sortQuery: undefined,
    selectCategory: () => { },
    writeSearchInput: () => { },
    changeSortOrder: () => { },
});

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

const sortData = (data, field) => {
    return data.sort((a, b) =>
        a[field] > b[field]
            ? 1
            : b[field] > a[field]
                ? -1
                : 0
    );
};

const RecipesContextProvider = ({ children }) => {
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
            } catch (error) { }
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
            } catch (error) { }
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

    const ctxValue = {
        recipes: recipes,
        loadingFetch: isFetching,
        categorySelected: filterState.category,
        searchQuery: filterState.searchQuery,
        sortQuery: filterState.sortQuery,
        selectCategory: handleCategorySelection,
        writeSearchInput: handleSearchInput,
        changeSortOrder: handleSortChange,
    }

    return (
        <RecipesContext.Provider value={ ctxValue }>
            {children}
        </RecipesContext.Provider>
    )
};

export default RecipesContextProvider;