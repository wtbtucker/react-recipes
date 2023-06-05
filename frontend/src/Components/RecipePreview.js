import { Link } from "react-router-dom";

const RecipePreview = ({ recipe }) => {
    return (
        <div className="card">
            <img className="card-img-top" src="..." alt="card cap"/>
            <div className="card-body">
                <h5 className="card-title"><Link className="nav-link" to={recipe._id}>{recipe.title}</Link></h5>
                <p className="card-text">Description</p>
            </div>
        </div>
    );
}

export default RecipePreview