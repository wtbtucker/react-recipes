import {React, useState, useEffect} from "react";
import RecipePreview from "./RecipePreview";

const Home = () => {
    
    const [recipes, setRecipes] = useState([])
 
    useEffect(() => {
        async function fetchAllRecipes() {
            let response = await fetch('http://localhost:5050/recipes')
            response = await response.json();
            console.log(response)
            setRecipes({
                recipes: response
            })
        }
        fetchAllRecipes();
    }, [])

    let recipe_list = recipes.recipes?.map(recipe => <RecipePreview key={recipe._id} recipe={recipe}/>)

    return (
        <div>
                {recipe_list} 
        </div>
        
    )
}

export default Home;