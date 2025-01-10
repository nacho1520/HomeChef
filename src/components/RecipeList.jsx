import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
    return(
        <div>
            { recipes.length !== 0 && recipes.map((recipe) => <RecipeCard key={ recipe.idMeal } title={ recipe.strMeal } />) }
        </div>
    );
};

export default RecipeList;