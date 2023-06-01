import Home from './Home';
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
