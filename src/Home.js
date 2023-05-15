import Recipe from "./Recipe";
import React, { Component } from "react";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        };
    }
    
    render() {
        const { recipes } = this.state;
        let recipe_list = recipes?.map(recipe => 
            <Recipe recipe={recipe}/>
        )
        return (
            <div className="home">
                {recipe_list}
            </div>
        );
    }
    
}
 
export default Home;