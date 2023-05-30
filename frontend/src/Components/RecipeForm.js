import { useState } from 'react';
import { curry, postData } from '../helpers';


const recipeFactory = () => {
    return {
        title: '',
        ingredients: [{ 
            ingredient: '',
            units: '',
            quantity: '',
        }],
        instructions: ['']
    };
}

const RecipeForm = ({  addNewRecipe }) => {

    const recipeTemplate = recipeFactory();

    const [responseBody, setResponseBody] = useState(recipeTemplate);

    const handleSubmit = (event) => {
        event.preventDefault();
        let newRecipe = responseBody;
        console.log(newRecipe)
        postData('http://localhost:5050/recipes', newRecipe)
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

        const changeInstructionsBody = () => {
            let newInstructions = [...responseBody.instructions];
            newInstructions[event.target.id] = event.target.value;
            setResponseBody(prevState => ({
                ...prevState,
                instructions: newInstructions
            }));
        }
    
        if (event.target.name === 'title') {
            setResponseBody({ ...responseBody, [event.target.name]: event.target.value})
        } 
        else if (event.target.name === 'instruction') {
            changeInstructionsBody();
        }
        else {
            changeResponseBody('ingredients')
        }
    };

    let ingredient_list = responseBody.ingredients?.map((ingredient, index) => {
        return (
            <div key={index}>
                <input 
                    type="text"
                    className="form-control"
                    id={index}
                    placeholder="Ingredient"
                    name="ingredient"
                    value={ingredient.ingredient}
                    onChange={e=>handleChange(e)}
                />
                <input 
                    type="text"
                    className="form-control"
                    id={index}
                    placeholder="Units"
                    name="units"
                    value={ingredient.units}
                    onChange={e=>handleChange(e)}
                />
                <input 
                    type="text"
                    className="form-control"
                    id={index}
                    placeholder="Quantity"
                    name="quantity"
                    value={ingredient.quantity}
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
                name="instruction"
                value={step}
                onChange={e=>handleChange(e)}
            />
            </div>
        )
    })

    const addFormField = (form_category, event) => {
        
        let new_field_object;
        if (form_category === 'ingredients') {
            new_field_object = {
                ingredient: '',
                units: '',
                quantity: ''
            }
        } else {
            new_field_object = '';
        }        

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
                <input type="text" className="form-control" id="inputTitle" name="title" value={responseBody.title} onChange={e=>handleChange(e)}></input>
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