export const toDateTimeString = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export const fromDateTimeString = (dateTimeString: string): Date => {
  const [datePart, timePart] = dateTimeString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes);
};

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  // Radius of the earth in km
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
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
} as const

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
  title: "default",
  description: "desc",
  startTime: toDateTimeString(new Date) ,
  endTime: toDateTimeString(new Date),
  venue: "",
  address: "",
  latitude: 0,
  longitude: 0,
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
    lat: number
    lng: number
}

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
  return {...formData, endTime: formData.startTime, venue: "", address: ""}
}

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
    `https://event-eagle.azurewebsites.net/Events/userEvents?userId=${id}`,
  );
  const data = await response.json();
  return data;
};
export const updateSavedEvents = async (id: string) => {
  const data = await fetchUserEvents(id);
  return data;
};

