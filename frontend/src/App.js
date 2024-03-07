import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from "./pages/Landing";
import Matching from "./pages/Matching";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignUp";
import LogInPage from './pages/LogIn';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';
import RetrieveUsernamePage from './pages/RetrieveUsername';
import AddPetForm from './pages/AddPet';

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
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
            <Route path='/retrieve-username' element={<RetrieveUsernamePage />} />
            <Route path='/add-pet' element={<AddPetForm />} />
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
