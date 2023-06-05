import Home from './Home';
import Recipe from './Recipe';
import RecipeForm from './RecipeForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './About';
import Footer from './Footer';
import Navbar from './Navbar';

function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<RecipeForm/>}/>
          <Route path='/about' element={<About/>}/>
          <Route
            path='/:recipeId'
            element={<Recipe/>}
            loader={async ({ params }) => {
              return fetch(
                `http://localhost:5050/recipes/${params.recipeId}.json`
              )
            }}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
