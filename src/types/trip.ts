export interface ITrip {
  id: string;
  destination: string;
  ship: string;
  shipCode: string;
  departure: {
      port: string;
      code: string;
      date: string;
  }
  arrival: {
      port: string;
      code: string;
      date: string;
  }
  nights: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  spacesLeft?: number;
}
