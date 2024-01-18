const BASE_URL = 'http://localhost:5173/'

type EventListing = {
    id: number,
    title: string,
    description: string,
    startTime: string,
    endTime: string,
    venue: string,
    address: string,
    latitude: string,
    longitude: string,
    price: number,
    category: string,
};

export const getEvents = async (): Promise<EventListing[]> => {
    const response = await fetch(BASE_URL + "Events")
    const events = await response.json() 
    return events
}