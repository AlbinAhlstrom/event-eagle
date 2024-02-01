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

export type EventListing = {
    id: number | string;
    title: string;
    description: string;
    startTime: Date;
    endTime?: Date | null;
    venue?: string;
    address: string;
    latitude: number;
    longitude: number;
    price: number;
    category?: "Music" | "Sports" | "Arts" | "Family";
  };

export const defaultEventListing: EventListing = {
  id: 0,
  title: "default event title",
  description: "",
  startTime: new Date(Date.now()),
  endTime: new Date(Date.now()),
  venue: "",
  address: "",
  latitude: 0,
  longitude: 0,
  price: 0,
  category: "Music",
};

export type EventCardProps = {
  id: number | string;
  title: string;
  description: string;
  startTime: Date;
  venue: string | undefined;
  price: number;
  category: "Music" | "Sports" | "Arts" | "Family" | undefined;
};

export interface CountdownTimerProps {
  targetDate: Date;
}

export interface IconMap {
  [key: string]: string;
}

export type Coordinate = {
    lat: number
    lng: number
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
  
export const mapStyle = [
  {
      "featureType": "all",
      "elementType": "geometry",
      "stylers": [
          {
              "hue": "#ff4400"
          },
          {
              "saturation": -68
          },
          {
              "lightness": -4
          },
          {
              "gamma": 0.72
          }
      ]
  },
  {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
          {
              "hue": "#0077ff"
          },
          {
              "gamma": 3.1
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#44ff00"
          },
          {
              "saturation": -23
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "saturation": -64
          },
          {
              "hue": "#ff9100"
          },
          {
              "lightness": 16
          },
          {
              "gamma": 0.47
          },
          {
              "weight": 2.7
          }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": -48
          },
          {
              "hue": "#ff5e00"
          },
          {
              "gamma": 1.2
          },
          {
              "saturation": -23
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#00ccff"
          },
          {
              "gamma": 0.44
          },
          {
              "saturation": -33
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "hue": "#007fff"
          },
          {
              "gamma": 0.77
          },
          {
              "saturation": 65
          },
          {
              "lightness": 99
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "gamma": 0.11
          },
          {
              "weight": 5.6
          },
          {
              "saturation": 99
          },
          {
              "hue": "#0091ff"
          },
          {
              "lightness": -86
          }
      ]
  }
]


