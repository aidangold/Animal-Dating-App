import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from "./pages/Landing";
import Matching from "./pages/Matching";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignUp";
import LogInPage from './pages/LogIn';

function App() {
  return (
    <>
      <div id="main">
        <BrowserRouter>
          <header>
            <Header />
          </header>

          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/match' element={<Matching />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LogInPage />} />
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