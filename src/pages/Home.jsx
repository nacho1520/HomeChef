import RecipesContextProvider from "../store/recipes-context";
import Header from "../components/Header";
import CategoriesList from "../components/CategoriesList";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";

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

const Home = () => {
  return (
    <RecipesContextProvider>
      <div className="flex flex-col items-center">
        <Header />
        <section className="w-full p-8 flex flex-row justify-around">
          <CategoriesList />
          <div className="w-2/3 flex flex-col">
            <div className="w-full flex flex-row justify-between mb-10">
              <SearchBar />
              <Dropdown
                values={sortOptions} />
            </div>
            <RecipeList />
          </div>
        </section>
      </div>
    </RecipesContextProvider>
  );
};

export default Home;
