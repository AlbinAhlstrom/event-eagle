import "./App.css";
import Home from "./pages/Home";
import Categories from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
