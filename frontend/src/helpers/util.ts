export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    // Radius of the earth in km
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    const d = R * c;
    return d;
};

export const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
};

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
    category: "Music" | "Sports" | "Arts" | "Family";
};

export const defaultEventListing: EventListing = {
    id: 0,
    title: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    venue: "",
    address: "",
    latitude: 0,
    longitude: 0,
    price: 0,
    category: "Music"
};

export type EventCardProps = {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    venue: string;
    price: number;
    category: 'Music' | 'Sports' | 'Arts' | 'Family';
  };
  
export interface CountdownTimerProps {
    targetDate: Date;
  }

export interface IconMap {
    [key: string]: string;
  }