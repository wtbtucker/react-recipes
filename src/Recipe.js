const Recipe = ({ recipe }) => {
    return (
        <div className="recipe details">
            <h1 className="display-4">{recipe.title}</h1>
            <h1 className="display-5">Ingredients</h1>
            <ul className="list-group">
                <li className="list-group-item">{recipe.ingredients}</li>
            </ul>
            <h1 className="display-5">Instructions</h1>
            <ol className="list-group list-group-numbered">{recipe.instructions}</ol>
        </div>
    )
}

export default Recipe;