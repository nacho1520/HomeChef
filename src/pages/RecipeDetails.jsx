import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import logo from '../assets/logo-light.svg';
import backIcon from '../assets/Expand_left.svg';
import { fetchData } from '../http';
import Button from "../components/Button";

const RecipeDetails = () => {
    const [ recipe, setRecipe ] = useState({});
    const { recipeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDetails() {
            try {
                const recipeData = await fetchData('lookup', `i=${ recipeId }`);
                setRecipe(recipeData.meals[0]);
            } catch(error) {

            }
        }
        fetchDetails();
    }, []);

    const handleBack = () => {
        navigate('/');
    };

    return(
        <main className="flex flex-col items-center p-3">
            <div className="w-full flex flex-row justify-between">
                <img src={ logo }/>
                <Button
                    onClick={ handleBack }
                >
                    <div className="flex flex-row items-center gap-2">
                        <img src={ backIcon } className="size-6"/>
                        <p>Back to categories</p>
                    </div>
                </Button>
            </div>
            <section>
                    <img src={ recipe.strMealThumb } className="w-[616px] h-[400px] object-cover rounded-lg" />
                    <h1>{ recipe.strMeal }</h1>
                    <h2>Coming soon...</h2>
                </section>
            
        </main>
    );
};

export default RecipeDetails;