import "./App.css";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
