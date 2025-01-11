import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import logo from '../assets/logo-light.svg';
import backIcon from '../assets/Expand_left.svg';
import { fetchData } from '../http';
import Button from "../components/Button";

const InfoLabel = ({ children }) => {
    return(
        <span className="flex flex-row justify-center items-center bg-[#394150] text-[#E5E7EB] rounded-[53px] px-6 py-2">
            { children }
        </span>
    );
};

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

    const ingredients = [];

    if(recipe.length !== 0) {
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${ i }`];
            const measure = recipe[`strMeasure${ i }`];
            if(ingredient && ingredient.trim()) {
                ingredients.push(`${ measure ? measure.trim() : '' } ${ ingredient.trim() }`);
            }
        }
    }

    return(
        <main className="flex flex-col items-center py-8">
            <div className="w-full flex flex-row justify-between max-w-[1136px] mb-[52px]">
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
            <section className="w-[616px]">
                    <img 
                        src={ recipe.strMealThumb } 
                        className="w-[616px] h-[400px] object-cover rounded-lg mb-8" 
                    />
                    <h1 className="text-[40px] text-[#E5E7EB] font-semibold mb-5">
                        { recipe.strMeal }
                    </h1>
                    <div className="flex flex-row justify-start gap-3 mb-10">
                        <InfoLabel>
                            <span className="flex flex-row">
                                category: <p>{ recipe.strCategory }</p>
                            </span>
                        </InfoLabel>
                        <InfoLabel>
                            <span className="flex flex-row">
                                area: <p>{ recipe.strArea }</p>
                            </span>
                        </InfoLabel>
                    </div>
                    <div className="flex flex-col gap-4 mb-10">
                        <div className="flex flex-row items-center gap-3 mb-4">
                            <div className="w-4 h-8 rounded-xl bg-[#FEBD2E]"/>
                            <p>Ingredients</p>
                        </div>
                        <ul className="flex flex-col items-start gap-3 list-disc">
                            { ingredients.length !== 0 && ingredients.map((item) => <li key={ item }>{ item }</li>) }
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-3 mb-4">
                            <div className="w-4 h-8 rounded-xl bg-[#4E80EE]"/>
                            <p>Instructions</p>
                        </div>
                        <p>
                            { recipe.strInstructions }
                        </p>
                    </div>
                </section>
        </main>
    );
};

export default RecipeDetails;