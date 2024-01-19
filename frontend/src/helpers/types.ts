type EventListing = {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    endTime: string;
    venue: string;
    address: string;
    latitude: string;
    longitude: string;
    price: number;
    category: "Music" | "Sports" | "Arts" | "Family";
};

export default EventListing