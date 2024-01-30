import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Events from "./pages/Events";
import NoPage from "./pages/NoPage";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/AdminDashboard";
import SignInPage from "./pages/SignInPage";

function App() {


  return (
    <Routes>
      <Route
        path="/*"
        element={
          <React.Fragment>
            <SignedOut>
              <Routes>
                <Route path="/" element={<SignInPage/>}/>
              </Routes>
            </SignedOut>
            <SignedIn>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:type" element={<Events />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </SignedIn>
          </React.Fragment>
        }
      />
    </Routes>
  );
}

export default App;
