const BASE_URL = 'http://localhost:5173/'

type EventListing = {
    id: number,
    title: string,
    description: string,
    startTime: string,
    endTime: Date,
    venue: string,
    address: string,
    latitude: string,
    longitude: string,
    price: number,
    category: "Music" | "Sports" | "Arts" | "Family",
};

