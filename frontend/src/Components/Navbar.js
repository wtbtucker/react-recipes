import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <h1>Recipe Vault</h1>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"><Link className="nav-link" to='/'>Recipes</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/create'>New Recipe</Link></li>
                    <li className="nav-item"><a className="nav-link" href="/user/logout">Logout</a></li>
                    <li className="nav-item"><Link className="nav-link" to='/about'>About</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/register'>Register</Link></li>
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;