const Recipe = ({ recipe }) => {
    return (
        <div className="recipe details">
            <h2>{recipe.title}</h2>
            <h1 className="display-3">Ingredients</h1>
            <ul className="list-group">
                <li className="list-group-item">{recipe.ingredients}</li>
            </ul>
            <h1 className="display-3">Instructions</h1>
            <ol className="list-group list-group-numbered">{recipe.instructions}</ol>
        </div>
    )
}

export default Recipe;