const Recipe = ({ recipe }) => {
    const ingredients_list = recipe.ingredients?.map((ingredient, index) => {
        return <tr id={index}>
                <td>{ingredient.quantity}</td>
                <td>{ingredient.units}</td>
                <td>{ingredient.ingredient}</td>
            </tr>
    });
    const instruction_steps = recipe.instructions?.map((instruction, index) => {
        return <li className="list-group-item" id={index}>
            {instruction}
            </li>
    });

    return (
        <div className="recipe details">
            <h1 className="display-4">{recipe.title}</h1>
            <h1 className="display-5">Ingredients</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Quantity</th>
                        <th scope="col">Units</th>
                        <th scope="col">Ingredient</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients_list}
                </tbody>
            </table>
            <h1 className="display-5">Instructions</h1>
            <ol className="list-group list-group-numbered list-group-flush">{instruction_steps}</ol>
        </div>
    );
}

export default Recipe;