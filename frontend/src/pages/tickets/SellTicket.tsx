import React, { useEffect, useState } from "react";
import image from "../images/background/nature.jpg";
import { useClerk } from "@clerk/clerk-react";

const SellTicket = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [sellerName, setSellerName] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useClerk();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("https://event-eagle.azurewebsites.net/Events");
      const result = await response.json();
      setEvents(result);
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ticketData = {
      eventId: selectedEventId,
      sellerId: user.id,
      sellerName: sellerName,
      available: true, 
    };

    try {
      const response = await fetch("https://event-eagle.azurewebsites.net/Events/Tickets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        console.log("Ticket added successfully");
    setSuccess(true);
    setSellerName("");
      } else {
        console.error("Failed to add ticket");
      }
    } catch (error) {
      console.error("Error adding ticket:", error);
    }

  };

  return (
    <div
      className="hero min-h-screen-h"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="flex flex-col">

        {success && <h2 className="bg-primary p-5 text-3xl rounded-xl text-center font-bold animate-bounce"> Success!</h2>}
      <div className="hero-content flex flex-col text-center drop-shadow-2xl text-neutral-content bg-neutral-800 rounded-2xl p-10">
        <h1 className="mb-5 text-5xl font-bold">Sell your ticket</h1>

        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="m-5 flex flex-col">

          <label htmlFor="eventSelect" className="text-xl font-bold" >Select event</label>
          <select
          className="h-10 rounded-lg p-2"
          id="eventSelect"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(parseInt(e.target.value))}
          >
            <option value={0} disabled={true}></option>
            {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                {ev.title}
              </option>
            ))}
          </select>
            </div>
<div className="flex flex-col m-5">

          <label className="text-xl font-bold" htmlFor="sellerName">Your Name</label>
          <input
          className="rounded-lg h-10 p-2"
          type="text"
          id="sellerName"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          />
          </div>

          <button type="submit" className="btn shadow-2xl btn-primary mt-4">
            Sell Ticket
          </button>
        </form>
      </div>
    </div>
          </div>
  );
};

export default SellTicket;
