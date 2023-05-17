const Recipe = ({ recipe }) => {
    const ingredients_list = recipe.ingredients?.map((ingredient, index) => {
        return <li className="list-group-item" id={index}>{ingredient.ingredient_name}</li>
    });
    const instruction_steps = recipe.instructions?.map((instruction, index) => {
        return <li className="list-group-item" id={index}>{instruction.instruction_step}</li>
    });
    return (
        <div className="recipe details">
            <h1 className="display-4">{recipe.title}</h1>
            <h1 className="display-5">Ingredients</h1>
            <ul className="list-group">
                {ingredients_list}
            </ul>
            <h1 className="display-5">Instructions</h1>
            <ol className="list-group list-group-numbered">{instruction_steps}</ol>
        </div>
    );
}

export default Recipe;