import "./App.css";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Events from "./pages/Events";
import NoPage from "./pages/NoPage";
import EventDetails from "./pages/EventDetails";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'animate.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/events/:type" element={<Events/>}/>
        <Route path="/events/:type" element={<Events/>}/>
        <Route path="/event/:id" element={<EventDetails/>}/>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;