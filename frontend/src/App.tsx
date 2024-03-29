import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Events from "./pages/discovery/Events";
import EventsMap from "./pages/discovery/EventsMap";
import NoPage from "./pages/NoPage";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SignInPage from "./pages/SignInPage";
import EditEvent from "./pages/admin/EditEvent";
import Create from "./pages/admin/Create";
import SavedEvents from "./pages/SavedEvents";
import SuccessPage from "./pages/ticket/SuccessPage";
import SellTicket from "./pages/ticket/SellTicket";


function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <React.Fragment>
            <SignedOut>
              <Routes>
                <Route path="/" element={<SignInPage />} />
              </Routes>
            </SignedOut>
            <SignedIn>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sellticket" element={<SellTicket />} />
                <Route path="/savedEvents" element={<SavedEvents />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/events" element={<Events />} />
                <Route path="/eventsMap" element={<EventsMap />} />
                <Route path="/events/create" element={<Create />} />
                <Route path="/events/:id/edit" element={<EditEvent />} />
                <Route path="/events/:type" element={<Events />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/success" element={<SuccessPage />} />
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
