import { useState } from 'react';
import { curry } from './helpers';


const recipeFactory = () => {
    return {
        title: '',
        ingredients: [{ ingredient_name: ''}],
        instructions: [{ instruction_step: ''}]
    };
}

const RecipeForm = ({ addNewRecipe }) => {

    const recipeTemplate = recipeFactory();

    const [responseBody, setResponseBody] = useState(recipeTemplate);

    const handleSubmit = (event) => {
        event.preventDefault();
        let newRecipe = responseBody;
        console.log(newRecipe)
        addNewRecipe(newRecipe);
    };

    const handleChange = (event) => {
        
        const changeResponseBody = (category) => {
                let category_items = [...responseBody[category]];
                category_items[event.target.id][event.target.name] = event.target.value;
                setResponseBody(prevState => ({
                    ...prevState,
                    [category]: category_items
                }));
        };
    
        if (event.target.name === 'title') {
            setResponseBody({ ...responseBody, [event.target.name]: event.target.value})
        } 
        else {
            let category = (event.target.name === 'instruction_step') ? 'instructions' : 'ingredients';
            changeResponseBody(category)
        }
    };

    let ingredient_list = responseBody.ingredients?.map((ingredient, index) => {
        return (
            <div key={index}>
            <input 
                type="text"
                className="form-control"
                id={index}
                placeholder="Ingredient Name"
                name="ingredient_name"
                value={ingredient.ingredient_name}
                onChange={e=>handleChange(e)}
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
                value={step.instruction_step}
                onChange={e=>handleChange(e)}
            />
            </div>
        )
    })

    const addFormField = (form_category, event) => {
        
        let new_field_object = {};
        const field_name = (form_category==='ingredients') ? 'ingredient_name' : 'instruction_step';
        new_field_object[field_name] = '';

        event.preventDefault();
        setResponseBody(prevState => ({
        ...prevState,
        [form_category]: [...prevState[form_category], new_field_object]
        }));
    }

    const curriedAddFormField = curry(addFormField);

    const addIngredientsField = curriedAddFormField('ingredients');
    const addInstructionsField = curriedAddFormField('instructions');

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" name="title" onChange={e=>handleChange(e)}></input>
            </div>
            <div className="mb-3">
                {ingredient_list}
                <button className="btn btn-secondary" onClick={addIngredientsField}>Add Ingredient</button>
            </div>
            <div className="mb-3">
                {instruction_steps}
                <button onClick={addInstructionsField} className="btn btn-secondary">Add Step</button>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default RecipeForm;