import Recipe from "./Recipe";
import { useState } from 'react';
import uniqid from 'uniqid';

const RecipeForm = ({ handleSubmit }) => {


    const recipeTemplate = {
        title: '',
        ingredients: [{ ingredient_name: ''}],
        instructions: [{ instruction_step: ''}]
    }

    const [responseBody, setResponseBody] = useState(recipeTemplate);

    const handleChange = event => {
        if (event.target.name === 'ingredient_name') {
            let ingredients = [...responseBody.ingredients];
            ingredients[event.target.id][event.target.name] = event.target.value;
            setResponseBody({ ingredients })
        } 
        else if (event.target.name === 'instruction_step') {
            let instructions = [...responseBody.instructions];
            instructions[event.target.id][event.target.name] = event.target.value
            setResponseBody({ instructions })
        } 
        else {
            setResponseBody({ ...responseBody, [event.target.name]: event.target.value})
        }
    };


    const addIngredient = event => {
        event.preventDefault();
        setResponseBody(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, {ingredient_name: ''}]
        }));
    };

    const addStep = event => {
        event.preventDefault();
        setResponseBody(prevState => ({
            ...prevState,
            instructions: [...prevState.instructions, {instruction_step: ''}]
        }));
    }

    let ingredient_list = responseBody.ingredients?.map((ingredient, index) => {
        return (
            <div key={index}>
            <input 
                type="text"
                className="form-control"
                id={index}
                placeholder="Ingredient Name"
                name="ingredient_name"
            />
        </div>
        );
    });

    let instruction_steps = responseBody.instructions?.map((step, index) => {
        return (
            <div key={index}>
                <input 
                type="text"
                className="form-control"
                id={index}
                placeholder="Step"
                name="instruction_step"
            />
            </div>
        )
    })

    return (
        <form onSubmit={handleSubmit} onChange={handleChange}>
            <div className="mb-3">
                <label htmlFor="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" name="title"></input>
            </div>
            <div className="mb-3">
                {ingredient_list}
                <button className="btn btn-secondary" onClick={addIngredient}>Add Ingredient</button>
            </div>
            <div className="mb-3">
                {instruction_steps}
                <button onClick={addStep} className="btn btn-secondary">Add Step</button>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

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