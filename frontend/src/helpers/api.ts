const BASE_URL = 'http://localhost:5173/'

export const getEvents = async () => {
    const response = await fetch(BASE_URL + "/Events")
    const salties = await response.json()    
    return salties.title
}