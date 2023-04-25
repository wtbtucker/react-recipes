const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <h1>Recipe Vault</h1>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"><a className="nav-link" href="/">Recipes</a></li>
                    <li className="nav-item"><a className="nav-link" href="/recipes/create">New Recipe</a></li>
                    <li className="nav-item"><a className="nav-link" href="/user/logout">Logout</a></li>
                    <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
                    <li className="nav-item"><a className="nav-link" href="/user/login">Login</a></li>
                    <li className="nav-item"><a className="nav-link" href="/user/register">Register</a></li>
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;