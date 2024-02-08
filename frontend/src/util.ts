export const toDateTimeString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const fromDateTimeString = (dateTimeString: string): Date => {
  const [datePart, timePart] = dateTimeString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes);
};

export const getDistanceFromLatLonInKm = (pos1: Coordinate, pos2: Coordinate)=> {
  const R = 6371;
  const dLat = deg2rad(pos2.lat - pos1.lat);
  const dLon = deg2rad(pos2.lng - pos1.lng);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(pos1.lat)) * Math.cos(deg2rad(pos2.lat)) 
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const categories = {
  music: "Music",
  sports: "Sports",
  arts: "Arts",
  family: "Family",
} as const;

export type categoryType = (typeof categories)[keyof typeof categories];

export type Event = {
  id: number;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
  venue: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  category: categoryType;
};

export const defaultEventListing: Event = {
  id: 0,
  title: "",
  description: "",
  startTime: toDateTimeString(new Date()),
  endTime: toDateTimeString(new Date()),
  venue: "",
  address: "",
  latitude: 59.33534129164961, 
  longitude: 18.084843751865773,
  price: 10,
  category: categories.sports,
};

export interface CountdownTimerProps {
  targetDate: string | Date;
}

export interface IconMap {
  [key: string]: string;
}

export type Coordinate = {
  lat: number;
  lng: number;
};

export type formFields = {
  id: number;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string;
  venue: string;
  address: string;
  price: number;
  category: categoryType;
  latitude: number;
  longitude: number;
};

export const formToListing = (formData: formFields) => {
  return { ...formData, endTime: formData.startTime, venue: "", address: "" };
};

export type TicketmasterEvent = {
  id: string;
  name: string;
  dates: {
    start: {
      dateTime: string;
    };
  };
  _embedded: {
    venues: {
      address: {
        line1: string;
      };
      location: {
        latitude: string;
        longitude: string;
      };
      city: {
        name: string;
      };
    }[];
  };
  priceRanges: {
    min: number;
  }[];
  sales: {
    public: {
      endDateTime: string;
    };
  };
};

export type UserEvent = {
  id: number;
  userId: string;
  eventId: number;
  title: string;
  createdByUser: boolean;
  event: Event;
};

export const fetchUserEvents = async (id: string) => {
  const response = await fetch(
    `https://event-eagle.azurewebsites.net/Events/userEvents?userId=${id}`
  );
  const data = await response.json();
  return data;
};
export const updateSavedEvents = async (id: string) => {
  const data = await fetchUserEvents(id);
  return data;
};


export type Ticket = {
  ticketId: string;
  eventId: number;
  sellerId: string;
  sellerName: string;
  available: boolean;
};

export type EventTicket = {
  address: string;
  category: string;
  description: string;
  endTime: string;
  eventId: number;
  eventTickets: Ticket[];
  latitude: number;
  longitude: number;
  price: number;
  startTime: string;
  title: string;
  venue: string;
};

export const getDefaultEventData = (): EventTicket => ({
  address: "",
  category: "",
  description: "",
  endTime: "",
  eventId: 0,
  eventTickets: [],
  latitude: 0,
  longitude: 0,
  price: 0,
  startTime: "",
  title: "",
  venue: "",
});

export interface TicketCardProps {
  ticket: Ticket | undefined;
}

export const setUnavailable = (ticketId: number) => {
  fetch(`https://event-eagle.azurewebsites.net/Events/Tickets/Update?ticketId=${ticketId}`, {
   method: 'PUT',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     ticketId : ticketId,
     available : false
   }),
 });

 setUnavailable(ticketId);
}
