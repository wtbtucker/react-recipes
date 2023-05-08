const Recipe = () => {
    const recipe = {"_id":{"$oid":"63779a87f19ea88b3d844eab"},"title":"Test Recipe","ingredients":{"chicken":{"$numberInt":"1"}},"instructions":["cook the chicken","serve the chicken"],"createdAt":{"$date":{"$numberLong":"1668782727163"}},"updatedAt":{"$date":{"$numberLong":"1668782727163"}},"__v":{"$numberInt":"0"}}
    const ingredients = Object.keys(recipe.ingredients)
    const instructions = recipe.instructions.map(step => <li className="list-group-item">{step}</li> )
    return (
        <div className="recipe details">
            <h2>{recipe.title}</h2>
            <h1 className="display-3">Ingredients</h1>
            <ul className="list-group">
                <li className="list-group-item">{ingredients}</li>
            </ul>
            <h1 className="display-3">Instructions</h1>
            <ol className="list-group list-group-numbered">{instructions}</ol>
        </div>
    )
}

export default Recipe;