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

const RecipeForm = () => {

    const recipeTemplate = recipeFactory();

    const [recipe, setRecipe] = useState(recipeTemplate);

    const handleSubmit = (event) => {
        event.preventDefault();
        let newRecipe = recipe;
        console.log(newRecipe)
        postData('http://localhost:5050/recipes', newRecipe)
    };

    // manually merge deeply nested recipe state
    const handleChange = (event) => {
        
        const changeRecipeCategory = (category) => {
            let category_items = [...recipe[category]];
            if (category === 'instructions') {
                category_items[event.target.id] = event.target.value
            }
            else {
                category_items[event.target.id][event.target.name] = event.target.value;
            }
            setRecipe(prevState => ({
                ...prevState,
                [category]: category_items
            }));
        };
    
        if (event.target.name === 'title') {
            setRecipe({ ...recipe, [event.target.name]: event.target.value})
        } 
        else if (event.target.name === 'instruction') {
            changeRecipeCategory('instructions');
        }
        else {
            changeRecipeCategory('ingredients')
        }
    };

    const deleteFormField = (event) => {
        let category_items = [...recipe[event.target.name]]
        category_items.splice(event.target.id, 1);
        setRecipe(prevState => ({
            ...prevState,
            [event.target.name]: category_items
        }));
    }

    let ingredient_list = recipe.ingredients?.map((ingredient, index) => {
        return (
            <div className="d-flex justify-content-evenly gap-3" key={index}>
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
                <button 
                className="btn-close" 
                aria-label="Close"
                name='ingredients'
                id={index}
                onClick={e=>deleteFormField(e)}
                ></button>
        </div>
        );
    });

    let instruction_steps = recipe.instructions?.map((step, index) => {
        return (
            <div key={index} className="d-flex justify-content-evenly gap-3">
                <input 
                type="text"
                className="form-control"
                id={index}
                placeholder="Step"
                name="instruction"
                value={step}
                onChange={e=>handleChange(e)}
                />
                <button 
                className="btn-close" 
                aria-label="Close"
                name='instructions'
                id={index}
                onClick={e=>deleteFormField(e)}
                ></button>
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
        setRecipe(prevState => ({
        ...prevState,
        [form_category]: [...prevState[form_category], new_field_object]
        }));
    }

    const curriedAddFormField = curry(addFormField);

    const addIngredientsField = curriedAddFormField('ingredients');
    const addInstructionsField = curriedAddFormField('instructions');

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <div className="mb-3">
                <label htmlFor="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" name="title" value={recipe.title} onChange={e=>handleChange(e)}></input>
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