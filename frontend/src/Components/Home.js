import Recipe from "./Recipe";
import {React, useState, useEffect} from "react";

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

    let recipe_list = recipes.recipes?.map(recipe => <li key={recipe._id} className="list-group-item"><Recipe recipe={recipe}/></li>)

    return (
        <div>
            <ul className="list-group">
                {recipe_list}
            </ul>          
        </div>
        
    )
}

export default Home;