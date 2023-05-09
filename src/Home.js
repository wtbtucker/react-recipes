import Recipe from "./Recipe";
import React, { Component } from "react";

const RecipeForm = ({ handleSubmit, handleChange }) => {
    return (
        
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" name="title" onChange={handleChange}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputIngredients" className="form-label">Ingredients</label>
                <input type="text" className="form-control" id="inputIngredients" name="ingredients" onChange={handleChange}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputInstructions" className="form-label">Instructions</label>
                <input type="text" className="form-control" id="inputInstructions" name="instructions" onChange={handleChange}></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

class Home extends Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form)
        const recipe = Object.fromEntries(formData.entries())
        console.log(recipe)
        this.setState({
            recipes: this.state.recipes.concat(recipe)
        })
    }
    
    
    render() {
        const { recipes } = this.state;
        let recipe_list = recipes?.map(recipe => 
            <Recipe recipe={recipe}/>
        )
        return (
            <div className="home">
                {recipe_list}
                <RecipeForm handleSubmit={this.handleSubmit} />
            </div>
        );
    }
    
}
 
export default Home;