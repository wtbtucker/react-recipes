import Recipe from "./Recipe";
import { useState } from 'react';

// pass recipes array into the create recipe component as state
// update the state when recipe form is submitted and pass the new array up to home
// render the updated array

// Pass existing recipe object into the form if editing the recipe


const RecipeForm = ({ handleSubmit, handleChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" name="title" onChange={e=>handleChange(e)}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputIngredients" className="form-label">Ingredients</label>
                <input type="text" className="form-control" id="inputIngredients" name="ingredients" onChange={e=>handleChange(e)}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputInstructions" className="form-label">Instructions</label>
                <input type="text" className="form-control" id="inputInstructions" name="instructions" onChange={e=>handleChange(e)}></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

const CreatePage = () => {

    const recipeTemplate = {
        title: '',
        ingredients: [],
        instructions: []
    }

    const [responseBody, setResponseBody] = useState(recipeTemplate)

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form)
        const recipe = Object.fromEntries(formData.entries())
        setResponseBody({
            ...responseBody, 'title': recipe.title
        })
        console.log(responseBody)
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setResponseBody({...responseBody, [name]: value})
    }

    let content;
    
    if (responseBody === recipeTemplate) {
        content = <RecipeForm handleSubmit={handleSubmit} handleChange={handleChange}/>
    } else {
        content = <Recipe recipe={responseBody}/>
    }

    return (
        <div>
            {content}            
        </div>
        
    )
}

export default CreatePage;