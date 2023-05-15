import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";
import {React, useState} from "react";
import uniqid from 'uniqid';

const CreatePage = () => {
    
    const [recipes, setRecipes] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const recipe = Object.fromEntries(formData.entries());
        console.log(recipe)
        recipe.id = uniqid();
        setRecipes(prevState => ({ recipes: [...prevState, recipe]}));
        console.log(recipes)
    };


    let content;
    if (recipes.length === 0) {
        content = <RecipeForm handleSubmit={handleSubmit}/>
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

export default CreatePage;