import { useState, useEffect } from "react";
import { Event, defaultEventListing } from "../util";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Purchase = () => {
  const { id } = useParams<"id">();
  const BASE_URL = "https://event-eagle.azurewebsites.net";
  const [event, setEvent] = useState<Event>(defaultEventListing);

  useEffect(() => {
    const fetchEvent = async () => {
      const EVENTS_ENDPOINT = `${BASE_URL}/Events/${id}`;
      try {
        const response = await fetch(EVENTS_ENDPOINT);
        const data: Event = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event", error);
      }
    };

    fetchEvent();
  }, [id, BASE_URL]);

  const handlePayment = async () => {
    try {
      // Initialize Stripe.js with your public key
      const stripe = await loadStripe(
        "pk_test_51OdthoBtLyUDk5IywgHBe06AJYc1cuidNqi1FqAX6aUg9aZKfzkmYn3XodjGpeeP5eKvY1zexOJoSh8FFAisLG5i00cGFmfZJL"
      );

      const response = await fetch(
        "http://localhost:5004/Payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: event.price, 
          }),
        }
      );

      const responseData = await response.json();

      // Redirect the user to the Stripe Checkout page
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
  };

  return (
    <div className="hero-content text-center drop-shadow-2xl text-neutral-content bg-base-100 rounded-2xl p-10">
      <div className="max-w-md">
        <p>{event.title}</p>
        <p>{event.price} hello</p>
        <p>Price: {event.price} SEK</p>
        <button onClick={handlePayment} className="btn btn-primary">
          Purchase Ticket
        </button>
      </div>
    </div>
  );
};

export default Purchase;
