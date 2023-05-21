import CreatePage from './CreatePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './About';
import Footer from './Footer';
import Navbar from './Navbar';

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='/' element={<CreatePage/>}/>
          <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
