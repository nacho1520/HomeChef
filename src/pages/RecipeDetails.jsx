import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
    const { recipeId } = useParams();
    return(
        <>
            <h1>Recipe Details Page { recipeId }</h1>
            <h2>Coming soon...</h2>
        </>
    );
};

export default RecipeDetails;