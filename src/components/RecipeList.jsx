import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { RecipesContext } from "../store/recipes-context";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
    const { recipes } = useContext(RecipesContext);
    const navigate = useNavigate();

    const handleClick = (recipeId) => {
        navigate(`/recipe/${ recipeId }`);
    };
    
    return(
        <div className="grid grid-cols-3 gap-3 w-full">
            { recipes.length !== 0 && recipes.map((recipe) => (
                    <RecipeCard 
                        key={ recipe.idMeal } 
                        title={ recipe.strMeal }
                        image={ recipe.strMealThumb }
                        onClick={ () => handleClick(recipe.idMeal) } 
                    />
                )) 
            }
        </div>
    );
};

export default RecipeList;