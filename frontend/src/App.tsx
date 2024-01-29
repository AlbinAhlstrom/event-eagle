import "./App.css";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Events from "./pages/Events";
import NoPage from "./pages/NoPage";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/AdminDashboard";
import MapWindow from "./components/MapWindow";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:type" element={<Events />} />
        <Route path="/events/:type" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/map" element={<MapWindow />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
