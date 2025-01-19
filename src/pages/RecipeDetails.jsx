import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import logo from "../assets/logo-light.svg";
import backIcon from "../assets/Expand_left.svg";
import { fetchData } from "../http";
import Button from "../components/Button";

const InfoLabel = ({ children }) => {
  return (
    <span className="flex flex-row justify-center items-center bg-[#394150] text-[#E5E7EB] rounded-[53px] px-6 py-2 gap-1 text-sm">
      {children}
    </span>
  );
};

const InfoContainer = ({ title, children }) => {
  let spanClass = "w-4 h-8 rounded-xl";

  if (title === "Ingredients") {
    spanClass += " bg-[#FEBD2E]";
  } else {
    spanClass += " bg-[#4E80EE]";
  }

  return (
    <div className="flex flex-col items-start gap-4 mb-10">
      <div className="flex flex-row items-center gap-3 mb-4">
        <div className={spanClass} />
        <p className="text-base font-bold">{title}</p>
      </div>
      {children}
    </div>
  );
};

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchDetails() {
      try {
        const recipeData = await fetchData("lookup", `i=${recipeId}`);
        setRecipe(recipeData.meals[0]);
        setIsFetching(false);
      } catch (error) {}
    }
    fetchDetails();
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const ingredients = [];

  if (recipe.length !== 0) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(
          `${measure ? measure.trim() : ""} ${ingredient.trim()}`
        );
      }
    }
  }

  return (
    <main className="flex flex-col items-center py-8 font-body">
      <div className="w-full flex flex-row justify-between max-w-[1136px] mb-[52px]">
        <img src={logo} />
        <Button onClick={handleBack}>
          <div className="flex flex-row items-center gap-2">
            <img src={backIcon} className="size-6" />
            <p className="font-body text-base font-medium">
              Back to categories
            </p>
          </div>
        </Button>
      </div>
      <section className="w-[616px]">
        {isFetching && <p>Cargando...</p>}
        {!isFetching && (
          <>
            <img
              src={recipe.strMealThumb}
              className="w-[616px] h-[400px] object-cover rounded-lg mb-8"
            />
            <h1 className="text-[40px] text-[#E5E7EB] font-semibold mb-5 font-title">
              {recipe.strMeal}
            </h1>
            <div className="flex flex-row justify-start gap-3 mb-10">
              <InfoLabel>
                <p className="font-normal">category:</p>
                <p className="font-bold">{recipe.strCategory}</p>
              </InfoLabel>
              <InfoLabel>
                <p className="font-normal">area:</p>
                <p className="font-bold">{recipe.strCategory}</p>
              </InfoLabel>
            </div>
            <InfoContainer title="Ingredients">
              <ul className="flex flex-col gap-3 ml-6">
                {ingredients.length !== 0 &&
                  ingredients.map((item) => (
                    <li className="list-disc text-base font-normal" key={item}>
                      {item}
                    </li>
                  ))}
              </ul>
            </InfoContainer>
            <InfoContainer title="Instructions">
              <p
                className="text-base font-normal"
                dangerouslySetInnerHTML={{
                  __html: recipe.strInstructions?.replace(/\r\n/g, "<br>"),
                }}
              />
            </InfoContainer>
          </>
        )}
      </section>
    </main>
  );
};

export default RecipeDetails;
