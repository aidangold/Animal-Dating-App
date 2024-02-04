import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from "./pages/Landing";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div id="main">
        <BrowserRouter>
          <div id="header">
            <Header />
          </div>

          <Routes>
            <Route path='/' element={<Landing />} />
          </Routes>

          <div id="footer">
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
