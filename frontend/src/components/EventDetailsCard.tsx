import React, { useState } from "react";
import CountdownTimer from "./CountDown";
import { Event } from "../util";
import { loadStripe } from "@stripe/stripe-js";

interface props {
  event: Event;
}

const EventDetailsCard: React.FC<props> = ({ event }) => {
  const handlePayment = async () => {
    try {
      // Initialize Stripe.js with your public key
      const stripe = await loadStripe(
        "pk_test_51OdthoBtLyUDk5IywgHBe06AJYc1cuidNqi1FqAX6aUg9aZKfzkmYn3XodjGpeeP5eKvY1zexOJoSh8FFAisLG5i00cGFmfZJL"
      );

      // Make a request to your backend to create a checkout session
      const response = await fetch(
        "http://localhost:5004/Payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: event.price, // Use the price of the ticket as the amount
            productName: event.description,
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
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="hero-content text-center drop-shadow-2xl text-neutral-content bg-base-100 rounded-2xl p-10">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl p-3 font-bold">{event.title}</h1>

        <p className="mb-5 text-xl">{event.description}</p>
        <CountdownTimer targetDate={event.startTime} />

        <h2 className="my-6 text-xl">Price: {event.price} SEK</h2>
        <p>{event.address}</p>
        <button onClick={handlePayment} className="btn btn-primary">
          Purchase Ticket
        </button>
      </div>
    </div>
  );
};

export default EventDetailsCard;
