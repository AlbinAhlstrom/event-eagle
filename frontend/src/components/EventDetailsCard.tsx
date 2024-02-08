import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountDown";
import { Event, EventTicket, getDefaultEventData, setUnavailable } from "../util";
import { loadStripe } from "@stripe/stripe-js";
import TicketCard from "./TicketCard";
import { useClerk } from "@clerk/clerk-react";

interface props {
  event: Event;
}

const EventDetailsCard: React.FC<props> = ({ event }) => {
  const [eventTickets, setEventTickets] = useState<EventTicket>(getDefaultEventData);
  const {user} = useClerk();

  useEffect(() => {
    const fetchEventTicketsData = async () => {
      const res = await fetch(
        `https://event-eagle.azurewebsites.net/Events/EventTickets?eventId=${event}`
      );
      const result = await res.json();

      return result;
    };
    const runOnce = async () => {
      setEventTickets(await fetchEventTicketsData());
    };

    runOnce();
  }, []);

  console.log(eventTickets);
  const handlePayment = async (ticketId, userId) => {
    try {
      const stripe = await loadStripe(
        "pk_test_51OdthoBtLyUDk5IywgHBe06AJYc1cuidNqi1FqAX6aUg9aZKfzkmYn3XodjGpeeP5eKvY1zexOJoSh8FFAisLG5i00cGFmfZJL"
      );

      const response = await fetch(
        "https://event-eagle.azurewebsites.net/Payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: eventTickets.price,
            productName: eventTickets.description,
            productcategory: eventTickets.title,
          }),
        }
      );

      const responseData = await response.json();

      const { sessionId } = responseData;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Error redirecting to Checkout:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }

    if(user) setUnavailable(ticketId, userId);
  };

    const availableTickets = eventTickets.eventTickets.filter( t => t.available == true);

  return (
    <div className="hero-content text-center drop-shadow-2xl text-neutral-content bg-base-100 justify-center items-center rounded-2xl p-10">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl p-3 font-bold">{eventTickets.title}</h1>

        <p className="mb-5 text-xl">{eventTickets.description}</p>
        <CountdownTimer targetDate={eventTickets.startTime} />

        <h2 className="my-6 text-xl">Price: {eventTickets.price} SEK</h2>
        <p>{eventTickets.address}</p>
        <div className="flex flex-col w-full">
          <p>Available tickets:</p>
          <div className="flex flex-wrap items-center justify-center">
          {availableTickets.map((ticket, index) => {
            return (
              <div key={index} className="m-2 p-4 bg-white border text-black border-white rounded-xl">
                <TicketCard ticket={ticket} />
                <button onClick={() => handlePayment(ticket.ticketId, user.id)} className="btn shadow-2xl btn-base">
                  Purchase Ticket
                </button>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;
