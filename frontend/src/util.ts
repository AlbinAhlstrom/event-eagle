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

export type EventDetailsListing = {
  id: number | string;
  title: string;
  description: string;
  startTime: Date;
  endTime?: Date | null | undefined;
  venue?: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  category?: categoryType;
};


export const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const categories = {
    music: "Music",
    sports: "Sports",
    arts: "Arts & Theatre",
    family: "Family",
} as const

export type categoryType = (typeof categories)[keyof typeof categories];

export const toDateTimeString = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export type EventListing = {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  venue: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  category: categoryType;
};

export const defaultEventListing: EventListing = {
  id: 0,
  title: "",
  description: "",
  startTime: new Date,
  endTime: new Date,
  venue: "",
  address: "",
  latitude: 0,
  longitude: 0,
  price: 0,
  category: categories.music,
};

export type EventCardProps = {
  id: number | string;
  title: string;
  description: string;
  startTime: string | Date;
  venue: string | undefined;
  price: number;
  category: categoryType;
};

export interface CountdownTimerProps {
  targetDate: string;
}

export interface IconMap {
  [key: string]: string;
}

export type Coordinate = {
    lat: number
    lng: number
}

export type formFields = {
  title: string;
  description: string;
  startTime: Date;
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
      }[];
    };
    priceRanges: {
      min: number;
    }[];
}
