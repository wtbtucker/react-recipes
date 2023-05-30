import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";
import {React, useState} from "react";
import uniqid from 'uniqid';

const Home = () => {
    
    const [recipes, setRecipes] = useState([])
 
    const addNewRecipe = function(newRecipe) {
        console.log(newRecipe)
        newRecipe.id = uniqid();
        setRecipes(prevRecipes => ({
            recipes: [...prevRecipes, newRecipe]
        }))
    }

    let content;
    if (recipes.length === 0) {
        content = <RecipeForm addNewRecipe={addNewRecipe}/>
    } else {
        console.log(recipes)
        content = recipes.recipes?.map(recipe => <li key={recipe.id} className="list-group-item"><Recipe recipe={recipe}/></li>)
    }

    return (
        <div>
            <ul className="list-group">
                {content}
            </ul>          
        </div>
        
    )
}

export default Home;