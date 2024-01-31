import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const TestPage = () => {
  const [data, setData] = useState();


  // Get the end time, at the end of the current day, in the format "YYYY-MM-DDTHH:mm:ssZ"
  const endTime = new Date();
  endTime.setHours(23, 59, 59);
  const endTimeISOString = endTime.toISOString().slice(0, -5) + "Z";

  const geoHashUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&geoPoint=u6scd&radius=10&endDateTime=${endTimeISOString}&sort=date,asc&apikey=va6F5GmTa5GuKAGKbcUuGWdLAjCWOdec`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(geoHashUrl);
        const result = await res.json();

        // Check if _embedded exists and has events property
        if (result._embedded && result._embedded.events) {
          setData(result._embedded.events);
          console.log(data);
        } else {
          console.error("No TicketMaster events today.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [geoHashUrl]);

  console.log(data);
  return (
    <div>
      <p>Hei</p>
      <ul>
        {data?.map((event) => (
          <EventCard
            key={event.id}
            id={0}
            title={event.name}
            description={event.name}
            startTime={event.dates.start.dateTime}
            venue="Someplace"
            price={0}
            category="Music"
          />
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
