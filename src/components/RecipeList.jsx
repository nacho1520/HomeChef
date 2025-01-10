import { useNavigate } from "react-router-dom";


import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
    const navigate = useNavigate();

    const handleClick = (recipeId) => {
        navigate(`/recipe/${ recipeId }`);
    };
    
    return(
        <div className="grid grid-cols-3 gap-3 w-2/3">
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