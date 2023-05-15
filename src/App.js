import Navbar from './Navbar';
import CreatePage from './CreatePage';

import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <CreatePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
