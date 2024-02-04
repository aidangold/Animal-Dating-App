import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from "./pages/Landing";
import Header from "./components/Header";

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
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
