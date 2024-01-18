import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
